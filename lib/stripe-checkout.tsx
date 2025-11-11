"use client";

import {
	EmbeddedCheckout,
	EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface StripeCheckoutProps {
	priceId: string;
}

export default function StripeCheckout({ priceId }: StripeCheckoutProps) {
	const fetchClientSecret = () => {
		return fetch("/api/checkout_sessions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				priceId,
			}),
		})
			.then((res) => res.json())
			.then((data) => data.clientSecret);
	};

	const options = { fetchClientSecret };

	return (
		<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
			<EmbeddedCheckout />
		</EmbeddedCheckoutProvider>
	);
}
