<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	const contactMethods = [
		{
			icon: 'mail',
			title: 'Email Us',
			description: 'Get in touch via email for project inquiries and general questions.',
			value: 'hello@agency.com',
			link: 'mailto:hello@agency.com'
		},
		{
			icon: 'phone',
			title: 'Call Us',
			description: 'Speak directly with our team about your project requirements.',
			value: '+1 (555) 123-4567',
			link: 'tel:+15551234567'
		},
		{
			icon: 'map-pin',
			title: 'Visit Us',
			description: 'Meet us in person at our office for detailed project discussions.',
			value: '123 Business Ave, Suite 100\nCity, State 12345',
			link: 'https://maps.google.com/?q=123+Business+Ave+Suite+100+City+State+12345'
		}
	];
</script>

<Section id="contact-preview" class="py-16 md:py-24 bg-muted" ariaLabel="Kontakt">
	<div class="text-center mb-16">
		<h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">Kontakt oss</h2>
		<p class="text-xl text-muted-foreground max-w-3xl mx-auto">
			Ready to start your project? We'd love to hear from you. Choose the method that works best for
			you.
		</p>
	</div>

	<div class="grid md:grid-cols-3 gap-8 mb-12">
		{#each contactMethods as method}
			<Card class="text-center p-8 hover:shadow-lg transition-shadow">
				<div class="mb-6">
					<Icon name={method.icon} size="xl" class="text-primary mx-auto" />
				</div>
				<h3 class="text-xl font-semibold text-foreground mb-3">
					{method.title}
				</h3>
				<p class="text-muted-foreground mb-4">
					{method.description}
				</p>
				<div class="text-sm font-medium text-foreground mb-6 whitespace-pre-line">
					{method.value}
				</div>
				<Button href={method.link} variant="outline" size="sm" class="w-full">
					{method.title}
				</Button>
			</Card>
		{/each}
	</div>

	<div class="text-center">
		<Button href="/kontakt" variant="primary" size="lg">Send oss en melding</Button>
	</div>
</Section>
