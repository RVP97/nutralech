import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/** Blog posts. publishDate is DD/MM/YYYY, as the Next.js site wrote it. */
const posts = defineCollection({
	loader: glob({ pattern: "*.mdx", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		publishDate: z.string(),
		categories: z.array(z.string()).default([]),
		excerpt: z.string().default(""),
		seoDescription: z.string().default(""),
	}),
});

export const collections = { posts };
