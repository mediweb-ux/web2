import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Hero from './Hero.svelte';

describe('Hero Component', () => {
	const defaultProps = {
		title: 'Test Title',
		subtitle: 'Test Subtitle',
		ctaText: 'Get Started',
		ctaLink: '/contact'
	};

	it('renders title and subtitle correctly', () => {
		render(Hero, { props: defaultProps });
		
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
		expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
	});

	it('renders primary CTA button', () => {
		render(Hero, { props: defaultProps });
		
		const ctaButton = screen.getByRole('button', { name: 'Get Started' });
		expect(ctaButton).toBeInTheDocument();
		expect(ctaButton).toHaveAttribute('href', '/contact');
	});

	it('renders secondary CTA when provided', () => {
		const propsWithSecondary = {
			...defaultProps,
			secondaryCtaText: 'Learn More',
			secondaryCtaLink: '/about'
		};
		
		render(Hero, { props: propsWithSecondary });
		
		const secondaryButton = screen.getByRole('button', { name: 'Learn More' });
		expect(secondaryButton).toBeInTheDocument();
		expect(secondaryButton).toHaveAttribute('href', '/about');
	});

	it('does not render secondary CTA when not provided', () => {
		render(Hero, { props: defaultProps });
		
		expect(screen.queryByRole('button', { name: 'Learn More' })).not.toBeInTheDocument();
	});
});