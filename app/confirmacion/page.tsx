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
    console.info("[Checkout Debug]", {
      event: "fetch_start",
      sessionId,
      timestamp: new Date().toISOString(),
    });

    const response = await fetch(
      `https://nutralech.com/api/checkout_sessions?session_id=${sessionId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("[Checkout Error]", {
        event: "api_error",
        status: response.status,
        statusText: response.statusText,
        sessionId,
        timestamp: new Date().toISOString(),
      });
      redirect("/404");
    }

    const data = await response.json();
    console.info("[Checkout Debug]", {
      event: "fetch_success",
      sessionId,
      status: data.status,
      timestamp: new Date().toISOString(),
    });
    return data;
  } catch (error) {
    console.error("[Checkout Error]", {
      event: "fetch_failed",
      error: error instanceof Error ? error.message : "Unknown error",
      sessionId,
      timestamp: new Date().toISOString(),
    });
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
    console.info("[Page Debug]", {
      event: "page_load",
      params: resolvedParams,
      timestamp: new Date().toISOString(),
    });

    if (!resolvedParams.session_id) {
      console.warn("[Page Warning]", {
        event: "missing_session_id",
        timestamp: new Date().toISOString(),
      });
      redirect("/404");
    }

    const session = await getCheckoutSession(resolvedParams.session_id);

    if (session.status !== "complete") {
      console.warn("[Page Warning]", {
        event: "invalid_session_status",
        status: session.status,
        sessionId: resolvedParams.session_id,
        timestamp: new Date().toISOString(),
      });
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
    console.error("[Page Error]", {
      event: "page_error",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
    redirect("/404");
  }
}
