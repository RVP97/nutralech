/**
 * Prefetching for the ClientRouter navigation (src/layouts/Layout.astro), like Next.js's <Link>:
 * every internal link's page is downloaded once the link is on screen (after this page has
 * loaded and gone idle, so it never competes with this page's own images) or as soon as the
 * visitor hovers, touches or focuses it. Pages come back from the browser cache on click
 * (public/_headers lets HTML be reused for 60 s).
 *
 * The prefetched page's main photo (its `fetchpriority="high"` image, e.g. a room's hero) is
 * preloaded too, in the size the browser will pick, so the photo is there when the page opens.
 */
const pages = new Map<string, Promise<string | null>>();
const warmedImages = new Set<string>();
// On-screen links per page whose photos are preloaded; hover, touch and focus always are.
const ON_SCREEN_IMAGE_LIMIT = 8;
let onScreenImages = 0;

function slowConnection(): boolean {
	const c = (
		navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
	).connection;
	return !!c && (c.saveData === true || /2g/.test(c.effectiveType ?? ''));
}

function pageUrl(link: HTMLAnchorElement): string | null {
	if (link.dataset.astroReload !== undefined || (link.target && link.target !== '_self'))
		return null;
	if (link.hasAttribute('download') || link.origin !== location.origin) return null;
	if (/^\/(api\/|_)|\.(md|xml|txt|pdf|json)$/.test(link.pathname)) return null;
	if (link.pathname === location.pathname) return null;
	return link.origin + link.pathname + link.search;
}

function fetchPage(url: string, priority: RequestPriority): Promise<string | null> {
	let page = pages.get(url);
	if (!page) {
		page = fetch(url, { priority })
			.then((res) =>
				res.ok && res.headers.get('content-type')?.includes('text/html') ? res.text() : null
			)
			.catch(() => null);
		pages.set(url, page);
	}
	return page;
}

/** Preloads the page's high-priority images (AVIF when the page offers it). */
function preloadMainImages(html: string) {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	for (const img of [...doc.querySelectorAll<HTMLImageElement>('img[fetchpriority="high"]')].slice(
		0,
		2
	)) {
		const source = img.parentElement?.matches('picture')
			? img.parentElement.querySelector<HTMLSourceElement>('source[type="image/avif"][srcset]')
			: null;
		const srcset = source?.getAttribute('srcset') ?? img.getAttribute('srcset');
		const sizes = source?.getAttribute('sizes') ?? img.getAttribute('sizes');
		const key = srcset ?? img.getAttribute('src');
		if (!key || warmedImages.has(key)) continue;
		warmedImages.add(key);
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.fetchPriority = 'low';
		if (source) link.type = 'image/avif';
		if (srcset) {
			link.imageSrcset = srcset;
			if (sizes) link.imageSizes = sizes;
		} else link.href = img.getAttribute('src') ?? '';
		document.head.append(link);
	}
}

async function warm(link: HTMLAnchorElement, intent: boolean) {
	const url = pageUrl(link);
	if (!url) return;
	const withImage = intent || onScreenImages < ON_SCREEN_IMAGE_LIMIT;
	if (!intent && withImage && !pages.has(url)) onScreenImages++;
	const html = await fetchPage(url, intent ? 'high' : 'low');
	if (html && withImage) preloadMainImages(html);
}

// --- On screen: after load and idle, then on each client-side navigation. ---
let observer: IntersectionObserver | undefined;
function observeLinks() {
	observer?.disconnect();
	if (slowConnection()) return;
	onScreenImages = 0;
	observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			observer?.unobserve(entry.target);
			void warm(entry.target as HTMLAnchorElement, false);
		}
	});
	for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
		if (pageUrl(link)) observer.observe(link);
	}
}
const whenIdle = (fn: () => void) =>
	'requestIdleCallback' in window
		? requestIdleCallback(fn, { timeout: 3000 })
		: setTimeout(fn, 1000);
const start = () => whenIdle(observeLinks);
if (document.readyState === 'complete') start();
else window.addEventListener('load', start, { once: true });
// Pages reached by client-side navigation (the document finished loading long before).
// Running twice is harmless: observeLinks starts over.
document.addEventListener('astro:page-load', () => {
	if (document.readyState === 'complete') start();
});
document.addEventListener('astro:before-swap', () => observer?.disconnect());
// A cached page is only reused for 60 s (public/_headers), so forget older fetches.
setInterval(() => pages.clear(), 50_000);

// --- Intent: hover (briefly), touch, keyboard focus. ---
const linkFrom = (e: Event) =>
	(e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href]');
let hoverTimer: ReturnType<typeof setTimeout> | undefined;
document.addEventListener(
	'pointerover',
	(e) => {
		const link = linkFrom(e);
		if (!link || (e as PointerEvent).pointerType === 'touch') return;
		clearTimeout(hoverTimer);
		hoverTimer = setTimeout(() => void warm(link, true), 60);
	},
	{ passive: true }
);
document.addEventListener('pointerout', () => clearTimeout(hoverTimer), { passive: true });
for (const type of ['touchstart', 'focusin'] as const) {
	document.addEventListener(
		type,
		(e) => {
			const link = linkFrom(e);
			if (link) void warm(link, true);
		},
		{ passive: true }
	);
}

export {};
