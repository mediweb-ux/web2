import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button.svelte';
import Card from './Card.svelte';
import ContactForm from './ContactForm.svelte';
import Icon from './Icon.svelte';

expect.extend(toHaveNoViolations);

describe('UI Components Accessibility Suite', () => {
	describe('WCAG 2.1 AA Compliance', () => {
		it('Button component meets WCAG standards', async () => {
			const { container } = render(Button, { 
				props: { ariaLabel: 'Test button' }
			});
			
			const results = await axe(container, {
				tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
			});
			expect(results).toHaveNoViolations();
		});

		it('Card component meets WCAG standards', async () => {
			const { container } = render(Card, { 
				props: { 
					title: 'Test Card',
					description: 'This card should meet WCAG standards',
					features: ['Feature 1', 'Feature 2']
				} 
			});
			
			const results = await axe(container, {
				tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
			});
			expect(results).toHaveNoViolations();
		});

		it('ContactForm component meets WCAG standards', async () => {
			const { container } = render(ContactForm);
			
			const results = await axe(container, {
				tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
			});
			expect(results).toHaveNoViolations();
		});

		it('Icon component meets WCAG standards', async () => {
			const { container } = render(Icon, { 
				props: { 
					name: 'check',
					ariaLabel: 'Success indicator'
				} 
			});
			
			const results = await axe(container, {
				tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
			});
			expect(results).toHaveNoViolations();
		});
	});

	describe('Screen Reader Compatibility', () => {
		it('Icon component provides proper screen reader support', async () => {
			const { container } = render(Icon, { 
				props: { 
					name: 'check',
					ariaLabel: 'Success indicator'
				} 
			});
			
			const results = await axe(container, {
				rules: {
					'image-alt': { enabled: true },
					'aria-allowed-attr': { enabled: true },
					'aria-required-attr': { enabled: true }
				}
			});
			expect(results).toHaveNoViolations();
		});

		it('Card component has proper semantic structure', async () => {
			const { container } = render(Card, { 
				props: { 
					title: 'Semantic Test Card',
					description: 'Testing semantic HTML structure',
					href: '/test-link'
				} 
			});
			
			const results = await axe(container, {
				rules: {
					'heading-order': { enabled: true },
					'link-name': { enabled: true }
				}
			});
			expect(results).toHaveNoViolations();
		});
	});

	describe('Form Accessibility', () => {
		it('ContactForm has proper labels and error handling', async () => {
			const { container } = render(ContactForm);
			
			const results = await axe(container, {
				rules: {
					'label': { enabled: true },
					'form-field-multiple-labels': { enabled: true },
					'aria-input-field-name': { enabled: true },
					'aria-required-attr': { enabled: true }
				}
			});
			expect(results).toHaveNoViolations();
		});
	});

	describe('Interactive Elements', () => {
		it('Button has accessible name', async () => {
			const { container } = render(Button, { 
				props: { ariaLabel: 'Accessible button name' }
			});
			
			const results = await axe(container, {
				rules: {
					'button-name': { enabled: true },
					'link-name': { enabled: true }
				}
			});
			expect(results).toHaveNoViolations();
		});

		it('Card with link has accessible name', async () => {
			const { container } = render(Card, { 
				props: { 
					title: 'Test Card',
					description: 'Test description',
					href: '/test'
				}
			});
			
			const results = await axe(container, {
				rules: {
					'link-name': { enabled: true }
				}
			});
			expect(results).toHaveNoViolations();
		});
	});
});