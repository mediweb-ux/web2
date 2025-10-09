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

	it('applies correct size classes', () => {
		const { container } = render(Icon, { props: { name: 'check', size: 'lg' } });
		const svg = container.querySelector('svg');
		expect(svg).toHaveClass('w-6', 'h-6');
	});

	it('applies small size classes', () => {
		const { container } = render(Icon, { props: { name: 'check', size: 'sm' } });
		const svg = container.querySelector('svg');
		expect(svg).toHaveClass('w-4', 'h-4');
	});

	it('applies xl size classes', () => {
		const { container } = render(Icon, { props: { name: 'check', size: 'xl' } });
		const svg = container.querySelector('svg');
		expect(svg).toHaveClass('w-8', 'h-8');
	});

	it('applies custom color style', () => {
		const { container } = render(Icon, { props: { name: 'check', color: 'red' } });
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('style', 'color: red;');
	});

	it('is hidden from screen readers by default', () => {
		const { container } = render(Icon, { props: { name: 'check' } });
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('aria-hidden', 'true');
		expect(svg).toHaveAttribute('role', 'presentation');
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
		expect(svg).toHaveAttribute('role', 'img');
		expect(svg).toHaveAttribute('aria-hidden', 'false');
	});

	it('renders with title when provided', () => {
		const { container } = render(Icon, { 
			props: { 
				name: 'check', 
				title: 'Check mark' 
			} 
		});
		const svg = container.querySelector('svg');
		const title = svg?.querySelector('title');
		expect(title).toHaveTextContent('Check mark');
		expect(svg).toHaveAttribute('role', 'img');
	});

	it('can be explicitly hidden with ariaHidden prop', () => {
		const { container } = render(Icon, { 
			props: { 
				name: 'check', 
				ariaHidden: true,
				ariaLabel: 'This should be ignored'
			} 
		});
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('aria-hidden', 'true');
		expect(svg).toHaveAttribute('role', 'presentation');
	});

	it('renders known icons with proper paths', () => {
		const knownIcons = ['check', 'x', 'menu', 'sun', 'moon', 'code', 'heart', 'book', 'mail', 'phone'];
		
		knownIcons.forEach(iconName => {
			const { container } = render(Icon, { props: { name: iconName } });
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			
			// Should have either a path or specific elements for the icon
			const hasPath = svg?.querySelector('path');
			const hasCircle = svg?.querySelector('circle');
			const hasRect = svg?.querySelector('rect');
			
			expect(hasPath || hasCircle || hasRect).toBeTruthy();
		});
	});

	it('renders fallback for unknown icons', () => {
		const { container } = render(Icon, { props: { name: 'unknown-icon' } });
		const svg = container.querySelector('svg');
		const rect = svg?.querySelector('rect');
		const text = svg?.querySelector('text');
		
		expect(rect).toBeInTheDocument();
		expect(text).toHaveTextContent('?');
	});

	it('renders loading icon with special attributes', () => {
		const { container } = render(Icon, { props: { name: 'loading' } });
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('fill', 'none');
		expect(svg).toHaveAttribute('stroke', 'currentColor');
		expect(svg).toHaveAttribute('stroke-width', '2');
		
		const circle = svg?.querySelector('circle');
		const path = svg?.querySelector('path');
		expect(circle).toBeInTheDocument();
		expect(path).toBeInTheDocument();
	});

	it('renders menu icon with stroke attributes', () => {
		const { container } = render(Icon, { props: { name: 'menu' } });
		const svg = container.querySelector('svg');
		const path = svg?.querySelector('path');
		expect(path).toHaveAttribute('stroke', 'currentColor');
		expect(path).toHaveAttribute('stroke-linecap', 'round');
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