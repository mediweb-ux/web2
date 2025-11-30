import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import Card from './Card.svelte';

expect.extend(toHaveNoViolations);

describe('Card Component', () => {
	const defaultProps = {
		title: 'Test Card',
		description: 'This is a test card description'
	};

	it('renders as article element with title and description', () => {
		const { container } = render(Card, { props: defaultProps });
		const article = container.querySelector('article');
		expect(article).toBeInTheDocument();
		expect(container).toHaveTextContent('Test Card');
		expect(container).toHaveTextContent('This is a test card description');
	});

	it('renders as clickable link when href is provided', () => {
		const { container } = render(Card, { 
			props: { 
				...defaultProps, 
				href: '/test-link'
			} 
		});
		const link = container.querySelector('a');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test-link');
	});

	it('has proper semantic structure', () => {
		const { container } = render(Card, { props: defaultProps });
		const article = container.querySelector('article');
		const heading = container.querySelector('h3');
		
		expect(article).toBeInTheDocument();
		expect(heading).toBeInTheDocument();
	});

	it('should not have accessibility violations - basic card', async () => {
		const { container } = render(Card, { props: defaultProps });
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should not have accessibility violations - clickable card', async () => {
		const { container } = render(Card, { 
			props: { 
				...defaultProps,
				href: '/test-link'
			} 
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});