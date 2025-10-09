import { describe, it, expect } from 'vitest';
import { services, getServiceBySlug, getAllServiceSlugs } from './services';

describe('Services Data', () => {
	it('should have three services', () => {
		expect(services).toHaveLength(3);
	});

	it('should have all required service properties', () => {
		services.forEach(service => {
			expect(service).toHaveProperty('id');
			expect(service).toHaveProperty('title');
			expect(service).toHaveProperty('slug');
			expect(service).toHaveProperty('description');
			expect(service).toHaveProperty('longDescription');
			expect(service).toHaveProperty('icon');
			expect(service).toHaveProperty('features');
			expect(service).toHaveProperty('portfolio');
			expect(service).toHaveProperty('ctaText');
			expect(service).toHaveProperty('ctaLink');
		});
	});

	it('should have features with required properties', () => {
		services.forEach(service => {
			service.features.forEach(feature => {
				expect(feature).toHaveProperty('title');
				expect(feature).toHaveProperty('description');
				expect(typeof feature.title).toBe('string');
				expect(typeof feature.description).toBe('string');
			});
		});
	});

	it('should have portfolio items with required properties', () => {
		services.forEach(service => {
			service.portfolio.forEach(item => {
				expect(item).toHaveProperty('title');
				expect(item).toHaveProperty('description');
				expect(item).toHaveProperty('image');
				expect(item).toHaveProperty('technologies');
				expect(typeof item.title).toBe('string');
				expect(typeof item.description).toBe('string');
				expect(typeof item.image).toBe('string');
				expect(Array.isArray(item.technologies)).toBe(true);
			});
		});
	});

	it('should get service by slug', () => {
		const webDev = getServiceBySlug('web-development');
		expect(webDev).toBeDefined();
		expect(webDev?.title).toBe('Web Development');

		const medical = getServiceBySlug('medical-services');
		expect(medical).toBeDefined();
		expect(medical?.title).toBe('Medical Services');

		const courses = getServiceBySlug('courses');
		expect(courses).toBeDefined();
		expect(courses?.title).toBe('Courses');

		const nonExistent = getServiceBySlug('non-existent');
		expect(nonExistent).toBeUndefined();
	});

	it('should get all service slugs', () => {
		const slugs = getAllServiceSlugs();
		expect(slugs).toEqual(['web-development', 'medical-services', 'courses']);
	});

	it('should have unique service IDs and slugs', () => {
		const ids = services.map(s => s.id);
		const slugs = services.map(s => s.slug);
		
		expect(new Set(ids).size).toBe(services.length);
		expect(new Set(slugs).size).toBe(services.length);
	});
});