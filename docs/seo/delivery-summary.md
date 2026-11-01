# SEO pass, November 2026: delivery summary

**Status:** done on the code and checked on the preview (https://astro.nutralech.com, `noindex` on purpose). Production (www.nutralech.com) still runs the old Next.js site until the switch is approved.
**Scope:** all 34 indexable pages (home, 5 main pages, 11 calculators, 17 blog posts). No Search Console, analytics or backlink data were available, so nothing here measures rankings or traffic.

## What the audit found (facts, from the built HTML)

| Check | Result before this pass |
|---|---|
| `<title>`, meta description, canonical, `robots`, Open Graph | Present on every page and identical to the Next.js site (checked with `scripts/seo-parity.py`). |
| One `<h1>` per page | Yes, everywhere. |
| Image `alt` | Every content image has one; decorative copies (logo marquee) use `alt=""`. |
| Structured data | Site-wide Organization / WebSite / Person, `Article` on posts, `FAQPage` on the home page. No breadcrumbs, nothing for the calculators or the plans. |
| Titles | 8 post titles ran to 75–110 characters with the " \| Nutralech" suffix, so search results cut them off. |
| Sitemap | Same 34 URLs as before. Static pages got the build time as `lastmod`. |
| Performance and accessibility | Lighthouse 100 on the sampled pages after the migration (see the migration notes). |

## What changed

1. **Structured data** (`src/lib/schema.ts`)
   - Home: a `Service` for the remote meal plan, with both offers ($1,200 and $1,000 MXN, taken from `src/lib/plans.ts`).
   - Blog posts: `BlogPosting` linked to the site's Person and Organization by `@id`, with keywords, plus a `BreadcrumbList` (Inicio › Blog › post).
   - Calculators: `WebApplication` (free, `HealthApplication`) plus breadcrumbs.
   - `/acerca-de-mi`: a `ProfilePage` for Marialy Alonso, with her photo, topics and social profiles.
   - Blog, Herramientas, Contacto, Colaboraciones: breadcrumbs.
   - All 98 JSON-LD blocks parse.
2. **Titles:** " \| Nutralech" is dropped when the full title would pass 65 characters (`pageSeo` in `src/lib/seo.ts`). Short titles keep the brand.
3. **Post dates** are parsed as UTC. Before, a build in Mexico shifted `datePublished` by 6 hours.
4. **Markdown version of every page** (`integrations/markdown-pages.mjs`), generated from the built HTML so it always matches the page.
   - Every page has a twin at the same URL plus `.md` (the home page is `/index.md`), with front matter (title, description, URL, publish date for posts).
   - Each page sends `Link: <…md>; rel="alternate"; type="text/markdown"`.
   - `/sitemap.md` lists all 34 pages, grouped into main pages, calculators and blog.
   - Pages with `noindex` (payment confirmation, 404) get none.
5. **Pointers for crawlers and language models**
   - `/llms.txt` gives a short guide to the site and its Markdown versions.
   - `robots.txt` and `sitemap.xml` carry comments that point to `sitemap.md` and `llms.txt`.
   - No crawl rule or sitemap entry changed.

## Verified on the preview

- **Markdown and llms.txt:**
  - `.md` files are served as `text/markdown; charset=utf-8`, and `/llms.txt` as UTF-8 text.
  - The `Link` headers are present.
  - Every URL in `sitemap.md` and `llms.txt` resolves.
- **robots.txt and sitemap.xml:** both keep their original rules and URLs, and `sitemap.xml` is still valid XML.

## Not done, and why

- **Shorter post titles.** Eight posts still have titles over 70 characters because the post title itself is long (for example "Cómo Dejar el Ciclo de Restricción y Atracones: Guía Completa…"). Shortening them means rewriting Marialy's headlines, so it's an editorial call. A `seoTitle` field in the post's front matter would allow it without touching the visible heading.
- **Keyword research and the head-term track** (for example "nutrióloga en línea" or "plan de alimentación personalizado"). These need Search Console data or a dated look at the search results. After the switch, connect Search Console and compare the 28 days before and after.
- **Reviews or ratings markup.** The testimonials are hand-picked quotes, not collected reviews, so marking them up would break Google's review policy.

## Maintenance

- The Markdown files, `sitemap.md` and the `Link` headers regenerate on every build, so new posts and pages are covered automatically.
- `llms.txt` is hand-written: update it if the plans, prices or main sections change.
