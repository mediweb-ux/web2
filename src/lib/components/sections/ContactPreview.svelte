<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<Section id="contact-preview" class="py-16 md:py-24 bg-muted" ariaLabel="Kontakt">
	<div class="text-center mb-16">
		<h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">Kontakt oss</h2>
		<p class="text-xl text-muted-foreground max-w-3xl mx-auto">
			Klar for å komme i gang med ditt prosjekt? Vi vil gjerne høre fra deg!
		</p>
	</div>

	<div class="text-center">
		<Button href="/kontakt" variant="primary" size="lg">Send oss en melding</Button>
	</div>
</Section>
