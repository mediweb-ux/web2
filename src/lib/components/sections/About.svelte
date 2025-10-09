<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	const values = [
		{
			icon: 'target',
			title: 'Excellence',
			description: 'We deliver high-quality solutions that exceed expectations and drive real business results.'
		},
		{
			icon: 'users',
			title: 'Collaboration',
			description: 'We work closely with our clients as partners, ensuring transparent communication throughout every project.'
		},
		{
			icon: 'zap',
			title: 'Innovation',
			description: 'We stay at the forefront of technology, using cutting-edge tools and methodologies to solve complex challenges.'
		}
	];
</script>

<Section id="about" class="py-16 md:py-24">
	<div class="text-center mb-16">
		<h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
			About Our Agency
		</h2>
		<p class="text-xl text-muted-foreground max-w-3xl mx-auto">
			We are a full-service digital agency specializing in web development, medical services, and educational platforms. 
			Our mission is to transform ideas into powerful digital solutions that make a real impact.
		</p>
	</div>

	<div class="grid md:grid-cols-3 gap-8 mb-16">
		{#each values as value}
			<Card class="text-center p-8">
				<div class="mb-6">
					<Icon name={value.icon} size="xl" class="text-primary mx-auto" />
				</div>
				<h3 class="text-xl font-semibold text-foreground mb-4">
					{value.title}
				</h3>
				<p class="text-muted-foreground">
					{value.description}
				</p>
			</Card>
		{/each}
	</div>

	<div class="bg-muted rounded-2xl p-8 md:p-12 text-center">
		<h3 class="text-2xl md:text-3xl font-bold text-foreground mb-4">
			Ready to Start Your Project?
		</h3>
		<p class="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
			Let's discuss how we can help bring your vision to life with our expertise in modern web technologies, 
			healthcare solutions, and educational platforms.
		</p>
	</div>
</Section>