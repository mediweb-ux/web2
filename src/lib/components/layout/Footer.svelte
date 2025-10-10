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
				{ href: 'https://linkedin.com/company/agency', label: 'LinkedIn', external: true },
				{ href: 'https://twitter.com/agency', label: 'Twitter', external: true }
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
				'Professional agency offering web development, medical services, and educational courses',
			address: {
				'@type': 'PostalAddress',
				addressCountry: 'NO'
			},
			contactPoint: {
				'@type': 'ContactPoint',
				telephone: '+1234567890',
				contactType: 'customer service',
				email: 'hello@agency.com'
			},
			sameAs: ['https://linkedin.com/company/agency', 'https://twitter.com/agency'],
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
					Professional agency offering innovative solutions in web development, medical services,
					and educational courses.
				</p>
				<address class="text-muted-foreground text-sm not-italic">
					<div class="mb-2">
						<span class="sr-only">E-post:</span>
						<a
							href="mailto:hello@agency.com"
							class="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
						>
							hello@agency.com
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
												'aria-label': `${link.label} (opens in new tab)`
											}
										: {}}
								>
									{link.label}
									{#if link.external}
										<span class="sr-only">(opens in new tab)</span>
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

				<!-- Social media links -->
				<div class="flex space-x-6 mt-4 md:mt-0">
					<a
						href="https://linkedin.com/company/agency"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
						aria-label="Follow us on LinkedIn (opens in new tab)"
					>
						<span class="sr-only">LinkedIn</span>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
					<a
						href="https://twitter.com/agency"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
						aria-label="Follow us on Twitter (opens in new tab)"
					>
						<span class="sr-only">Twitter</span>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path
								d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
							/>
						</svg>
					</a>
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
