<script lang="ts">
	import type { PortfolioItem } from '$lib/types/service';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ResponsiveImage from '$lib/components/ui/ResponsiveImage.svelte';


	export let items: PortfolioItem[];
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
	{#each items as item}
		<Card class="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
			<div class="aspect-video overflow-hidden">
				<ResponsiveImage
					src={item.image}
					alt={item.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					formats={[]}
				/>
			</div>
			
			<div class="p-6">
				<h3 class="text-heading-lg font-semibold text-foreground mb-3">
					{item.title}
				</h3>
				
				<p class="text-muted-foreground mb-4 line-clamp-3">
					{item.description}
				</p>
				
				{#if item.technologies.length > 0}
					<div class="mb-4">
						<h4 class="text-heading-sm font-medium text-foreground mb-2">Jobbet med:</h4>
						<div class="flex flex-wrap gap-2">
							{#each item.technologies as tech}
								<span class="px-2 py-1 text-body-sm bg-muted text-muted-foreground rounded-md">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				{/if}
				
				{#if item.link}
					<Button href={item.link} variant="outline" size="sm" class="w-full">
						Besøk {item.title}
					</Button>
				{/if}
			</div>
		</Card>
	{/each}
</div>

<style>
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>