<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import ServicesOverview from '$lib/components/sections/ServicesOverview.svelte';
	import About from '$lib/components/sections/About.svelte';
	import ContactPreview from '$lib/components/sections/ContactPreview.svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Web-utvikling, legetjenester og kurs | MediWeb Solutions"
	description="Profesjonelt lite foretak med tre ben å stå på: moderne web-utvikling, legetjenester og e-læring."
	keywords="webutvikling, legetjenester, kursvirksomhet, digitalt byrå, helse, e-læring"
/>

<Hero
	title="MediWeb Solutions"
	subtitle="Vi spesialiserer oss på moderne web-utvikling, innovative legetjenester og engasjerende kurs."
	ctaText="Les mer om oss"
	ctaLink="/om-oss"
	secondaryCtaText="Se våre tjenester"
	secondaryCtaLink="/tjenester"
/>

<ServicesOverview />

<About />

<ContactPreview />
