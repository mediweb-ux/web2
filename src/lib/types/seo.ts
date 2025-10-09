export interface SEOData {
	title: string;
	description: string;
	keywords?: string;
	ogImage?: string;
	ogType?: string;
	canonicalUrl?: string;
	structuredData?: any | any[];
	noindex?: boolean;
	nofollow?: boolean;
}

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export interface FAQItem {
	question: string;
	answer: string;
}

export interface SitemapPage {
	url: string;
	lastmod: string;
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority: string;
}