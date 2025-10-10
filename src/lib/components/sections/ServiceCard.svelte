<script lang="ts">
	import type { Service } from '$lib/types/service';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	export let service: Service;
</script>

<Card class="h-full flex flex-col">
	<div class="flex items-center gap-4 mb-4">
		<div class="flex-shrink-0">
			<Icon name={service.icon} size="lg" class="text-primary" />
		</div>
		<h3 class="text-heading-lg font-semibold text-foreground">{service.title}</h3>
	</div>
	
	<p class="text-muted-foreground mb-6 flex-grow">
		{service.description}
	</p>
	
	<div class="mb-6">
		<h4 class="text-heading-sm font-medium text-foreground mb-3">N&oslash;kkelinformasjon</h4>
		<ul class="space-y-2">
			{#each service.features.slice(0, 3) as feature}
				<li class="flex items-start gap-2 text-body-sm text-muted-foreground">
					<Icon name="check" size="sm" class="text-primary mt-0.5 flex-shrink-0" />
					<span>{feature.title}</span>
				</li>
			{/each}
		</ul>
	</div>
	
	<div class="mt-auto space-y-3">
		<Button href="/services/{service.slug}" variant="primary" class="w-full">
			Les mer om {service.title}
			<Icon name="arrow-right" size="sm" class="ml-2" />
		</Button>
		<Button href={service.ctaLink} variant="outline" class="w-full">
			{service.ctaText}
		</Button>
	</div>
</Card>