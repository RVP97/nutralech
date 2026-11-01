/**
 * Stripe embedded checkout in the home page's payment dialog (src/components/sections/Pricing.astro).
 * The Worker creates the Checkout Session (POST /api/checkout_sessions); Stripe sends the buyer
 * to /confirmacion when they have paid.
 */
import { loadStripe, type StripeEmbeddedCheckout } from "@stripe/stripe-js";

const PUBLISHABLE_KEY =
	"pk_live_51M4q5iBoTKroQtb9Znob6V3JrzQ9IWYxM1CCBbK7f17aDaapmiQIeGpwa2QSBI8zNNG7SEM8ohTRGfcKkJJpm0fz00hnFTm6WW";

let checkout: StripeEmbeddedCheckout | null = null;

export async function openCheckout(priceId: string) {
	const dialog = document.getElementById("checkout-dialog") as HTMLDialogElement | null;
	const mount = dialog?.querySelector<HTMLElement>("[data-checkout-mount]");
	if (!dialog || !mount) return;
	const loading = mount.querySelector<HTMLElement>("[data-checkout-loading]");

	// Only one embedded checkout may exist at a time.
	checkout?.destroy();
	checkout = null;
	mount.querySelector("[data-checkout-frame]")?.remove();
	if (loading) loading.hidden = false;
	dialog.showModal();
	dialog.addEventListener(
		"close",
		() => {
			checkout?.destroy();
			checkout = null;
		},
		{ once: true }
	);

	const stripe = await loadStripe(PUBLISHABLE_KEY);
	if (!stripe || !dialog.open) return;
	const frame = document.createElement("div");
	frame.dataset.checkoutFrame = "";
	mount.append(frame);
	checkout = await stripe.initEmbeddedCheckout({
		fetchClientSecret: () =>
			fetch("/api/checkout_sessions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ priceId }),
			})
				.then((res) => res.json())
				.then((data: { clientSecret: string }) => data.clientSecret),
	});
	if (!dialog.open) {
		checkout.destroy();
		checkout = null;
		return;
	}
	if (loading) loading.hidden = true;
	checkout.mount(frame);
}
