<script lang="ts">
	import type { Service } from '$lib/types/service';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import PortfolioShowcase from './PortfolioShowcase.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	export let service: Service;
</script>

<!-- Hero Section -->
<Section class="py-16 lg:py-24">
	<div class="text-center max-w-4xl mx-auto">
		<div class="flex justify-center mb-6">
			<Icon name={service.icon} size="xl" class="text-primary" />
		</div>
		<h1 class="text-4xl lg:text-5xl font-bold text-foreground mb-6">
			{service.title}
		</h1>
		<p class="text-xl text-muted-foreground mb-8 leading-relaxed">
			{service.longDescription}
		</p>
		<Button href="/kontakt" variant="primary" size="lg">
			Kom i gang
		</Button>
	</div>
</Section>

<!-- Features Section -->
<Section class="py-16 bg-muted/50">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-3xl font-bold text-center text-foreground mb-12">
			Hva vi tilbyr
		</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each service.features as feature}
				<div class="text-center">
					{#if feature.icon}
						<div class="flex justify-center mb-4">
							<Icon name={feature.icon} size="lg" class="text-primary" />
						</div>
					{/if}
					<h3 class="text-xl font-semibold text-foreground mb-3">
						{feature.title}
					</h3>
					<p class="text-muted-foreground">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Portfolio Section -->
{#if service.portfolio.length > 0}
	<Section class="py-16">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl font-bold text-center text-foreground mb-12">
				Tidligere arbeid
			</h2>
			<PortfolioShowcase items={service.portfolio} />
		</div>
	</Section>
{/if}

<!-- CTA Section -->
<Section class="py-16 bg-primary text-primary-foreground">
	<div class="text-center max-w-4xl mx-auto">
		<h2 class="text-3xl font-bold mb-6">
			Klar til &aring; starte?
		</h2>
		<p class="text-xl mb-8 opacity-90">
			La oss ta en prat, slik at vi kan hjelpe deg &aring; dekke dine behov med v&aring;r ekspertise innen {service.title.toLowerCase()}.
		</p>
		<Button href="/contact" variant="secondary" size="lg">
			{service.ctaText}
		</Button>
	</div>
</Section>