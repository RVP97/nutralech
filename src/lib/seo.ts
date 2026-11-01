/**
 * Page SEO tags, built the way the Next.js site merged its root layout metadata with each page's
 * generatePageMetadata() call, so titles, descriptions, canonicals and link previews stay the same.
 */
export const SITE = "https://www.nutralech.com";

const SITE_DESCRIPTION =
	"Mejora tu salud con Nutralech y Marialy Alonso. Plan de alimentación a distancia 100% personalizado, recetas y consejos para un bienestar equilibrado.";
const SITE_TITLE = "Nutrición y Bienestar con Marialy Alonso: Nutralech";

export interface PageSeo {
	title: string;
	description: string;
	keywords: string;
	canonical: string;
	noindex?: boolean;
	og: {
		title: string;
		description: string;
		url: string;
		siteName: string;
		imageAlt: string;
	};
	twitter: { title: string; description: string; site?: string };
}

interface PageInput {
	title: string;
	description: string;
	keywords: string[];
	/** Absolute URL; it is the canonical and og:url. */
	url: string;
	/** The home page's title is not followed by " | Nutralech". */
	bareTitle?: boolean;
}

/** generatePageMetadata() from the Next.js site. */
export function pageSeo({ title, description, keywords, url, bareTitle }: PageInput): PageSeo {
	return {
		title: bareTitle ? title : `${title} | Nutralech`,
		description,
		keywords: keywords.join(","),
		canonical: url,
		og: {
			title,
			description,
			url,
			siteName: "Nutralech: Marialy Alonso",
			imageAlt: "Foto de frente en blanco y negro de Marialy Alonso",
		},
		twitter: { title, description },
	};
}

/** The root layout's own metadata, for pages that set none (payment confirmation, 404). */
export function defaultSeo(noindex = false): PageSeo {
	return {
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		keywords:
			"salud, bienestar, nutrición, plan a distancia, plan alimenticio personalizado, nutralech, marialy alonso",
		canonical: SITE,
		noindex,
		og: {
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
			url: SITE,
			siteName: "Nutralech",
			imageAlt: "Fotografia de Marialy Alonso, también conocida como Nutralech",
		},
		twitter: {
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
			site: "@nutralech",
		},
	};
}

/** JSON for a <script type="application/ld+json">, safe to inline in HTML. */
export const safeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

export const SITE_JSON_LD = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${SITE}/#organization`,
			name: "Nutralech",
			url: SITE,
			logo: {
				"@type": "ImageObject",
				url: `${SITE}/icons/android-icon-192x192.png`,
				width: 192,
				height: 192,
			},
			sameAs: [
				"https://www.instagram.com/nutralech/",
				"https://www.tiktok.com/@nutralech",
				"https://www.facebook.com/nutralech/",
			],
			contactPoint: {
				"@type": "ContactPoint",
				telephone: "+52-744-346-8252",
				contactType: "customer service",
				availableLanguage: "Spanish",
			},
		},
		{
			"@type": "WebSite",
			"@id": `${SITE}/#website`,
			url: SITE,
			name: "Nutralech",
			description:
				"Mejora tu salud con Nutralech y Marialy Alonso. Plan de alimentación a distancia 100% personalizado, recetas y consejos para un bienestar equilibrado.",
			publisher: { "@id": `${SITE}/#organization` },
			inLanguage: "es",
		},
		{
			"@type": "Person",
			"@id": `${SITE}/#person`,
			name: "Marialy Alonso",
			url: `${SITE}/acerca-de-mi`,
			jobTitle: "Nutrióloga",
			worksFor: { "@id": `${SITE}/#organization` },
			sameAs: ["https://www.instagram.com/nutralech/", "https://www.tiktok.com/@nutralech"],
		},
	],
};
