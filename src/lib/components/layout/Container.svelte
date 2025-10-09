<script lang="ts">
	export let size: 'narrow' | 'default' | 'wide' | 'full' = 'default';
	export let padding: boolean = true;
	export let className: string = '';
	export let as: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' = 'div';

	// Map size to CSS classes
	const sizeClasses = {
		narrow: 'container-narrow',
		default: 'container-responsive',
		wide: 'container-wide',
		full: 'w-full'
	};

	$: containerClass = [
		sizeClasses[size],
		padding && size !== 'full' ? '' : 'px-0',
		className
	].filter(Boolean).join(' ');
</script>

<svelte:element this={as} class={containerClass}>
	<slot />
</svelte:element>

<style>
	/* Additional responsive container styles if needed */
	:global(.container-responsive),
	:global(.container-narrow),
	:global(.container-wide) {
		position: relative;
	}

	/* Ensure full-width containers don't have default padding */
	:global(.w-full) {
		width: 100%;
	}
</style>