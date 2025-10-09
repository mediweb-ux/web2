import type { Service } from '$lib/types/service';

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
				title: 'E-commerce Platform',
				description: 'A modern e-commerce solution with advanced filtering, payment integration, and inventory management.',
				image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&h=360&fit=crop&crop=center',
				link: 'https://example-ecommerce.com',
				technologies: ['SvelteKit', 'TypeScript', 'Stripe', 'Prismic CMS']
			},
			{
				title: 'Corporate Website',
				description: 'Professional corporate website with multi-language support and advanced SEO optimization.',
				image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=360&fit=crop&crop=center',
				link: 'https://example-corporate.com',
				technologies: ['Next.js', 'React', 'Contentful', 'Vercel']
			},
			{
				title: 'SaaS Dashboard',
				description: 'Complex dashboard application with real-time data visualization and user management.',
				image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=360&fit=crop&crop=center',
				technologies: ['Vue.js', 'TypeScript', 'D3.js', 'Firebase']
			}
		],
		ctaText: 'Start Your Project',
		ctaLink: '/contact?service=web-development'
	},
	{
		id: 'legetjenester',
		title: 'Legetjenester',
		slug: 'legetjenester',
		description: 'Profesjonelle (anestesi-)legetjenester til ulike behov, fra anestesi på din klinikk til medic på store arrangement.',
		longDescription: 'We provide innovative digital solutions for healthcare providers, from patient management systems to telemedicine platforms. Our HIPAA-compliant solutions help medical practices streamline operations and improve patient care.',
		icon: 'heart',
		features: [
			{
				title: 'Anestesitjenester',
				description: 'Vi tilbyr anestesitjenester på din klinikk hvis du har pasienter som trenger narkose.',
				icon: 'users'
			},
			{
				title: 'Medic',
				description: 'Har du behov for medic til et arrangement, idretsstevne eller konsert? Ta kontakt!',
				icon: 'shield'
			},
			{
				title: 'Andre legetjenester',
				description: 'Vi har ikke listet opp alt her, men har du behov for legetjenester utover det som er nevnt, så ta kontakt.',
				icon: 'video'
			}
		],
		portfolio: [
			{
				title: 'Clinic Management System',
				description: 'Complete practice management solution with scheduling, billing, and patient records.',
				image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=640&h=360&fit=crop&crop=center',
				technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS HIPAA']
			},
			{
				title: 'Telemedicine Platform',
				description: 'Secure video consultation platform with prescription management and patient portal.',
				image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=640&h=360&fit=crop&crop=center',
				technologies: ['Vue.js', 'WebRTC', 'Express.js', 'MongoDB']
			},
			{
				title: 'Medical Device Dashboard',
				description: 'Real-time monitoring dashboard for medical device data and patient vitals.',
				image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=640&h=360&fit=crop&crop=center',
				technologies: ['Angular', 'TypeScript', 'Socket.io', 'InfluxDB']
			}
		],
		ctaText: 'Diskuter dine behov',
		ctaLink: '/kontakt?service=legetjenester'
	},
	{
		id: 'kursvirksomhet',
		title: 'Kursvirksomhet',
		slug: 'kursvirksomhet',
		description: 'Kurs både fysisk og online, det siste via vår egne, intuitive læringsplattform (under konstruksjon).',
		longDescription: 'Vi holder fysiske kurs og driver med e-læring for å skape inkluderende og lærerike kursgh custom learning management systems, interactive course platforms, and educational tools. Our solutions support various learning formats and provide comprehensive analytics for educators.',
		icon: 'book',
		features: [
			{
				title: 'LMS Development',
				description: 'Custom learning management systems tailored to your educational goals and requirements.',
				icon: 'graduation-cap'
			},
			{
				title: 'Interactive Content',
				description: 'Engaging multimedia content with quizzes, assignments, and interactive elements.',
				icon: 'play'
			},
			{
				title: 'Progress Tracking',
				description: 'Comprehensive analytics and reporting for student progress and course effectiveness.',
				icon: 'trending-up'
			},
			{
				title: 'Multi-format Support',
				description: 'Support for video, audio, documents, and interactive content in various formats.',
				icon: 'file'
			},
			{
				title: 'Certification System',
				description: 'Automated certificate generation and credential management for course completion.',
				icon: 'award'
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