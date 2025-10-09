import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	// Optimize dependencies
	optimizeDeps: {
		include: ['intersection-observer'],
		exclude: ['@sveltejs/kit']
	},

	// Build configuration
	build: {
		// Generate source maps for debugging in development only
		sourcemap: process.env.NODE_ENV === 'development',

		// Enable asset hashing for better caching
		assetsInlineLimit: 4096, // Inline assets smaller than 4kb
		
		// Optimize for production
		reportCompressedSize: true,
		chunkSizeWarningLimit: 1000,

		// Optimize chunk splitting for better caching
		rollupOptions: {
			// Tree shaking configuration
			treeshake: {
				moduleSideEffects: false,
				propertyReadSideEffects: false,
				unknownGlobalSideEffects: false
			},
			
			output: {
				// Manual chunk splitting for better caching
				manualChunks: (id) => {
					// Vendor chunk for external dependencies
					if (id.includes('node_modules')) {
						// Separate chunk for large libraries
						if (id.includes('svelte')) {
							return 'svelte';
						}
						return 'vendor';
					}
					
					// Separate chunks for different parts of the app
					if (id.includes('src/lib/components')) {
						return 'components';
					}
					
					if (id.includes('src/lib/utils')) {
						return 'utils';
					}
					
					if (id.includes('src/routes')) {
						return 'routes';
					}
				},
				
				// Optimize asset naming for better caching
				assetFileNames: (assetInfo) => {
					const info = assetInfo.name?.split('.') || [];
					const ext = info[info.length - 1];
					
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
						return `assets/images/[name]-[hash][extname]`;
					}
					
					if (/woff2?|eot|ttf|otf/i.test(ext || '')) {
						return `assets/fonts/[name]-[hash][extname]`;
					}
					
					return `assets/[name]-[hash][extname]`;
				},
				
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js'
			}
		},

		// Asset handling
		assetsDir: 'assets',

		// Minification
		minify: 'esbuild',

		// Target modern browsers for better optimization
		target: ['es2022', 'chrome91', 'firefox90', 'safari15'],

		// Compression and optimization
		cssCodeSplit: true
	},

	// Development server configuration
	server: {
		port: 5173,
		host: true,
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..']
		}
	},

	// Preview server configuration
	preview: {
		port: 4173,
		host: true
	},

	// CSS configuration
	css: {
		devSourcemap: true,
		postcss: './postcss.config.js'
	},

	// Define global constants
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		__BUILD_TIME__: JSON.stringify(new Date().toISOString()),
		__BUILD_TARGET__: JSON.stringify(process.env.BUILD_TARGET || 'development')
	},

	// Environment variables configuration
	envPrefix: ['PUBLIC_', 'VITE_']
});
