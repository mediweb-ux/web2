export interface PageContent {
	meta: {
		title: string;
		description: string;
		keywords: string[];
		ogImage?: string;
	};
	hero: HeroSection;
	sections: ContentSection[];
}

export interface HeroSection {
	title: string;
	subtitle: string;
	ctaText: string;
	ctaLink: string;
	backgroundImage?: string;
}

export interface ContentSection {
	type: 'text' | 'services' | 'about' | 'contact';
	title?: string;
	content: any; // Flexible content structure for CMS
}