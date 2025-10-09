/**
 * Lazy loading utilities for content and components
 */

export interface LazyLoadOptions {
	rootMargin?: string;
	threshold?: number | number[];
	once?: boolean;
}

/**
 * Create an intersection observer for lazy loading
 */
export function createLazyObserver(
	callback: (entry: IntersectionObserverEntry) => void,
	options: LazyLoadOptions = {}
): IntersectionObserver | null {
	if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
		return null;
	}

	const {
		rootMargin = '50px',
		threshold = 0.1,
		once = true
	} = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					callback(entry);
					
					if (once) {
						observer.unobserve(entry.target);
					}
				}
			});
		},
		{
			rootMargin,
			threshold
		}
	);
	
	return observer;
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImage(img: HTMLImageElement, options?: LazyLoadOptions): () => void {
	const observer = createLazyObserver((entry) => {
		const image = entry.target as HTMLImageElement;
		
		// Load the actual image
		if (image.dataset.src) {
			image.src = image.dataset.src;
			image.removeAttribute('data-src');
		}
		
		if (image.dataset.srcset) {
			image.srcset = image.dataset.srcset;
			image.removeAttribute('data-srcset');
		}
		
		// Add loaded class for styling
		image.classList.add('lazy-loaded');
		
		// Remove loading placeholder
		image.classList.remove('lazy-loading');
	}, options);

	if (observer) {
		observer.observe(img);
		return () => observer.disconnect();
	}

	// Fallback for browsers without IntersectionObserver
	if (img.dataset.src) {
		img.src = img.dataset.src;
		img.removeAttribute('data-src');
	}
	
	if (img.dataset.srcset) {
		img.srcset = img.dataset.srcset;
		img.removeAttribute('data-srcset');
	}

	return () => {};
}

/**
 * Lazy load content sections
 */
export function lazyLoadContent(element: HTMLElement, options?: LazyLoadOptions): () => void {
	const observer = createLazyObserver((entry) => {
		const target = entry.target as HTMLElement;
		
		// Trigger custom event for component to handle loading
		target.dispatchEvent(new CustomEvent('lazy-load', {
			detail: { entry }
		}));
		
		// Add loaded class
		target.classList.add('lazy-loaded');
		target.classList.remove('lazy-loading');
	}, options);

	if (observer) {
		observer.observe(element);
		return () => observer.disconnect();
	}

	// Fallback - immediately trigger loading
	element.dispatchEvent(new CustomEvent('lazy-load'));
	return () => {};
}

/**
 * Svelte action for lazy loading
 */
export function lazyLoad(node: HTMLElement, options?: LazyLoadOptions) {
	let cleanup: (() => void) | null = null;

	const init = () => {
		if (node.tagName === 'IMG') {
			cleanup = lazyLoadImage(node as HTMLImageElement, options);
		} else {
			cleanup = lazyLoadContent(node, options);
		}
	};

	init();

	return {
		destroy() {
			if (cleanup) {
				cleanup();
			}
		}
	};
}

/**
 * Preload images that are likely to be needed soon
 */
export function preloadNearbyImages(currentElement: HTMLElement, distance: number = 2): void {
	const images = Array.from(document.querySelectorAll('img[data-src]')) as HTMLImageElement[];
	const currentIndex = images.indexOf(currentElement as HTMLImageElement);
	
	if (currentIndex === -1) return;

	// Preload images within the specified distance
	const start = Math.max(0, currentIndex - distance);
	const end = Math.min(images.length, currentIndex + distance + 1);
	
	for (let i = start; i < end; i++) {
		const img = images[i];
		if (img && img.dataset.src && !img.src) {
			// Create a new image to preload
			const preloadImg = new Image();
			preloadImg.src = img.dataset.src;
		}
	}
}

/**
 * Batch lazy load multiple elements
 */
export function batchLazyLoad(elements: HTMLElement[], options?: LazyLoadOptions): () => void {
	const cleanupFunctions = elements.map(element => {
		if (element.tagName === 'IMG') {
			return lazyLoadImage(element as HTMLImageElement, options);
		} else {
			return lazyLoadContent(element, options);
		}
	});

	return () => {
		cleanupFunctions.forEach(cleanup => cleanup());
	};
}

/**
 * Check if lazy loading is supported
 */
export function isLazyLoadingSupported(): boolean {
	return typeof window !== 'undefined' && 'IntersectionObserver' in window;
}

/**
 * Get optimal loading strategy based on connection
 */
export function getLoadingStrategy(): 'eager' | 'lazy' {
	if (typeof navigator === 'undefined') return 'lazy';
	
	// Check for slow connection
	const connection = (navigator as any).connection;
	if (connection) {
		const { effectiveType, saveData } = connection;
		
		// Use eager loading for fast connections, lazy for slow ones
		if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
			return 'lazy';
		}
		
		if (effectiveType === '4g') {
			return 'eager';
		}
	}
	
	return 'lazy';
}