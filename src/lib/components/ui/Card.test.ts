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

	it('renders as article element', () => {
		const { container } = render(Card, { props: defaultProps });
		const article = container.querySelector('article');
		expect(article).toBeInTheDocument();
	});

	it('renders title as h3 heading', () => {
		const { container } = render(Card, { props: defaultProps });
		const heading = container.querySelector('h3');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('Test Card');
	});

	it('renders description text', () => {
		const { container } = render(Card, { props: defaultProps });
		const description = container.querySelector('div');
		expect(description).toHaveTextContent('This is a test card description');
	});

	it('renders image when provided', () => {
		const { container } = render(Card, { 
			props: { 
				...defaultProps, 
				image: '/test-image.jpg',
				imageAlt: 'Test image'
			} 
		});
		const image = container.querySelector('img');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', '/test-image.jpg');
		expect(image).toHaveAttribute('alt', 'Test image');
		expect(image).toHaveAttribute('loading', 'lazy');
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

	it('renders features list when provided', () => {
		const features = ['Feature 1', 'Feature 2', 'Feature 3'];
		const { container } = render(Card, { 
			props: { 
				...defaultProps, 
				features
			} 
		});
		
		const featuresList = container.querySelector('ul[aria-label="Key features"]');
		expect(featuresList).toBeInTheDocument();
		
		const listItems = container.querySelectorAll('li');
		expect(listItems).toHaveLength(3);
		
		features.forEach((feature, index) => {
			expect(listItems[index]).toHaveTextContent(feature);
		});
	});

	it('has proper semantic structure', () => {
		const { container } = render(Card, { props: defaultProps });
		const article = container.querySelector('article');
		const header = container.querySelector('header');
		const heading = container.querySelector('h3');
		
		expect(article).toBeInTheDocument();
		expect(header).toBeInTheDocument();
		expect(heading).toBeInTheDocument();
	});

	it('applies hover effects for interactive cards', () => {
		const { container } = render(Card, { 
			props: { 
				...defaultProps, 
				href: '/test'
			} 
		});
		const article = container.querySelector('article');
		expect(article).toHaveClass('hover:shadow-xl', 'cursor-pointer');
	});

	it('has proper ARIA attributes for clickable cards', () => {
		const { container } = render(Card, { 
			props: { 
				...defaultProps, 
				href: '/test'
			} 
		});
		const link = container.querySelector('a');
		expect(link).toHaveAttribute('aria-describedby');
	});

	it('should not have accessibility violations - basic card', async () => {
		const { container } = render(Card, { props: defaultProps });
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should not have accessibility violations - card with image', async () => {
		const { container } = render(Card, { 
			props: { 
				...defaultProps,
				image: '/test.jpg',
				imageAlt: 'Test image description'
			} 
		});
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

	it('should not have accessibility violations - card with features', async () => {
		const { container } = render(Card, { 
			props: { 
				...defaultProps,
				features: ['Feature 1', 'Feature 2']
			} 
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});