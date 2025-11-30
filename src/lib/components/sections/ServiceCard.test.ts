import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ServiceCard from './ServiceCard.svelte';
import type { Service } from '$lib/types/service';

const mockService: Service = {
	id: 'test-service',
	title: 'Test Service',
	slug: 'test-service',
	description: 'This is a test service description',
	longDescription: 'This is a longer test service description',
	icon: 'code',
	features: [
		{ title: 'Feature 1', description: 'Description 1' },
		{ title: 'Feature 2', description: 'Description 2' },
		{ title: 'Feature 3', description: 'Description 3' }
	],
	portfolio: [],
	ctaText: 'Learn More',
	ctaLink: '/test-service'
};

describe('ServiceCard Component', () => {
	it('should render service title and description', () => {
		render(ServiceCard, { service: mockService });
		
		expect(screen.getByText('Test Service')).toBeInTheDocument();
		expect(screen.getByText('This is a test service description')).toBeInTheDocument();
	});

	it('should render first three features', () => {
		render(ServiceCard, { service: mockService });
		
		expect(screen.getByText('Feature 1')).toBeInTheDocument();
		expect(screen.getByText('Feature 2')).toBeInTheDocument();
		expect(screen.getByText('Feature 3')).toBeInTheDocument();
	});

	it('should have proper accessibility structure', () => {
		render(ServiceCard, { service: mockService });
		
		const headings = screen.getAllByRole('heading', { level: 3 });
		const serviceHeading = headings.find(h => h.textContent === 'Test Service');
		expect(serviceHeading).toBeInTheDocument();
	});
});