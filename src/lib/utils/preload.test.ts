import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	preloadResource,
	preloadImage,
	preloadFont,
	preloadCSS,
	preloadScript,
	prefetchResource,
	dnsPrefetch,
	preconnect,
	batchPreload
} from './preload';

// Mock DOM elements
const mockLink = {
	rel: '',
	href: '',
	as: '',
	type: '',
	media: '',
	crossOrigin: '',
	setAttribute: vi.fn()
};

const mockDocument = {
	createElement: vi.fn(() => mockLink),
	querySelector: vi.fn(),
	head: {
		appendChild: vi.fn()
	}
};

beforeEach(() => {
	vi.clearAllMocks();
	global.window = {} as any;
	global.document = mockDocument as any;
});

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Preload Utils', () => {
	describe('preloadResource', () => {
		it('should create and append preload link', () => {
			preloadResource('/test.jpg', { as: 'image' });

			expect(mockDocument.createElement).toHaveBeenCalledWith('link');
			expect(mockLink.rel).toBe('preload');
			expect(mockLink.href).toBe('/test.jpg');
			expect(mockLink.as).toBe('image');
			expect(mockDocument.head.appendChild).toHaveBeenCalledWith(mockLink);
		});

		it('should not create duplicate preload links', () => {
			mockDocument.querySelector.mockReturnValue(mockLink);

			preloadResource('/test.jpg', { as: 'image' });

			expect(mockDocument.createElement).not.toHaveBeenCalled();
			expect(mockDocument.head.appendChild).not.toHaveBeenCalled();
		});

		it('should set crossorigin attribute when specified', () => {
			preloadResource('/test.woff2', { 
				as: 'font', 
				crossorigin: 'anonymous' 
			});

			expect(mockLink.crossOrigin).toBe('anonymous');
		});

		it('should set type attribute when specified', () => {
			preloadResource('/test.woff2', { 
				as: 'font', 
				type: 'font/woff2' 
			});

			expect(mockLink.type).toBe('font/woff2');
		});

		it('should set fetchpriority attribute when specified', () => {
			preloadResource('/test.jpg', { 
				as: 'image', 
				fetchpriority: 'high' 
			});

			expect(mockLink.setAttribute).toHaveBeenCalledWith('fetchpriority', 'high');
		});

		it('should handle server-side rendering gracefully', () => {
			global.window = undefined as any;

			expect(() => {
				preloadResource('/test.jpg', { as: 'image' });
			}).not.toThrow();

			expect(mockDocument.createElement).not.toHaveBeenCalled();
		});
	});

	describe('preloadImage', () => {
		it('should preload image with high priority', () => {
			preloadImage('/hero.jpg');

			expect(mockLink.as).toBe('image');
			expect(mockLink.setAttribute).toHaveBeenCalledWith('fetchpriority', 'high');
		});

		it('should accept custom options', () => {
			preloadImage('/hero.jpg', { crossorigin: 'anonymous' });

			expect(mockLink.crossOrigin).toBe('anonymous');
		});
	});

	describe('preloadFont', () => {
		it('should preload font with correct attributes', () => {
			preloadFont('/fonts/inter.woff2');

			expect(mockLink.as).toBe('font');
			expect(mockLink.type).toBe('font/woff2');
			expect(mockLink.crossOrigin).toBe('anonymous');
		});

		it('should accept custom type', () => {
			preloadFont('/fonts/inter.woff', 'font/woff');

			expect(mockLink.type).toBe('font/woff');
		});
	});

	describe('preloadCSS', () => {
		it('should preload CSS file', () => {
			preloadCSS('/styles/critical.css');

			expect(mockLink.as).toBe('style');
		});

		it('should set media attribute when specified', () => {
			preloadCSS('/styles/print.css', 'print');

			expect(mockLink.media).toBe('print');
		});
	});

	describe('preloadScript', () => {
		it('should preload JavaScript file', () => {
			preloadScript('/js/analytics.js');

			expect(mockLink.as).toBe('script');
		});
	});

	describe('prefetchResource', () => {
		it('should create prefetch link', () => {
			prefetchResource('/next-page.html');

			expect(mockLink.rel).toBe('prefetch');
			expect(mockLink.href).toBe('/next-page.html');
		});

		it('should not create duplicate prefetch links', () => {
			mockDocument.querySelector.mockReturnValue(mockLink);

			prefetchResource('/next-page.html');

			expect(mockDocument.createElement).not.toHaveBeenCalled();
		});
	});

	describe('dnsPrefetch', () => {
		it('should create DNS prefetch link', () => {
			dnsPrefetch('//example.com');

			expect(mockLink.rel).toBe('dns-prefetch');
			expect(mockLink.href).toBe('//example.com');
		});
	});

	describe('preconnect', () => {
		it('should create preconnect link', () => {
			preconnect('https://fonts.googleapis.com');

			expect(mockLink.rel).toBe('preconnect');
			expect(mockLink.href).toBe('https://fonts.googleapis.com');
		});

		it('should set crossorigin when specified', () => {
			preconnect('https://fonts.gstatic.com', true);

			expect(mockLink.crossOrigin).toBe('anonymous');
		});
	});

	describe('batchPreload', () => {
		it('should preload multiple resources', () => {
			const resources = [
				{ href: '/image1.jpg', options: { as: 'image' as const } },
				{ href: '/image2.jpg', options: { as: 'image' as const } }
			];

			batchPreload(resources);

			expect(mockDocument.createElement).toHaveBeenCalledTimes(2);
			expect(mockDocument.head.appendChild).toHaveBeenCalledTimes(2);
		});
	});
});