/**
 * Performance monitoring and optimization utilities
 */

export interface PerformanceMetrics {
	fcp?: number; // First Contentful Paint
	lcp?: number; // Largest Contentful Paint
	fid?: number; // First Input Delay
	cls?: number; // Cumulative Layout Shift
	ttfb?: number; // Time to First Byte
}

/**
 * Measure Core Web Vitals
 */
export function measureCoreWebVitals(): Promise<PerformanceMetrics> {
	return new Promise((resolve) => {
		const metrics: PerformanceMetrics = {};

		// Measure TTFB
		if ('performance' in window && 'getEntriesByType' in performance) {
			const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
			if (navigationEntries.length > 0) {
				const nav = navigationEntries[0];
				if (nav) {
					metrics.ttfb = nav.responseStart - nav.requestStart;
				}
			}
		}

		// Measure FCP
		if ('PerformanceObserver' in window) {
			try {
				const fcpObserver = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
					if (fcpEntry) {
						metrics.fcp = fcpEntry.startTime;
						fcpObserver.disconnect();
					}
				});
				fcpObserver.observe({ entryTypes: ['paint'] });
			} catch (e) {
				console.warn('FCP measurement not supported');
			}

			// Measure LCP
			try {
				const lcpObserver = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const lastEntry = entries[entries.length - 1];
					if (lastEntry) {
						metrics.lcp = lastEntry.startTime;
					}
				});
				lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
				
				// Stop observing after page load
				setTimeout(() => lcpObserver.disconnect(), 10000);
			} catch (e) {
				console.warn('LCP measurement not supported');
			}

			// Measure FID
			try {
				const fidObserver = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					entries.forEach((entry: any) => {
						if (entry.processingStart && entry.startTime) {
							metrics.fid = entry.processingStart - entry.startTime;
						}
					});
					fidObserver.disconnect();
				});
				fidObserver.observe({ entryTypes: ['first-input'] });
			} catch (e) {
				console.warn('FID measurement not supported');
			}

			// Measure CLS
			try {
				let clsValue = 0;
				const clsObserver = new PerformanceObserver((list) => {
					const entries = list.getEntries();
					entries.forEach((entry: any) => {
						if (!entry.hadRecentInput) {
							clsValue += entry.value;
						}
					});
					metrics.cls = clsValue;
				});
				clsObserver.observe({ entryTypes: ['layout-shift'] });
				
				// Stop observing after page load
				setTimeout(() => {
					clsObserver.disconnect();
					resolve(metrics);
				}, 5000);
			} catch (e) {
				console.warn('CLS measurement not supported');
				resolve(metrics);
			}
		} else {
			resolve(metrics);
		}
	});
}

/**
 * Report performance metrics to analytics
 */
export function reportPerformanceMetrics(metrics: PerformanceMetrics): void {
	// In a real application, you would send these to your analytics service
	console.log('Performance Metrics:', metrics);
	
	// Example: Send to Google Analytics
	if (typeof (globalThis as any).gtag !== 'undefined') {
		Object.entries(metrics).forEach(([key, value]) => {
			if (value !== undefined) {
				(globalThis as any).gtag('event', 'performance_metric', {
					metric_name: key,
					metric_value: Math.round(value),
					custom_parameter: 'core_web_vitals'
				});
			}
		});
	}
}

/**
 * Monitor resource loading performance
 */
export function monitorResourceLoading(): void {
	if (!('PerformanceObserver' in window)) return;

	const resourceObserver = new PerformanceObserver((list) => {
		const entries = list.getEntries();
		entries.forEach((entry) => {
			const resource = entry as PerformanceResourceTiming;
			
			// Log slow resources
			if (resource.duration > 1000) {
				console.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
			}
			
			// Log large resources
			if (resource.transferSize && resource.transferSize > 100000) {
				console.warn(`Large resource: ${resource.name} is ${Math.round(resource.transferSize / 1024)}KB`);
			}
		});
	});

	resourceObserver.observe({ entryTypes: ['resource'] });
}

/**
 * Optimize images based on device capabilities
 */
export function getOptimalImageFormat(): string[] {
	const formats: string[] = [];
	
	if (typeof window === 'undefined') {
		return ['webp', 'jpg'];
	}

	// Check AVIF support
	const canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;
	
	if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
		formats.push('avif');
	}
	
	// Check WebP support
	if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
		formats.push('webp');
	}
	
	// Fallback formats
	formats.push('jpg', 'png');
	
	return formats;
}

/**
 * Get device-specific loading strategy
 */
export function getDeviceLoadingStrategy(): {
	imageQuality: number;
	lazyLoadThreshold: string;
	preloadCount: number;
} {
	const defaults = {
		imageQuality: 80,
		lazyLoadThreshold: '50px',
		preloadCount: 3
	};

	if (typeof navigator === 'undefined') {
		return defaults;
	}

	// Check for data saver mode
	const connection = (navigator as any).connection;
	if (connection?.saveData) {
		return {
			imageQuality: 60,
			lazyLoadThreshold: '100px',
			preloadCount: 1
		};
	}

	// Adjust based on connection speed
	if (connection?.effectiveType) {
		switch (connection.effectiveType) {
			case 'slow-2g':
			case '2g':
				return {
					imageQuality: 50,
					lazyLoadThreshold: '200px',
					preloadCount: 1
				};
			case '3g':
				return {
					imageQuality: 70,
					lazyLoadThreshold: '100px',
					preloadCount: 2
				};
			case '4g':
				return {
					imageQuality: 90,
					lazyLoadThreshold: '50px',
					preloadCount: 5
				};
		}
	}

	return defaults;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number,
	immediate?: boolean
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	
	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			if (!immediate) func(...args);
		};
		
		const callNow = immediate && !timeout;
		
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		
		if (callNow) func(...args);
	};
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	
	return function executedFunction(...args: Parameters<T>) {
		if (!inThrottle) {
			func.apply(null, args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	};
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
	if (typeof window === 'undefined') return;

	// Monitor Core Web Vitals
	measureCoreWebVitals().then(reportPerformanceMetrics);
	
	// Monitor resource loading
	monitorResourceLoading();
	
	// Report long tasks
	if ('PerformanceObserver' in window) {
		try {
			const longTaskObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				entries.forEach((entry) => {
					console.warn(`Long task detected: ${entry.duration}ms`);
				});
			});
			longTaskObserver.observe({ entryTypes: ['longtask'] });
		} catch (e) {
			console.warn('Long task monitoring not supported');
		}
	}
}