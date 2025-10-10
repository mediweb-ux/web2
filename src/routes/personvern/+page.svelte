<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import personvernBg from '$lib/assets/hero-backgrounds/bg-personvern.png?url';
</script>

<SEO
	title="MediWeb Solutions - Personvern"
	description="Les om hvordan MediWeb Solutions behandler dine personopplysninger i samsvar med GDPR og norsk personvernlovgivning."
	keywords="personvern, GDPR, personopplysninger, databeskyttelse, cookies"
/>

<!-- Hero Section -->
<HeroSection
	title="Personvern"
	backgroundImage={personvernBg}
	overlayOpacity={0.6}
	minHeight="min-h-[400px]"
/>

<!-- Privacy Policy Content -->
<Section class="py-16 bg-muted/30" ariaLabel="Personvernerklæring">
	<div class="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
		<p class="text-xl text-muted-foreground leading-relaxed">
			Vi i MediWeb Solutions tar ditt personvern på alvor. Denne personvernerklæringen forklarer hvordan vi samler inn, bruker, lagrer og beskytter dine personopplysninger i samsvar med norsk lovgivning, inkludert 
			<a href="https://lovdata.no/dokument/NL/lov/2018-06-15-38" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">personopplysningsloven</a> 
			og 
			<a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">EUs personvernforordning (GDPR)</a>.
		</p>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">1. Behandlingsansvarlig</h2>
		<p class="text-muted-foreground leading-relaxed">
			<strong class="font-semibold text-foreground">Trønnes MediWeb Solutions</strong> (heretter omtalt som <em>MediWeb Solutions</em>), org.nr 924803673, er behandlingsansvarlig for personopplysningene vi behandler. Kontaktinformasjon/postadresse: Lektor Musums gate 17, 7650 Verdal. Du kan komme i kontakt med oss ved å bruke 
			<a href="/kontakt" class="text-primary hover:underline">vårt kontaktskjema</a>.
		</p>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">2. Hvilke opplysninger vi samler inn</h2>
		<p class="text-muted-foreground leading-relaxed">
			Vi kan samle inn følgende typer personopplysninger:
		</p>
		<ul class="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
			<li>Navn</li>
			<li>Kontaktinformasjon (e-postadresse, telefonnummer)</li>
			<li>Demografisk informasjon (alder, kjønn, bosted)</li>
			<li>Brukeratferd på vår nettside (cookies/informasjonskapsler, IP-adresse)</li>
		</ul>
		<p class="text-muted-foreground leading-relaxed mt-4">
			Vi bruker Google Analytics for å se på nettrafikk, slik at vi skal kunne gi deg den beste opplevelsen på våre nettsider. Derfor vil vi gjerne bruke informasjonskapsler, men det er selvfølgelig fritt fram å avvise disse. Du kan også 
			<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">lese mer om Googles personvern</a>.
		</p>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">3. Formål med behandlingen</h2>
		<p class="text-muted-foreground leading-relaxed">
			Vi behandler dine personopplysninger for følgende formål:
		</p>
		<ul class="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
			<li>For å levere våre tjenester og produkter til deg</li>
			<li>For å forbedre våre tjenester og tilpasse brukeropplevelsen</li>
			<li>For å sende deg relevant informasjon og markedsføring</li>
			<li>For å overholde lovpålagte krav</li>
		</ul>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">4. Rettslig grunnlag for behandlingen</h2>
		<p class="text-muted-foreground leading-relaxed">
			Behandlingen av dine personopplysninger er basert på følgende rettslige grunnlag:
		</p>
		<ul class="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
			<li>Ditt samtykke</li>
			<li>Oppfyllelse av en avtale</li>
			<li>Rettslig forpliktelse</li>
			<li>Berettiget interesse</li>
		</ul>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">5. Deling av personopplysninger</h2>
		<p class="text-muted-foreground leading-relaxed">
			Vi deler ikke dine personopplysninger med tredjeparter, med mindre det er nødvendig for å oppfylle en avtale med deg eller vi er lovpålagt å gjøre det.
		</p>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">6. Lagring av personopplysninger</h2>
		<p class="text-muted-foreground leading-relaxed">
			Dine personopplysninger lagres så lenge det er nødvendig for å oppfylle formålene de ble samlet inn for, eller så lenge det kreves i henhold til lovgivningen.
		</p>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">7. Dine rettigheter</h2>
		<p class="text-muted-foreground leading-relaxed">
			Du har rett til å:
		</p>
		<ul class="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
			<li>Be om innsyn i dine personopplysninger</li>
			<li>Kreve retting av uriktige opplysninger</li>
			<li>Kreve sletting av opplysninger</li>
			<li>Kreve begrensning av behandling</li>
			<li>Protestere mot behandling basert på berettiget interesse</li>
			<li>Klage til Datatilsynet</li>
		</ul>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">8. Endringer i personvernerklæringen</h2>
		<p class="text-muted-foreground leading-relaxed">
			Vi forbeholder oss retten til å oppdatere denne personvernerklæringen. Endringer vil bli publisert på vår nettside.
		</p>

		<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">9. Kontaktinformasjon</h2>
		<p class="text-muted-foreground leading-relaxed">
			Dersom du har spørsmål om vår behandling av dine personopplysninger, vennligst 
			<a href="/kontakt" class="text-primary hover:underline">ta kontakt med oss</a>.
		</p>

		<p class="text-muted-foreground leading-relaxed mt-8 text-center font-medium">
			Takk for at du stoler på MediWeb Solutions med dine personopplysninger.
		</p>
	</div>
</Section>