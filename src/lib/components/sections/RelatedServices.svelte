<script lang="ts">
	import type { Service } from '$lib/types/service';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	export let services: Service[];
	export let currentServiceId: string;

	// Filter out current service and limit to 2 related services
	$: relatedServices = services
		.filter(service => service.id !== currentServiceId)
		.slice(0, 2);
</script>

{#if relatedServices.length > 0}
	<Section class="py-16 bg-muted/30">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-foreground mb-4">
					Utforsk v&aring;re andre tjenester
				</h2>
				<p class="text-lg text-muted-foreground">
					Se hvordan vi kan bist&aring; deg ogs&aring; innen v&aring;re andre tjenesteomr&aring;der
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8">
				{#each relatedServices as service}
					<Card class="p-6 hover:shadow-lg transition-shadow duration-300">
						<div class="flex items-start space-x-4">
							<div class="flex-shrink-0">
								<Icon name={service.icon} size="lg" class="text-primary" />
							</div>
							<div class="flex-1">
								<h3 class="text-xl font-semibold text-foreground mb-2">
									{service.title}
								</h3>
								<p class="text-muted-foreground mb-4">
									{service.description}
								</p>
								
								<!-- Feature highlights -->
								<ul class="space-y-1 mb-6">
									{#each service.features.slice(0, 3) as feature}
										<li class="flex items-center text-sm text-muted-foreground">
											<Icon name="check" size="sm" class="text-primary mr-2 flex-shrink-0" />
											{feature.title}
										</li>
									{/each}
								</ul>

								<Button 
									href="/services/{service.slug}" 
									variant="outline" 
									size="sm"
									class="w-full"
								>
									Les mer om {service.title}
									<Icon name="arrow-right" size="sm" class="ml-2" />
								</Button>
							</div>
						</div>
					</Card>
				{/each}
			</div>

			<div class="text-center mt-12">
				<Button href="/kontakt" variant="primary" size="lg">
					Kontakt oss for ditt neste prosjekt
					<Icon name="message-circle" size="sm" class="ml-2" />
				</Button>
			</div>
		</div>
	</Section>
{/if}