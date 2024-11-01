import SuccessfulPayment from "@/components/sections/successful-payment";
import Confetti from "@/components/ui/confetti";
import { redirect } from "next/navigation";

interface LineItem {
  id: string;
  description: string;
  amount_total: number;
  amount_discount: number;
  quantity: number;
  currency: string;
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/checkout_sessions?session_id=${sessionId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    redirect("/");
  }

  return response.json();
}

export default async function Return({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const resolvedParams = await searchParams;
  if (!resolvedParams.session_id) return <div>No session ID found</div>;

  const session = await getCheckoutSession(resolvedParams.session_id);
  console.log(session);

  if (session.status !== "complete") {
    redirect("/");
  }

  return (
    <div className="">
      <Confetti />

      <SuccessfulPayment
        time={session.time ?? 0}
        lineItems={session.lineItems ?? []}
        email={session.customer_email ?? ""}
        receiptNumber={session.receiptNumber ?? ""}
        receiptUrl={session.receiptUrl ?? ""}
      />
    </div>
  );
}
