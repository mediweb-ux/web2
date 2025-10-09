<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { theme } from '$lib/stores';
	import '../app.css';

	// Initialize theme on mount
	onMount(() => {
		const cleanup = theme.init();
		return cleanup;
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<Header />
	<main id="main-content">
		<slot />
	</main>
	<Footer />
</div>