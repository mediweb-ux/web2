/**
 * Deployment configuration for different hosting providers
 * Customize these settings based on your hosting provider
 */

export const deployConfig = {
	// Netlify configuration
	netlify: {
		buildCommand: 'npm run build:production',
		publishDirectory: 'build',
		functions: 'netlify/functions',
		redirects: [
			{
				from: '/api/*',
				to: '/.netlify/functions/:splat',
				status: 200
			},
			{
				from: '/*',
				to: '/index.html',
				status: 200
			}
		],
		headers: [
			{
				for: '/assets/*',
				values: {
					'Cache-Control': 'public, max-age=31536000, immutable'
				}
			},
			{
				for: '/*.js',
				values: {
					'Cache-Control': 'public, max-age=31536000, immutable'
				}
			},
			{
				for: '/*.css',
				values: {
					'Cache-Control': 'public, max-age=31536000, immutable'
				}
			}
		]
	},

	// Vercel configuration
	vercel: {
		buildCommand: 'npm run build:production',
		outputDirectory: 'build',
		installCommand: 'npm ci',
		framework: 'sveltekit',
		headers: [
			{
				source: '/assets/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			}
		]
	},

	// GitHub Pages configuration
	githubPages: {
		buildCommand: 'npm run build:production',
		publishDirectory: 'build',
		cname: 'your-domain.com' // Optional: your custom domain
	},

	// Generic static hosting
	static: {
		buildCommand: 'npm run build:production',
		publishDirectory: 'build',
		indexFile: 'index.html',
		errorFile: '404.html'
	}
};

export const getDeployConfig = (provider = 'static') => {
	return deployConfig[provider] || deployConfig.static;
};