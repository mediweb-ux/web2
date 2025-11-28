<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ServicesOverview from '$lib/components/sections/ServicesOverview.svelte';
	import ContactPreview from '$lib/components/sections/ContactPreview.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import homeBg from '$lib/assets/hero-backgrounds/bg-home.png?url';
</script>

<SEO
	title="MediWeb Solutions"
	description="Profesjonelt lite foretak med tre ben å stå på: moderne web-utvikling, legetjenester og e-læring."
	keywords="webutvikling, legetjenester, kursvirksomhet, digitalt byrå, helse, e-læring"
/>

<HeroSection
	title="MediWeb Solutions"
	subtitle="Vi spesialiserer oss på tre ulike ting; moderne webutvikling, profesjonelle legetjenester og engasjerende kursvirksomhet."
	backgroundImage={homeBg}
	minHeight="min-h-screen"
	overlayOpacity={0.4}
>
	<div class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
		<Button href="/om-oss" variant="primary" size="lg">Les mer om oss</Button>
		<Button href="/tjenester" variant="outline" size="lg">Se våre tjenester</Button>
	</div>
</HeroSection>

<ServicesOverview />

<ContactPreview />