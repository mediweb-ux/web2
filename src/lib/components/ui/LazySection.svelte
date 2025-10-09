<script lang="ts">
	import { onMount } from 'svelte';
	import { lazyLoad } from '$lib/utils/lazy-loading';

	export let threshold: number = 0.1;
	export let rootMargin: string = '50px';
	export let once: boolean = true;
	export let className: string = '';
	export let placeholder: boolean = true;
	export let minHeight: string = '200px';

	let sectionElement: HTMLElement;
	let isLoaded = false;
	let isVisible = false;

	onMount(() => {
		if (sectionElement) {
			const cleanup = lazyLoad(sectionElement, {
				threshold,
				rootMargin,
				once
			});

			// Listen for lazy load event
			const handleLazyLoad = () => {
				isLoaded = true;
				isVisible = true;
			};

			sectionElement.addEventListener('lazy-load', handleLazyLoad);

			return () => {
				if (cleanup && typeof cleanup.destroy === 'function') {
					cleanup.destroy();
				}
				sectionElement?.removeEventListener('lazy-load', handleLazyLoad);
			};
		}
		return () => {}; // Return empty cleanup function when sectionElement is not available
	});

	// Combine classes
	$: combinedClasses = [
		'lazy-section',
		className,
		isLoaded ? 'loaded' : 'loading',
		isVisible ? 'visible' : 'hidden'
	].filter(Boolean).join(' ');
</script>

<section
	bind:this={sectionElement}
	class={combinedClasses}
	style:min-height={!isLoaded && placeholder ? minHeight : 'auto'}
	aria-busy={!isLoaded}
>
	{#if isLoaded}
		<slot />
	{:else if placeholder}
		<div class="lazy-placeholder" role="status" aria-label="Loading content...">
			<div class="placeholder-content">
				<div class="placeholder-shimmer">
					<div class="shimmer-line"></div>
					<div class="shimmer-line short"></div>
					<div class="shimmer-line"></div>
					<div class="shimmer-line medium"></div>
				</div>
			</div>
			<span class="sr-only">Loading content...</span>
		</div>
	{/if}
</section>

<style>
	.lazy-section {
		position: relative;
		transition: opacity 0.3s ease-in-out;
	}

	.lazy-section.loading {
		opacity: 0.7;
	}

	.lazy-section.loaded {
		opacity: 1;
	}

	.lazy-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: inherit;
		background-color: rgb(var(--color-surface));
		border-radius: var(--radius-lg);
		padding: var(--spacing-6);
	}

	.placeholder-content {
		width: 100%;
		max-width: 400px;
	}

	.placeholder-shimmer {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.shimmer-line {
		height: 1rem;
		background: linear-gradient(
			90deg,
			rgb(var(--color-surface)) 0%,
			rgb(var(--color-border)) 50%,
			rgb(var(--color-surface)) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s ease-in-out infinite;
		border-radius: var(--radius-sm);
	}

	.shimmer-line.short {
		width: 60%;
	}

	.shimmer-line.medium {
		width: 80%;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	/* Respect reduced motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.lazy-section {
			transition: none;
		}

		.shimmer-line {
			animation: none;
			background: rgb(var(--color-border));
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.lazy-placeholder {
			border: 2px solid rgb(var(--color-border));
		}

		.shimmer-line {
			background: rgb(var(--color-text-muted));
		}
	}

	/* Dark theme adjustments */
	:global(.dark) .shimmer-line {
		background: linear-gradient(
			90deg,
			rgb(var(--color-surface)) 0%,
			rgb(var(--color-border)) 50%,
			rgb(var(--color-surface)) 100%
		);
	}
</style>