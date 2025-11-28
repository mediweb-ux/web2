import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import RelatedServices from './RelatedServices.svelte';
import type { Service } from '$lib/types/service';

const mockServices: Service[] = [
	{
		id: 'web-development',
		title: 'Web Development',
		slug: 'web-development',
		description: 'Modern web development services',
		longDescription: 'Comprehensive web development solutions',
		icon: 'code',
		features: [
			{ title: 'Responsive Design', description: 'Mobile-first approach' },
			{ title: 'Modern Frameworks', description: 'Latest technologies' },
			{ title: 'SEO Optimization', description: 'Search engine friendly' }
		],
		portfolio: [],
		ctaText: 'Start Project',
		ctaLink: '/contact'
	},
	{
		id: 'medical-services',
		title: 'Medical Services',
		slug: 'medical-services',
		description: 'Healthcare digital solutions',
		longDescription: 'Comprehensive healthcare solutions',
		icon: 'heart',
		features: [
			{ title: 'Patient Management', description: 'Comprehensive patient records' },
			{ title: 'HIPAA Compliance', description: 'Healthcare privacy standards' },
			{ title: 'Telemedicine', description: 'Remote consultation platforms' }
		],
		portfolio: [],
		ctaText: 'Discuss Needs',
		ctaLink: '/contact'
	},
	{
		id: 'courses',
		title: 'Courses',
		slug: 'courses',
		description: 'Online learning platforms',
		longDescription: 'Interactive learning experiences',
		icon: 'book',
		features: [
			{ title: 'LMS Development', description: 'Custom learning systems' },
			{ title: 'Interactive Content', description: 'Engaging multimedia' },
			{ title: 'Progress Tracking', description: 'Comprehensive analytics' }
		],
		portfolio: [],
		ctaText: 'Build Platform',
		ctaLink: '/contact'
	}
];

describe('RelatedServices', () => {
	it('renders related services excluding current service', () => {
		render(RelatedServices, { 
			props: { 
				services: mockServices, 
				currentServiceId: 'web-development' 
			} 
		});

		expect(screen.getByText('Medical Services')).toBeInTheDocument();
		expect(screen.getByText('Courses')).toBeInTheDocument();
		expect(screen.queryByText('Web Development')).not.toBeInTheDocument();
	});

	it('limits to 2 related services', () => {
		render(RelatedServices, { 
			props: { 
				services: mockServices, 
				currentServiceId: 'web-development' 
			} 
		});

		const serviceCards = screen.getAllByRole('button', { name: /Les mer om/ });
		expect(serviceCards).toHaveLength(2);
	});

	it('displays service features', () => {
		render(RelatedServices, { 
			props: { 
				services: mockServices, 
				currentServiceId: 'web-development' 
			} 
		});

		expect(screen.getByText('Patient Management')).toBeInTheDocument();
		expect(screen.getByText('HIPAA Compliance')).toBeInTheDocument();
		expect(screen.getByText('Telemedicine')).toBeInTheDocument();
	});

	it('renders correct service links', () => {
		render(RelatedServices, { 
			props: { 
				services: mockServices, 
				currentServiceId: 'web-development' 
			} 
		});

		const learnMoreButtons = screen.getAllByRole('button', { name: /Les mer om/ });
		expect(learnMoreButtons[0]).toHaveAttribute('href', '/tjenester/medical-services');
	});

	it('displays main CTA button', () => {
		render(RelatedServices, { 
			props: { 
				services: mockServices, 
				currentServiceId: 'web-development' 
			} 
		});

		const ctaButton = screen.getByRole('button', { name: /Kontakt oss for ditt neste prosjekt/ });
		expect(ctaButton).toHaveAttribute('href', '/kontakt');
	});

	it('does not render when no related services', () => {
		const firstService = mockServices[0];
		if (!firstService) {
			throw new Error('Mock services array is empty');
		}
		
		render(RelatedServices, { 
			props: { 
				services: [firstService], 
				currentServiceId: 'web-development' 
			} 
		});

		expect(screen.queryByText('Utforsk våre andre tjenester')).not.toBeInTheDocument();
	});

	it('has proper heading structure', () => {
		render(RelatedServices, { 
			props: { 
				services: mockServices, 
				currentServiceId: 'web-development' 
			} 
		});

		const mainHeading = screen.getByRole('heading', { level: 2, name: 'Utforsk våre andre tjenester' });
		const serviceHeadings = screen.getAllByText('Medical Services');

		expect(mainHeading).toBeInTheDocument();
		expect(serviceHeadings.length).toBeGreaterThan(0);
	});
});