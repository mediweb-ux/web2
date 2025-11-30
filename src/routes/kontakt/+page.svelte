<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { siteConfig } from '$lib/data/site-config';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import kontaktBg from '$lib/assets/hero-backgrounds/bg-kontakt.png?url';

	// Get service parameter from URL if present
	let selectedService = '';

	onMount(() => {
		const serviceParam = $page.url.searchParams.get('service');
		if (serviceParam) {
			selectedService = serviceParam;
		}
	});

	// Use contact information from site config
	const contactInfo = siteConfig.contact;
</script>

<SEO
	title="Kontakt oss"
	description="Er du klar for å starte ditt prosjekt? Kontakt vårt team for web-utvikling, legetjenester eller kurs."
	keywords={['kontakt', 'konsultasjon', 'prosjektforespørsel', 'digitalt byrå']}
/>

<!-- Hero Section with Background -->
<HeroSection
	title="Kontakt oss"
	subtitle="Klar til å starte ditt prosjekt? Vi vil gjerne høre fra deg, ta kontakt så kan vi snakkes!"
	backgroundImage={kontaktBg}
	overlayOpacity={0.4}
	minHeight="min-h-[500px]"
/>

<!-- Contact Content -->
<Section className="py-16 bg-muted/30" ariaLabel="Kontakt innhold">
	<div class="max-w-6xl mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Contact Form -->
			<div>
				<h2 class="text-responsive-2xl font-bold text-foreground mb-6">Send en melding</h2>
				<ContactForm {selectedService} />
			</div>

			<!-- Contact Information -->
			<div>
				<h2 class="text-responsive-2xl font-bold text-foreground mb-6">Kontaktinformasjon</h2>

				<div class="space-y-6">
					<!-- Email -->
					<div class="flex items-start space-x-4">
						<div class="shrink-0">
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="text-heading font-medium text-foreground">E-post</h3>
							<a
								href="mailto:{contactInfo.email}"
								class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
								aria-label="Send epost til {contactInfo.email}"
							>
								{contactInfo.email}
							</a>
						</div>
					</div>

					<!-- Address -->
					<div class="flex items-start space-x-4">
						<div class="flex-shrink-0">
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="text-heading font-medium text-foreground">Postadresse</h3>
							<address class="text-muted-foreground not-italic">
								{contactInfo.address.street}<br />
								{contactInfo.address.zip}
								{contactInfo.address.city}
							</address>
						</div>
					</div>
				</div>

				<!-- Additional Information -->
				<div class="mt-8 p-6 bg-card border border-border rounded-lg">
					<h3 class="text-heading font-medium text-foreground mb-3">Hva du kan forvente</h3>
					<ul class="space-y-2 text-muted-foreground">
						<li class="flex items-start space-x-2">
							<svg
								class="w-5 h-5 text-green-500 mt-0.5 shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Vi svarer vanligvis innen 24-48 timer</span>
						</li>
						<li class="flex items-start space-x-2">
							<svg
								class="w-5 h-5 text-green-500 mt-0.5 shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Detaljerte planer for ditt prosjekt</span>
						</li>
						<li class="flex items-start space-x-2">
							<svg
								class="w-5 h-5 text-green-500 mt-0.5 shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Ingen forpliktelser eller skjulte kostnader</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</Section>
