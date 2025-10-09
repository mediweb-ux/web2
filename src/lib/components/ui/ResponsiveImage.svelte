<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	export let alt: string;
	export let width: number | undefined = undefined;
	export let height: number | undefined = undefined;
	export let sizes: string = '100vw';
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let priority: boolean = false;
	export let className: string = '';
	export let objectFit: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none' = 'cover';
	export let aspectRatio: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export const quality: number = 80;
	export let formats: string[] = ['avif', 'webp']; // Modern formats to try first

	// Check browser support for modern image formats
	function checkFormatSupport(): { avif: boolean; webp: boolean } {
		if (typeof window === 'undefined') {
			return { avif: false, webp: false };
		}

		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		
		return {
			avif: canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0,
			webp: canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
		};
	}

	// Generate responsive srcset based on common breakpoints
	function generateSrcSet(baseSrc: string, format?: string): string {
		const breakpoints = [320, 480, 640, 768, 1024, 1280, 1536];
		const extension = format || baseSrc.split('.').pop()?.toLowerCase();
		const basePath = baseSrc.replace(/\.[^/.]+$/, '');
		
		// For now, we'll use the same image but in a real implementation
		// you'd have different sized versions
		return breakpoints
			.map(width => `${basePath}-${width}w.${extension} ${width}w`)
			.join(', ');
	}

	// Generate sources for different formats
	function generateSources(baseSrc: string): Array<{ srcset: string; type: string }> {
		const sources: Array<{ srcset: string; type: string }> = [];
		const formatSupport = checkFormatSupport();

		// Add AVIF if supported and requested
		if (formats.includes('avif') && formatSupport.avif) {
			sources.push({
				srcset: generateSrcSet(baseSrc, 'avif'),
				type: 'image/avif'
			});
		}

		// Add WebP if supported and requested
		if (formats.includes('webp') && formatSupport.webp) {
			sources.push({
				srcset: generateSrcSet(baseSrc, 'webp'),
				type: 'image/webp'
			});
		}

		return sources;
	}

	// Intersection Observer for lazy loading
	let imageElement: HTMLImageElement | HTMLDivElement;
	let isLoaded = false;
	let isInView = false;
	let hasError = false;

	onMount(() => {
		if (loading === 'lazy' && !priority && imageElement) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							isInView = true;
							observer.unobserve(entry.target);
						}
					});
				},
				{
					rootMargin: '50px'
				}
			);

			observer.observe(imageElement);

			return () => {
				observer.disconnect();
			};
		} else {
			isInView = true;
			return () => {};
		}
	});

	function handleLoad() {
		isLoaded = true;
	}

	function handleError() {
		hasError = true;
	}

	function retryLoad() {
		if (imageElement && 'src' in imageElement) {
			hasError = false;
			isLoaded = false;
			const timestamp = new Date().getTime();
			imageElement.src = `${src}?retry=${timestamp}`;
		}
	}

	// Determine if we should load the image
	$: shouldLoad = loading === 'eager' || priority || isInView;

	// Generate srcset for responsive images
	$: srcSet = generateSrcSet(src);

	// Combine classes
	$: combinedClasses = [
		'responsive-image',
		className,
		isLoaded ? 'loaded' : 'loading',
		hasError ? 'error' : ''
	].filter(Boolean).join(' ');

	// Style object for aspect ratio and object fit
	$: imageStyle = [
		aspectRatio ? `aspect-ratio: ${aspectRatio}` : '',
		`object-fit: ${objectFit}`,
		'transition: opacity 0.3s ease-in-out'
	].filter(Boolean).join('; ');
</script>

<div 
	class="responsive-image-container {className}"
	style={aspectRatio ? `aspect-ratio: ${aspectRatio}` : ''}
>
	{#if shouldLoad}
		<picture>
			{#each generateSources(src) as source}
				<source srcset={source.srcset} type={source.type} {sizes} />
			{/each}
			<img
				bind:this={imageElement}
				src={src}
				srcset={srcSet}
				{alt}
				{width}
				{height}
				{sizes}
				loading={priority ? 'eager' : 'lazy'}
				decoding="async"
				class={combinedClasses}
				style={imageStyle}
				on:load={handleLoad}
				on:error={handleError}
			/>
		</picture>
	{:else}
		<!-- Placeholder while not in view -->
		<div 
			bind:this={imageElement}
			class="responsive-image-placeholder {className}"
			style={aspectRatio ? `aspect-ratio: ${aspectRatio}` : ''}
			role="img"
			aria-label={alt}
		>
			{#if placeholder}
				<img
					src={placeholder}
					{alt}
					class="placeholder-image"
					style="object-fit: {objectFit}; opacity: 0.3;"
				/>
			{:else}
				<div class="placeholder-content">
					<svg
						class="placeholder-icon"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
			{/if}
		</div>
	{/if}

	{#if hasError}
		<div class="error-placeholder" role="img" aria-label="Failed to load image: {alt}">
			<svg
				class="error-icon"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			<p class="error-text">Failed to load image</p>
			<button 
				class="retry-button"
				on:click={retryLoad}
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
			<span class="sr-only">Image failed to load</span>
		</div>
	{/if}
</div>

<style>
	.responsive-image-container {
		position: relative;
		display: block;
		overflow: hidden;
		background-color: rgb(var(--color-surface));
	}

	.responsive-image {
		width: 100%;
		height: 100%;
		display: block;
		opacity: 0;
	}

	.responsive-image.loaded {
		opacity: 1;
	}

	.responsive-image.error {
		display: none;
	}

	.responsive-image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(var(--color-surface));
		color: rgb(var(--color-text-muted));
	}

	.placeholder-content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.placeholder-icon {
		width: 2rem;
		height: 2rem;
		opacity: 0.5;
	}

	.placeholder-image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.error-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgb(var(--color-surface));
		color: rgb(var(--color-text-muted));
		border: 1px dashed rgb(var(--color-border));
	}

	.error-icon {
		width: 2rem;
		height: 2rem;
		margin-bottom: 0.5rem;
		opacity: 0.5;
	}

	.error-text {
		font-size: var(--font-size-sm);
		margin: 0 0 var(--spacing-2) 0;
		color: rgb(var(--color-text-muted));
	}

	.retry-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-1);
		padding: var(--spacing-2) var(--spacing-3);
		background: rgb(var(--color-primary));
		color: rgb(var(--color-primary-text));
		border: none;
		border-radius: var(--border-radius-sm);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.retry-button:hover {
		background: rgb(var(--color-primary-hover));
	}

	.retry-button:focus {
		outline: 2px solid rgb(var(--color-focus));
		outline-offset: 2px;
	}

	/* Responsive image sizing */
	@media (max-width: 640px) {
		.responsive-image-container {
			border-radius: var(--radius-md);
		}
	}

	@media (min-width: 641px) {
		.responsive-image-container {
			border-radius: var(--radius-lg);
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.responsive-image-placeholder,
		.error-placeholder {
			border: 2px solid rgb(var(--color-border));
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.responsive-image {
			transition: none;
		}
	}
</style>