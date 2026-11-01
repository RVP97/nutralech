/**
 * /api/checkout_sessions: Stripe embedded checkout through the Stripe REST API (no SDK).
 *   POST {priceId} → { clientSecret } for initEmbeddedCheckout (src/scripts/checkout.ts)
 *   GET ?session_id= → the receipt data the /confirmacion page shows
 */
import type { Env } from "./index";

const json = (body: unknown, status: number) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
	});

class StripeError extends Error {
	constructor(
		message: string,
		readonly status: number,
	) {
		super(message);
	}
}

export async function stripe<T>(env: Env, path: string, form?: Record<string, string>): Promise<T> {
	if (!env.STRIPE_SECRET_KEY) throw new StripeError("Stripe is not configured", 500);
	const response = await fetch(`https://api.stripe.com/v1/${path}`, {
		method: form ? "POST" : "GET",
		headers: {
			Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
			"Stripe-Version": "2025-02-24.acacia",
			...(form && { "Content-Type": "application/x-www-form-urlencoded" }),
		},
		body: form && new URLSearchParams(form),
	});
	const body = (await response.json()) as T & { error?: { message?: string } };
	if (!response.ok) throw new StripeError(body.error?.message ?? "Stripe error", response.status);
	return body;
}

export interface CheckoutSession {
	client_secret?: string;
	status: string;
	payment_status: string;
	amount_total: number | null;
	currency: string;
	customer_details?: { email?: string | null; name?: string | null } | null;
	payment_intent?: { id: string; latest_charge?: Charge | null } | null;
	line_items?: { data: LineItem[] };
}
interface Charge {
	receipt_url?: string | null;
	receipt_number?: string | null;
	created?: number;
}
interface LineItem {
	id: string;
	description: string;
	amount_total: number;
	amount_discount: number;
	currency: string;
	quantity: number;
	price?: { id: string } | null;
}

export async function handleCheckout(request: Request, env: Env): Promise<Response> {
	try {
		if (request.method === "POST") {
			const { priceId } = (await request.json().catch(() => ({}))) as { priceId?: string };
			if (!priceId || typeof priceId !== "string") return json({ message: "Missing price_id" }, 400);
			const origin = new URL(request.url).origin;
			const session = await stripe<CheckoutSession>(env, "checkout/sessions", {
				ui_mode: "embedded",
				"line_items[0][price]": priceId,
				"line_items[0][quantity]": "1",
				"custom_text[after_submit][message]":
					"Gracias por tu compra. En el siguiente paso descarga y llena tu documento para que prepare tu plan personalizado.",
				allow_promotion_codes: "true",
				mode: "payment",
				submit_type: "pay",
				return_url: `${origin}/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
			});
			return json({ clientSecret: session.client_secret }, 200);
		}

		if (request.method === "GET") {
			const sessionId = new URL(request.url).searchParams.get("session_id");
			if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId))
				return json({ message: "Missing session_id" }, 400);
			const session = await stripe<CheckoutSession>(
				env,
				`checkout/sessions/${sessionId}?expand[]=line_items&expand[]=payment_intent.latest_charge`,
			);
			const charge = session.payment_intent?.latest_charge;
			// Only what the confirmation page shows.
			return json(
				{
					paymentIntentID: session.payment_intent?.id ?? null,
					receiptUrl: charge?.receipt_url ?? null,
					receiptNumber: charge?.receipt_number ?? null,
					time: charge?.created ?? null,
					status: session.status,
					customer_email: session.customer_details?.email ?? null,
					total: session.amount_total,
					paymentStatus: session.payment_status,
					currency: session.currency,
					lineItems: (session.line_items?.data ?? []).map((item) => ({
						id: item.id,
						description: item.description,
						amount_total: item.amount_total,
						amount_discount: item.amount_discount,
						currency: item.currency,
						quantity: item.quantity,
						price: item.price ? { id: item.price.id } : null,
					})),
				},
				200,
			);
		}

		return json({ message: "Method not allowed" }, 405);
	} catch (err) {
		const status = err instanceof StripeError ? err.status : 500;
		return json({ message: err instanceof Error ? err.message : "Internal server error" }, status);
	}
}
