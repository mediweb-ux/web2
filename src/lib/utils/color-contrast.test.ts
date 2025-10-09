// Vitest globals are available via vitest.config.ts globals: true
import { testDesignSystemColors, getContrastRatio, meetsWCAGStandards, parseHSLToRGB } from './color-contrast';

describe('Color Contrast Utilities', () => {
	describe('parseHSLToRGB', () => {
		it('should parse HSL string correctly', () => {
			const rgb = parseHSLToRGB('221 83% 45%');
			expect(rgb).toEqual([20, 80, 210]); // Approximate values for the blue
		});

		it('should handle pure white', () => {
			const rgb = parseHSLToRGB('0 0% 100%');
			expect(rgb).toEqual([255, 255, 255]);
		});

		it('should handle pure black', () => {
			const rgb = parseHSLToRGB('0 0% 0%');
			expect(rgb).toEqual([0, 0, 0]);
		});
	});

	describe('getContrastRatio', () => {
		it('should calculate correct contrast ratio for black and white', () => {
			const black: [number, number, number] = [0, 0, 0];
			const white: [number, number, number] = [255, 255, 255];
			const ratio = getContrastRatio(black, white);
			expect(ratio).toBeCloseTo(21, 0); // Perfect contrast
		});

		it('should calculate correct contrast ratio for same colors', () => {
			const color: [number, number, number] = [128, 128, 128];
			const ratio = getContrastRatio(color, color);
			expect(ratio).toBe(1); // No contrast
		});
	});

	describe('meetsWCAGStandards', () => {
		it('should pass WCAG AA for sufficient contrast', () => {
			expect(meetsWCAGStandards(4.5)).toBe(true);
			expect(meetsWCAGStandards(7)).toBe(true);
		});

		it('should fail WCAG AA for insufficient contrast', () => {
			expect(meetsWCAGStandards(3)).toBe(false);
			expect(meetsWCAGStandards(4.4)).toBe(false);
		});

		it('should handle large text requirements', () => {
			expect(meetsWCAGStandards(3, 'AA', true)).toBe(true); // Large text needs 3:1
			expect(meetsWCAGStandards(2.9, 'AA', true)).toBe(false);
		});

		it('should handle AAA requirements', () => {
			expect(meetsWCAGStandards(7, 'AAA')).toBe(true);
			expect(meetsWCAGStandards(6.9, 'AAA')).toBe(false);
			expect(meetsWCAGStandards(4.5, 'AAA', true)).toBe(true); // Large text AAA
		});
	});

	describe('testDesignSystemColors', () => {
		it('should test all design system color combinations', () => {
			const results = testDesignSystemColors();
			
			expect(results).toHaveProperty('primary-button');
			expect(results).toHaveProperty('secondary-button');
			expect(results).toHaveProperty('body-text');
			expect(results).toHaveProperty('muted-text');
			
			// All combinations should pass WCAG AA
			Object.entries(results).forEach(([key, result]) => {
				expect(result.passes).toBe(true);
				expect(result.ratio).toBeGreaterThanOrEqual(4.5);
			});
		});

		it('should have high contrast ratios for critical elements', () => {
			const results = testDesignSystemColors();
			
			// Primary button should have excellent contrast
			expect(results['primary-button'].ratio).toBeGreaterThanOrEqual(4.5);
			
			// Body text should have excellent contrast
			expect(results['body-text'].ratio).toBeGreaterThanOrEqual(7);
		});
	});
});