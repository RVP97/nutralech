/**
 * Contact form (src/components/sections/ContactForm.astro): validation, Cloudflare Turnstile and
 * the POST to /api/contact. Turnstile's script loads the first time the visitor focuses the form,
 * so page views that never use the form skip it.
 */
interface Turnstile {
	render: (el: HTMLElement, options: Record<string, unknown>) => string;
	reset: (id: string) => void;
}

declare global {
	interface Window {
		turnstile?: Turnstile;
	}
}

// Public site key of the "Nutralech contact form" Turnstile widget (managed mode; nutralech.com,
// www and astro subdomains, localhost). PUBLIC_TURNSTILE_SITE_KEY overrides it, e.g. with
// Cloudflare's always-pass test key 1x00000000000000000000AA.
const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFvuOAUiaO96d5Mw";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SUCCESS = "Gracias por tu mensaje. Te responderé lo antes posible.";
const ERROR = "Hubo un error al enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.";

let turnstileScript: Promise<void> | undefined;
function loadTurnstile(): Promise<void> {
	turnstileScript ??= new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = TURNSTILE_SRC;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => {
			turnstileScript = undefined;
			reject(new Error("Turnstile failed to load"));
		};
		document.head.append(script);
	});
	return turnstileScript;
}

function setup(form: HTMLFormElement) {
	if (form.dataset.ready) return;
	form.dataset.ready = "true";
	const status = form.querySelector<HTMLElement>("[data-status]");
	const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
	const container = form.querySelector<HTMLElement>("[data-turnstile]");
	const inquiry = form.elements.namedItem("inquiryType") as HTMLSelectElement;
	const inquiryError = form.querySelector<HTMLElement>('[data-error="inquiryType"]');

	// Turnstile: invisible ("interaction-only") unless Cloudflare needs a click. Tokens are
	// single-use, so the widget resets after each submission.
	let widget: string | null = null;
	let token: string | null = null;
	let waiting: ((value: string) => void) | null = null;
	let started: Promise<void> | null = null;
	const startTurnstile = (): Promise<void> => {
		started ??= loadTurnstile()
			.then(() => {
				if (!container || !window.turnstile) return;
				widget = window.turnstile.render(container, {
					sitekey: TURNSTILE_SITE_KEY,
					action: "contact_form",
					appearance: "interaction-only",
					"refresh-expired": "auto",
					callback: (value: string) => {
						token = value;
						waiting?.(value);
						waiting = null;
					},
					"expired-callback": () => {
						token = null;
					},
				});
			})
			.catch((err) => {
				started = null;
				throw err;
			});
		return started;
	};
	const getToken = async (): Promise<string> => {
		await startTurnstile();
		if (token) return token;
		return new Promise((resolve, reject) => {
			waiting = resolve;
			setTimeout(() => reject(new Error("Turnstile timed out")), 30_000);
		});
	};
	form.addEventListener("focusin", () => void startTurnstile().catch(() => {}), { once: true });

	const setStatus = (text: string, ok: boolean) => {
		if (!status) return;
		status.textContent = text;
		status.className = `text-sm empty:hidden ${ok ? "text-[oklch(40%_0.1_150)]" : "text-red-600"}`;
	};

	inquiry.addEventListener("change", () => {
		inquiry.removeAttribute("aria-invalid");
		if (inquiryError) inquiryError.hidden = true;
	});

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		if (!inquiry.value) {
			inquiry.setAttribute("aria-invalid", "true");
			if (inquiryError) inquiryError.hidden = false;
			inquiry.focus();
			return;
		}
		if (!form.reportValidity()) return;
		if (button) {
			button.disabled = true;
			button.textContent = "Enviando...";
		}
		setStatus("", true);
		try {
			const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, token: await getToken() }),
			});
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			form.reset();
			setStatus(SUCCESS, true);
		} catch {
			setStatus(ERROR, false);
		} finally {
			token = null;
			if (widget && window.turnstile) window.turnstile.reset(widget);
			if (button) {
				button.disabled = false;
				button.textContent = "Enviar mensaje";
			}
		}
	});
}

export function initContactForms() {
	for (const form of document.querySelectorAll<HTMLFormElement>("form[data-contact-form]")) setup(form);
}
