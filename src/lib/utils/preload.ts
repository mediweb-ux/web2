/**
 * Utility functions for preloading critical resources
 */

export interface PreloadOptions {
	as: 'image' | 'font' | 'script' | 'style' | 'fetch';
	crossorigin?: 'anonymous' | 'use-credentials';
	type?: string;
	media?: string;
	fetchpriority?: 'high' | 'low' | 'auto';
}

/**
 * Preload a resource using link rel="preload"
 */
export function preloadResource(href: string, options: PreloadOptions): void {
	if (typeof window === 'undefined') return;

	// Check if already preloaded
	const existing = document.querySelector(`link[rel="preload"][href="${href}"]`);
	if (existing) return;

	const link = document.createElement('link');
	link.rel = 'preload';
	link.href = href;
	link.as = options.as;

	if (options.crossorigin) {
		link.crossOrigin = options.crossorigin;
	}

	if (options.type) {
		link.type = options.type;
	}

	if (options.media) {
		link.media = options.media;
	}

	if (options.fetchpriority) {
		link.setAttribute('fetchpriority', options.fetchpriority);
	}

	document.head.appendChild(link);
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, options?: Partial<PreloadOptions>): void {
	preloadResource(src, {
		as: 'image',
		fetchpriority: 'high',
		...options
	});
}

/**
 * Preload critical fonts
 */
export function preloadFont(src: string, type: string = 'font/woff2'): void {
	preloadResource(src, {
		as: 'font',
		type,
		crossorigin: 'anonymous'
	});
}

/**
 * Preload critical CSS
 */
export function preloadCSS(src: string, media?: string): void {
	const options: PreloadOptions = {
		as: 'style'
	};
	
	if (media) {
		options.media = media;
	}
	
	preloadResource(src, options);
}

/**
 * Preload critical JavaScript
 */
export function preloadScript(src: string): void {
	preloadResource(src, {
		as: 'script'
	});
}

/**
 * Prefetch resources for future navigation
 */
export function prefetchResource(href: string): void {
	if (typeof window === 'undefined') return;

	// Check if already prefetched
	const existing = document.querySelector(`link[rel="prefetch"][href="${href}"]`);
	if (existing) return;

	const link = document.createElement('link');
	link.rel = 'prefetch';
	link.href = href;

	document.head.appendChild(link);
}

/**
 * DNS prefetch for external domains
 */
export function dnsPrefetch(domain: string): void {
	if (typeof window === 'undefined') return;

	// Check if already prefetched
	const existing = document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`);
	if (existing) return;

	const link = document.createElement('link');
	link.rel = 'dns-prefetch';
	link.href = domain;

	document.head.appendChild(link);
}

/**
 * Preconnect to external domains
 */
export function preconnect(domain: string, crossorigin: boolean = false): void {
	if (typeof window === 'undefined') return;

	// Check if already preconnected
	const existing = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
	if (existing) return;

	const link = document.createElement('link');
	link.rel = 'preconnect';
	link.href = domain;

	if (crossorigin) {
		link.crossOrigin = 'anonymous';
	}

	document.head.appendChild(link);
}

/**
 * Batch preload multiple resources
 */
export function batchPreload(resources: Array<{ href: string; options: PreloadOptions }>): void {
	resources.forEach(({ href, options }) => {
		preloadResource(href, options);
	});
}

/**
 * Preload hero images and critical above-the-fold content
 */
export function preloadCriticalAssets(): void {
	// Preload critical fonts (disabled for now - using system fonts)
	// preloadFont('/fonts/inter-var.woff2');
	
	// Preload hero images (using SVG placeholder for now)
	preloadImage('/images/hero-bg.svg');
	
	// Preconnect to external services
	preconnect('https://fonts.googleapis.com');
	preconnect('https://fonts.gstatic.com', true);
}