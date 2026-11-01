// @ts-check
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import markdownPages from "./integrations/markdown-pages.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));

// Fully static build for Cloudflare static assets. `/blog/x` is written as `blog/x.html`, which
// Cloudflare serves at `/blog/x` (no trailing slash), the same URLs Next.js served.
export default defineConfig({
	site: "https://www.nutralech.com",
	output: "static",
	trailingSlash: "never",
	build: { format: "file", assets: "_astro", inlineStylesheets: "auto" },
	compressHTML: true,
	// Prefetching for the ClientRouter is src/scripts/prefetch-visible.ts, so Astro's own link
	// prefetch stays off.
	prefetch: { prefetchAll: false },
	devToolbar: { enabled: false },
	// Blog posts (src/content/posts/*.mdx): GFM on, no smart quotes, no syntax highlighting, so
	// the HTML matches what next-mdx-remote rendered.
	markdown: { gfm: true, smartypants: false, syntaxHighlight: false },
	integrations: [mdx(), markdownPages()],
	server: process.env.PORT ? { port: Number(process.env.PORT) } : undefined,
	vite: {
		plugins: [tailwindcss()],
		resolve: { alias: [{ find: /^@\//, replacement: `${root}src/` }] },
	},
});
