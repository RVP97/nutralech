import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { message: "Missing price_id" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      custom_text: {
        after_submit: {
          message:
            "Esta consulta es el inicio de un nuevo camino hacia una vida más saludable y plena.",
        },
      },
      allow_promotion_codes: true,
      mode: "payment",
      submit_type: "book",
      return_url: `${request.headers.get(
        "origin"
      )}/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    const error = err as Stripe.StripeRawError;
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { message: "Missing session_id" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    const paymentIntent = session.payment_intent
      ? await stripe.paymentIntents.retrieve(session.payment_intent.toString())
      : null;

    const charge = paymentIntent?.latest_charge
      ? await stripe.charges.retrieve(paymentIntent.latest_charge.toString())
      : null;

    return NextResponse.json({
      paymentIntentID: session.payment_intent,
      paymentIntentDetails: paymentIntent,
      chargeDetails: charge,
      receiptUrl: charge?.receipt_url,
      receiptNumber: charge?.receipt_number,
      time: charge?.created,
      status: session.status,
      customer_email: session.customer_details?.email,
      total: session.amount_total,
      paymentStatus: session.payment_status,
      currency: session.currency,
      lineItems: lineItems.data,
    });
  } catch (err) {
    const error = err as Stripe.StripeRawError;
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
