<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	export let title: string;
	export let subtitle: string;
	export let ctaText: string;
	export let ctaLink: string;
	export let secondaryCtaText: string = '';
	export let secondaryCtaLink: string = '';
</script>

<Section class="py-20 md:py-32">
	<div class="text-center max-w-4xl mx-auto">
		<h1 class="text-responsive-5xl font-bold text-foreground mb-6 leading-tight">
			{title}
		</h1>
		
		<p class="text-responsive-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
			{subtitle}
		</p>
		
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<Button href={ctaLink} variant="primary" size="lg">
				{ctaText}
			</Button>
			
			{#if secondaryCtaText && secondaryCtaLink}
				<Button href={secondaryCtaLink} variant="outline" size="lg">
					{secondaryCtaText}
				</Button>
			{/if}
		</div>
	</div>
</Section>