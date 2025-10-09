import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ResponsiveImage from './ResponsiveImage.svelte';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
});

// Store original IntersectionObserver
const originalIntersectionObserver = global.IntersectionObserver;

beforeEach(() => {
	// Mock IntersectionObserver
	global.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
	// Restore original IntersectionObserver
	global.IntersectionObserver = originalIntersectionObserver;
	vi.clearAllMocks();
});

describe('ResponsiveImage', () => {
	const defaultProps = {
		src: '/test-image.jpg',
		alt: 'Test image description'
	};

	it('renders with required props', () => {
		render(ResponsiveImage, { props: defaultProps });
		
		const container = screen.getByRole('img', { name: /test image description/i });
		expect(container).toBeInTheDocument();
	});

	it('renders placeholder when lazy loading and not in view', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				loading: 'lazy' 
			} 
		});
		
		// Should show placeholder initially
		const placeholder = screen.getByRole('img', { name: /test image description/i });
		expect(placeholder).toBeInTheDocument();
		expect(placeholder).toHaveClass('responsive-image-placeholder');
	});

	it('renders image immediately when loading is eager', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				loading: 'eager' 
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i });
		expect(image).toBeInTheDocument();
		expect(image.tagName).toBe('IMG');
	});

	it('renders image immediately when priority is true', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				priority: true 
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i });
		expect(image).toBeInTheDocument();
		expect(image.tagName).toBe('IMG');
	});

	it('applies custom className', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				className: 'custom-class',
				loading: 'eager'
			} 
		});
		
		const container = document.querySelector('.responsive-image-container');
		expect(container).toHaveClass('custom-class');
	});

	it('sets correct image attributes', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				width: 800,
				height: 600,
				sizes: '(max-width: 768px) 100vw, 50vw',
				loading: 'eager'
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i }) as HTMLImageElement;
		expect(image.src).toContain('test-image.jpg');
		expect(image.alt).toBe('Test image description');
		expect(image.width).toBe(800);
		expect(image.height).toBe(600);
		expect(image.sizes).toBe('(max-width: 768px) 100vw, 50vw');
	});

	it('generates srcset for responsive images', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				loading: 'eager'
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i }) as HTMLImageElement;
		expect(image.srcset).toContain('320w');
		expect(image.srcset).toContain('768w');
		expect(image.srcset).toContain('1024w');
	});

	it('applies aspect ratio styling', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				aspectRatio: '16/9',
				loading: 'eager'
			} 
		});
		
		const container = document.querySelector('.responsive-image-container') as HTMLElement;
		expect(container.style.aspectRatio).toBe('16/9');
	});

	it('handles image load event', async () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				loading: 'eager'
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i }) as HTMLImageElement;
		
		// Initially should not have loaded class
		expect(image).not.toHaveClass('loaded');
		
		// Simulate image load
		image.dispatchEvent(new Event('load'));
		
		await waitFor(() => {
			expect(image).toHaveClass('loaded');
		});
	});

	it('handles image error event', async () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				loading: 'eager'
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i }) as HTMLImageElement;
		
		// Simulate image error
		image.dispatchEvent(new Event('error'));
		
		await waitFor(() => {
			expect(image).toHaveClass('error');
			// Error placeholder should be visible
			const errorPlaceholder = document.querySelector('.error-placeholder');
			expect(errorPlaceholder).toBeInTheDocument();
		});
	});

	it('renders placeholder image when provided', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				placeholder: '/placeholder.jpg',
				loading: 'lazy'
			} 
		});
		
		const placeholderImage = document.querySelector('.placeholder-image') as HTMLImageElement;
		expect(placeholderImage).toBeInTheDocument();
		expect(placeholderImage.src).toContain('placeholder.jpg');
	});

	it('sets up intersection observer for lazy loading', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				loading: 'lazy'
			} 
		});
		
		// Just verify that the component renders without errors when lazy loading
		const placeholder = screen.getByRole('img', { name: /test image description/i });
		expect(placeholder).toBeInTheDocument();
	});

	it('applies correct object-fit styling', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				objectFit: 'contain',
				loading: 'eager'
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i }) as HTMLImageElement;
		expect(image.style.objectFit).toBe('contain');
	});

	it('has proper accessibility attributes', () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				loading: 'eager'
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i });
		expect(image).toHaveAttribute('alt', 'Test image description');
		expect(image).toHaveAttribute('decoding', 'async');
	});

	it('shows error state with accessible content', async () => {
		render(ResponsiveImage, { 
			props: { 
				...defaultProps, 
				loading: 'eager'
			} 
		});
		
		const image = screen.getByRole('img', { name: /test image description/i }) as HTMLImageElement;
		
		// Simulate image error
		image.dispatchEvent(new Event('error'));
		
		await waitFor(() => {
			const errorText = screen.getByText('Image failed to load');
			expect(errorText).toBeInTheDocument();
			expect(errorText).toHaveClass('sr-only');
		});
	});
});