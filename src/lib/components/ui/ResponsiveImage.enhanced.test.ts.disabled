import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import ResponsiveImage from './ResponsiveImage.svelte';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

mockIntersectionObserver.mockImplementation(() => ({
	observe: mockObserve,
	unobserve: mockUnobserve,
	disconnect: mockDisconnect
}));

beforeEach(() => {
	vi.clearAllMocks();
	global.IntersectionObserver = mockIntersectionObserver;
	
	// Mock canvas for format detection
	global.HTMLCanvasElement.prototype.toDataURL = vi.fn((format: string) => {
		if (format === 'image/avif') return 'data:image/avif;base64,test';
		if (format === 'image/webp') return 'data:image/webp;base64,test';
		return 'data:image/jpeg;base64,test';
	});
});

describe('Enhanced ResponsiveImage', () => {
	it('should render with modern format support', () => {
		const { container } = render(ResponsiveImage, {
			props: {
				src: '/test-image.jpg',
				alt: 'Test image',
				formats: ['avif', 'webp']
			}
		});

		const picture = container.querySelector('picture');
		expect(picture).toBeTruthy();

		const sources = container.querySelectorAll('source');
		expect(sources.length).toBeGreaterThan(0);
	});

	it('should render with lazy loading by default', () => {
		const { container: _container } = render(ResponsiveImage, {
			props: {
				src: '/test-image.jpg',
				alt: 'Test image'
			}
		});

		expect(mockObserve).toHaveBeenCalled();
	});

	it('should render immediately when priority is true', () => {
		const { container } = render(ResponsiveImage, {
			props: {
				src: '/test-image.jpg',
				alt: 'Test image',
				priority: true
			}
		});

		const img = container.querySelector('img');
		expect(img?.getAttribute('loading')).toBe('eager');
	});

	it('should show placeholder when not loaded', () => {
		const { container } = render(ResponsiveImage, {
			props: {
				src: '/test-image.jpg',
				alt: 'Test image',
				loading: 'lazy'
			}
		});

		const placeholder = container.querySelector('.responsive-image-placeholder');
		expect(placeholder).toBeTruthy();
	});

	it('should handle aspect ratio correctly', () => {
		const { container } = render(ResponsiveImage, {
			props: {
				src: '/test-image.jpg',
				alt: 'Test image',
				aspectRatio: '16/9'
			}
		});

		const imageContainer = container.querySelector('.responsive-image-container');
		expect(imageContainer?.getAttribute('style')).toContain('aspect-ratio: 16/9');
	});
});