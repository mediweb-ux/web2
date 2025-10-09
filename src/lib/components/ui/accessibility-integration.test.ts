import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';

import Button from './Button.svelte';
import Card from './Card.svelte';
import Icon from './Icon.svelte';

expect.extend(toHaveNoViolations);

describe('Accessibility Integration Tests', () => {
	describe('jest-axe Integration with Svelte 5', () => {
		it('should work with Button component', async () => {
			const { container } = render(Button, { 
				props: { ariaLabel: 'Test button' } 
			});
			
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it('should work with Card component', async () => {
			const { container } = render(Card, { 
				props: { 
					title: 'Test Card',
					description: 'Test description'
				} 
			});
			
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it('should work with Icon component', async () => {
			const { container } = render(Icon, { 
				props: { 
					name: 'check',
					ariaLabel: 'Check icon'
				} 
			});
			
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it('should detect accessibility violations', async () => {
			// Create a button without accessible name to test violation detection
			const { container } = render(Button);
			
			const results = await axe(container);
			// This should have violations (button without accessible name)
			expect(results.violations.length).toBeGreaterThan(0);
			expect(results.violations[0].id).toBe('button-name');
		});

		it('should work with custom axe configuration', async () => {
			const { container } = render(Button, { 
				props: { ariaLabel: 'Test button' } 
			});
			
			const results = await axe(container, {
				rules: {
					'color-contrast': { enabled: false }
				}
			});
			
			expect(results).toHaveNoViolations();
		});

		it('should work with WCAG tags', async () => {
			const { container } = render(Button, { 
				props: { ariaLabel: 'Test button' } 
			});
			
			const results = await axe(container, {
				tags: ['wcag2a', 'wcag2aa']
			});
			
			expect(results).toHaveNoViolations();
		});
	});

	describe('axe-core with Svelte 5 Components', () => {
		it('should handle complex component structures', async () => {
			const { container } = render(Card, { 
				props: { 
					title: 'Complex Card',
					description: 'Card with multiple elements',
					href: '/test',
					linkText: 'Learn more'
				} 
			});
			
			const results = await axe(container, {
				tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
			});
			
			expect(results).toHaveNoViolations();
		});

		it('should work with dynamic content', async () => {
			const { container, rerender } = render(Button, { 
				props: { ariaLabel: 'Initial label' } 
			});
			
			// Test initial state
			let results = await axe(container);
			expect(results).toHaveNoViolations();
			
			// Update props and test again
			await rerender({ ariaLabel: 'Updated label' });
			results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});