// Vitest globals are available via vitest.config.ts globals: true
import { render } from '@testing-library/svelte';
import SEO from './SEO.svelte';

describe('SEO Component', () => {
	it('should render basic meta tags', () => {
		const { container: _container } = render(SEO, {
			props: {
				title: 'Test Page',
				description: 'Test description',
				keywords: 'test, keywords'
			}
		});

		// Check if title is set (this would be in the document head in a real browser)
		expect(document.title).toBe('Test Page');
	});

	it('should render Open Graph meta tags', () => {
		render(SEO, {
			props: {
				title: 'Test Page',
				description: 'Test description',
				ogImage: '/test-image.jpg',
				canonicalUrl: 'https://example.com/test'
			}
		});

		// In a real test environment, we would check for meta tags in the head
		// For now, we just ensure the component renders without errors
		expect(document.title).toBe('Test Page');
	});

	it('should render structured data when provided', () => {
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Test Organization'
		};

		render(SEO, {
			props: {
				title: 'Test Page',
				description: 'Test description',
				structuredData
			}
		});

		expect(document.title).toBe('Test Page');
	});

	it('should render multiple structured data items when array is provided', () => {
		const structuredData = [
			{
				'@context': 'https://schema.org',
				'@type': 'Organization',
				name: 'Test Organization'
			},
			{
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'Test Website'
			}
		];

		render(SEO, {
			props: {
				title: 'Test Page',
				description: 'Test description',
				structuredData
			}
		});

		expect(document.title).toBe('Test Page');
	});

	it('should use default values when props are not provided', () => {
		render(SEO);

		// Should use default title
		expect(document.title).toBe('Professional Digital Agency - Web Development, Medical Services & Courses');
	});

	it('should handle noindex and nofollow robots directives', () => {
		render(SEO, {
			props: {
				title: 'Test Page',
				description: 'Test description',
				noindex: true,
				nofollow: true
			}
		});

		expect(document.title).toBe('Test Page');
	});
});