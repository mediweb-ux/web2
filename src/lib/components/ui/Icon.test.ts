import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import Icon from './Icon.svelte';

expect.extend(toHaveNoViolations);

describe('Icon Component', () => {
	it('renders SVG element', () => {
		const { container } = render(Icon, { props: { name: 'check' } });
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	it('is hidden from screen readers by default', () => {
		const { container } = render(Icon, { props: { name: 'check' } });
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('aria-hidden', 'true');
	});

	it('renders with aria-label when provided', () => {
		const { container } = render(Icon, { 
			props: { 
				name: 'check', 
				ariaLabel: 'Success icon' 
			} 
		});
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('aria-label', 'Success icon');
	});

	it('renders fallback for unknown icons', () => {
		const { container } = render(Icon, { props: { name: 'unknown-icon' } });
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	it('should not have accessibility violations - decorative icon', async () => {
		const { container } = render(Icon, { props: { name: 'check' } });
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should not have accessibility violations - icon with label', async () => {
		const { container } = render(Icon, { 
			props: { 
				name: 'check', 
				ariaLabel: 'Success' 
			} 
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should not have accessibility violations - icon with title', async () => {
		const { container } = render(Icon, { 
			props: { 
				name: 'check', 
				title: 'Check mark icon' 
			} 
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});