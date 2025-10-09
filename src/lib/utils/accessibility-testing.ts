import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults, RunOptions } from 'axe-core';
// expect is available globally via vitest.config.ts globals: true

// Extend Jest matchers
expect.extend(toHaveNoViolations);

/**
 * Default axe configuration for consistent testing
 */
export const defaultAxeConfig: RunOptions = {
	rules: {
		// Enable all WCAG 2.1 AA rules
		'color-contrast': { enabled: true },
		'color-contrast-enhanced': { enabled: false }, // AAA level, optional
		'focus-order-semantics': { enabled: true },
		'hidden-content': { enabled: false }, // Allow hidden content for now
		'landmark-unique': { enabled: true },
		'region': { enabled: false }, // Disable region rule for component testing
		'page-has-heading-one': { enabled: false }, // Not applicable for component tests
		'bypass': { enabled: false } // Skip links not needed for individual components
	}
};

/**
 * Test accessibility of a DOM element or document
 */
export async function testAccessibility(
	element: Element | Document,
	config: RunOptions = defaultAxeConfig
): Promise<AxeResults> {
	const results = await axe(element, config);
	expect(results).toHaveNoViolations();
	return results;
}

/**
 * Test accessibility with custom rules disabled
 */
export async function testAccessibilityWithExceptions(
	element: Element | Document,
	disabledRules: string[] = [],
	config: RunOptions = defaultAxeConfig
): Promise<AxeResults> {
	const customConfig = {
		...config,
		rules: {
			...config.rules,
			...disabledRules.reduce((acc, rule) => ({ ...acc, [rule]: { enabled: false } }), {})
		}
	};
	
	return testAccessibility(element, customConfig);
}

/**
 * Test color contrast specifically
 */
export async function testColorContrast(element: Element | Document): Promise<AxeResults> {
	return axe(element, {
		runOnly: {
			type: 'rule',
			values: ['color-contrast']
		}
	});
}

/**
 * Test keyboard navigation accessibility
 */
export async function testKeyboardAccessibility(element: Element | Document): Promise<AxeResults> {
	return axe(element, {
		runOnly: {
			type: 'rule',
			values: ['focus-order-semantics', 'focusable-content', 'tabindex']
		}
	});
}

/**
 * Test ARIA implementation
 */
export async function testAriaAccessibility(element: Element | Document): Promise<AxeResults> {
	return axe(element, {
		runOnly: {
			type: 'tag',
			values: ['wcag2a', 'wcag2aa']
		}
	});
}