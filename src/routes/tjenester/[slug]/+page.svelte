<script lang="ts">
	import type { PageData } from './$types';
	import ServiceDetail from '$lib/components/sections/ServiceDetail.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import RelatedServices from '$lib/components/sections/RelatedServices.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import SEO from '$lib/components/SEO.svelte';

	export let data: PageData;
	const { service, relatedServices } = data;
</script>

<SEO 
	title="{service.title} - Profesjonelle {service.title} tjenester"
	description={service.longDescription}
	keywords={[service.title.toLowerCase(), 'profesjonelle tjenester', 'digitale løsninger']}
/>

<!-- Breadcrumb Navigation -->
<Section className="py-4 border-b border-border" ariaLabel="Navigasjon">
	<Breadcrumb 
		items={[
			{ label: 'Hjem', href: '/' },
			{ label: 'Tjenester', href: '/tjenester' },
			{ label: service.title, href: `/tjenester/${service.slug}`, current: true }
		]} 
	/>
</Section>

<!-- Service Detail Content -->
<ServiceDetail {service} />

<!-- Related Services -->
{#if relatedServices.length > 0}
	<RelatedServices services={relatedServices} currentServiceId={service.id} />
{/if}