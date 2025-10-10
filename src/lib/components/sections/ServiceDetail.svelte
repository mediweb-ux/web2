<script lang="ts">
	import type { Service } from '$lib/types/service';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import PortfolioShowcase from './PortfolioShowcase.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import HeroSection from './HeroSection.svelte';

	// Import service-specific backgrounds
	import webutviklingBg from '$lib/assets/hero-backgrounds/bg-webutvikling.png?url';
	import legetjenesterBg from '$lib/assets/hero-backgrounds/bg-legetjenester.png?url';
	import kursvirksomhetBg from '$lib/assets/hero-backgrounds/bg-kursvirksomhet.png?url';
	import servicesBg from '$lib/assets/hero-backgrounds/services.svg?url';

	export let service: Service;

	// Map service slugs to background images
	const backgroundImages: Record<string, string> = {
		webutvikling: webutviklingBg,
		legetjenester: legetjenesterBg,
		kursvirksomhet: kursvirksomhetBg
	};

	// Get background image for current service, fallback to generic services background
	$: backgroundImage = backgroundImages[service.slug] || servicesBg;
</script>

<!-- Hero Section -->
<HeroSection
	title={service.title}
	subtitle={service.longDescription}
	{backgroundImage}
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

<!-- Detailed Content Introduction -->
{#if service.detailedContent?.introduction}
	<Section class="py-8 bg-muted/30">
		<div class="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
			{#each service.detailedContent.introduction as paragraph}
				<p class="text-body-lg text-muted-foreground leading-relaxed mb-6">{@html paragraph}</p>
			{/each}
		</div>
	</Section>
{/if}

<!-- Process Steps -->
{#if service.detailedContent?.processSteps}
	{#each service.detailedContent.processSteps as step}
		<Section class="py-8 {step.backgroundColor || 'bg-muted/50'}" id="steg{step.stepNumber}">
			<div class="max-w-6xl mx-auto">
				<div class="text-center mb-8">
					<h2 class="text-heading-sm font-semibold tracking-wide text-primary uppercase mb-2">
						{step.title}
					</h2>
					<h3 class="text-responsive-3xl font-bold text-foreground">
						{step.subtitle}
					</h3>
				</div>
				
				<div class="max-w-4xl mx-auto">
					{#each step.content as paragraph}
						<p class="text-body-lg text-muted-foreground leading-relaxed mb-6">{@html paragraph}</p>
					{/each}
					
					{#if step.image}
						<div class="flex justify-center my-12">
							<img
								src={step.image}
								alt="Illustrasjon for {step.subtitle}"
								class="rounded-md shadow-md max-w-full h-auto"
								style="max-width: 550px; max-height: 350px;"
								loading="lazy"
							/>
						</div>
					{/if}
				</div>
			</div>
		</Section>
	{/each}
{/if}

<!-- Features Section -->
<Section class="py-8 bg-muted/50">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-responsive-3xl font-bold text-center text-foreground mb-12">Hva vi tilbyr</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each service.features as feature}
				<div class="text-center">
					{#if feature.icon}
						<div class="flex justify-center mb-4">
							<Icon name={feature.icon} size="lg" class="text-primary" />
						</div>
					{/if}
					<h3 class="text-heading-lg font-semibold text-foreground mb-3">
						{feature.title}
					</h3>
					<p class="text-body text-muted-foreground">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Portfolio Section -->
{#if service.portfolio.length > 0}
	<Section class="py-8" ariaLabel="Portfolio">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-responsive-3xl font-bold text-center text-foreground mb-12">Tidligere arbeid</h2>
			<PortfolioShowcase items={service.portfolio} />
		</div>
	</Section>
{/if}

<!-- CTA Section -->
<Section class="py-16 bg-primary text-primary-foreground">
	<div class="text-center max-w-4xl mx-auto">
		<h2 class="text-responsive-3xl font-bold mb-6">Klar til &aring; starte?</h2>
		<p class="text-responsive-lg mb-8 opacity-90">
			La oss ta en prat, slik at vi kan hjelpe deg &aring; dekke dine behov med v&aring;r ekspertise
			innen {service.title.toLowerCase()}.
		</p>
		<Button
			href="/kontakt"
			variant="secondary"
			size="lg"
			class="!bg-white !text-gray-900 !border-2 !border-gray-900 hover:!bg-gray-50 hover:!text-gray-900 font-semibold shadow-lg"
		>
			{service.ctaText}
		</Button>
	</div>
</Section>
