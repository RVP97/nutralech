/**
 * POST /api/contact: checks Cloudflare Turnstile, then emails the message to Marialy through
 * Mailroom (mailroom.vallepinto.com, Resend-compatible API), from contacto.nutralech.com.
 */
import type { Env } from "./index";

interface ContactForm {
	name?: string;
	email?: string;
	phone?: string;
	inquiryType?: string;
	message?: string;
	token?: string;
}

const json = (body: unknown, status: number) =>
	new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const escapeHtml = (value: string) =>
	value.replace(
		/[&<>"']/g,
		(c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
	);

/** Sending address on Nutralech's verified Mailroom domain. */
const CONTACT_FROM = "Nutralech Contacto <contacto@contacto.nutralech.com>";
const CONTACT_TO = ["rovapin@gmail.com", "marialyalonso@gmail.com"];

const blank = (value: unknown) => typeof value !== "string" || value.trim() === "";

export async function handleContact(request: Request, env: Env): Promise<Response> {
	if (request.method !== "POST") return json({ message: "Method not allowed" }, 405);

	let form: ContactForm;
	try {
		form = await request.json();
	} catch {
		return json({ message: "Invalid JSON" }, 400);
	}
	const { token, ...data } = form;

	if (blank(data.name)) return json({ message: "Name is required" }, 400);
	if (blank(data.email)) return json({ message: "Email is required" }, 400);
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string))
		return json({ message: "Invalid email format" }, 400);
	if (blank(data.inquiryType)) return json({ message: "Inquiry type is required" }, 400);
	if (blank(data.message)) return json({ message: "Message is required" }, 400);

	try {
		if (!env.TURNSTILE_SECRET_KEY) return json({ message: "Turnstile is not configured" }, 500);
		const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
			method: "POST",
			body: new URLSearchParams({
				secret: env.TURNSTILE_SECRET_KEY,
				response: String(token ?? ""),
				remoteip: request.headers.get("CF-Connecting-IP") ?? "",
			}),
		});
		const verdict = (await verify.json()) as { success?: boolean; action?: string };
		if (!verdict.success || (verdict.action && verdict.action !== "contact_form"))
			return json({ message: "Turnstile verification failed" }, 400);

		if (!env.MAILROOM_API_KEY) return json({ message: "Email service is not configured" }, 500);
		const fields: EmailFields = {
			name: (data.name as string).trim(),
			email: (data.email as string).trim(),
			phone: data.phone?.trim() || "No proporcionado",
			inquiryType: (data.inquiryType as string).trim(),
			message: (data.message as string).trim(),
		};
		const mailroomUrl = (env.MAILROOM_URL || "https://mailroom.vallepinto.com").replace(/\/$/, "");
		const response = await fetch(`${mailroomUrl}/api/emails`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.MAILROOM_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: CONTACT_FROM,
				to: CONTACT_TO,
				reply_to: fields.email,
				subject: `Nuevo contacto: ${fields.inquiryType} – ${fields.name}`,
				html: emailHtml(fields),
				text: emailText(fields),
				tags: [
					{ name: "source", value: "contact-form" },
					{ name: "type", value: "contact" },
				],
			}),
			signal: AbortSignal.timeout(30_000),
		});
		const result = (await response.json().catch(() => ({}))) as { id?: string; message?: string };
		if (!response.ok) {
			console.error("contact: Mailroom refused", response.status, result.message);
			return json({ message: "Error sending email" }, 500);
		}
		return json({ message: "Form submitted successfully", data: result }, 200);
	} catch (error) {
		console.error("Error processing form submission:", error);
		return json({ message: "Internal server error" }, 500);
	}
}

type EmailFields = { name: string; email: string; phone: string; inquiryType: string; message: string };

/** Plain-text version of the notification. */
function emailText(p: EmailFields) {
	return [
		`Nuevo contacto: ${p.inquiryType}`,
		"",
		`Nombre: ${p.name}`,
		`Email: ${p.email}`,
		`Teléfono: ${p.phone}`,
		"",
		"Mensaje:",
		p.message,
		"",
		"Para responder, contesta este correo (la respuesta va directo a quien escribió).",
		"",
		"Nutralech · nutralech.com",
	].join("\n");
}

/** The notification email (same content and styling as the old site's React Email template). */
function emailHtml(p: EmailFields) {
	const e = Object.fromEntries(Object.entries(p).map(([k, v]) => [k, escapeHtml(v)])) as EmailFields;
	const preview = escapeHtml(`Contacto de ${p.name}: ${p.inquiryType}`);
	const font = "-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,sans-serif";
	const label =
		"font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#999;margin:0 0 2px";
	const value = "font-size:15px;color:#2a2a2a;margin:0";
	const field = (name: string, text: string) =>
		`<tr><td style="padding:16px 24px 0"><p style="${label}">${name}</p><p style="${value}">${text}</p></td></tr>`;
	return `<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head>
<body style="background-color:#f8f7f6;font-family:${font};padding:24px 0">
<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${preview}</div>
<table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:520px;margin:0 auto"><tr><td>
<div style="background-color:#DA5F6F;border-radius:12px 12px 0 0;padding:28px 24px;text-align:center">
<h1 style="font-size:22px;font-weight:600;color:#fff;margin:0 0 4px">Nuevo contacto</h1>
<p style="font-size:14px;color:rgba(255,255,255,0.85);margin:0">${e.inquiryType}</p>
</div>
<table width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff;border-radius:0 0 12px 12px;border:1px solid #eee;border-top:none">
${field("Nombre", e.name)}
${field("Email", e.email)}
${field("Teléfono", e.phone)}
<tr><td style="padding:16px 24px 24px"><p style="${label}">Mensaje</p><p style="${value};line-height:1.6;white-space:pre-wrap">${e.message}</p></td></tr>
<tr><td style="padding:0 24px 24px;text-align:center"><a href="mailto:${e.email}" style="background-color:#DA5F6F;border-radius:8px;color:#fff;display:inline-block;font-size:14px;font-weight:600;padding:12px 28px;text-decoration:none">Responder a ${e.name}</a></td></tr>
</table>
<p style="text-align:center;font-size:12px;color:#999;padding:20px 0 0">Nutralech · nutralech.com</p>
</td></tr></table></body></html>`;
}
