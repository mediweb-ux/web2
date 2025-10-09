import type { PageServerLoad } from './$types';
import { services } from '$lib/data/services';

export const load: PageServerLoad = async () => {
	return {
		services
	};
};