import { getCollection } from "astro:content";

/** DD/MM/YYYY → midnight UTC, so the build machine's time zone never shifts the date. */
export function parsePostDate(value: string): Date {
	const [day, month, year] = value.split("/").map((n) => Number.parseInt(n, 10));
	return new Date(Date.UTC(year, month - 1, day));
}

export const formatPostDate = (value: string) =>
	parsePostDate(value).toLocaleDateString("es-MX", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	});

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Every post, newest first. */
export async function getPosts() {
	const posts = await getCollection("posts");
	return posts.sort(
		(a, b) =>
			parsePostDate(b.data.publishDate).getTime() - parsePostDate(a.data.publishDate).getTime()
	);
}
