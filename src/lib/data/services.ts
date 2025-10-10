import type { Service } from '$lib/types/service';
import { portfolioImages } from '$lib/assets/images';

export const services: Service[] = [
	{
		id: 'webutvikling',
		title: 'Webutvikling',
		slug: 'webutvikling',
		description: 'Responsive websider og webapplikasjoner bygget med moderne teknologi.',
		longDescription: 'Vi bygger websider som ser bra ut, er mobilvennlige og som laster raskt. Vi ønsker at du skal kunne levere gode brukeropplevelser. Vi jobber med moderne rammeverk og responsiv design, og resultatet skal bli en webside som vokser med deg eller ditt firma.',
		icon: 'code',
		features: [
			{
				title: 'Responsiv design',
				description: 'Vi bygger nettsiden til å fungere både på mobil og desktop.',
				icon: 'mobile'
			},
			{
				title: 'Moderne rammeverk',
				description: 'Vi bygger vanligvis med Next.js eller SvelteKit for &aring; kunne sikre deg sylskarp teknologi for optimal funksjon.',
				icon: 'layers'
			},
			{
				title: 'SEO optimalisering',
				description: 'Søkemotoroptimalisering fra bunnen av for å hjelpe deg til bedre synlighet på nett.',
				icon: 'search'
			},
			{
				title: 'Funksjonalitet og prestasjon',
				description: 'Lynende raske innlastingstider og smidig interaksjon for den beste brukervennligheten.',
				icon: 'zap'
			},
			{
				title: 'Tilgjengelighet',
				description: 'Vi jobber med utgangspunkt i WCAG som et minimum når vi bygger nettsider for å sikre tilgjengelighet for alle typer brukere.',
				icon: 'accessibility'
			},
			{
				title: 'CMS-integrasjon',
				description: 'Vi tilbyr sider med enkel innholdsredigering ved hjelp av for eksempel Prismic eller Directus.',
				icon: 'edit'
			}
		],
		portfolio: [
			{
				title: 'Medisinsk SimulatorSenter',
				description: 'Hjemmeside for Medisinsk Simulatorsenter på St Olavs hospital.',
				image: portfolioImages.simulatorsenteret,
				link: 'https://www.simulatorsenteret.no',
				technologies: ['HTML', 'CSS', 'WordPress']
			},
			{
				title: 'Spelet om Heilag Olav',
				description: 'Hjemmeside for frivillige og profesjonelle på Spelet om Heilag Olav.',
				image: portfolioImages.spelet,
				link: 'https://www.spelet.no',
				technologies: ['HTML', 'CSS', 'WordPress']
			},
			{
				title: 'Norsk anestesiologisk forening',
				description: 'Hjemmeside for Norsk anestesiologisk forening.',
				image: portfolioImages.nafweb,
				link: 'https://www.nafweb.no',
				technologies: ['HTML', 'CSS', 'MODX']
			},
			{
				title: 'MedSimNorge',
				description: 'Hjemmeside for MedSimNorge.',
				image: portfolioImages.medsimnorge,
				link: 'https://www.medsimnorge.no',
				technologies: ['HTML', 'CSS', 'Next.js', 'Prismic']
			}
		],
		ctaText: 'Kom i gang',
		ctaLink: '/kontakt?service=webutvikling'
	},
	{
		id: 'legetjenester',
		title: 'Legetjenester',
		slug: 'legetjenester',
		description: 'Profesjonelle legetjenester til ulike behov, fra anestesi på din klinikk til medic på store arrangement.',
		longDescription: 'Vi tilbyr ulike legetjenester til deg som kunde, fra ren anestesilegedekning (vi tilbyr også fullt anestesioppsett) på din klinikk, til medic-funksjoner på arrangement.',
		icon: 'heart',
		features: [
			{
				title: 'Anestesitjenester',
				description: 'Vi tilbyr anestesitjenester på din klinikk hvis du har pasienter som trenger narkose.',
				icon: 'users'
			},
			{
				title: 'Medic-funksjon',
				description: 'Har du behov for "medic" til et arrangement, idrettsstevne eller konsert? Ta kontakt!',
				icon: 'shield'
			},
			{
				title: 'Andre legetjenester',
				description: 'Vi har ikke listet opp alt her, men har du behov for legetjenester utover det som er nevnt, så ta kontakt.',
				icon: 'video'
			}
		],
		portfolio: [],
		ctaText: 'Kontakt oss',
		ctaLink: '/kontakt?service=legetjenester'
	},
	{
		id: 'kursvirksomhet',
		title: 'Kursvirksomhet',
		slug: 'kursvirksomhet',
		description: 'Kurs både fysisk og online, det siste via vår egne, intuitive læringsplattform (under konstruksjon).',
		longDescription: 'Vi holder fysiske kurs og driver med e-læring for å skape inkluderende og lærerike kurs.',
		icon: 'book',
		features: [
			{
				title: '3-timers førstehjelpskurs',
				description: 'Dette er vårt mest populære kurs, som passer for deg som trenger en oppfriskning eller for deg som ikke har hatt kurs før.',
				icon: 'graduation-cap'
			},
			{
				title: 'HLR-kurs på ulike nivå',
				description: 'Ulike HLR-kurs, inkludert BHLR, DHLR og AHLR.',
				icon: 'play'
			}
		],
		portfolio: [
			{
				title: 'Online University Platform',
				description: 'Comprehensive LMS for a major university with 10,000+ students and advanced analytics.',
				image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=640&h=360&fit=crop&crop=center',
				technologies: ['Django', 'React', 'PostgreSQL', 'Redis']
			},
			{
				title: 'Corporate Training Portal',
				description: 'Employee training platform with certification tracking and compliance reporting.',
				image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&h=360&fit=crop&crop=center',
				technologies: ['Laravel', 'Vue.js', 'MySQL', 'AWS S3']
			},
			{
				title: 'Language Learning App',
				description: 'Interactive language learning platform with speech recognition and gamification.',
				image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=640&h=360&fit=crop&crop=center',
				link: 'https://example-language-app.com',
				technologies: ['React Native', 'Node.js', 'MongoDB', 'WebRTC']
			}
		],
		ctaText: 'Delta på kurs',
		ctaLink: '/kontakt?service=kursvirksomhet'
	}
];

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
	return services.find(service => service.slug === slug);
}

// Helper function to get all service slugs (useful for static generation)
export function getAllServiceSlugs(): string[] {
	return services.map(service => service.slug);
}