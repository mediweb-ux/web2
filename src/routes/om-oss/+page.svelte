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

	const teamMembers = [
		{
			name: 'John Doe',
			role: 'Lead Developer',
			description: 'Full-stack developer with 8+ years of experience in modern web technologies.',
			image:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
		},
		{
			name: 'Jane Smith',
			role: 'UX/UI Designer',
			description: 'Creative designer focused on user-centered design and accessibility.',
			image:
				'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
		},
		{
			name: 'Mike Johnson',
			role: 'Medical Consultant',
			description: 'Healthcare professional specializing in digital health solutions.',
			image:
				'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face'
		}
	];

	const values = [
		{
			title: 'Innovation',
			description: 'We stay at the forefront of technology to deliver cutting-edge solutions.',
			icon: 'lightbulb'
		},
		{
			title: 'Quality',
			description: 'Every project is built with attention to detail and rigorous testing.',
			icon: 'check-circle'
		},
		{
			title: 'Collaboration',
			description: 'We work closely with our clients to understand and exceed their expectations.',
			icon: 'users'
		},
		{
			title: 'Accessibility',
			description: 'We believe technology should be accessible to everyone, everywhere.',
			icon: 'accessibility'
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

<!-- Mission Section -->
<Section className="py-16 bg-muted/30" ariaLabel="Vårt ønske">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl font-bold mb-8">V&aring;rt &oslash;nske</h2>
		<p class="text-lg text-muted-foreground leading-relaxed mb-8">
			Vi &oslash;nsker &aring; tilby profesjonelle tjenester innen v&aring;re tre
			kompetanseomr&aring;der. Den unike kombinasjonen av kunnskap og erfaring som vi besitter, skal
			komme deg som kunde til gode!
		</p>
		<div class="grid md:grid-cols-2 gap-8 mt-12">
			<Card class="p-6">
				<div class="text-primary mb-4 mx-auto flex justify-center">
					<Icon name="target" size="xl" />
				</div>
				<h3 class="text-xl font-semibold mb-3">Our Vision</h3>
				<p class="text-muted-foreground">
					To be the leading digital agency that transforms ideas into powerful, user-centered
					solutions that drive real business results.
				</p>
			</Card>
			<Card class="p-6">
				<div class="text-primary mb-4 mx-auto flex justify-center">
					<Icon name="heart" size="xl" />
				</div>
				<h3 class="text-xl font-semibold mb-3">Our Approach</h3>
				<p class="text-muted-foreground">
					We combine technical expertise with deep understanding of user needs to create solutions
					that are both powerful and intuitive.
				</p>
			</Card>
		</div>
	</div>
</Section>

<!-- Values Section -->
<Section className="py-16">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-3xl font-bold text-center mb-12">Our Values</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each values as value}
				<div class="text-center">
					<div class="flex justify-center mb-4">
						<div class="text-primary">
							<Icon name={value.icon} size="xl" />
						</div>
					</div>
					<h3 class="text-xl font-semibold mb-3">{value.title}</h3>
					<p class="text-muted-foreground">{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Team Section -->
<Section className="py-16 bg-muted/30">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each teamMembers as member}
				<Card class="p-6 text-center">
					<img
						src={member.image}
						alt={member.name}
						class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
						loading="lazy"
					/>
					<h3 class="text-xl font-semibold mb-2">{member.name}</h3>
					<p class="text-primary font-medium mb-3">{member.role}</p>
					<p class="text-muted-foreground text-sm">{member.description}</p>
				</Card>
			{/each}
		</div>
	</div>
</Section>

<!-- CTA Section -->
<Section className="py-16">
	<div class="text-center max-w-4xl mx-auto">
		<h2 class="text-3xl font-bold mb-6">Ready to Work Together?</h2>
		<p class="text-xl text-muted-foreground mb-8">
			Let's discuss how we can help bring your vision to life with our expertise and passion.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button href="/kontakt" size="lg">
				Kontakt oss
				<span class="ml-2">
					<Icon name="arrow-right" size="sm" />
				</span>
			</Button>
			<Button href="/tjenester" variant="outline" size="lg">
				V&aring;re tjenester
				<span class="ml-2">
					<Icon name="external-link" size="sm" />
				</span>
			</Button>
		</div>
	</div>
</Section>
