<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte';

	export let title: string;
	export let subtitle: string = '';
	export let backgroundImage: string = '';
	export let overlayOpacity: number = 0.6; // 0-1 for background overlay darkness
	export let textAlign: 'left' | 'center' | 'right' = 'center';
	export let minHeight: string = 'min-h-[400px]';
	export let className: string = '';

	// Create the background style
	$: backgroundStyle = backgroundImage
		? `background-image: url('${backgroundImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;`
		: '';



	$: containerClasses = ['relative', minHeight, 'flex items-center justify-center', className]
		.filter(Boolean)
		.join(' ');

	$: textClasses =
		textAlign === 'center'
			? 'text-center max-w-4xl mx-auto'
			: textAlign === 'right'
				? 'text-right max-w-4xl ml-auto'
				: 'text-left max-w-4xl mr-auto';
</script>

<Section padding="none" className={containerClasses} containerSize="full">
	<!-- Background image div -->
	<div class="absolute inset-0" style={backgroundStyle}></div>

	<!-- Background overlay for better text readability -->
	{#if backgroundImage}
		<div
			class="absolute inset-0 bg-black transition-opacity duration-300"
			style="opacity: {overlayOpacity}"
		></div>
	{/if}

	<!-- Content -->
	<div class="relative z-10 px-4 md:px-6 lg:px-8 w-full max-w-7xl mx-auto">
		<div class={textClasses}>
			<h1 class="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
				{title}
			</h1>
			{#if subtitle}
				<p class="text-xl text-white/90 leading-relaxed drop-shadow-md">
					{subtitle}
				</p>
			{/if}

			<!-- Slot for additional content like buttons -->
			<slot />
		</div>
	</div>
</Section>

<style>
	/* Ensure text is readable on all backgrounds */
	h1,
	p {
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}
</style>
