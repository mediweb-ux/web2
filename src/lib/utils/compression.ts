/**
 * Compression and caching utilities for performance optimization
 */

export interface CompressionOptions {
	level?: number;
	threshold?: number;
	filter?: (req: any, res: any) => boolean;
}

export interface CacheOptions {
	maxAge?: number;
	staleWhileRevalidate?: number;
	mustRevalidate?: boolean;
	public?: boolean;
}

/**
 * Generate cache headers for different asset types
 */
export function getCacheHeaders(assetType: string): Record<string, string> {
	const headers: Record<string, string> = {};

	switch (assetType) {
		case 'static':
			// Static assets with hash in filename - cache for 1 year
			headers['Cache-Control'] = 'public, max-age=31536000, immutable';
			break;

		case 'images':
			// Images - cache for 1 month with stale-while-revalidate
			headers['Cache-Control'] = 'public, max-age=2592000, stale-while-revalidate=86400';
			break;

		case 'fonts':
			// Fonts - cache for 1 year (they rarely change)
			headers['Cache-Control'] = 'public, max-age=31536000, immutable';
			break;

		case 'css':
			// CSS with hash - cache for 1 year
			headers['Cache-Control'] = 'public, max-age=31536000, immutable';
			break;

		case 'js':
			// JavaScript with hash - cache for 1 year
			headers['Cache-Control'] = 'public, max-age=31536000, immutable';
			break;

		case 'html':
			// HTML pages - short cache with revalidation
			headers['Cache-Control'] = 'public, max-age=300, must-revalidate';
			break;

		case 'api':
			// API responses - no cache by default
			headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
			headers['Pragma'] = 'no-cache';
			headers['Expires'] = '0';
			break;

		default:
			// Default - short cache
			headers['Cache-Control'] = 'public, max-age=3600';
	}

	return headers;
}

/**
 * Generate compression headers
 */
export function getCompressionHeaders(contentType: string): Record<string, string> {
	const headers: Record<string, string> = {};

	// Add Vary header for content negotiation
	headers['Vary'] = 'Accept-Encoding';

	// Set appropriate content encoding based on support
	if (supportsCompression(contentType)) {
		// In a real server environment, you would check Accept-Encoding header
		// and set Content-Encoding accordingly
		headers['Content-Encoding'] = 'gzip'; // or 'br' for Brotli
	}

	return headers;
}

/**
 * Check if content type should be compressed
 */
export function supportsCompression(contentType: string): boolean {
	const compressibleTypes = [
		'text/html',
		'text/css',
		'text/javascript',
		'application/javascript',
		'application/json',
		'text/xml',
		'application/xml',
		'text/plain',
		'image/svg+xml'
	];

	return compressibleTypes.some(type => contentType.includes(type));
}

/**
 * Generate ETag for content
 */
export function generateETag(content: string | any): string {
	const crypto = typeof window === 'undefined' ? (globalThis as any).require?.('crypto') : null;
	
	if (!crypto) {
		// Fallback for client-side (though ETags are typically server-side)
		return `"${content.toString().length.toString(16)}"`;
	}

	const hash = crypto.createHash('md5').update(content).digest('hex');
	return `"${hash}"`;
}

/**
 * Check if content has been modified (for 304 responses)
 */
export function isModified(
	ifNoneMatch?: string,
	ifModifiedSince?: string,
	etag?: string,
	lastModified?: Date
): boolean {
	// Check ETag
	if (ifNoneMatch && etag) {
		return ifNoneMatch !== etag;
	}

	// Check Last-Modified
	if (ifModifiedSince && lastModified) {
		const clientDate = new Date(ifModifiedSince);
		return lastModified > clientDate;
	}

	// If no conditional headers, assume modified
	return true;
}

/**
 * Get optimal image format based on Accept header
 */
export function getOptimalImageFormat(acceptHeader: string = ''): string {
	const formats = ['avif', 'webp', 'jpg', 'png'];
	
	for (const format of formats) {
		if (acceptHeader.includes(`image/${format}`)) {
			return format;
		}
	}
	
	return 'jpg'; // Fallback
}

/**
 * Calculate content size for compression ratio reporting
 */
export function calculateCompressionRatio(
	originalSize: number,
	compressedSize: number
): number {
	if (originalSize === 0) return 0;
	return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}

/**
 * Service Worker cache strategies
 */
export const cacheStrategies = {
	/**
	 * Cache First - Good for static assets
	 */
	cacheFirst: {
		strategy: 'CacheFirst',
		cacheName: 'static-cache',
		options: {
			expiration: {
				maxEntries: 100,
				maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
			}
		}
	},

	/**
	 * Network First - Good for API calls
	 */
	networkFirst: {
		strategy: 'NetworkFirst',
		cacheName: 'api-cache',
		options: {
			networkTimeoutSeconds: 3,
			expiration: {
				maxEntries: 50,
				maxAgeSeconds: 5 * 60 // 5 minutes
			}
		}
	},

	/**
	 * Stale While Revalidate - Good for frequently updated content
	 */
	staleWhileRevalidate: {
		strategy: 'StaleWhileRevalidate',
		cacheName: 'dynamic-cache',
		options: {
			expiration: {
				maxEntries: 200,
				maxAgeSeconds: 24 * 60 * 60 // 24 hours
			}
		}
	}
};

/**
 * Generate Service Worker configuration
 */
export function generateSWConfig() {
	return {
		// Cache static assets
		runtimeCaching: [
			{
				urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'google-fonts-cache',
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
					}
				}
			},
			{
				urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'google-fonts-webfonts-cache',
					expiration: {
						maxEntries: 30,
						maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
					}
				}
			},
			{
				urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'images-cache',
					expiration: {
						maxEntries: 100,
						maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
					}
				}
			}
		]
	};
}

/**
 * Client-side compression detection
 */
export function detectCompressionSupport(): {
	gzip: boolean;
	brotli: boolean;
	deflate: boolean;
} {
	if (typeof window === 'undefined') {
		return { gzip: false, brotli: false, deflate: false };
	}

	// Check if compression is supported by examining response headers
	// This is a simplified check - in reality, you'd examine actual responses
	return {
		gzip: true, // Most browsers support gzip
		brotli: 'CompressionStream' in window, // Modern browsers support Brotli
		deflate: true // Most browsers support deflate
	};
}