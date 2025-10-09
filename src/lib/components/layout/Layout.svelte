<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import SEO from '../SEO.svelte';
	import type { SEOData } from '$lib/types/seo';

	// Legacy props for backward compatibility
	export let title = '';
	export let description = '';
	
	// New SEO props
	export let seo: SEOData | null = null;

	// Use legacy props if no SEO object provided
	$: finalSEO = seo || { title, description };
</script>

<SEO {...finalSEO} />

<div class="min-h-screen flex flex-col">
	<Header />
	
	<main id="main-content" class="flex-1" tabindex="-1">
		<slot />
	</main>
	
	<Footer />
</div>