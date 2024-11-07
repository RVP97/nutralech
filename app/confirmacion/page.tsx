import SuccessfulPayment from "@/components/sections/successful-payment";
import Confetti from "@/components/ui/confetti";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Script from "next/script";

interface LineItem {
  id: string;
  description: string;
  amount_total: number;
  amount_discount: number;
  quantity: number;
  currency: string;
  price: {
    product: string;
  };
}

interface CheckoutSession {
  status: string;
  customer_email: string | undefined;
  time: number | null;
  total: number | null;
  paymentStatus: string;
  currency: string;
  receiptUrl: string | null;
  receiptNumber: string | null;
  lineItems: LineItem[];
  paymentIntentID: string | null;
}

async function getCheckoutSession(sessionId: string): Promise<CheckoutSession> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "http://localhost:3000";
    const url = new URL(`/api/checkout_sessions`, baseUrl);
    url.searchParams.set("session_id", sessionId);

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching checkout session:", error);
    redirect("/404");
  }
}

export const metadata: Metadata = {
  robots: "noindex",
};

export default async function Return({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  try {
    const resolvedParams = await searchParams;
    if (!resolvedParams.session_id) redirect("/404");
    const session = await getCheckoutSession(resolvedParams.session_id);
    if (session.status !== "complete") {
      redirect("/404");
    }

    const { calendarButtonText, calendarUrl } = session.lineItems.some(
      (item) => item.price.product === "prod_NKr66L5cZaB7J3"
    )
      ? {
          calendarButtonText: "Agendar Sesión",
          calendarUrl: "https://cal.com/nutralech/seguimiento",
        }
      : {
          calendarButtonText: "Agendar Sesión",
          calendarUrl: "https://cal.com/nutralech/inicial",
        };

    const consultaDistancia = session.lineItems.some(
      (item) => item.price.product === "prod_NKrB6ksz8CGbeU"
    );

    return (
      <div className="mt-14 md:mt-0">
        <Script id="gtm-purchase-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'purchase',
              'ecommerce': {
                'transaction_id': '${session.paymentIntentID}',
                'value': ${session.total ? session.total / 100 : 0},
                'currency': '${session.currency}',
                'items': ${JSON.stringify(
                  session.lineItems.map((item) => ({
                    item_id: item.id,
                    item_name: item.description,
                    price: item.amount_total / 100,
                    currency: item.currency,
                    quantity: item.quantity,
                  }))
                )}
              }
            });
          `}
        </Script>
        <Confetti />
        <SuccessfulPayment
          consultaDistancia={consultaDistancia}
          calendarButtonText={calendarButtonText}
          calendarUrl={calendarUrl}
          time={session.time ?? 0}
          lineItems={session.lineItems ?? []}
          email={session.customer_email ?? ""}
          receiptNumber={session.receiptNumber ?? ""}
          receiptUrl={session.receiptUrl ?? ""}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in Return component:", error);
    redirect("/404");
  }
}
