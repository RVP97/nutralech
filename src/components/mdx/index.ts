/** Blog post elements, styled as on the Next.js site (app/blog/[slug]/page.tsx). */
import A from "./A.astro";
import Blockquote from "./Blockquote.astro";
import Code from "./Code.astro";
import Em from "./Em.astro";
import H1 from "./H1.astro";
import H2 from "./H2.astro";
import H3 from "./H3.astro";
import Hr from "./Hr.astro";
import Li from "./Li.astro";
import Ol from "./Ol.astro";
import P from "./P.astro";
import Pre from "./Pre.astro";
import Strong from "./Strong.astro";
import Table from "./Table.astro";
import Td from "./Td.astro";
import Th from "./Th.astro";
import Ul from "./Ul.astro";

export const mdxComponents = {
	h1: H1,
	h2: H2,
	h3: H3,
	p: P,
	strong: Strong,
	em: Em,
	ul: Ul,
	ol: Ol,
	li: Li,
	a: A,
	code: Code,
	pre: Pre,
	blockquote: Blockquote,
	table: Table,
	th: Th,
	td: Td,
	hr: Hr,
};
