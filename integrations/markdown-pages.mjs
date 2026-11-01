// @ts-check
/**
 * Markdown versions of every indexable page, written next to the HTML after the build
 * (`/blog/x` → `/blog/x.md`, `/` → `/index.md`), plus `/sitemap.md` (a map of them) and a
 * `Link: <…md>; rel="alternate"; type="text/markdown"` header for each page in dist/_headers.
 *
 * They come from the built HTML itself (the page's <main>, minus navigation, forms and buttons),
 * so they always say what the page says. Pages with `noindex` get none.
 */
import { appendFileSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";
import TurndownService from "turndown";

const SITE = "https://www.nutralech.com";

/** Page groups for /sitemap.md, in order. */
const GROUPS = [
	["Páginas principales", (/** @type {string} */ p) => !p.startsWith("/blog/") && !p.startsWith("/herramientas/")],
	["Herramientas (calculadoras)", (/** @type {string} */ p) => p.startsWith("/herramientas/")],
	["Blog", (/** @type {string} */ p) => p.startsWith("/blog/")],
];

/** Parts of <main> that are interface, not content. */
const DROP = [
	"script",
	"style",
	"noscript",
	"template",
	"svg",
	"form",
	"button",
	"dialog",
	"iframe",
	"nav",
	"[aria-hidden='true']",
	"[hidden]",
	"[data-iphone]",
	"[data-md-skip]",
].join(",");

/** @param {string} dir */
function htmlFiles(dir) {
	/** @type {string[]} */
	const out = [];
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, e.name);
		if (e.isDirectory()) out.push(...htmlFiles(path));
		else if (e.name.endsWith(".html")) out.push(path);
	}
	return out;
}

function turndown() {
	const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced", emDelimiter: "*" });
	// Absolute links, so the file reads the same wherever it is fetched from.
	td.addRule("absoluteLinks", {
		filter: (node) => node.nodeName === "A" && !!node.getAttribute("href"),
		replacement: (content, node) => {
			const el = /** @type {HTMLElement} */ (node);
			const href = el.getAttribute("href") ?? "";
			const url = href.startsWith("/") ? `${SITE}${href}` : href;
			// A card that is one big link: its content, then the link on its own line.
			if (el.querySelector("h1,h2,h3,h4,h5,h6,p,div")) return `\n\n${content.trim()}\n\n[Ver más](${url})\n\n`;
			const text = content.trim().replace(/\s+/g, " ");
			if (!text) return "";
			return `[${text}](${url})`;
		},
	});
	// Chips such as a post's topics: one line instead of words run together.
	td.addRule("chipList", {
		filter: (node) => node.nodeName === "DIV" && /** @type {HTMLElement} */ (node).hasAttribute("data-md-list"),
		replacement: (_content, node) => {
			const el = /** @type {HTMLElement} */ (node);
			const items = [...el.children].map((c) => (c.textContent ?? "").trim()).filter(Boolean);
			return `\n\n${el.getAttribute("data-md-list")}: ${items.join(", ")}\n\n`;
		},
	});
	td.addRule("images", {
		filter: "img",
		replacement: (_content, node) => {
			const el = /** @type {HTMLElement} */ (node);
			const alt = (el.getAttribute("alt") ?? "").trim();
			const src = el.getAttribute("src") ?? "";
			return alt ? `![${alt}](${src.startsWith("/") ? SITE + src : src})` : "";
		},
	});
	td.addRule("tables", {
		filter: "table",
		replacement: (_content, node) => {
			const rows = [...(/** @type {HTMLElement} */ (node)).getElementsByTagName("tr")].map((tr) =>
				[...tr.children].filter((c) => c.tagName === "TH" || c.tagName === "TD").map((c) => (c.textContent ?? "").trim().replace(/\s+/g, " ").replace(/\|/g, "\\|")),
			);
			if (!rows.length) return "";
			const width = Math.max(...rows.map((r) => r.length));
			const line = (/** @type {string[]} */ r) => `| ${[...r, ...Array(width - r.length).fill("")].join(" | ")} |`;
			return `\n\n${[line(rows[0]), line(Array(width).fill("---")), ...rows.slice(1).map(line)].join("\n")}\n\n`;
		},
	});
	return td;
}

/** @param {string} s */
const yaml = (s) => JSON.stringify(s);

export default function markdownPages() {
	return {
		name: "markdown-pages",
		hooks: {
			"astro:build:done": ({ dir }) => {
				const out = fileURLToPath(dir);
				const td = turndown();
				/** @type {{ path: string, md: string, title: string, description: string }[]} */
				const pages = [];
				for (const file of htmlFiles(out)) {
					const html = readFileSync(file, "utf8");
					const { document } = parseHTML(html);
					const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
					if (robots.includes("noindex")) continue;
					const main = document.querySelector("main");
					if (!main) continue;
					const rel = relative(out, file).replace(/\.html$/, "");
					const path = rel === "index" ? "/" : `/${rel}`;
					const md = `${rel}.md`;
					const title = (document.querySelector("title")?.textContent ?? "").trim();
					const description = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
					const published = /"datePublished":"([^"]+)"/.exec(html)?.[1];
					for (const el of main.querySelectorAll(DROP)) el.remove();
					const url = `${SITE}${path === "/" ? "" : path}`;
					const body = td
						.turndown(/** @type {any} */ (main))
						.replace(/^(\s*)([-*]|\d+\.) {2,}/gm, "$1$2 ")
						.replaceAll("](#", `](${path === "/" ? `${SITE}/` : url}#`)
						.replace(/\n{3,}/g, "\n\n")
						.trim();
					const front = [
						"---",
						`title: ${yaml(title)}`,
						`description: ${yaml(description)}`,
						`url: ${url}`,
						published ? `published: ${published.slice(0, 10)}` : "",
						"language: es-MX",
						"---",
					]
						.filter(Boolean)
						.join("\n");
					writeFileSync(join(out, md), `${front}\n\n${body}\n`);
					pages.push({ path, md: `/${md}`, title, description });
				}

				pages.sort((a, b) => a.path.localeCompare(b.path));
				const map = GROUPS.map(([name, test]) => {
					const items = pages.filter((p) => /** @type {(p: string) => boolean} */ (test)(p.path));
					return `## ${name}\n\n${items.map((p) => `- [${p.title.replace(/ \| Nutralech$/, "")}](${SITE}${p.md}): ${p.description}`).join("\n")}`;
				}).join("\n\n");
				writeFileSync(
					join(out, "sitemap.md"),
					`# Nutralech: mapa del sitio en Markdown\n\nVersión en Markdown de cada página pública de ${SITE}. Cada enlace lleva al archivo .md de la página; la página HTML está en la misma dirección sin \`.md\` (la portada es ${SITE}/index.md).\n\n${map}\n`,
				);

				const rules = pages.map((p) => `${p.path}\n  Link: <${p.md}>; rel="alternate"; type="text/markdown"`);
				appendFileSync(join(out, "_headers"), `\n# Markdown alternates (generated by integrations/markdown-pages.mjs)\n${rules.join("\n")}\n`);
			},
		},
	};
}
