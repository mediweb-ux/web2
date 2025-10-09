<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import SEO from '$lib/components/SEO.svelte';

	// Get service parameter from URL if present
	let selectedService = '';

	onMount(() => {
		const serviceParam = $page.url.searchParams.get('service');
		if (serviceParam) {
			selectedService = serviceParam;
		}
	});

	// Contact information with structured data
	const contactInfo = {
		email: 'post@mediweb.no',
		address: {
			street: 'Lektor Musums gate 17',
			city: 'Verdal',
			zip: '7650',
			country: 'Norge'
		},
		hours: {
			weekdays: '9:00 AM - 6:00 PM',
			weekend: 'Closed'
		}
	};
</script>

<SEO
	title="Kontakt oss"
	description="Er du klar for å starte ditt prosjekt? Kontakt vårt team for web-utvikling, legetjenester eller kurs."
	keywords={['kontakt', 'konsultasjon', 'prosjektforespørsel', 'digitalt byrå']}
/>

<!-- Hero Section -->
<Section
	className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
	ariaLabel="Innledning"
>
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Kontakt</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
			Klar til &aring; starte ditt prosjekt? Vi vil gjerne h&oslash;re fra deg, ta kontakt s&aring;
			kan vi snakkes!
		</p>
	</div>
</Section>

<!-- Contact Content -->
<Section>
	<div class="max-w-6xl mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Contact Form -->
			<div>
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send en melding</h2>
				<ContactForm {selectedService} />
			</div>

			<!-- Contact Information -->
			<div>
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Kontaktinformasjon</h2>

				<div class="space-y-6">
					<!-- Email -->
					<div class="flex items-start space-x-4">
						<div class="flex-shrink-0">
							<svg
								class="w-6 h-6 text-blue-600 dark:text-blue-400"
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
							<h3 class="text-lg font-medium text-gray-900 dark:text-white">E-post</h3>
							<a
								href="mailto:{contactInfo.email}"
								class="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
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
								class="w-6 h-6 text-blue-600 dark:text-blue-400"
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
							<h3 class="text-lg font-medium text-gray-900 dark:text-white">Adressw</h3>
							<address class="text-gray-600 dark:text-gray-300 not-italic">
								{contactInfo.address.street}<br />
								{contactInfo.address.zip}
								{contactInfo.address.city}
							</address>
						</div>
					</div>
				</div>

				<!-- Additional Information -->
				<div class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
						Hva du kan forvente
					</h3>
					<ul class="space-y-2 text-gray-600 dark:text-gray-300">
						<li class="flex items-start space-x-2">
							<svg
								class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
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
								class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
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
								class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
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
							<span>Ingen </span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</Section>