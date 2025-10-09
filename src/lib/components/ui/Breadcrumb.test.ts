import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Breadcrumb from './Breadcrumb.svelte';

describe('Breadcrumb', () => {
	const mockItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Services', href: '/services' },
		{ label: 'Web Development', href: '/services/web-development', current: true }
	];

	it('renders breadcrumb items correctly', () => {
		render(Breadcrumb, { props: { items: mockItems } });

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Services')).toBeInTheDocument();
		expect(screen.getByText('Web Development')).toBeInTheDocument();
	});

	it('renders links for non-current items', () => {
		render(Breadcrumb, { props: { items: mockItems } });

		const homeLink = screen.getByRole('link', { name: 'Home' });
		const servicesLink = screen.getByRole('link', { name: 'Services' });

		expect(homeLink).toHaveAttribute('href', '/');
		expect(servicesLink).toHaveAttribute('href', '/services');
	});

	it('renders current item as span with aria-current', () => {
		render(Breadcrumb, { props: { items: mockItems } });

		const currentItem = screen.getByText('Web Development');
		expect(currentItem.tagName).toBe('SPAN');
		expect(currentItem).toHaveAttribute('aria-current', 'page');
	});

	it('has proper accessibility attributes', () => {
		render(Breadcrumb, { props: { items: mockItems } });

		const nav = screen.getByRole('navigation');
		expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
	});

	it('renders separators between items', () => {
		render(Breadcrumb, { props: { items: mockItems } });

		// Should have 2 separators for 3 items (check for SVG elements)
		const container = screen.getByRole('navigation');
		const svgElements = container.querySelectorAll('svg');
		expect(svgElements).toHaveLength(2);
	});

	it('handles empty items array', () => {
		render(Breadcrumb, { props: { items: [] } });

		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
	});

	it('applies correct CSS classes', () => {
		render(Breadcrumb, { props: { items: mockItems } });

		const homeLink = screen.getByRole('link', { name: 'Home' });
		const currentItem = screen.getByText('Web Development');

		expect(homeLink).toHaveClass('text-muted-foreground', 'hover:text-foreground');
		expect(currentItem).toHaveClass('text-foreground', 'font-medium');
	});
});