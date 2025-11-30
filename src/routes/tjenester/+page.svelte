<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import servicesBg from '$lib/assets/hero-backgrounds/services.svg?url';

	export let data: PageData;
	const { services } = data;
</script>

<SEO
	title="Våre tjenester - Webutvikling, legetjenester og kursvirksomhet"
	description="Utforsk vårt utvalg av profesjonelle tjenester inkludert moderne webutvikling, legetjenester og kursvirksomhet."
	keywords={['services', 'web development', 'medical services', 'courses', 'professional agency']}
/>

<!-- Breadcrumb Navigation -->
<Section padding="none" className="py-6 border-b border-border" ariaLabel="Navigasjon">
	<Breadcrumb
		items={[
			{ label: 'Hjem', href: '/' },
			{ label: 'Tjenester', href: '/tjenester', current: true }
		]}
	/>
</Section>

<!-- Hero Section -->
<HeroSection
	title="Våre tjenester"
	subtitle="Vi tilbyr innovative og profesjonelle løsninger innen tre ulike områder — webutvikling, legetjenester og kursvirksomhet."
	backgroundImage={servicesBg}
	overlayOpacity={0.5}
	minHeight="min-h-[450px]"
/>

<!-- Tjenester Grid -->
<Section className="py-16 bg-muted/30" ariaLabel="Tjenester">
	<div class="max-w-6xl mx-auto">
		<div class="grid lg:grid-cols-3 gap-8">
			{#each services as service}
				<Card class="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
					<div class="text-center">
						<div class="flex justify-center mb-6 text-primary">
							<Icon name={service.icon} size="xl" />
						</div>

						<h2 class="text-responsive-2xl font-bold text-foreground mb-4">
							{service.title}
						</h2>

						<p class="text-muted-foreground mb-6 leading-relaxed">
							{service.description}
						</p>

						<!-- Key Features -->
						<div class="mb-8">
							<h3 class="text-heading-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
								N&oslash;kkelinformasjon
							</h3>
							<ul class="space-y-2">
								{#each service.features.slice(0, 4) as feature}
									<li class="flex items-center text-body-sm text-muted-foreground">
										<span class="text-primary mr-2 flex-shrink-0">
											<Icon name="check" size="sm" />
										</span>
										{feature.title}
									</li>
								{/each}
							</ul>
						</div>

						<Button href="/tjenester/{service.slug}" variant="primary" size="lg" class="w-full">
							Les mer om {service.title}
							<span class="ml-2">
								<Icon name="arrow-right" size="sm" />
							</span>
						</Button>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</Section>

<!-- CTA Section -->
<Section className="py-16">
	<div class="text-center max-w-4xl mx-auto">
		<h2 class="text-responsive-3xl font-bold text-foreground mb-6">Klar til &aring; starte?</h2>
		<p class="text-responsive-lg text-muted-foreground mb-8">
			La oss ta en prat og se hvordan vi kan hjelpe deg med en av v&aring;re tjenester. Kontakt oss
			i dag, s&aring; snakkes vi!
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button href="/kontakt" variant="primary" size="lg">
				Start ditt prosjekt
				<span class="ml-2">
					<Icon name="arrow-right" size="sm" />
				</span>
			</Button>
			<Button href="/" variant="outline" size="lg">
				Tidligere arbeid
				<span class="ml-2">
					<Icon name="external-link" size="sm" />
				</span>
			</Button>
		</div>
	</div>
</Section>