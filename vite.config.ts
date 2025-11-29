import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

export default defineConfig({
	plugins: [sveltekit()],

	// Development server configuration
	server: {
		port: 5173,
		host: true
	},

	// Preview server configuration
	preview: {
		port: 4173,
		host: true
	},

	// CSS configuration
	css: {
		postcss: './postcss.config.js'
	},

	// Build configuration (simplified for development)
	build: {
		sourcemap: false,
		target: 'es2022'
	}
});
