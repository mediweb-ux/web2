import type { Service } from '$lib/types/service';
import type { SEOData, BreadcrumbItem, FAQItem } from '$lib/types/seo';

// Base URL for the site (should be configured via environment variables in production)
export const BASE_URL = 'https://agency.com';

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Agency',
		url: BASE_URL,
		description: 'Professional agency offering web development, medical services, and educational courses',
		logo: `${BASE_URL}/images/logo.png`,
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+1-555-0123',
			contactType: 'customer service',
			availableLanguage: 'English'
		},
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'US'
		},
		serviceArea: {
			'@type': 'Place',
			name: 'Global'
		},
		areaServed: 'Global',
		knowsAbout: ['Web Development', 'Medical Services', 'Educational Courses'],
		sameAs: [
			'https://twitter.com/agency',
			'https://linkedin.com/company/agency',
			'https://github.com/agency'
		]
	};
}

/**
 * Generate service structured data
 */
export function generateServiceStructuredData(service: Service) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: service.title,
		description: service.description,
		provider: {
			'@type': 'Organization',
			name: 'Agency',
			url: BASE_URL
		},
		serviceType: service.title,
		areaServed: 'Worldwide',
		url: `${BASE_URL}/services/${service.slug}`,
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: `${service.title} Services`,
			itemListElement: service.features.map((feature, index) => ({
				'@type': 'Offer',
				position: index + 1,
				itemOffered: {
					'@type': 'Service',
					name: feature.title,
					description: feature.description
				}
			}))
		}
	};
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: BreadcrumbItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: crumb.url
		}))
	};
}

/**
 * Generate website structured data
 */
export function generateWebsiteStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Agency',
		url: BASE_URL,
		description: 'Professional agency offering web development, medical services, and educational courses',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${BASE_URL}/search?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: FAQItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map(faq => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};
}

/**
 * Generate default SEO data for homepage
 */
export function getHomepageSEO(): SEOData {
	return {
		title: 'Professional Digital Agency - Web Development, Medical Services & Courses',
		description: 'Transform your ideas into powerful digital solutions. We specialize in modern web development, healthcare technology, and educational platforms.',
		keywords: 'web development, medical services, courses, agency, accessibility, performance, digital solutions',
		ogType: 'website',
		canonicalUrl: BASE_URL,
		structuredData: [
			generateOrganizationStructuredData(),
			generateWebsiteStructuredData()
		]
	};
}

/**
 * Generate SEO data for service pages
 */
export function getServiceSEO(service: Service): SEOData {
	const keywords = [
		service.title.toLowerCase(),
		...service.features.map(f => f.title.toLowerCase()),
		'professional services',
		'agency'
	].join(', ');

	return {
		title: `${service.title} - Professional ${service.title} Services | Agency`,
		description: service.description,
		keywords,
		ogType: 'website',
		canonicalUrl: `${BASE_URL}/services/${service.slug}`,
		structuredData: [
			generateServiceStructuredData(service),
			generateBreadcrumbStructuredData([
				{ name: 'Home', url: BASE_URL },
				{ name: 'Services', url: `${BASE_URL}/services` },
				{ name: service.title, url: `${BASE_URL}/services/${service.slug}` }
			])
		]
	};
}

/**
 * Generate SEO data for services overview page
 */
export function getServicesOverviewSEO(): SEOData {
	return {
		title: 'Our Services - Web Development, Medical Services & Courses | Agency',
		description: 'Explore our comprehensive range of professional services including modern web development, healthcare solutions, and educational platforms.',
		keywords: 'services, web development, medical services, courses, professional agency, digital solutions',
		ogType: 'website',
		canonicalUrl: `${BASE_URL}/services`,
		structuredData: generateBreadcrumbStructuredData([
			{ name: 'Home', url: BASE_URL },
			{ name: 'Services', url: `${BASE_URL}/services` }
		])
	};
}

/**
 * Generate SEO data for contact page
 */
export function getContactSEO(): SEOData {
	return {
		title: 'Contact Us - Get Started with Your Project | Agency',
		description: 'Ready to transform your ideas into digital excellence? Contact our team to discuss your web development, medical services, or educational platform needs.',
		keywords: 'contact, get quote, project consultation, web development inquiry, medical services contact',
		ogType: 'website',
		canonicalUrl: `${BASE_URL}/contact`,
		structuredData: generateBreadcrumbStructuredData([
			{ name: 'Home', url: BASE_URL },
			{ name: 'Contact', url: `${BASE_URL}/contact` }
		])
	};
}