<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte';
	import ServiceCard from './ServiceCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { services } from '$lib/data/services';
</script>

<Section id="services" class="py-12 md:py-16">
	<div class="text-center mb-16">
		<h2 class="text-responsive-4xl font-bold text-foreground mb-4">
			V&aring;re tjenester
		</h2>
		<p class="text-responsive-lg text-muted-foreground max-w-3xl mx-auto">
			Vi tilbyr fremtidsrettede l&oslash;sninger innen tre n&oslash;kkelomr&aring;der, der vi kombinerer
			teknisk ekspertise med industrispesifikk kunnskap for &aring; kunne levere fantastiske resultater.
		</p>
	</div>

	<div class="grid md:grid-cols-3 gap-8 mb-12">
		{#each services as service}
			<ServiceCard {service} />
		{/each}
	</div>

	<div class="text-center">
		<p class="text-body-lg text-muted-foreground mb-6">
			Trenger du en løsning som kombinerer ulike tjenester?
		</p>
		<Button href="/kontakt" variant="outline" size="lg">
			Ta kontakt med oss
		</Button>
	</div>
</Section>