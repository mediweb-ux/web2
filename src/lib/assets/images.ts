// Portfolio images - using static folder for direct access
export const portfolioImages = {
	simulatorsenteret: '/images/simulatorsenteret_no.png',
	nafweb: '/images/nafweb_no.png',
	spelet: '/images/spelet_no.png',
	medsimnorge: '/images/medsimnorge_no.png'
};

// Hero background images
export const heroBackgrounds = {
	home: '/src/lib/assets/hero-backgrounds/bg-home.svg',
	webutvikling: '/src/lib/assets/hero-backgrounds/bg-webutvikling.png',
	legetjenester: '/src/lib/assets/hero-backgrounds/bg-legetjenester.png',
	kursvirksomhet: '/src/lib/assets/hero-backgrounds/bg-kursvirksomhet.png',
	kontakt: '/src/lib/assets/hero-backgrounds/bg-kontakt.png',
	omoss: '/src/lib/assets/hero-backgrounds/bg-omoss.png'
};

// Type for image keys
export type PortfolioImageKey = keyof typeof portfolioImages;
export type HeroBackgroundKey = keyof typeof heroBackgrounds;