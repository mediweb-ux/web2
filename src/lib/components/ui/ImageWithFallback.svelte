<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	export let alt: string;
	export let fallbackSrc: string = '';
	export let fallbackText: string = '';
	export let width: number | string = 'auto';
	export let height: number | string = 'auto';
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let className: string = '';
	export let showFallbackIcon: boolean = true;

	let imageElement: HTMLImageElement;
	let hasError = false;
	let isLoading = true;
	let retryCount = 0;
	const maxRetries = 2;

	function handleLoad() {
		isLoading = false;
		hasError = false;
	}

	function handleError() {
		isLoading = false;
		
		if (retryCount < maxRetries && src) {
			// Try to reload the image
			retryCount++;
			const timestamp = new Date().getTime();
			imageElement.src = `${src}?retry=${timestamp}`;
			return;
		}

		hasError = true;

		// Try fallback image if provided
		if (fallbackSrc && imageElement.src !== fallbackSrc) {
			imageElement.src = fallbackSrc;
			hasError = false;
			return;
		}
	}

	function retry() {
		if (src) {
			hasError = false;
			isLoading = true;
			retryCount = 0;
			const timestamp = new Date().getTime();
			imageElement.src = `${src}?retry=${timestamp}`;
		}
	}

	onMount(() => {
		if (imageElement && imageElement.complete) {
			handleLoad();
		}
	});
</script>

<div class="image-container {className}" style="width: {width}; height: {height};">
	{#if !hasError}
		<img
			bind:this={imageElement}
			{src}
			{alt}
			{loading}
			class="image"
			class:loading={isLoading}
			on:load={handleLoad}
			on:error={handleError}
		/>
	{/if}

	{#if isLoading}
		<div class="loading-placeholder" role="img" aria-label="Loading image">
			<div class="loading-spinner" aria-hidden="true">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M21 12a9 9 0 1 1-6.219-8.56"/>
				</svg>
			</div>
			<span class="sr-only">Loading image...</span>
		</div>
	{/if}

	{#if hasError}
		<div class="error-fallback" role="img" aria-label={alt || 'Image failed to load'}>
			{#if showFallbackIcon}
				<div class="fallback-icon" aria-hidden="true">
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
						<circle cx="9" cy="9" r="2"/>
						<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
					</svg>
				</div>
			{/if}
			
			{#if fallbackText}
				<p class="fallback-text">{fallbackText}</p>
			{:else if alt}
				<p class="fallback-text">{alt}</p>
			{/if}

			<button 
				class="retry-button"
				on:click={retry}
				aria-label="Retry loading image"
				type="button"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
					<path d="M21 3v5h-5"/>
					<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
					<path d="M3 21v-5h5"/>
				</svg>
				Retry
			</button>
		</div>
	{/if}
</div>

<style>
	.image-container {
		position: relative;
		display: inline-block;
		background: var(--color-background-secondary);
		border-radius: var(--border-radius-md);
		overflow: hidden;
	}

	.image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: opacity 0.3s ease;
	}

	.image.loading {
		opacity: 0;
	}

	.loading-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-background-secondary);
		color: var(--color-text-secondary);
	}

	.loading-spinner {
		animation: spin 1s linear infinite;
	}

	.error-fallback {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		padding: var(--spacing-4);
		background: var(--color-background-secondary);
		color: var(--color-text-secondary);
		text-align: center;
		min-height: 120px;
	}

	.fallback-icon {
		opacity: 0.5;
	}

	.fallback-text {
		font-size: var(--font-size-sm);
		margin: 0;
		line-height: 1.4;
	}

	.retry-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
		padding: var(--spacing-2) var(--spacing-3);
		background: var(--color-primary);
		color: var(--color-primary-text);
		border: none;
		border-radius: var(--border-radius-sm);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.retry-button:hover {
		background: var(--color-primary-hover);
	}

	.retry-button:focus {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.error-fallback {
			border: 1px solid var(--color-border);
		}
		
		.fallback-icon {
			opacity: 1;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.image {
			transition: none;
		}
		
		.loading-spinner {
			animation: none;
		}
		
		.retry-button {
			transition: none;
		}
	}
</style>