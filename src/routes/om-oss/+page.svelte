<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import aboutBg from '$lib/assets/hero-backgrounds/bg-omoss.png?url';

	const breadcrumbItems = [
		{ label: 'Hjem', href: '/' },
		{ label: 'Om oss', href: '/om-oss' }
	];

	const milestones = [
		{
			title: 'Den spede begynnelsen',
			description: 'Programmering startet på gutterommet med BASIC, og det første spillet ble laget rundt 14-årsalderen.',
			icon: 'code',
			period: 'Tidlige år'
		},
		{
			title: 'HiTIT Consulting',
			description: 'Det første firmaet som ga ekstra inntekt under studiene, men ble for mye ved siden av legestudier.',
			icon: 'briefcase',
			period: 'Studietiden'
		},
		{
			title: 'Kontorportalen & Anestesi1',
			description: 'To separate ENK-firmaer for webutvikling/kurs og medisinske tjenester, men ble for komplisert å håndtere.',
			icon: 'building',
			period: 'Etter studiene'
		},
		{
			title: 'MediWeb Solutions',
			description: 'Sammenslåing av alle tjenester i ett firma - den unike kombinasjonen av web, medisin og kurs.',
			icon: 'star',
			period: 'I dag'
		}
	];

	const technologies = [
		{
			name: 'BASIC',
			description: 'Det første programmeringsspråket som startet reisen',
			icon: 'terminal'
		},
		{
			name: 'PHP',
			description: 'Mye brukt i diverse webutviklingsprosjekter',
			icon: 'code'
		},
		{
			name: 'Visual C#',
			description: 'Utvidet programmeringskunnskapen betydelig',
			icon: 'layers'
		},
		{
			name: 'SQL',
			description: 'Nødvendig for å håndtere databaser på backend',
			icon: 'database'
		}
	];
</script>

<SEO
	title="MediWeb - Om oss"
	description="Les mer om firmaet og hvordan alt startet. Vi er et spesielt firma, med tre ulike kompetanseområder."
	keywords={['om oss', 'digitalt byrå', 'team', 'legetjenester', 'kurs']}
/>

<!-- Breadcrumb Navigation -->
<Section padding="none" className="py-6 border-b border-border">
	<Breadcrumb items={breadcrumbItems} />
</Section>

<!-- Hero Section -->
<HeroSection
	title="Om oss"
	subtitle="Vi er et unikt firma på mange måter. Her kan du lese litt mer om oss og hvordan det hele startet!"
	backgroundImage={aboutBg}
	overlayOpacity={0.6}
	minHeight="min-h-[500px]"
/>

<!-- Introduction Section -->
<Section className="py-16 bg-muted/30" ariaLabel="Introduksjon">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-responsive-3xl font-bold text-center mb-8">Introduksjon</h2>
		<p class="text-body-lg text-muted-foreground leading-relaxed text-center mb-12">
			Historien om MediWeb Solutions er spennende og strekker seg egentlig over mange år, selv om firmaet i seg selv ikke er så gammelt. Vi vil her forsøke å gjengi noe av det som har skapt MediWeb slik det foreligger i dag!
		</p>
		
		<div class="prose prose-lg dark:prose-invert max-w-none">
			<h3 class="text-responsive-2xl font-bold text-foreground mb-6">Den spede begynnelsen</h3>
			<p class="text-body text-muted-foreground leading-relaxed mb-6">
				Som for mange andre, startet reisen på gutterommet til grunnlegger Håkon Trønnes. Rundt 12-årsalder begynte han med enkel programmering i 
				<a href="https://no.wikipedia.org/wiki/BASIC" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">BASIC</a>, 
				og laget sitt første spill (til eget bruk) et par år senere.
			</p>
			<p class="text-muted-foreground leading-relaxed mb-8">
				Etter som årene gikk, ble mengden programmeringsspråk også utvidet. Både PHP og Visual C# har vært mye i bruk i diverse prosjekter. Og samtidig oppsto behovet for å lære SQL for å håndtere database på backend. Det var uten tvil en lærerik tid — ikke var det tusenvis av YouTube-videoer tilgjengelig, så det ble mye prøving og feiling!
			</p>

			<h3 class="text-responsive-2xl font-bold text-foreground mb-6">Første firma</h3>
			<p class="text-body text-muted-foreground leading-relaxed mb-6">
				Det som etterhvert skulle bli MediWeb startet som <em>HiTIT Consulting</em>. Det varte noen år og førte til litt ekstra inntekt under studiene, men etterhvert så ble det for mye jobb ved siden av studier og etterhvert begynnelsen på et travlere legeliv. Håkon valgte derfor å stenge HiTIT til slutt.
			</p>
			<p class="text-body text-muted-foreground leading-relaxed mb-8">
				Noen tid senere ble det oppstart av <em>Kontorportalen</em> for den delen som handlet om webutvikling og delvis kursvirksomhet, mens den medisinske delen levde i firmaet som het <em>Anestesi1</em>. Men begge var enkeltpersonforetak (ENK), og Håkon fant etterhvert ut at det ble for komplisert med tanke på det økonomiske når man må håndtere to ENK.
			</p>

			<h3 class="text-responsive-2xl font-bold text-foreground mb-6">MediWeb</h3>
			<p class="text-body text-muted-foreground leading-relaxed mb-6">
				Da dukket ideen opp om å slå sammen disse to firmaene, slik at alt som tidligere var gjort gjennom to ulike firma, nå ble til ett firma!
			</p>
			<p class="text-body text-muted-foreground leading-relaxed">
				Ja, det føltes litt rart og underlig, for det er en uvanlig kombinasjon. Men jo mer man tenkte på det, jo lettere var det å se det i kombinasjon. Så her er vi i dag, med den utrolige kombinasjonen av tjenester i ett og samme firma - MediWeb Solutions! Vi gleder oss til å samarbeide med deg på alle våre områder!
			</p>
		</div>
	</div>
</Section>

<!-- Timeline Section -->
<Section className="py-16">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-responsive-3xl font-bold text-center mb-12">Vår reise</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each milestones as milestone}
				<Card class="p-6 text-center h-full">
					<div class="flex justify-center mb-4">
						<div class="text-primary">
							<Icon name={milestone.icon} size="xl" />
						</div>
					</div>
					<div class="text-body-sm text-primary font-medium mb-2">{milestone.period}</div>
					<h3 class="text-heading font-semibold mb-3">{milestone.title}</h3>
					<p class="text-body-sm text-muted-foreground">{milestone.description}</p>
				</Card>
			{/each}
		</div>
	</div>
</Section>

<!-- Technologies Section -->
<Section className="py-16 bg-muted/30">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-responsive-3xl font-bold text-center mb-8">Teknologier gjennom årene</h2>
		<p class="text-body-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
			Fra de første stegene med BASIC til dagens moderne webutviklingsverktøy - her er noen av teknologiene som har formet vår reise.
		</p>
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each technologies as tech}
				<Card class="p-6 text-center h-full">
					<div class="flex justify-center mb-4">
						<div class="text-primary">
							<Icon name={tech.icon} size="xl" />
						</div>
					</div>
					<h3 class="text-heading-lg font-semibold mb-3">{tech.name}</h3>
					<p class="text-body-sm text-muted-foreground">{tech.description}</p>
				</Card>
			{/each}
		</div>
	</div>
</Section>

<!-- CTA Section -->
<Section className="py-16">
	<div class="text-center max-w-4xl mx-auto">
		<h2 class="text-responsive-3xl font-bold mb-6">Klar for å samarbeide?</h2>
		<p class="text-responsive-lg text-muted-foreground mb-8">
			Vi gleder oss til å samarbeide med deg på alle våre områder - webutvikling, legetjenester og kursvirksomhet. La oss diskutere hvordan vi kan hjelpe deg!
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button href="/kontakt" size="lg">
				Kontakt oss
				<span class="ml-2">
					<Icon name="arrow-right" size="sm" />
				</span>
			</Button>
			<Button href="/tjenester" variant="outline" size="lg">
				Våre tjenester
				<span class="ml-2">
					<Icon name="external-link" size="sm" />
				</span>
			</Button>
		</div>
	</div>
</Section>
