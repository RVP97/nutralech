/**
 * Page changes as view transitions, on top of the ClientRouter (src/layouts/Layout.astro).
 *
 * Every page change fades over: the old page fades out quickly and the new one rises in, while the
 * header and the mobile booking bar stay put (src/styles/global.css, "View transitions").
 *
 * When the link that was clicked belongs to a photo (a room card, a teaser), that photo grows into
 * the new page's main photo (its `fetchpriority="high"` hero). Going back, the hero shrinks into the
 * card it came from. With no photo to fly from or to, the page just fades.
 *
 * Nothing here runs on the first page load, so it does not affect Lighthouse. Skipped for reduced
 * motion and in browsers without view transitions (the ClientRouter then swaps without animation).
 */

const PHOTO = "vt-photo";
/** Photos smaller than this (icons, logos, thumbnails in a list) never fly. */
const MIN_SIZE = 120;
/** How long the page change may wait for the landing photo to decode before it starts anyway. */
const LAND_WAIT_MS = 300;

// Per-transition rules live in a constructed sheet: the ClientRouter replaces <html>'s attributes
// and the <head> on each page change, but leaves adopted sheets alone.
const sheet = new CSSStyleSheet();
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const reducedMotion = () =>
	matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The part of the element actually painted on screen: clipped by the viewport and by any
 * ancestor that hides overflow (a carousel shows one slide of many). */
function visibleArea(el: Element): number {
	const r = el.getBoundingClientRect();
	let left = Math.max(r.left, 0);
	let top = Math.max(r.top, 0);
	let right = Math.min(r.right, innerWidth);
	let bottom = Math.min(r.bottom, innerHeight);
	for (
		let p = el.parentElement;
		p && p !== document.body;
		p = p.parentElement
	) {
		if (right <= left || bottom <= top) return 0;
		const s = getComputedStyle(p);
		if (s.overflowX === "visible" && s.overflowY === "visible") continue;
		const c = p.getBoundingClientRect();
		left = Math.max(left, c.left);
		top = Math.max(top, c.top);
		right = Math.min(right, c.right);
		bottom = Math.min(bottom, c.bottom);
	}
	return Math.max(0, right - left) * Math.max(0, bottom - top);
}

/**
 * True when at least a third of the photo is on screen and it is big enough to be the point of
 * the card. The photo it leaves from must also be loaded; the one it lands on may still be decoding.
 */
function usable(img: HTMLImageElement, landing = false): boolean {
	if (!landing && (!img.complete || !img.naturalWidth)) return false;
	const r = img.getBoundingClientRect();
	if (r.width < MIN_SIZE || r.height < MIN_SIZE) return false;
	if (
		img.checkVisibility &&
		!img.checkVisibility({ opacityProperty: true, visibilityProperty: true })
	)
		return false;
	return visibleArea(img) >= (r.width * r.height) / 3;
}

const largest = (imgs: HTMLImageElement[]) =>
	imgs.sort((a, b) => visibleArea(b) - visibleArea(a))[0];

/** Internal page links in `el`, leaving out the "Check rates" buttons every card carries. */
function pagePaths(el: Element): Set<string> {
	const paths = new Set<string>();
	for (const a of el.querySelectorAll<HTMLAnchorElement>("a[href]")) {
		if (a.origin === location.origin && !a.hasAttribute("data-open-booking"))
			paths.add(a.pathname);
	}
	return paths;
}

/**
 * The photo a link stands for: a photo inside the link, or the photo of the card around it. The card
 * is the largest ancestor (a few levels up at most) whose links all lead to the same page, or one
 * marked `data-vt-card`; `data-vt-card="none"` keeps a link's surroundings from flying.
 */
function photoFor(
	link: HTMLAnchorElement,
	landing = false,
): HTMLImageElement | undefined {
	const ok = (img: HTMLImageElement) => usable(img, landing);
	const own = [...link.querySelectorAll("img")].filter(ok);
	if (own.length) return largest(own);
	const marked = link.closest("[data-vt-card]");
	if (marked) {
		if (marked.getAttribute("data-vt-card") === "none") return;
		return largest([...marked.querySelectorAll("img")].filter(ok));
	}
	let found: HTMLImageElement | undefined;
	let el: Element | null = link.parentElement;
	for (let depth = 0; el && depth < 6; depth++, el = el.parentElement) {
		if (el.matches("body, main, header, nav, footer, [data-navbar]")) break;
		if (pagePaths(el).size > 1) break;
		const imgs = [...el.querySelectorAll("img")].filter(ok);
		if (imgs.length) found = largest(imgs);
		if (el.matches("section")) break;
	}
	return found;
}

/** The page's main photo, if it is on screen. */
function hero(landing = false): HTMLImageElement | undefined {
	const img = document.querySelector<HTMLImageElement>(
		'img[fetchpriority="high"]',
	);
	return img && usable(img, landing) ? img : undefined;
}

/** The photo of a link on this page to `path` (going back: the card the visitor came from). */
function photoLinkingTo(path: string): HTMLImageElement | undefined {
	const photos: HTMLImageElement[] = [];
	for (const a of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
		if (a.origin !== location.origin || a.pathname !== path) continue;
		const img = photoFor(a, true);
		if (img) photos.push(img);
	}
	return photos.length ? largest(photos) : undefined;
}

/**
 * Loads and decodes the landing photo before the old page is captured: a snapshot of a photo that
 * is not painted yet is empty, and the flight would end in a blank. A hidden copy of the new page's
 * <picture> picks the same file the page will, and once decoded the page's own copy paints at once.
 * Pages are prefetched with their main photo (scripts/prefetch-visible), so this is usually instant.
 */
async function warm(imgs: HTMLImageElement[]) {
	const box = document.createElement("div");
	box.style.cssText =
		"position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;top:0;left:0";
	box.setAttribute("aria-hidden", "true");
	const decodes: Promise<unknown>[] = [];
	for (const img of imgs) {
		const picture = img.parentElement?.matches("picture")
			? img.parentElement
			: img;
		const copy = document.importNode(picture, true) as HTMLElement;
		const copyImg =
			copy instanceof HTMLImageElement ? copy : copy.querySelector("img");
		if (!copyImg) continue;
		copyImg.loading = "eager";
		copyImg.removeAttribute("style");
		box.append(copy);
		decodes.push(copyImg.decode().catch(() => {}));
	}
	if (!decodes.length) return;
	document.body.append(box);
	await Promise.race([
		Promise.all(decodes),
		new Promise((resolve) => setTimeout(resolve, LAND_WAIT_MS)),
	]);
	box.remove();
}

/** The photo of the page being left that flies, and how to find where it lands. */
let flight:
	| { from: HTMLImageElement; land: () => HTMLImageElement | undefined }
	| undefined;
let landed: HTMLImageElement | undefined;

function clear() {
	if (flight) flight.from.style.viewTransitionName = "";
	if (landed) landed.style.viewTransitionName = "";
	flight = undefined;
	landed = undefined;
	sheet.replaceSync("");
}

document.addEventListener("astro:before-preparation", (e) => {
	clear();
	if (!document.startViewTransition || reducedMotion()) return;
	if (e.to.pathname === e.from.pathname) return;

	const fromPath = e.from.pathname;
	if (e.direction === "back") {
		// Back to a list: this page's hero shrinks into the card that led here.
		const from = hero();
		if (from) flight = { from, land: () => photoLinkingTo(fromPath) };
	} else if (e.sourceElement instanceof HTMLAnchorElement) {
		// Forward from a card: its photo grows into the new page's hero.
		const from = photoFor(e.sourceElement);
		if (from) flight = { from, land: () => hero(true) };
	}
	if (!flight) return;

	const load = e.loader;
	e.loader = async () => {
		await load();
		const doc = e.newDocument;
		if (!flight || !doc || e.signal.aborted) return;
		// The photos it may land on: the new page's hero, or (going back) the cards linking here.
		const targets =
			e.direction === "back"
				? [...doc.querySelectorAll<HTMLAnchorElement>("a[href]")]
						.filter((a) => new URL(a.href, e.to).pathname === fromPath)
						.flatMap((a) => [
							...(
								a.closest("[data-vt-card]") ??
								a.parentElement?.parentElement ??
								a
							).querySelectorAll("img"),
						])
						.slice(0, 4)
				: [
						...doc.querySelectorAll<HTMLImageElement>(
							'img[fetchpriority="high"]',
						),
					].slice(0, 1);
		// Lazy photos on the page being returned to would not load in time to be captured.
		for (const img of targets) img.loading = "eager";
		await warm(targets);
		if (flight && !e.signal.aborted)
			flight.from.style.viewTransitionName = PHOTO;
	};
});

document.addEventListener("astro:before-swap", (e) => {
	if (!flight) return;
	e.viewTransition.finished.finally(clear);
});

// The new page is in place and scrolled (to the top, or back to where it was): find the landing photo.
document.addEventListener("astro:after-swap", () => {
	if (!flight) return;
	flight.from.style.viewTransitionName = "";
	const next = flight.land();
	if (next) {
		next.style.viewTransitionName = PHOTO;
		landed = next;
	} else {
		// Nowhere to land on screen: the photo fades out with the page it was on.
		sheet.replaceSync(
			`::view-transition-old(${PHOTO}){animation:vt-out .18s ease both}::view-transition-group(${PHOTO}){animation:none}`,
		);
	}
});
