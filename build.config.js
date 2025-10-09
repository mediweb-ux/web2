/**
 * Build configuration for different deployment environments
 */

export const buildConfig = {
	development: {
		sourcemap: true,
		minify: false,
		compress: false,
		analyze: false
	},
	staging: {
		sourcemap: true,
		minify: true,
		compress: true,
		analyze: false,
		robotsNoIndex: true
	},
	production: {
		sourcemap: false,
		minify: true,
		compress: true,
		analyze: false,
		robotsNoIndex: false
	}
};

export const getBuildConfig = (target = 'development') => {
	return buildConfig[target] || buildConfig.development;
};