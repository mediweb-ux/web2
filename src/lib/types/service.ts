export interface Feature {
	title: string;
	description: string;
	icon?: string;
}

export interface PortfolioItem {
	title: string;
	description: string;
	image: string;
	link?: string;
	technologies: string[];
}

export interface Service {
	id: string;
	title: string;
	slug: string;
	description: string;
	longDescription: string;
	icon: string;
	features: Feature[];
	portfolio: PortfolioItem[];
	ctaText: string;
	ctaLink: string;
}