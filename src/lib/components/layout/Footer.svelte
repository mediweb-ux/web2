<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';

	// Import logo images
	import logoLight from '$lib/assets/MediWeb_logo_crop.png';
	import logoDark from '$lib/assets/MediWeb_logo_crop_dark.png';

	// Reactive logo source based on theme
	$: currentLogo = $theme === 'dark' ? logoDark : logoLight;

	// Type definitions
	type FooterLink = {
		href: string;
		label: string;
		external?: boolean;
	};

	type FooterSection = {
		title: string;
		links: FooterLink[];
	};

	// Footer navigation items
	const footerSections: FooterSection[] = [
		{
			title: 'Tjenester',
			links: [
				{ href: '/tjenester/webutvikling', label: 'Webutvikling' },
				{ href: '/tjenester/legetjenester', label: 'Legetjenester' },
				{ href: '/tjenester/kursvirksomhet', label: 'Kursvirksomhet' }
			]
		},
		{
			title: 'Firma',
			links: [
				{ href: '/om-oss', label: 'Om oss' },
				{ href: '/kontakt', label: 'Kontakt' },
				{ href: '/personvern', label: 'Personvern' },
				{ href: '/brukervilkar', label: 'Brukervilkår' }
			]
		},
		{
			title: 'Kontakt',
			links: [
				{ href: 'mailto:post@mediweb.no', label: 'Send e-post', external: true },
			]
		}
	];

	const currentYear = new Date().getFullYear();

	onMount(() => {
		// Preload both logo images to avoid loading delays when switching themes
		const lightImg = new Image();
		const darkImg = new Image();
		lightImg.src = logoLight;
		darkImg.src = logoDark;

		// Add structured data for organization
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'MediWeb Solutions',
			url: 'https://mediweb.no',
			logo: 'https://mediweb.no/logo.png',
			description:
				'Professionell partner som leverer tjenester innen webutvikling, legetjenester og kurs',
			address: {
				'@type': 'PostalAddress',
				addressCountry: 'NO'
			},
			foundingDate: '2025',
			numberOfEmployees: '1-10',
			knowsAbout: ['Webutvikling', 'Legetjenester', 'Kursvirksomhet', 'Digitale løsninger']
		};

		// Add structured data to head
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(structuredData);
		document.head.appendChild(script);

		return () => {
			// Cleanup structured data on component destroy
			const existingScript = document.querySelector('script[type="application/ld+json"]');
			if (existingScript) {
				existingScript.remove();
			}
		};
	});
</script>

<footer class="bg-muted border-t border-border flex" aria-labelledby="footer-heading">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<h2 id="footer-heading" class="sr-only">Footer</h2>

		<!-- Main footer content -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<!-- Company info -->
			<div class="lg:col-span-1">
				<div class="flex items-center space-x-3 mb-4">
					<!-- Dynamic logo that changes with theme -->
					{#key $theme}
						<img
							src={currentLogo}
							alt="MediWeb Solutions logo"
							class="h-8 w-auto transition-opacity duration-300"
							loading="lazy"
						/>
					{/key}
					<span class="text-xl font-bold text-foreground">MediWeb Solutions</span>
				</div>
				<p class="text-muted-foreground text-sm mb-4">
					Profesjonell partner innen webutvikling, legetjenester og kurs.
				</p>
				<address class="text-muted-foreground text-sm not-italic">
					<div class="mb-2">
						<span class="sr-only">E-post:</span>
						<a
							href="mailto:hello@agency.com"
							class="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
						>
							post@mediweb.no
						</a>
					</div>
				</address>
			</div>

			<!-- Footer navigation sections -->
			{#each footerSections as section}
				<div>
					<h3 class="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
						{section.title}
					</h3>
					<ul class="space-y-3">
						{#each section.links as link}
							<li>
								<a
									href={link.href}
									class="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
									{...link.external
										? {
												target: '_blank',
												rel: 'noopener noreferrer',
												'aria-label': `${link.label} (åpner i ny flik)`
											}
										: {}}
								>
									{link.label}
									{#if link.external}
										<span class="sr-only">(åpnes i ny flik)</span>
										<svg
											class="inline-block w-3 h-3 ml-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Bottom section -->
		<div class="mt-12 pt-8 border-t border-border">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="text-muted-foreground text-sm">
					<p>&copy; {currentYear} MediWeb Solutions.</p>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	/* Screen reader only class */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
