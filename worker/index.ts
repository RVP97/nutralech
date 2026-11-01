/**
 * Cloudflare Worker for www.nutralech.com. Every page is a static asset served straight by
 * Cloudflare; this Worker only runs when no asset matches (see wrangler.jsonc). It handles what
 * Next.js did at request time:
 *
 *   - POST /api/contact (Turnstile check + email through Mailroom)
 *   - /api/checkout_sessions (Stripe embedded checkout)
 *   - the redirects from next.config.mjs, and trailing slashes (308)
 *   - old /_next/image URLs → the original image
 *   - the 404 page, with a 404 status
 */
import { handleCheckout } from "./checkout";
import { handleContact } from "./contact";

export interface Env {
	ASSETS: Fetcher;
	MAILROOM_URL?: string;
	MAILROOM_API_KEY?: string;
	TURNSTILE_SECRET_KEY?: string;
	STRIPE_SECRET_KEY?: string;
}

/** next.config.mjs redirects (all permanent: 301 because they set statusCode). */
const REDIRECTS: Record<string, string> = {
	"/contact": "/contacto",
	"/acerca": "/acerca-de-mi",
};

function redirect(url: URL, location: string, status: number, keepQuery = true): Response {
	const target = new URL(location, url);
	if (keepQuery && target.origin === url.origin && !location.includes("?")) target.search = url.search;
	return new Response(null, { status, headers: { Location: target.toString() } });
}

async function notFound(request: Request, env: Env): Promise<Response> {
	const asset = await env.ASSETS.fetch(new Request(new URL("/404", request.url)));
	return new Response(asset.body, {
		status: 404,
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "public, max-age=0, must-revalidate",
		},
	});
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const { pathname } = url;

		if (pathname === "/api/contact") return handleContact(request, env);
		if (pathname === "/api/checkout_sessions") return handleCheckout(request, env);

		if (pathname === "/_next/image") {
			const original = url.searchParams.get("url");
			if (original?.startsWith("/") && !original.startsWith("//")) return redirect(url, original, 301, false);
			return notFound(request, env);
		}

		// Next.js dropped trailing slashes with a 308.
		if (pathname.length > 1 && pathname.endsWith("/")) return redirect(url, pathname.replace(/\/+$/, "") || "/", 308);

		const target = REDIRECTS[pathname.toLowerCase()];
		if (target) return redirect(url, target, 301);

		return notFound(request, env);
	},
} satisfies ExportedHandler<Env>;
