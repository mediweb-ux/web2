<script lang="ts">
	export let columns: 1 | 2 | 3 | 4 | 'auto' = 'auto';
	export let gap: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let className: string = '';
	export let as: 'div' | 'section' | 'ul' | 'ol' = 'div';

	// Map columns to CSS classes
	const columnClasses = {
		1: 'grid-cols-1',
		2: 'grid-responsive-2',
		3: 'grid-responsive',
		4: 'grid-responsive-4',
		auto: 'grid-auto-fit'
	};

	// Map gap sizes to Tailwind classes
	const gapClasses = {
		sm: 'gap-4',
		md: 'gap-6',
		lg: 'gap-8',
		xl: 'gap-12'
	};

	$: gridClass = [
		'grid',
		columnClasses[columns],
		gapClasses[gap],
		className
	].filter(Boolean).join(' ');
</script>

<svelte:element this={as} class={gridClass}>
	<slot />
</svelte:element>

<style>
	/* Ensure grid items have proper alignment */
	:global(.grid > *) {
		align-self: start;
	}

	/* Handle list semantics when using ul/ol */
	:global(ul.grid),
	:global(ol.grid) {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>