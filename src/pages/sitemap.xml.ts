/** /sitemap.xml with the same URLs, change frequencies and priorities as the Next.js sitemap. */
import tools from "@/data/tools.json";
import { getPosts, parsePostDate } from "@/lib/posts";
import { SITE } from "@/lib/seo";

type Entry = [loc: string, lastmod: string, changefreq: string, priority: number];

export async function GET() {
	const built = new Date().toISOString();
	const entries: Entry[] = [
		[SITE, built, "daily", 1],
		[`${SITE}/acerca-de-mi`, built, "monthly", 0.6],
		...["contacto", "colaboraciones", "herramientas", "blog"].map(
			(path) => [`${SITE}/${path}`, built, "monthly", 0.7] as Entry,
		),
		...tools.map((tool) => [`${SITE}${tool.link}`, built, "monthly", 0.7] as Entry),
		...(await getPosts()).map(
			(post) =>
				[`${SITE}/blog/${post.id}`, parsePostDate(post.data.publishDate).toISOString(), "monthly", 0.7] as Entry,
		),
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Markdown version of every page listed here (same URL ending in .md): https://www.nutralech.com/sitemap.md -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		([loc, lastmod, changefreq, priority]) =>
			`<url>\n<loc>${loc}</loc>\n<lastmod>${lastmod}</lastmod>\n<changefreq>${changefreq}</changefreq>\n<priority>${priority}</priority>\n</url>`,
	)
	.join("\n")}
</urlset>
`;
	return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
