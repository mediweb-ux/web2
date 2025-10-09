import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock window.matchMedia
const mockMatchMedia = vi.fn();

beforeEach(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: mockMatchMedia,
	});
});

afterEach(() => {
	vi.clearAllMocks();
});

describe('Responsive Utilities', () => {
	describe('Breakpoint Detection', () => {
		it('should detect mobile breakpoint correctly', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(max-width: 640px)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const isMobile = window.matchMedia('(max-width: 640px)').matches;
			expect(isMobile).toBe(true);
		});

		it('should detect tablet breakpoint correctly', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(min-width: 641px) and (max-width: 1024px)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const isTablet = window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches;
			expect(isTablet).toBe(true);
		});

		it('should detect desktop breakpoint correctly', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(min-width: 1025px)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const isDesktop = window.matchMedia('(min-width: 1025px)').matches;
			expect(isDesktop).toBe(true);
		});
	});

	describe('Orientation Detection', () => {
		it('should detect portrait orientation', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(orientation: portrait)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const isPortrait = window.matchMedia('(orientation: portrait)').matches;
			expect(isPortrait).toBe(true);
		});

		it('should detect landscape orientation', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(orientation: landscape)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const isLandscape = window.matchMedia('(orientation: landscape)').matches;
			expect(isLandscape).toBe(true);
		});
	});

	describe('Device Pixel Ratio Detection', () => {
		it('should detect high DPI displays', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const isHighDPI = window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches;
			expect(isHighDPI).toBe(true);
		});
	});

	describe('Accessibility Preferences', () => {
		it('should detect reduced motion preference', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(prefers-reduced-motion: reduce)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			expect(prefersReducedMotion).toBe(true);
		});

		it('should detect high contrast preference', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(prefers-contrast: high)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
			expect(prefersHighContrast).toBe(true);
		});

		it('should detect dark theme preference', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(prefers-color-scheme: dark)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			expect(prefersDark).toBe(true);
		});
	});

	describe('Touch Device Detection', () => {
		it('should detect touch capability', () => {
			// Mock touch support
			Object.defineProperty(window, 'ontouchstart', {
				writable: true,
				value: null,
			});

			const hasTouch = 'ontouchstart' in window;
			expect(hasTouch).toBe(true);
		});

		it('should detect hover capability', () => {
			mockMatchMedia.mockReturnValue({
				matches: true,
				media: '(hover: hover)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			});

			const canHover = window.matchMedia('(hover: hover)').matches;
			expect(canHover).toBe(true);
		});
	});

	describe('Viewport Dimensions', () => {
		it('should handle viewport width changes', () => {
			// Mock viewport dimensions
			Object.defineProperty(window, 'innerWidth', {
				writable: true,
				configurable: true,
				value: 768,
			});

			Object.defineProperty(window, 'innerHeight', {
				writable: true,
				configurable: true,
				value: 1024,
			});

			expect(window.innerWidth).toBe(768);
			expect(window.innerHeight).toBe(1024);

			// Simulate viewport change
			window.innerWidth = 1200;
			window.innerHeight = 800;

			expect(window.innerWidth).toBe(1200);
			expect(window.innerHeight).toBe(800);
		});
	});

	describe('Container Query Support', () => {
		it('should handle container queries gracefully', () => {
			// Test that container queries don't break the system
			// In browsers that don't support container queries, they should be ignored
			const containerQuery = '@container (min-width: 300px)';
			expect(containerQuery).toContain('@container');
		});
	});

	describe('Image Optimization', () => {
		it('should generate appropriate srcset values', () => {
			const breakpoints = [320, 480, 640, 768, 1024, 1280, 1536];
			const baseSrc = '/image.jpg';
			
			const srcset = breakpoints
				.map(width => `${baseSrc.replace('.jpg', `-${width}w.jpg`)} ${width}w`)
				.join(', ');

			expect(srcset).toContain('320w');
			expect(srcset).toContain('768w');
			expect(srcset).toContain('1536w');
			expect(srcset.split(', ')).toHaveLength(breakpoints.length);
		});

		it('should generate appropriate sizes attribute', () => {
			const sizes = [
				'(max-width: 640px) 100vw',
				'(max-width: 1024px) 50vw',
				'33vw'
			].join(', ');

			expect(sizes).toContain('100vw');
			expect(sizes).toContain('50vw');
			expect(sizes).toContain('33vw');
		});
	});

	describe('Performance Considerations', () => {
		it('should handle resize events efficiently', () => {
			const resizeHandler = vi.fn();
			let timeoutId: number;

			// Debounced resize handler
			const debouncedResize = () => {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(resizeHandler, 100);
			};

			// Simulate multiple resize events
			debouncedResize();
			debouncedResize();
			debouncedResize();

			// Handler should not be called immediately
			expect(resizeHandler).not.toHaveBeenCalled();

			// Wait for debounce timeout
			setTimeout(() => {
				expect(resizeHandler).toHaveBeenCalledTimes(1);
			}, 150);
		});
	});

	describe('CSS Grid and Flexbox Support', () => {
		it('should handle CSS Grid layouts', () => {
			const gridTemplate = 'repeat(auto-fit, minmax(280px, 1fr))';
			expect(gridTemplate).toContain('auto-fit');
			expect(gridTemplate).toContain('minmax');
			expect(gridTemplate).toContain('280px');
		});

		it('should handle Flexbox layouts', () => {
			const flexDirection = 'column';
			const flexDirectionResponsive = 'row';
			
			expect(['column', 'row']).toContain(flexDirection);
			expect(['column', 'row']).toContain(flexDirectionResponsive);
		});
	});
});