/**
 * Small site-wide behaviors that used to need React on every page: the navbar's scrolled look and
 * mobile menu, dialogs, copy buttons, the blog share menu and reading bar, and the home page's
 * sticky plan button. Loaded once; the page is swapped in place on navigation (ClientRouter), so
 * anything tied to page elements is looked up again on `astro:page-load`.
 */

// --- Navbar: solid once scrolled; mobile menu. ---
function onScroll() {
	const y = window.scrollY;
	document.querySelector("[data-navbar]")?.toggleAttribute("data-scrolled", y > 16);
	updateStickyCta();
	updateReadingProgress();
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
document.addEventListener("astro:page-load", onScroll);

function setMenu(open: boolean) {
	const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
	const menu = document.getElementById("mobile-menu");
	if (!toggle || !menu) return;
	menu.hidden = !open;
	toggle.setAttribute("aria-expanded", String(open));
	toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

document.addEventListener("click", (event) => {
	const target = event.target as Element | null;
	if (!target?.closest) return;

	if (target.closest("[data-menu-toggle]")) {
		setMenu(document.getElementById("mobile-menu")?.hidden ?? false);
		return;
	}
	// Following a menu link (including /#precios on the home page) closes the menu.
	if (target.closest("#mobile-menu a")) setMenu(false);

	// <button data-dialog-open="id"> opens <dialog id="id">; [data-dialog-close] closes it.
	const opener = target.closest<HTMLElement>("[data-dialog-open]");
	if (opener) {
		const dialog = document.getElementById(opener.dataset.dialogOpen ?? "");
		if (dialog instanceof HTMLDialogElement) dialog.showModal();
		return;
	}
	if (target.closest("[data-dialog-close]")) {
		target.closest("dialog")?.close();
		return;
	}
	// A click on the backdrop (the dialog element itself) closes it.
	if (target instanceof HTMLDialogElement && target.open) {
		const r = target.getBoundingClientRect();
		const e = event as MouseEvent;
		if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
			target.close();
		return;
	}

	// Copy buttons (bank transfer details).
	const copy = target.closest<HTMLElement>("[data-copy]");
	if (copy) {
		void navigator.clipboard?.writeText(copy.dataset.copy ?? "");
		const label = copy.querySelector("[data-copy-label]");
		if (label) {
			const before = label.textContent;
			label.textContent = "Copiado";
			setTimeout(() => {
				label.textContent = before;
			}, 1500);
		}
		return;
	}

	// Blog share menu.
	const shareToggle = target.closest<HTMLElement>("[data-share-toggle]");
	if (shareToggle) {
		const wrapper = shareToggle.closest<HTMLElement>("[data-share]");
		const open = !wrapper?.hasAttribute("data-open");
		wrapper?.toggleAttribute("data-open", open);
		shareToggle.setAttribute("aria-expanded", String(open));
		shareToggle.setAttribute("aria-label", open ? "Cerrar menú para compartir" : "Compartir artículo");
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") setMenu(false);
});

// --- Home: sticky "Plan a distancia" button on phones, hidden over the pricing section. ---
function updateStickyCta() {
	const cta = document.querySelector<HTMLElement>("[data-sticky-cta]");
	if (!cta) return;
	const pricing = document.getElementById("precios");
	let visible: boolean;
	if (!pricing) visible = window.scrollY > 480;
	else {
		const rect = pricing.getBoundingClientRect();
		visible = window.scrollY > 420 && !(rect.top < window.innerHeight && rect.bottom > 80);
	}
	cta.hidden = !visible;
}

// --- Blog post: reading progress bar. ---
function updateReadingProgress() {
	const bar = document.querySelector<HTMLElement>("[data-reading-progress]");
	const post = document.getElementById("blog-post");
	if (!bar || !post) return;
	const end = post.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
	const progress = end > 0 ? Math.min(1, Math.max(0, window.scrollY / end)) : 1;
	bar.style.transform = `scaleX(${progress})`;
	bar.style.visibility = "visible";
}

export {};
