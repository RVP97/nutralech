/**
 * POST /api/stripe/webhook: when a plan is paid, email the buyer the document to fill in (the
 * same link /confirmacion shows) and tell Marialy and Rodrigo, through Mailroom. This reaches
 * buyers who never see /confirmacion: they closed the tab, or paid later with a delayed method
 * such as OXXO.
 *
 * Stripe events: checkout.session.completed (only once paid) and
 * checkout.session.async_payment_succeeded. Both carry the session id, which is also the
 * Idempotency-Key for Mailroom, so Stripe's retries never send an email twice.
 */
import { type CheckoutSession, stripe } from "./checkout";
import type { Env } from "./index";

const FROM = "Marialy Alonso · Nutralech <contacto@contacto.nutralech.com>";
const REPLY_TO = "marialyalonso@gmail.com";
const TEAM = ["rovapin@gmail.com", "marialyalonso@gmail.com"];
const WHATSAPP = "https://wa.me/message/BLYZCVYW2MOAJ1";
const SEGUIMIENTO_PRICE_ID = "price_1UDoZIBoTKroQtb96qUzoQz8";
const FORMS = {
	inicial: "https://documentos.nutralech.com/historia-clinica/historia-clinica.pdf",
	seguimiento: "https://documentos.nutralech.com/historia-clinica/seguimiento.pdf",
};
/** Stripe's own retry window is days; an old signature is a replay. */
const TOLERANCE_SECONDS = 300;

const text = (body: string, status: number) => new Response(body, { status, headers: { "Content-Type": "text/plain" } });

const escapeHtml = (value: string) =>
	value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Checks the Stripe-Signature header (HMAC-SHA256 of "<t>.<payload>" with the endpoint secret). */
async function verify(payload: string, header: string, secret: string) {
	const parts = header.split(",").map((p) => p.split("=") as [string, string]);
	const t = parts.find(([k]) => k === "t")?.[1];
	const signatures = parts.filter(([k]) => k === "v1").map(([, v]) => v);
	if (!t || !signatures.length) return false;
	if (Math.abs(Date.now() / 1000 - Number(t)) > TOLERANCE_SECONDS) return false;
	const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
	const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${payload}`)));
	const expected = [...mac].map((b) => b.toString(16).padStart(2, "0")).join("");
	const a = new TextEncoder().encode(expected);
	return signatures.some((s) => {
		const b = new TextEncoder().encode(s);
		return a.byteLength === b.byteLength && crypto.subtle.timingSafeEqual(a, b);
	});
}

async function send(env: Env, key: string, email: Record<string, unknown>) {
	const mailroomUrl = (env.MAILROOM_URL || "https://mailroom.vallepinto.com").replace(/\/$/, "");
	const response = await fetch(`${mailroomUrl}/api/emails`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.MAILROOM_API_KEY}`,
			"Content-Type": "application/json",
			"Idempotency-Key": key,
		},
		body: JSON.stringify(email),
		signal: AbortSignal.timeout(30_000),
	});
	if (!response.ok) {
		const result = (await response.json().catch(() => ({}))) as { message?: string };
		throw new Error(`Mailroom refused (${response.status}): ${result.message ?? ""}`);
	}
}

export async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
	if (request.method !== "POST") return text("Method not allowed", 405);
	if (!env.STRIPE_WEBHOOK_SECRET || !env.MAILROOM_API_KEY) return text("Not configured", 500);
	const payload = await request.text();
	if (!(await verify(payload, request.headers.get("stripe-signature") ?? "", env.STRIPE_WEBHOOK_SECRET)))
		return text("Bad signature", 400);

	const event = JSON.parse(payload) as { type: string; data: { object: { id: string; payment_status?: string } } };
	const paid =
		event.type === "checkout.session.async_payment_succeeded" ||
		(event.type === "checkout.session.completed" && event.data.object.payment_status === "paid");
	if (!paid) return text("Ignored", 200);

	try {
		const id = event.data.object.id;
		const session = await stripe<CheckoutSession>(env, `checkout/sessions/${encodeURIComponent(id)}?expand[]=line_items`);
		const email = session.customer_details?.email;
		const name = session.customer_details?.name?.trim() || "";
		const items = session.line_items?.data ?? [];
		const seguimiento = items.some((item) => item.price?.id === SEGUIMIENTO_PRICE_ID);
		const plan = items.map((item) => item.description).join(", ") || (seguimiento ? "Plan de seguimiento" : "Plan inicial");
		const form = seguimiento ? FORMS.seguimiento : FORMS.inicial;
		const total =
			session.amount_total != null
				? `${(session.amount_total / 100).toLocaleString("es-MX", { minimumFractionDigits: 2 })} ${session.currency.toUpperCase()}`
				: "";

		if (email) {
			const hello = name ? `¡Hola, ${name.split(/\s+/)[0]}!` : "¡Hola!";
			await send(env, `${id}:buyer`, {
				from: FROM,
				to: [email],
				reply_to: REPLY_TO,
				subject: "Tu plan a distancia: siguiente paso",
				text: `${hello}\n\nGracias por tu compra (${plan}). Para empezar tu plan, descarga este documento y llénalo con tus datos, objetivos, hábitos, rutina y preferencias:\n${form}\n\nEnvíamelo respondiendo a este correo (o a ${REPLY_TO}) o por WhatsApp: ${WHATSAPP}\n\nEn aproximadamente 5 a 7 días hábiles después de recibir tu documento completo te entrego tu plan personalizado.\n\nMarialy Alonso\nwww.nutralech.com`,
				html: buyerHtml(hello, plan, form),
				tags: [
					{ name: "source", value: "stripe" },
					{ name: "type", value: seguimiento ? "plan-seguimiento-paid" : "plan-inicial-paid" },
				],
			});
		}

		await send(env, `${id}:team`, {
			from: "Nutralech Pagos <contacto@contacto.nutralech.com>",
			to: TEAM,
			...(email && { reply_to: email }),
			subject: `Nueva compra: ${plan}${name ? ` – ${name}` : ""}`,
			text: `${plan}\nCliente: ${name || "sin nombre"} <${email ?? "sin correo"}>\nTotal: ${total}\nSesión: ${id}\n\n${email ? "Ya se le envió el documento por correo." : "Stripe no dio correo: no se le pudo enviar el documento."}`,
			tags: [
				{ name: "source", value: "stripe" },
				{ name: "type", value: "purchase-notification" },
			],
		});
		return text("OK", 200);
	} catch (error) {
		// A 500 makes Stripe retry later; the idempotency keys keep retries from duplicating.
		console.error("stripe-webhook:", error);
		return text("Error", 500);
	}
}

function buyerHtml(hello: string, plan: string, form: string) {
	return `<!doctype html><html lang="es"><body style="margin:0;background:#FBF5F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2b2b2b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;padding:32px">
<tr><td>
<p style="margin:0 0 16px;font-size:20px;font-weight:600">${escapeHtml(hello)}</p>
<p style="margin:0 0 16px;font-size:16px;line-height:24px">Gracias por tu compra (<strong>${escapeHtml(plan)}</strong>). Para empezar tu plan, descarga el documento y llénalo con tus datos, objetivos, hábitos, rutina y preferencias.</p>
<p style="margin:24px 0;text-align:center"><a href="${form}" style="display:inline-block;background:#C54B5B;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 28px;border-radius:999px">Descargar documento</a></p>
<p style="margin:0 0 16px;font-size:16px;line-height:24px">Cuando lo tengas, envíamelo respondiendo a este correo o por <a href="${WHATSAPP}" style="color:#B5404F">WhatsApp</a>. En aproximadamente 5 a 7 días hábiles después de recibirlo completo te entrego tu plan personalizado.</p>
<p style="margin:24px 0 0;font-size:16px;line-height:24px">Marialy Alonso<br><a href="https://www.nutralech.com" style="color:#B5404F">www.nutralech.com</a></p>
</td></tr></table>
</td></tr></table></body></html>`;
}
