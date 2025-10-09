<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' }
	];

	const teamMembers = [
		{
			name: 'John Doe',
			role: 'Lead Developer',
			description: 'Full-stack developer with 8+ years of experience in modern web technologies.',
			image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
		},
		{
			name: 'Jane Smith',
			role: 'UX/UI Designer',
			description: 'Creative designer focused on user-centered design and accessibility.',
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
		},
		{
			name: 'Mike Johnson',
			role: 'Medical Consultant',
			description: 'Healthcare professional specializing in digital health solutions.',
			image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face'
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
	title="About Us - Professional Digital Agency"
	description="Learn about our team, mission, and values. We're a digital agency specializing in web development, medical services, and educational platforms."
	keywords={['about us', 'digital agency', 'team', 'mission', 'values']}
/>

<!-- Breadcrumb Navigation -->
<Section className="py-4 border-b border-border">
	<Breadcrumb items={breadcrumbItems} />
</Section>

<!-- Hero Section -->
<Section className="py-16 lg:py-24">
	<div class="text-center max-w-4xl mx-auto">
		<h1 class="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
			About Our Agency
		</h1>
		<p class="text-xl text-muted-foreground mb-8 leading-relaxed">
			We're a passionate team of developers, designers, and consultants dedicated to creating 
			exceptional digital experiences that make a real difference in people's lives.
		</p>
	</div>
</Section>

<!-- Mission Section -->
<Section className="py-16 bg-muted/30">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl font-bold mb-8">Our Mission</h2>
		<p class="text-lg text-muted-foreground leading-relaxed mb-8">
			To bridge the gap between technology and human needs by creating innovative, accessible, 
			and impactful digital solutions. We believe that great technology should empower people 
			and organizations to achieve their goals more effectively.
		</p>
		<div class="grid md:grid-cols-2 gap-8 mt-12">
			<Card class="p-6">
				<div class="text-primary mb-4 mx-auto flex justify-center">
					<Icon name="target" size="xl" />
				</div>
				<h3 class="text-xl font-semibold mb-3">Our Vision</h3>
				<p class="text-muted-foreground">
					To be the leading digital agency that transforms ideas into powerful, 
					user-centered solutions that drive real business results.
				</p>
			</Card>
			<Card class="p-6">
				<div class="text-primary mb-4 mx-auto flex justify-center">
					<Icon name="heart" size="xl" />
				</div>
				<h3 class="text-xl font-semibold mb-3">Our Approach</h3>
				<p class="text-muted-foreground">
					We combine technical expertise with deep understanding of user needs 
					to create solutions that are both powerful and intuitive.
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
			<Button href="/contact" size="lg">
				Get In Touch
				<span class="ml-2">
					<Icon name="arrow-right" size="sm" />
				</span>
			</Button>
			<Button href="/services" variant="outline" size="lg">
				View Our Services
				<span class="ml-2">
					<Icon name="external-link" size="sm" />
				</span>
			</Button>
		</div>
	</div>
</Section>