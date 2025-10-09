<script lang="ts">
	import { onMount } from 'svelte';
	import { initPerformanceMonitoring } from '$lib/utils/performance';
	import { preloadCriticalAssets } from '$lib/utils/preload';

	export let preloadCritical: boolean = true;
	export let monitorPerformance: boolean = true;

	onMount(() => {
		// Preload critical assets
		if (preloadCritical) {
			preloadCriticalAssets();
		}

		// Initialize performance monitoring
		if (monitorPerformance) {
			initPerformanceMonitoring();
		}

		// Optimize font loading
		if ('fonts' in document) {
			// Load critical fonts with high priority
			document.fonts.load('1rem Inter').then(() => {
				document.documentElement.classList.add('fonts-loaded');
			});
		}

		// Optimize image loading based on connection
		const connection = (navigator as any).connection;
		if (connection) {
			// Add connection class for CSS optimizations
			document.documentElement.classList.add(`connection-${connection.effectiveType}`);
			
			if (connection.saveData) {
				document.documentElement.classList.add('save-data');
			}
		}

		// Optimize animations based on user preferences
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (prefersReducedMotion.matches) {
			document.documentElement.classList.add('reduce-motion');
		}

		// Listen for changes in motion preference
		prefersReducedMotion.addEventListener('change', (e) => {
			document.documentElement.classList.toggle('reduce-motion', e.matches);
		});

		// Optimize for high contrast mode
		const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
		if (prefersHighContrast.matches) {
			document.documentElement.classList.add('high-contrast');
		}

		prefersHighContrast.addEventListener('change', (e) => {
			document.documentElement.classList.toggle('high-contrast', e.matches);
		});
	});
</script>

<div class="performance-layout">
	<slot />
</div>

<style>
	.performance-layout {
		/* Base performance optimizations */
		contain: layout style paint;
		will-change: auto;
	}

	/* Font loading optimizations */
	:global(.fonts-loaded) {
		/* Using system fonts for now - Inter font would be loaded here in production */
		font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
	}

	/* Connection-based optimizations */
	:global(.connection-slow-2g) .performance-layout,
	:global(.connection-2g) .performance-layout {
		/* Reduce animations and effects for slow connections */
		--animation-duration: 0s;
		--transition-duration: 0s;
	}

	:global(.save-data) .performance-layout {
		/* Minimal effects when data saver is enabled */
		--animation-duration: 0s;
		--transition-duration: 0s;
		--box-shadow: none;
		--background-image: none;
	}

	/* Reduced motion optimizations */
	:global(.reduce-motion) .performance-layout {
		--animation-duration: 0s;
		--transition-duration: 0s;
	}

	:global(.reduce-motion) * {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}

	/* High contrast optimizations */
	:global(.high-contrast) .performance-layout {
		--box-shadow: none;
		--border-width: 2px;
		--outline-width: 3px;
	}

	/* Performance-focused CSS containment */
	:global(.performance-layout) * {
		/* Optimize repaints and reflows */
		box-sizing: border-box;
	}

	/* Optimize for different viewport sizes */
	@media (max-width: 640px) {
		.performance-layout {
			/* Mobile optimizations */
			contain: layout style;
		}
	}

	@media (min-width: 1024px) {
		.performance-layout {
			/* Desktop optimizations */
			contain: layout style paint size;
		}
	}

	/* Print optimizations */
	@media print {
		.performance-layout {
			/* Remove unnecessary styles for print */
			background: none !important;
			box-shadow: none !important;
			color: black !important;
		}
	}
</style>