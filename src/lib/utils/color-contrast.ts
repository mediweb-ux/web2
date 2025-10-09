/**
 * Color contrast utilities for accessibility testing
 * Based on WCAG 2.1 guidelines
 */

/**
 * Convert HSL to RGB
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
	h /= 360;
	s /= 100;
	l /= 100;

	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
	const m = l - c / 2;

	let r = 0, g = 0, b = 0;

	if (0 <= h && h < 1/6) {
		r = c; g = x; b = 0;
	} else if (1/6 <= h && h < 2/6) {
		r = x; g = c; b = 0;
	} else if (2/6 <= h && h < 3/6) {
		r = 0; g = c; b = x;
	} else if (3/6 <= h && h < 4/6) {
		r = 0; g = x; b = c;
	} else if (4/6 <= h && h < 5/6) {
		r = x; g = 0; b = c;
	} else if (5/6 <= h && h < 1) {
		r = c; g = 0; b = x;
	}

	return [
		Math.round((r + m) * 255),
		Math.round((g + m) * 255),
		Math.round((b + m) * 255)
	];
}

/**
 * Calculate relative luminance of a color
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
	const [rs, gs, bs] = [r, g, b].map(c => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});

	return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: [number, number, number], color2: [number, number, number]): number {
	const l1 = getRelativeLuminance(...color1);
	const l2 = getRelativeLuminance(...color2);
	
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function meetsWCAGStandards(contrastRatio: number, level: 'AA' | 'AAA' = 'AA', isLargeText: boolean = false): boolean {
	if (level === 'AAA') {
		return isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7;
	}
	return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
}

/**
 * Parse HSL string and convert to RGB
 */
export function parseHSLToRGB(hslString: string): [number, number, number] {
	// Parse "221 83% 45%" format
	const matches = hslString.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
	if (!matches) {
		throw new Error(`Invalid HSL format: ${hslString}`);
	}
	
	const h = parseInt(matches[1]);
	const s = parseInt(matches[2]);
	const l = parseInt(matches[3]);
	
	return hslToRgb(h, s, l);
}

/**
 * Test color combinations from our design system
 */
export function testDesignSystemColors(): Record<string, { ratio: number; passes: boolean }> {
	const lightTheme = {
		primary: '221 83% 45%',
		primaryForeground: '0 0% 100%',
		secondary: '210 11% 93%',
		secondaryForeground: '222 84% 15%',
		background: '0 0% 100%',
		foreground: '222 84% 15%',
		muted: '210 11% 96%',
		mutedForeground: '215 16% 35%'
	};

	const results: Record<string, { ratio: number; passes: boolean }> = {};

	// Test primary button
	const primaryBg = parseHSLToRGB(lightTheme.primary);
	const primaryText = parseHSLToRGB(lightTheme.primaryForeground);
	const primaryRatio = getContrastRatio(primaryBg, primaryText);
	results['primary-button'] = {
		ratio: primaryRatio,
		passes: meetsWCAGStandards(primaryRatio)
	};

	// Test secondary button
	const secondaryBg = parseHSLToRGB(lightTheme.secondary);
	const secondaryText = parseHSLToRGB(lightTheme.secondaryForeground);
	const secondaryRatio = getContrastRatio(secondaryBg, secondaryText);
	results['secondary-button'] = {
		ratio: secondaryRatio,
		passes: meetsWCAGStandards(secondaryRatio)
	};

	// Test body text
	const bodyBg = parseHSLToRGB(lightTheme.background);
	const bodyText = parseHSLToRGB(lightTheme.foreground);
	const bodyRatio = getContrastRatio(bodyBg, bodyText);
	results['body-text'] = {
		ratio: bodyRatio,
		passes: meetsWCAGStandards(bodyRatio)
	};

	// Test muted text
	const mutedBg = parseHSLToRGB(lightTheme.muted);
	const mutedText = parseHSLToRGB(lightTheme.mutedForeground);
	const mutedRatio = getContrastRatio(mutedBg, mutedText);
	results['muted-text'] = {
		ratio: mutedRatio,
		passes: meetsWCAGStandards(mutedRatio)
	};

	return results;
}