<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let measurementId: string;

	// Initialize Google Analytics
	function initGA() {
		if (!browser || !measurementId || measurementId === 'G-XXXXXXXXXX') {
			return;
		}

		// Load gtag script
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		document.head.appendChild(script);

		// Initialize gtag
		window.dataLayer = window.dataLayer || [];
		function gtag(...args: any[]) {
			window.dataLayer.push(args);
		}
		window.gtag = gtag;

		gtag('js', new Date());
		gtag('config', measurementId, {
			page_title: document.title,
			page_location: window.location.href
		});
	}

	// Track page views
	function trackPageView(url: string) {
		if (!browser || !measurementId || measurementId === 'G-XXXXXXXXXX' || !window.gtag) {
			return;
		}

		window.gtag('config', measurementId, {
			page_path: url,
			page_title: document.title,
			page_location: window.location.href
		});
	}

	// Track custom events
	export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
		if (!browser || !measurementId || measurementId === 'G-XXXXXXXXXX' || !window.gtag) {
			return;
		}

		window.gtag('event', eventName, parameters);
	}

	onMount(() => {
		initGA();
	});

	// Track page changes
	$: if (browser && $page.url) {
		trackPageView($page.url.pathname + $page.url.search);
	}
</script>

<!-- Google Analytics Global Site Tag (gtag.js) -->
<svelte:head>
	{#if browser && measurementId && measurementId !== 'G-XXXXXXXXXX'}
		<!-- Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id={measurementId}"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', '{measurementId}', {
				page_title: document.title,
				page_location: window.location.href
			});
		</script>
	{/if}
</svelte:head>