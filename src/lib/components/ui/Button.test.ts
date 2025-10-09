import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button.svelte';

expect.extend(toHaveNoViolations);

describe('Button Component', () => {
	it('renders button element by default', () => {
		const { container } = render(Button);
		const button = container.querySelector('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('type', 'button');
	});

	it('applies primary variant classes by default', () => {
		const { container } = render(Button);
		const button = container.querySelector('button');
		expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
	});

	it('applies secondary variant classes', () => {
		const { container } = render(Button, { props: { variant: 'secondary' } });
		const button = container.querySelector('button');
		expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
	});

	it('applies outline variant classes', () => {
		const { container } = render(Button, { props: { variant: 'outline' } });
		const button = container.querySelector('button');
		expect(button).toHaveClass('border-2', 'border-primary');
	});

	it('applies small size classes', () => {
		const { container } = render(Button, { props: { size: 'sm' } });
		const button = container.querySelector('button');
		expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
	});

	it('applies large size classes', () => {
		const { container } = render(Button, { props: { size: 'lg' } });
		const button = container.querySelector('button');
		expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
	});

	it('is disabled when disabled prop is true', () => {
		const { container } = render(Button, { props: { disabled: true } });
		const button = container.querySelector('button');
		expect(button).toBeDisabled();
		expect(button).toHaveClass('disabled:opacity-50');
	});

	it('shows loading spinner when loading is true', () => {
		const { container } = render(Button, { props: { loading: true } });
		const button = container.querySelector('button');
		const spinner = button?.querySelector('svg');
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveClass('animate-spin');
	});

	it('renders as anchor when href is provided', () => {
		const { container } = render(Button, { props: { href: '/test-link' } });
		const link = container.querySelector('a');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test-link');
		expect(link).toHaveAttribute('role', 'button');
	});

	it('applies ARIA label when provided', () => {
		const { container } = render(Button, { props: { ariaLabel: 'Custom button label' } });
		const button = container.querySelector('button');
		expect(button).toHaveAttribute('aria-label', 'Custom button label');
	});

	it('applies ARIA describedby when provided', () => {
		const { container } = render(Button, { props: { ariaDescribedBy: 'button-description' } });
		const button = container.querySelector('button');
		expect(button).toHaveAttribute('aria-describedby', 'button-description');
	});

	it('applies submit type when specified', () => {
		const { container } = render(Button, { props: { type: 'submit' } });
		const button = container.querySelector('button');
		expect(button).toHaveAttribute('type', 'submit');
	});

	it('has focus ring classes for accessibility', () => {
		const { container } = render(Button);
		const button = container.querySelector('button');
		expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2');
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