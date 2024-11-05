import SuccessfulPayment from "@/components/sections/successful-payment";
import Confetti from "@/components/ui/confetti";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
}

async function getCheckoutSession(sessionId: string): Promise<CheckoutSession> {
  try {
    const response = await fetch(
      `https://nutralech.vercel.app/api/checkout_sessions?session_id=${sessionId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      redirect("/404");
    }

    return response.json();
  } catch (error) {
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
      <div className="">
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
    redirect("/404");
  }
}
