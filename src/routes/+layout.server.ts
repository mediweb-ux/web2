import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// Get Google Analytics Measurement ID from environment
	const measurementId = process.env.GA_MEASUREMENT_ID;

	return {
		measurementId: measurementId || null
	};
};