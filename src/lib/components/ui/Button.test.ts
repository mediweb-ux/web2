import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button.svelte';

expect.extend(toHaveNoViolations);

describe('Button Component', () => {
	it('renders button element', () => {
		const { container } = render(Button);
		const button = container.querySelector('button');
		expect(button).toBeInTheDocument();
	});

	it('renders as anchor when href is provided', () => {
		const { container } = render(Button, { props: { href: '/test-link' } });
		const link = container.querySelector('a');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test-link');
	});

	it('is disabled when disabled prop is true', () => {
		const { container } = render(Button, { props: { disabled: true } });
		const button = container.querySelector('button');
		expect(button).toBeDisabled();
	});

	it('should not have accessibility violations - basic button', async () => {
		const { container } = render(Button, { props: { ariaLabel: 'Test button' } });
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should not have accessibility violations - disabled button', async () => {
		const { container } = render(Button, { 
			props: { 
				disabled: true,
				ariaLabel: 'Disabled test button'
			} 
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should not have accessibility violations - link button', async () => {
		const { container } = render(Button, { 
			props: { 
				href: '/test',
				ariaLabel: 'Link test button'
			} 
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});