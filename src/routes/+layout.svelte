<script lang="ts">
	import { onMount } from 'svelte';

	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	import { theme } from '$lib/stores';
	import { Analytics } from '$lib/utils/analytics';
	import '../app.css';

	export let data;

	// Initialize theme and analytics on mount
	onMount(() => {
		const cleanup = theme.init();

		// Initialize Google Analytics
		if (data?.measurementId) {
			Analytics.init(data.measurementId);
		}

		return cleanup;
	});
</script>

<svelte:head>
	<!-- Favicon -->
	<link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<!-- Google Analytics -->
{#if data?.measurementId}
	<GoogleAnalytics measurementId={data.measurementId} />
{/if}

<div class="min-h-screen bg-background text-foreground">
	<Header />
	<main id="main-content">
		<slot />
	</main>
	<Footer />
</div>

<!-- Cookie Consent -->
<CookieConsent />
