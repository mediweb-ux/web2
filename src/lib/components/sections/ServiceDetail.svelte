<script lang="ts">
	import type { Service } from '$lib/types/service';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import PortfolioShowcase from './PortfolioShowcase.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import HeroSection from './HeroSection.svelte';
	
	// Import service-specific backgrounds
	import webutviklingBg from '$lib/assets/hero-backgrounds/bg-webutvikling.png';
	import legetjenesterBg from '$lib/assets/hero-backgrounds/bg-legetjenester.png';
	import kursvirksomhetBg from '$lib/assets/hero-backgrounds/bg-kursvirksomhet.png';
	import servicesBg from '$lib/assets/hero-backgrounds/services.svg';

	export let service: Service;

	// Map service slugs to background images
	const backgroundImages: Record<string, string> = {
		'webutvikling': webutviklingBg,
		'legetjenester': legetjenesterBg,
		'kursvirksomhet': kursvirksomhetBg
	};

	// Get background image for current service, fallback to generic services background
	$: backgroundImage = backgroundImages[service.slug] || servicesBg;
</script>

<!-- Hero Section -->
<HeroSection
	title={service.title}
	subtitle={service.longDescription}
	backgroundImage={backgroundImage}
	overlayOpacity={0.5}
	minHeight="min-h-[500px]"
>
	<div class="mt-8 flex flex-col items-center gap-6">
		<div class="flex justify-center">
			<Icon name={service.icon} size="xl" class="text-white drop-shadow-lg" />
		</div>
		<Button href="/kontakt" variant="secondary" size="lg" trackingName="service_hero_cta">
			Kom i gang
		</Button>
	</div>
</HeroSection>

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