import type { Service } from '$lib/types/service';
import { portfolioImages } from '$lib/assets/images';

export const services: Service[] = [
	{
		id: 'webutvikling',
		title: 'Webutvikling',
		slug: 'webutvikling',
		description: 'Responsive websider og webapplikasjoner bygget med moderne teknologi.',
		longDescription:
			'Vi bygger websider som ser bra ut, er mobilvennlige og som laster raskt. Vi ønsker at du skal kunne levere gode brukeropplevelser. Vi jobber med moderne rammeverk og responsiv design, og resultatet skal bli en webside som vokser med deg eller ditt firma.',
		icon: 'code',
		features: [
			{
				title: 'Responsiv design',
				description: 'Vi bygger nettsiden til å fungere både på mobil og desktop.',
				icon: 'mobile'
			},
			{
				title: 'Moderne rammeverk',
				description:
					'Vi bygger vanligvis med Next.js eller SvelteKit for å kunne sikre deg sylskarp teknologi for optimal funksjon.',
				icon: 'layers'
			},
			{
				title: 'SEO optimalisering',
				description:
					'Søkemotoroptimalisering fra bunnen av for å hjelpe deg til bedre synlighet på nett.',
				icon: 'search'
			},
			{
				title: 'Funksjonalitet og prestasjon',
				description:
					'Lynende raske innlastingstider og smidig interaksjon for den beste brukervennligheten.',
				icon: 'zap'
			},
			{
				title: 'Tilgjengelighet',
				description:
					'Vi jobber med utgangspunkt i WCAG som et minimum når vi bygger nettsider for å sikre tilgjengelighet for alle typer brukere.',
				icon: 'accessibility'
			},
			{
				title: 'CMS-integrasjon',
				description:
					'Vi tilbyr sider med enkel innholdsredigering ved hjelp av for eksempel Prismic eller Directus.',
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
		ctaLink: '/kontakt?service=webutvikling',
		detailedContent: {
			introduction: [
				'Noe av det vi har gjort lengst, er utvikling av websider. Vi har holdt på med dette siden midten av 1990-tallet, så vi har fulgt utviklingen av webteknologier og -standarder i mange år. Vi har programmert nettsider ment for bruk i nettleseren <a href="https://lynx.invisible-island.net/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Lynx</a>, vi har vært med på overgangen fra statiske HTML-sider til dynamiske sider og vi har vært med på å "style" nettsider ved å bruke tabelloppsett, før CSS ble en ting. Kort og godt, vi har fulgt utviklingen av HTML, CSS, JavaScript og andre teknologier som har kommet og gått i løpet av disse årene.',
				'Når vi bygger nettsider, følger vi en (her forenklet) tretrinns prosess. Vi vil gjerne forklare den nærmere.'
			],
			processSteps: [
				{
					stepNumber: 1,
					title: 'Steg 1',
					subtitle: 'Innsamling av informasjon',
					backgroundColor: 'bg-green-50',
					content: [
						'Utvikling av websider handler om veldig mye mer enn bare å finne og sette sammen riktig informasjon - som du kan lime inn i et program for publisering. I hvert fall ikke etter vår mening!',
						'Når du velger MediWeb Solutions, så vil vi i stedet følge dere gjennom hele prosessen videre, fra starten til dere har en ferdig nettside.',
						'Men vi bruker stort sett lengst tid på <em>Steg 1</em>, som faktisk er å samle inn all informasjon som vi trenger for å kunne hjelpe dere på best mulig måte. Typiske spørsmål dere får i denne delen av prosessen er: Hva/hvem er målgruppen for hjemmesiden deres? Hvilken funksjonalitet ønsker dere på hjemmesiden? Trenger dere interaktive elementer eller for eksempel nettbutikk med mulighet for å kjøpe varer/tjenester? Hvilken design ser dere for dere? Er det en spesiell merkevare eller en designfilosofi dere vil følge?',
						'Vi hjelper dere gjennom hele denne prosessen, og sørger for at vi sammen finner de beste løsningene for deres behov.',
						'I tillegg vil vi vite mest mulig om dere! Hvem er dere, og hva vil dere fortelle med nettsiden? Jo mer vi vet om dere, jo lettere er det å legge opp nettsider som best mulig reflekterer dere på nett.',
						'Det er også i Steg 1 vi trenger alt dere har av bilder, logoer, aktuelle farger, typografi og profilprogram som skal brukes på nettsiden - eller som vi vil bruke når vi bygger for dere. Eier dere ikke et domenenavn ennå, eller skal dere ha webhotell og tilsvarende tekniske ting? Slike ting er viktig i Steg 1, og målet er at vi skal ha alt vi trenger for å bygge i Steg 2.'
					],
					image: '/images/boy-looks-at-information-on-the-plate.jpg'
				},
				{
					stepNumber: 2,
					title: 'Steg 2',
					subtitle: 'Første utkast',
					backgroundColor: 'bg-blue-50',
					content: [
						'Basert på det vi har av informasjon som beskrevet i Steg 1, kan vi begynne å bygge et første utkast av nettsiden deres. Vi holder kontakten med dere som kunde underveis i prosessen, og dere vil få tilgang til vårt byggeområde, slik at dere etter hvert kan se hvordan arbeidet går.',
						'Normalt regner vi med å bruke ca en måneds tid på Steg 2, noe avhengig av andre oppdrag vi har på samme tid. Vi velger imidlertid å bruke en del tid også på Steg 2, slik at vi er sikre på at nettsidene fungerer slik dere ønsker, og det er viktig for oss å kunne yte det lille ekstra i denne fasen. Vi vil heller bruke litt lengre tid enn å hoppe bukk til Steg 3 og levere en nettside som ikke oppfyller deres behov!'
					],
					image: '/images/wireframe-layout.jpg'
				},
				{
					stepNumber: 3,
					title: 'Steg 3',
					subtitle: 'Publisering av nettsiden',
					backgroundColor: 'bg-green-50',
					content: [
						'Når dere er fornøyd med utseende og funksjonalitet for nettsiden, er vi klare for siste steg. Før nettsiden publiseres, går vi gjennom elementene og sørger for at den er tilgjengelig for personer med funksjonshemminger. Dette siste er viktig, og er et krav for alle nye nettsider som lages i dag.',
						'Med nettsider bygd opp etter WCAG-standard, er vi klare for å publisere dem til deres domene. Dere har kanskje allerede publisert en lanseringsdato, og vi ønsker å kunne levere til riktig tid. Til slutt er alt klart for første besøkende til deres nettside.'
					]
				}
			]
		}
	},
	{
		id: 'legetjenester',
		title: 'Legetjenester',
		slug: 'legetjenester',
		description:
			'Profesjonelle legetjenester til ulike behov, fra anestesi på din klinikk til medic på store arrangement.',
		longDescription:
			'Vi tilbyr ulike legetjenester til deg som kunde, fra ren anestesilegedekning (vi tilbyr også fullt anestesioppsett) på din klinikk, til medic-funksjoner på arrangement.',
		icon: 'heart',
		features: [
			{
				title: 'Anestesitjenester',
				description:
					'Vi tilbyr anestesitjenester på din klinikk hvis du har pasienter som trenger narkose.',
				icon: 'users'
			},
			{
				title: 'Medic-funksjon',
				description:
					'Har du behov for "medic" til et arrangement, idrettsstevne eller konsert? Ta kontakt!',
				icon: 'shield'
			},
			{
				title: 'Andre legetjenester',
				description:
					'Vi har ikke listet opp alt her, men har du behov for legetjenester utover det som er nevnt, så ta kontakt.',
				icon: 'video'
			}
		],
		portfolio: [],
		ctaText: 'Kontakt oss',
		ctaLink: '/kontakt?service=legetjenester',
		detailedContent: {
			introduction: [
				'Håkon Trønnes, som startet MediWeb Solutions, er utdannet anestesilege - og det er derfor vi kan tilby den litt unike kombinasjonen av tjenester som vi gjør. I tillegg til å kunne stille med anestesilege, kan vi også tilby anestesisykepleier(e) eller intensivsykepleier etter behov. Med over 20 års erfaring som anestesilege fra det offentlige og det private, kan vi tilby "det meste" av legetjenester. Vi går gjennom noen av dem her.'
			],
			processSteps: [
				{
					stepNumber: 1,
					title: 'Anestesi',
					subtitle: 'Anestesitjenester',
					backgroundColor: 'bg-green-50',
					content: [
						'Vi jobber sammen med et velrennomert firma for tilbud om anestesivirksomhet rundt omkring i hele Norge. Vi kan (evt i samarbeid med dem) tilby anestesitjenester tilpasset deres behov, for eksempel til tannlegekontor og liknende. Vi har også erfaring fra det private helsevesenet (eks. Aleris og Volvat), og kan tilby tjenester til private klinikker og sykehus.',
						'Ta kontakt med oss for en uforpliktende prat om deres behov, og vi vil komme tilbake til dere med et tilbud.'
					],
					image: '/images/anestesi-illustrasjon.jpg'
				},
				{
					stepNumber: 2,
					title: 'Medic',
					subtitle: 'Idrettsarrangement eller annen event',
					backgroundColor: 'bg-blue-50',
					content: [
						'Mange arrangementer, konserter eller andre eventer setter krav til at det er helsepersonell til stede. Vi kan tilby alt fra én (anestesi-)lege til en lege og en sykepleier. Ved spesielle behov har vi mulighet til å innhente forsterkninger fra kompetente folk og utvide teamet enda mer.',
						'Dersom du har behov for legetjenester til idrettsarrangement, konsert, festival eller liknende, <a href="/kontakt" class="text-primary hover:underline">ta kontakt med oss</a> så jobber vi derfra!'
					],
					image: '/images/medic-illustration.jpg'
				},
				{
					stepNumber: 3,
					title: 'Annet',
					subtitle: 'Andre legetjenester',
					backgroundColor: 'bg-green-50',
					content: [
						'Dersom du ikke finner det du har bruk for her, så vil vi gjerne at du tar kontakt. Vi jobber med å utvikle flere tilbud, men de er ikke lagt ut på hjemmesiden ennå. Kanskje kan vi likevel hjelpe deg?',
						'<a href="/kontakt" class="text-primary hover:underline">La oss høre fra deg</a>!'
					]
				}
			]
		}
	},
	{
		id: 'kursvirksomhet',
		title: 'Kursvirksomhet',
		slug: 'kursvirksomhet',
		description:
			'Kurs både fysisk og online, det siste via vår egne, intuitive læringsplattform (under konstruksjon).',
		longDescription:
			'Vi holder fysiske kurs og driver med e-læring for å skape inkluderende og lærerike kurs.',
		icon: 'book',
		features: [
			{
				title: '3-timers førstehjelpskurs',
				description:
					'Dette er vårt mest populære kurs, som passer for deg som trenger en oppfriskning eller for deg som ikke har hatt kurs før.',
				icon: 'graduation-cap'
			},
			{
				title: 'HLR-kurs på ulike nivå',
				description: 'Ulike HLR-kurs, inkludert BHLR, DHLR og AHLR.',
				icon: 'play'
			},
			{
				title: 'Skreddersydde kurs',
				description: 'Vi kan tilpasse kursene etter deres spesifikke behov og målgruppe.',
				icon: 'target'
			}
		],
		portfolio: [],
		ctaText: 'Delta på kurs',
		ctaLink: '/kontakt?service=kursvirksomhet',
		detailedContent: {
			introduction: [
				'Vi har lang erfaring med kursvirksomhet av ulik slag. Håkon Trønnes, som startet MediWeb Solutions, har drevet undervisning for Røde Kors og internt på sykehuset, og han har mange års erfaring som instruktør/fasilitator ved medisinsk simulering.',
				'Han har gjennomgått sertifisering som Certified Healthcare Simulation Educator (CHSE) og som anestesilege har han blant annet vært delaktig i opplæring i avansert hjerte-lunge-redning (AHLR) for helsepersonell. Vi ønsker nå å bringe denne erfaringen ut til dere!'
			],
			processSteps: [
				{
					stepNumber: 1,
					title: 'Førstehjelp',
					subtitle: 'Grunnkurs i førstehjelp',
					backgroundColor: 'bg-green-50',
					content: [
						'Vi jobber med å utarbeide et helt eget kurskonsept for grunnkurs i førstehjelp. Det finnes utallige tilbydere av kurs i førstehjelp i Norge, vi ønsker å være annerledes ved å tilby kurs der du får høre det du trenger.',
						'Vi har troen på at man både lærer og husker bedre når kunnskapen blir <em>satt i en sammenheng</em>. Vi bringer derfor erfaringen fra et liv som anestesilege, som inkluderer arbeid i ambulansetjenesten og i Luftambulansen, inn i kurset.'
					],
					image: '/images/anestesi-illustrasjon.jpg'
				},
				{
					stepNumber: 2,
					title: 'HLR-kurs',
					subtitle: 'Hjerte-lunge-redning på ulike nivå',
					backgroundColor: 'bg-blue-50',
					content: [
						'Som anestesilege med erfaring fra AHLR-opplæring (Avansert Hjerte-Lunge-Redning) kan vi tilby HLR-kurs på flere nivå - fra grunnleggende BHLR til avansert AHLR for helsepersonell.',
						'Våre kurs bygger på reell erfaring fra akuttmedisin og gir deltakerne praktiske ferdigheter som kan redde liv i kritiske situasjoner.'
					]
				},
				{
					stepNumber: 3,
					title: 'Skreddersydde kurs',
					subtitle: 'Tilpasset deres behov',
					backgroundColor: 'bg-green-50',
					content: [
						'Vi forstår at ulike organisasjoner og bedrifter har forskjellige behov når det kommer til opplæring. Derfor tilbyr vi skreddersydde kurs som er tilpasset deres spesifikke situasjon og målgruppe.',
						'Med bakgrunn som Certified Healthcare Simulation Educator (CHSE) kan vi utvikle kurs som kombinerer teori med realistisk simulering og praktisk trening. <a href="/kontakt" class="text-primary hover:underline">Kontakt oss</a> for å diskutere deres behov!'
					]
				}
			]
		}
	}
];

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
	return services.find((service) => service.slug === slug);
}

// Helper function to get all service slugs (useful for static generation)
export function getAllServiceSlugs(): string[] {
	return services.map((service) => service.slug);
}
