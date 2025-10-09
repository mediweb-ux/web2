import { describe, it, expect } from 'vitest';
import {
	generateOrganizationStructuredData,
	generateServiceStructuredData,
	generateBreadcrumbStructuredData,
	generateWebsiteStructuredData,
	generateFAQStructuredData,
	getHomepageSEO,
	getServiceSEO,
	getServicesOverviewSEO,
	getContactSEO
} from './seo';
import { services } from '$lib/data/services';

describe('SEO Utils', () => {
	describe('generateOrganizationStructuredData', () => {
		it('should generate valid organization structured data', () => {
			const data = generateOrganizationStructuredData();
			
			expect(data['@context']).toBe('https://schema.org');
			expect(data['@type']).toBe('Organization');
			expect(data.name).toBe('Agency');
			expect(data.url).toBe('https://agency.com');
			expect(data.description).toContain('Professional agency');
			expect(data.knowsAbout).toEqual(['Web Development', 'Medical Services', 'Educational Courses']);
		});
	});

	describe('generateServiceStructuredData', () => {
		it('should generate valid service structured data', () => {
			const service = services[0]; // Web Development service
			if (!service) {
				throw new Error('Service not found');
			}
			const data = generateServiceStructuredData(service);
			
			expect(data['@context']).toBe('https://schema.org');
			expect(data['@type']).toBe('Service');
			expect(data.name).toBe(service.title);
			expect(data.description).toBe(service.description);
			expect(data.provider.name).toBe('Agency');
			expect(data.hasOfferCatalog.itemListElement).toHaveLength(service.features.length);
		});
	});

	describe('generateBreadcrumbStructuredData', () => {
		it('should generate valid breadcrumb structured data', () => {
			const breadcrumbs = [
				{ name: 'Home', url: 'https://agency.com' },
				{ name: 'Services', url: 'https://agency.com/services' },
				{ name: 'Web Development', url: 'https://agency.com/services/web-development' }
			];
			
			const data = generateBreadcrumbStructuredData(breadcrumbs);
			
			expect(data['@context']).toBe('https://schema.org');
			expect(data['@type']).toBe('BreadcrumbList');
			expect(data.itemListElement).toHaveLength(3);
			expect(data.itemListElement?.[0]?.position).toBe(1);
			expect(data.itemListElement?.[0]?.name).toBe('Home');
		});
	});

	describe('generateWebsiteStructuredData', () => {
		it('should generate valid website structured data', () => {
			const data = generateWebsiteStructuredData();
			
			expect(data['@context']).toBe('https://schema.org');
			expect(data['@type']).toBe('WebSite');
			expect(data.name).toBe('Agency');
			expect(data.url).toBe('https://agency.com');
			expect(data.potentialAction['@type']).toBe('SearchAction');
		});
	});

	describe('generateFAQStructuredData', () => {
		it('should generate valid FAQ structured data', () => {
			const faqs = [
				{ question: 'What services do you offer?', answer: 'We offer web development, medical services, and courses.' },
				{ question: 'How long does a project take?', answer: 'Project timelines vary based on complexity and requirements.' }
			];
			
			const data = generateFAQStructuredData(faqs);
			
			expect(data['@context']).toBe('https://schema.org');
			expect(data['@type']).toBe('FAQPage');
			expect(data.mainEntity).toHaveLength(2);
			expect(data.mainEntity?.[0]?.['@type']).toBe('Question');
			expect(data.mainEntity?.[0]?.acceptedAnswer?.['@type']).toBe('Answer');
		});
	});

	describe('getHomepageSEO', () => {
		it('should return proper homepage SEO data', () => {
			const seo = getHomepageSEO();
			
			expect(seo.title).toContain('Professional Digital Agency');
			expect(seo.description).toContain('Transform your ideas');
			expect(seo.keywords).toContain('web development');
			expect(seo.ogType).toBe('website');
			expect(seo.canonicalUrl).toBe('https://agency.com');
			expect(Array.isArray(seo.structuredData)).toBe(true);
		});
	});

	describe('getServiceSEO', () => {
		it('should return proper service SEO data', () => {
			const service = services[0]; // Web Development service
			if (!service) {
				throw new Error('Service not found');
			}
			const seo = getServiceSEO(service);
			
			expect(seo.title).toContain(service.title);
			expect(seo.description).toBe(service.description);
			expect(seo.keywords).toContain(service.title.toLowerCase());
			expect(seo.canonicalUrl).toBe(`https://agency.com/services/${service.slug}`);
			expect(Array.isArray(seo.structuredData)).toBe(true);
		});
	});

	describe('getServicesOverviewSEO', () => {
		it('should return proper services overview SEO data', () => {
			const seo = getServicesOverviewSEO();
			
			expect(seo.title).toContain('Our Services');
			expect(seo.description).toContain('comprehensive range');
			expect(seo.keywords).toContain('services');
			expect(seo.canonicalUrl).toBe('https://agency.com/services');
		});
	});

	describe('getContactSEO', () => {
		it('should return proper contact SEO data', () => {
			const seo = getContactSEO();
			
			expect(seo.title).toContain('Contact Us');
			expect(seo.description).toContain('Ready to transform');
			expect(seo.keywords).toContain('contact');
			expect(seo.canonicalUrl).toBe('https://agency.com/contact');
		});
	});
});