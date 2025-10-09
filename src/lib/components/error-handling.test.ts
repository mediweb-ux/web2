import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ImageWithFallback from './ui/ImageWithFallback.svelte';
import { isOnline, initOfflineDetection } from '$lib/utils/offline-detection';

// Mock browser environment
Object.defineProperty(globalThis, 'navigator', {
	value: {
		onLine: true
	},
	writable: true
});

describe('Error Handling Components', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Reset navigator.onLine
		Object.defineProperty(globalThis.navigator, 'onLine', {
			value: true,
			writable: true
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});



	describe('ImageWithFallback', () => {
		it('renders image successfully', () => {
			render(ImageWithFallback, {
				props: {
					src: 'test-image.jpg',
					alt: 'Test image'
				}
			});

			const image = screen.getByAltText('Test image');
			expect(image).toBeInTheDocument();
			expect(image).toHaveAttribute('src', 'test-image.jpg');
		});

		it('shows loading state initially', () => {
			render(ImageWithFallback, {
				props: {
					src: 'test-image.jpg',
					alt: 'Test image'
				}
			});

			expect(screen.getByText('Loading image...')).toBeInTheDocument();
		});
	});



	describe('Offline Detection Utilities', () => {
		it('initializes with correct online state', () => {
			const cleanup = initOfflineDetection();
			
			let currentState: boolean;
			const unsubscribe = isOnline.subscribe(value => {
				currentState = value;
			});

			expect(currentState!).toBe(true);

			unsubscribe();
			cleanup?.();
		});
	});

	describe('Accessibility', () => {
		it('image has proper alt text', () => {
			render(ImageWithFallback, {
				props: {
					src: 'test-image.jpg',
					alt: 'Test image description'
				}
			});

			const image = screen.getByAltText('Test image description');
			expect(image).toBeInTheDocument();
		});
	});
});