import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Static site generation configuration
		adapter: adapter({
			// Output directory for static files
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // Use 404.html instead of index.html for better static hosting
			precompress: false,
			strict: true // Ensure all routes are prerendered
		}),

		// Prerender configuration for static generation
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			entries: ['*'],
			crawl: true
		},

		// Path aliases for cleaner imports
		alias: {
			'$components': 'src/lib/components',
			'$stores': 'src/lib/stores',
			'$utils': 'src/lib/utils',
			'$types': 'src/lib/types',
			'$data': 'src/lib/data'
		}
	}
};

export default config;
