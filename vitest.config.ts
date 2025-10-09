import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./src/test-setup.ts'],
		globals: true,
		typecheck: {
			enabled: false
		},
		// Ensure proper browser environment simulation for Svelte 5
		environmentOptions: {
			jsdom: {
				resources: 'usable',
				url: 'http://localhost:3000',
				pretendToBeVisual: true,
				includeNodeLocations: true,
				storageQuota: 10000000
			}
		},
		// Configure environment variables to indicate client-side execution
		env: {
			NODE_ENV: 'test'
		}
	},
	// Ensure Svelte compilation works correctly in test environment
	define: {
		'import.meta.vitest': 'undefined',
		'process.env.NODE_ENV': '"test"',
		'import.meta.env.MODE': '"test"'
	},
	// Configure module resolution for SvelteKit aliases and force client-side Svelte
	resolve: {
		alias: {
			'$lib': new URL('./src/lib', import.meta.url).pathname,
			'$app/environment': new URL('./src/mocks/app-environment.js', import.meta.url).pathname,
			'$app/stores': new URL('./src/mocks/app-stores.js', import.meta.url).pathname,
			'$app/forms': new URL('./src/mocks/app-forms.js', import.meta.url).pathname,
			'$app/navigation': new URL('./src/mocks/app-navigation.js', import.meta.url).pathname
		},
		// Force browser conditions to use client-side Svelte entry point
		conditions: ['browser', 'import']
	}
});