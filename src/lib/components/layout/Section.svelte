<script lang="ts">
	export let padding: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let background: 'default' | 'surface' | 'primary' | 'secondary' = 'default';
	export let className: string = '';
	export let as: 'section' | 'div' | 'article' | 'main' | 'header' | 'footer' = 'section';
	export let containerSize: 'narrow' | 'default' | 'wide' | 'full' = 'default';
	export let id: string | undefined = undefined;
	export let ariaLabel: string = '';

	// Support both class and className for compatibility
	let classNameProp: string = '';
	export { classNameProp as class };

	// Map padding sizes to CSS classes
	const paddingClasses = {
		none: '',
		sm: 'py-8 md:py-12',
		md: 'py-12 md:py-16 lg:py-20',
		lg: 'py-16 md:py-20 lg:py-24',
		xl: 'py-20 md:py-24 lg:py-32'
	};

	// Map background types to CSS classes
	const backgroundClasses = {
		default: 'bg-background',
		surface: 'bg-surface',
		primary: 'bg-primary text-white',
		secondary: 'bg-secondary text-white'
	};

	$: sectionClass = [
		backgroundClasses[background],
		paddingClasses[padding],
		className,
		classNameProp
	]
		.filter(Boolean)
		.join(' ');
</script>

<svelte:element this={as} class={sectionClass} {id} aria-label={ariaLabel}>
	{#if containerSize === 'full'}
		<slot />
	{:else}
		<div class="container-responsive">
			<slot />
		</div>
	{/if}
</svelte:element>

<style>
	/* Ensure sections have proper text color inheritance */
	:global(section.bg-primary),
	:global(section.bg-secondary) {
		color: white;
	}

	:global(section.bg-primary *),
	:global(section.bg-secondary *) {
		color: inherit;
	}

	/* Override text colors for primary/secondary backgrounds */
	:global(section.bg-primary .text-text-primary),
	:global(section.bg-secondary .text-text-primary) {
		color: white !important;
	}

	:global(section.bg-primary .text-text-secondary),
	:global(section.bg-secondary .text-text-secondary) {
		color: rgba(255, 255, 255, 0.8) !important;
	}

	:global(section.bg-primary .text-text-muted),
	:global(section.bg-secondary .text-text-muted) {
		color: rgba(255, 255, 255, 0.6) !important;
	}
</style>