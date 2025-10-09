/**
 * Color contrast testing utilities for WCAG compliance
 */

export interface ContrastResult {
	ratio: number;
	passes: {
		aa: boolean;
		aaa: boolean;
		aaLarge: boolean;
		aaaLarge: boolean;
	};
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result && result[1] && result[2] && result[3] ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

/**
 * Calculate relative luminance of a color
 */
function getLuminance(r: number, g: number, b: number): number {
	const [rs, gs, bs] = [r, g, b].map(c => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});
	
	return 0.2126 * (rs ?? 0) + 0.7152 * (gs ?? 0) + 0.0722 * (bs ?? 0);
}

/**
 * Calculate contrast ratio between two colors
 */
export function calculateContrastRatio(color1: string, color2: string): number {
	const rgb1 = hexToRgb(color1);
	const rgb2 = hexToRgb(color2);
	
	if (!rgb1 || !rgb2) {
		throw new Error('Invalid color format. Use hex colors like #ffffff');
	}
	
	const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
	const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
	
	const brightest = Math.max(lum1, lum2);
	const darkest = Math.min(lum1, lum2);
	
	return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function checkContrastCompliance(ratio: number): ContrastResult['passes'] {
	return {
		aa: ratio >= 4.5,        // WCAG AA normal text
		aaa: ratio >= 7,         // WCAG AAA normal text
		aaLarge: ratio >= 3,     // WCAG AA large text (18pt+ or 14pt+ bold)
		aaaLarge: ratio >= 4.5   // WCAG AAA large text
	};
}

/**
 * Test contrast ratio and compliance
 */
export function testColorContrast(foreground: string, background: string): ContrastResult {
	const ratio = calculateContrastRatio(foreground, background);
	const passes = checkContrastCompliance(ratio);
	
	return { ratio, passes };
}

/**
 * Extract computed colors from DOM element
 */
export function getComputedColors(element: Element): { color: string; backgroundColor: string } {
	const styles = window.getComputedStyle(element);
	return {
		color: styles.color,
		backgroundColor: styles.backgroundColor
	};
}

/**
 * Convert RGB string to hex
 */
function rgbToHex(rgb: string): string {
	const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	if (!match) return '#000000';
	
	const [, r, g, b] = match;
	return '#' + [r, g, b].map(x => {
		const hex = parseInt(x || '0').toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	}).join('');
}

/**
 * Test contrast of DOM element
 */
export function testElementContrast(element: Element): ContrastResult | null {
	const { color, backgroundColor } = getComputedColors(element);
	
	// Skip if no background color is set
	if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
		return null;
	}
	
	try {
		const foregroundHex = rgbToHex(color);
		const backgroundHex = rgbToHex(backgroundColor);
		
		return testColorContrast(foregroundHex, backgroundHex);
	} catch (error) {
		console.warn('Could not test contrast for element:', element, error);
		return null;
	}
}

/**
 * Theme color definitions for testing
 */
export const themeColors = {
	light: {
		primary: '#2563eb',      // blue-600
		primaryForeground: '#ffffff',
		secondary: '#64748b',    // slate-500
		secondaryForeground: '#ffffff',
		background: '#ffffff',
		foreground: '#0f172a',   // slate-900
		muted: '#f1f5f9',       // slate-100
		mutedForeground: '#64748b', // slate-500
		border: '#e2e8f0',      // slate-200
		accent: '#f8fafc',      // slate-50
		accentForeground: '#0f172a'
	},
	dark: {
		primary: '#3b82f6',      // blue-500
		primaryForeground: '#ffffff',
		secondary: '#64748b',    // slate-500
		secondaryForeground: '#ffffff',
		background: '#0f172a',   // slate-900
		foreground: '#f8fafc',   // slate-50
		muted: '#1e293b',       // slate-800
		mutedForeground: '#94a3b8', // slate-400
		border: '#334155',      // slate-700
		accent: '#1e293b',      // slate-800
		accentForeground: '#f8fafc'
	}
};

/**
 * Test all theme color combinations
 */
export function testThemeContrast(theme: 'light' | 'dark'): Record<string, ContrastResult> {
	const colors = themeColors[theme];
	const results: Record<string, ContrastResult> = {};
	
	// Test primary combinations
	results['primary-on-background'] = testColorContrast(colors.primary, colors.background);
	results['primary-foreground-on-primary'] = testColorContrast(colors.primaryForeground, colors.primary);
	
	// Test secondary combinations
	results['secondary-on-background'] = testColorContrast(colors.secondary, colors.background);
	results['secondary-foreground-on-secondary'] = testColorContrast(colors.secondaryForeground, colors.secondary);
	
	// Test text combinations
	results['foreground-on-background'] = testColorContrast(colors.foreground, colors.background);
	results['muted-foreground-on-background'] = testColorContrast(colors.mutedForeground, colors.background);
	results['muted-foreground-on-muted'] = testColorContrast(colors.mutedForeground, colors.muted);
	
	// Test accent combinations
	results['accent-foreground-on-accent'] = testColorContrast(colors.accentForeground, colors.accent);
	
	// Test border visibility
	results['border-on-background'] = testColorContrast(colors.border, colors.background);
	
	return results;
}