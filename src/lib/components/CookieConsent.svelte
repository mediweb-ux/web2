<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Button from './ui/Button.svelte';
	import { Analytics } from '$lib/utils/analytics';

	let showConsent = false;

	const CONSENT_KEY = 'mediweb-cookie-consent';
	const CONSENT_VERSION = '1.0';

	onMount(() => {
		if (browser) {
			const consent = localStorage.getItem(CONSENT_KEY);
			const consentData = consent ? JSON.parse(consent) : null;

			// Show consent if not given or version changed
			if (!consentData || consentData.version !== CONSENT_VERSION) {
				showConsent = true;
			}
		}
	});

	function acceptCookies() {
		if (browser) {
			const consentData = {
				analytics: true,
				version: CONSENT_VERSION,
				timestamp: new Date().toISOString()
			};
			localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
			showConsent = false;

			// Track consent acceptance
			Analytics.trackEvent('cookie_consent_accepted');
		}
	}

	function declineCookies() {
		if (browser) {
			const consentData = {
				analytics: false,
				version: CONSENT_VERSION,
				timestamp: new Date().toISOString()
			};
			localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
			showConsent = false;
		}
	}

	function openPrivacyPolicy() {
		// Track privacy policy click
		Analytics.trackEvent('privacy_policy_clicked', { source: 'cookie_consent' });
		// You can implement a privacy policy modal or redirect to a privacy page
		window.open('/personvern', '_blank');
	}
</script>

{#if showConsent}
	<div
		class="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 p-4 md:p-6"
		role="dialog"
		aria-labelledby="cookie-consent-title"
		aria-describedby="cookie-consent-description"
	>
		<div class="max-w-6xl mx-auto">
			<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div class="flex-1">
					<h3 id="cookie-consent-title" class="text-lg font-semibold text-foreground mb-2">
						Informasjonskapsler (Cookies)
					</h3>
					<p id="cookie-consent-description" class="text-sm text-muted-foreground leading-relaxed">
						Vi bruker informasjonskapsler for å forbedre din opplevelse på nettstedet vårt og for å
						analysere trafikk. Ved å klikke "Godta" samtykker du til vår bruk av Google Analytics
						for å samle anonymiserte data om hvordan du bruker nettstedet.
						<button
							on:click={openPrivacyPolicy}
							class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded ml-1"
						>
							Les mer om personvern
						</button>
					</p>
				</div>

				<div class="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
					<Button
						variant="outline"
						size="sm"
						onclick={declineCookies}
						trackingName="cookie_consent_decline"
					>
						Avslå
					</Button>
					<Button
						variant="primary"
						size="sm"
						onclick={acceptCookies}
						trackingName="cookie_consent_accept"
					>
						Godta
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Overlay to prevent interaction when consent is shown -->
{#if showConsent}
	<div class="fixed inset-0 bg-black/20 z-40" aria-hidden="true"></div>
{/if}
