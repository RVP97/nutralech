/**
 * Page-level Schema.org data. The site-wide Organization, WebSite and Person nodes are in
 * SITE_JSON_LD (src/lib/seo.ts); these point at them by @id instead of repeating them.
 */
import tools from "@/data/tools.json";
import { PLANS } from "@/lib/plans";
import { SITE } from "@/lib/seo";

const ORG = { "@id": `${SITE}/#organization` };
const PERSON = { "@id": `${SITE}/#person` };

/** Inicio › … › the page. Each crumb is [name, path]. */
export function breadcrumbs(...crumbs: [name: string, path: string][]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [["Inicio", "/"] as [string, string], ...crumbs].map(([name, path], i) => ({
			"@type": "ListItem",
			position: i + 1,
			name,
			item: path === "/" ? SITE : `${SITE}${path}`,
		})),
	};
}

/** A blog post, by Marialy, published by Nutralech. */
export function blogPosting(post: { url: string; title: string; description: string; date: string; keywords: string[] }) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		image: `${SITE}/images/marialy.webp`,
		datePublished: post.date,
		dateModified: post.date,
		inLanguage: "es-MX",
		keywords: post.keywords.join(", "),
		author: { "@type": "Person", ...PERSON, name: "Marialy Alonso", url: `${SITE}/acerca-de-mi` },
		publisher: { "@type": "Organization", ...ORG, name: "Nutralech", logo: { "@type": "ImageObject", url: `${SITE}/icons/android-icon-192x192.png` } },
		mainEntityOfPage: { "@type": "WebPage", "@id": post.url },
	};
}

/** A free calculator page: a web app plus its breadcrumbs. */
export function toolSchema(path: string) {
	const tool = tools.find((t) => t.link === path);
	if (!tool) throw new Error(`No tool for ${path} in src/data/tools.json`);
	return [
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			name: tool.title,
			description: tool.description,
			url: `${SITE}${path}`,
			applicationCategory: "HealthApplication",
			operatingSystem: "Web",
			inLanguage: "es-MX",
			isAccessibleForFree: true,
			offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
			creator: ORG,
		},
		breadcrumbs(["Herramientas", "/herramientas"], [tool.title, path]),
	];
}

/** The remote meal plans sold on the home page, with their prices. */
export const SERVICE_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${SITE}/#plan-a-distancia`,
	name: "Plan de alimentación a distancia",
	serviceType: "Plan de alimentación personalizado",
	description:
		"Plan de alimentación 100% personalizado, sin consulta presencial ni videollamada: llenas un documento con tus datos, objetivos, hábitos y rutina, y recibes tu plan en 5 a 7 días hábiles.",
	url: `${SITE}/#precios`,
	provider: PERSON,
	brand: ORG,
	areaServed: "Worldwide",
	availableLanguage: "es",
	offers: PLANS.map((plan) => ({
		"@type": "Offer",
		name: plan.name,
		description: plan.description,
		price: plan.price.replace(/,/g, ""),
		priceCurrency: "MXN",
		availability: "https://schema.org/InStock",
		url: `${SITE}/#precios`,
	})),
};

/** /acerca-de-mi is Marialy's profile page. */
export const PROFILE_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "ProfilePage",
	url: `${SITE}/acerca-de-mi`,
	inLanguage: "es-MX",
	mainEntity: {
		"@type": "Person",
		...PERSON,
		name: "Marialy Alonso",
		jobTitle: "Nutrióloga",
		image: `${SITE}/images/marialy.webp`,
		url: `${SITE}/acerca-de-mi`,
		worksFor: ORG,
		knowsAbout: [
			"Nutrición",
			"Planes de alimentación personalizados",
			"Alimentación intuitiva",
			"Relación con la comida",
			"Síndrome de ovario poliquístico",
			"Resistencia a la insulina",
			"Pérdida de grasa",
			"Aumento de masa muscular",
		],
		sameAs: ["https://www.instagram.com/nutralech/", "https://www.tiktok.com/@nutralech", "https://www.facebook.com/nutralech/"],
	},
};
