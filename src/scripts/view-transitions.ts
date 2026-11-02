/**
 * Page changes as view transitions, on top of the ClientRouter (src/layouts/Layout.astro).
 *
 * Every page change is a plain cross-fade: the new page fades in over the old one, while the
 * header, the mobile booking bar and the share button stay perfectly still
 * (src/styles/view-transitions.css). Nothing slides or rises.
 *
 * When the link that was clicked belongs to a photo (a room card, a teaser), that photo grows into
 * the new page's main photo (its `fetchpriority="high"` hero); going back, the hero shrinks into
 * the card it came from. The rules that keep that flight clean:
 * - Only one picture is ever shown in the moving frame: the larger one (the hero), so two photos
 *   never show through each other. The small end swaps with a short dissolve while the frame is
 *   still (almost) where that photo is.
 * - Whatever sits on top of either photo (the hero's gradient and titles, a card's counter) gets its
 *   own layer above the flying photo: the old one fades out at once, the new one fades in as the
 *   photo lands, so nothing is hidden under the photo and pops in at the end.
 * - A photo flies only when most of it is in view (not under the fixed header or booking bar),
 *   and the landing photo is decoded before the transition starts.
 * - The new page is captured as it will look when it settles: centered carousels are centered
 *   and entrance animations of the hero text are skipped.
 *
 * Nothing here runs on the first page load, so it does not affect Lighthouse. Skipped for reduced
 * motion and in browsers without view transitions (the ClientRouter then swaps without animation).
 */

const PHOTO = "vt-photo";
/** Photos smaller than this (icons, logos, thumbnails in a list) never fly. */
const MIN_SIZE = 120;
/** How much of a photo must be in view, not covered by the header or the booking bar, to fly. */
const MIN_VISIBLE = 0.5;
/** How long the page change may wait for the landing photo to decode before it starts anyway. */
const LAND_WAIT_MS = 300;
/** Timings (ms) shared with src/styles/view-transitions.css. */
const FLIGHT_MS = 500;
const DISSOLVE_MS = 150;
const OVERLAY_IN_DELAY_MS = 300;
const OVERLAY_IN_MS = 200;
const OVERLAY_OUT_MS = 120;
/** At most this many layers above a photo get their own fade. */
const MAX_OVERLAYS = 6;

// Per-transition rules live in a constructed sheet: the ClientRouter replaces <html>'s attributes
// and the <head> on each page change, but leaves adopted sheets alone.
const sheet = new CSSStyleSheet();
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const reducedMotion = () =>
	matchMedia("(prefers-reduced-motion: reduce)").matches;
const animated = () => !!document.startViewTransition && !reducedMotion();

/** The band of the viewport not covered by the fixed header and the fixed booking bar. */
function clearBand(): { top: number; bottom: number } {
	let top = 0;
	let bottom = innerHeight;
	for (const el of document.querySelectorAll(
		"[data-navbar], [data-booking-bar]",
	)) {
		const r = el.getBoundingClientRect();
		if (!r.height || getComputedStyle(el).visibility === "hidden") continue;
		if (r.top <= 24 && r.bottom < innerHeight / 2)
			top = Math.max(top, r.bottom);
		else if (r.bottom >= innerHeight - 1 && r.top > innerHeight / 2)
			bottom = Math.min(bottom, r.top);
	}
	return { top, bottom };
}

/** The part of the element actually seen: clipped by the viewport, the fixed header and booking
 * bar, and any ancestor that hides overflow (a carousel shows one slide of many). */
function visibleArea(el: Element): number {
	const r = el.getBoundingClientRect();
	const band = clearBand();
	let left = Math.max(r.left, 0);
	let top = Math.max(r.top, band.top);
	let right = Math.min(r.right, innerWidth);
	let bottom = Math.min(r.bottom, band.bottom);
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

const area = (el: Element) => {
	const r = el.getBoundingClientRect();
	return r.width * r.height;
};

/**
 * True when most of the photo is in view and it is big enough to be the point of the card. The
 * photo it leaves from must also be loaded; the one it lands on may still be decoding.
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
	return visibleArea(img) >= r.width * r.height * MIN_VISIBLE;
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

/** The page's main photo, if most of it is in view. */
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
 * What is drawn on top of the photo: positioned elements that come after it (a gradient, a title,
 * a counter) inside the boxes that frame it (not much larger than the photo) and overlap it. They
 * get their own layer during the transition, so the flying photo never covers them.
 */
function overlaysOf(img: HTMLImageElement): HTMLElement[] {
	const r = img.getBoundingClientRect();
	const found: HTMLElement[] = [];
	let branch: Element = img;
	for (let box = img.parentElement, depth = 0; box && depth < 8; depth++) {
		if (box === document.body || box.matches("main, [data-navbar]")) break;
		// Past the frame around the photo (a whole card or section): what is there is beside it.
		const b = box.getBoundingClientRect();
		if (b.width * b.height > r.width * r.height * 2) break;
		for (const child of box.children) {
			if (child === branch || !(child instanceof HTMLElement)) continue;
			if (
				!(
					branch.compareDocumentPosition(child) &
					Node.DOCUMENT_POSITION_FOLLOWING
				)
			)
				continue;
			const s = getComputedStyle(child);
			if (
				s.position === "static" ||
				s.position === "fixed" ||
				s.display === "none"
			)
				continue;
			const c = child.getBoundingClientRect();
			const w = Math.min(c.right, r.right) - Math.max(c.left, r.left);
			const h = Math.min(c.bottom, r.bottom) - Math.max(c.top, r.top);
			if (w > 1 && h > 1) found.push(child);
		}
		branch = box;
		box = box.parentElement;
	}
	return found.slice(0, MAX_OVERLAYS);
}

/**
 * Loads and decodes the landing photo before the old page is captured: a snapshot of a photo that
 * is not painted yet is empty. A hidden copy of the new page's <picture> picks the same file the
 * page will, and once decoded the page's own copy paints at once. Pages are prefetched with their
 * main photo (scripts/prefetch-visible), so this is usually instant.
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

/** Elements named for the current transition, cleared when it ends. */
let named: HTMLElement[] = [];
function nameAs(el: HTMLElement, value: string) {
	el.style.viewTransitionName = value;
	named.push(el);
}

/** The photo of the page being left that flies, and how to find where it lands. */
let flight:
	| {
			from: HTMLImageElement;
			fromArea: number;
			land: () => HTMLImageElement | undefined;
	  }
	| undefined;

function clear() {
	for (const el of named) el.style.viewTransitionName = "";
	named = [];
	flight = undefined;
	sheet.replaceSync("");
}

document.addEventListener("astro:before-preparation", (e) => {
	clear();
	if (!animated()) return;
	if (e.to.pathname === e.from.pathname) return;

	const fromPath = e.from.pathname;
	let from: HTMLImageElement | undefined;
	let land: () => HTMLImageElement | undefined = () => undefined;
	if (e.direction === "back") {
		// Back to a list: this page's hero shrinks into the card that led here.
		from = hero();
		land = () => photoLinkingTo(fromPath);
	} else if (e.sourceElement instanceof HTMLAnchorElement) {
		// Forward from a card: its photo grows into the new page's hero.
		from = photoFor(e.sourceElement);
		land = () => hero(true);
	}
	if (!from) return;
	flight = { from, fromArea: area(from), land };

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
		if (!flight || e.signal.aborted) return;
		// Named last, right before the old page is captured.
		nameAs(flight.from, PHOTO);
		for (const [i, el] of overlaysOf(flight.from).entries())
			nameAs(el, `vt-out-${i}`);
	};
});

document.addEventListener("astro:before-swap", (e) => {
	if (!animated()) return;
	e.viewTransition.finished.finally(clear);
});

// The new page is in place and scrolled (to the top, or back to where it was), but not yet
// captured: settle it, then find where the photo lands.
document.addEventListener("astro:after-swap", () => {
	if (!animated()) return;
	settle();
	if (!flight) return;
	const next = flight.land();
	const rules: string[] = [];
	const leaving = named.filter((el) =>
		el.style.viewTransitionName.startsWith("vt-out-"),
	).length;
	for (let i = 0; i < leaving; i++) {
		rules.push(
			`::view-transition-group(vt-out-${i}){z-index:2;animation:none}`,
			`::view-transition-old(vt-out-${i}){animation:vt-fade-out ${OVERLAY_OUT_MS}ms ease both}`,
		);
	}
	if (next) {
		nameAs(next, PHOTO);
		overlaysOf(next).forEach((el, i) => {
			nameAs(el, `vt-in-${i}`);
			rules.push(
				`::view-transition-group(vt-in-${i}){z-index:2;animation:none}`,
				`::view-transition-new(vt-in-${i}){animation:vt-fade-in ${OVERLAY_IN_MS}ms ease ${OVERLAY_IN_DELAY_MS}ms both}`,
			);
		});
		// The larger picture fills the frame for the whole flight; the smaller one dissolves into
		// it (or out of it) at its own end, while the frame is still about where it is.
		const delay = area(next) >= flight.fromArea ? 0 : FLIGHT_MS - DISSOLVE_MS;
		rules.push(
			`::view-transition-new(${PHOTO}){animation:vt-fade-in ${DISSOLVE_MS}ms linear ${delay}ms both}`,
		);
	} else {
		// Nowhere to land in view: the photo fades out with the page it was on.
		rules.push(
			`::view-transition-group(${PHOTO}){animation:none}`,
			`::view-transition-old(${PHOTO}){animation:vt-fade-out 180ms ease both}`,
		);
	}
	sheet.replaceSync(rules.join(""));
});

/**
 * Puts the new page in the state it settles in before it is captured, so nothing moves once it
 * shows: centered carousels are centered now (scripts/carousel does it again on page load),
 * entrance animations of text are skipped (the page fade is the entrance), and elements that
 * reveal on scroll and are already in view show at once.
 */
function settle() {
	const preCenter = (
		window as Window & { __carouselPreCenter?: (root: HTMLElement) => void }
	).__carouselPreCenter;
	if (preCenter)
		for (const c of document.querySelectorAll<HTMLElement>("[data-carousel]"))
			preCenter(c);
	for (const el of document.querySelectorAll<HTMLElement>(".motion-enter"))
		el.style.animation = "none";
	for (const el of document.querySelectorAll<HTMLElement>(".motion-inview")) {
		const r = el.getBoundingClientRect();
		if (r.bottom <= 0 || r.top >= innerHeight) continue;
		el.style.transition = "none";
		el.classList.add("is-inview");
		requestAnimationFrame(() =>
			requestAnimationFrame(() => el.style.removeProperty("transition")),
		);
	}
}
