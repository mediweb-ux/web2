import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getServiceBySlug, services } from '$lib/data/services';

export const load: PageServerLoad = async ({ params }) => {
	const service = getServiceBySlug(params.slug);
	
	if (!service) {
		throw error(404, 'Service not found');
	}

	// Get related services (exclude current service)
	const relatedServices = services.filter(s => s.id !== service.id);

	return {
		service,
		relatedServices
	};
};

// Generate all possible routes for static generation
export async function entries() {
	return services.map(service => ({
		slug: service.slug
	}));
}