import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, AtSign, CheckCircle, Download } from "lucide-react";
import Link from "next/link";

interface LineItem {
  id: string;
  description: string;
  amount_total: number;
  amount_discount: number;
  currency: string;
  quantity: number;
}

interface SuccessfulPaymentProps {
  receiptUrl?: string;
  receiptNumber?: string;
  email: string;
  lineItems: LineItem[];
}

export default function SuccessfulPayment({
  receiptUrl,
  receiptNumber,
  email,
  lineItems,
}: SuccessfulPaymentProps) {
  const total = lineItems.reduce((sum, item) => sum + item.amount_total, 0);

  const orderDetails = {
    date: new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">¡Pago Exitoso!</CardTitle>
          <CardDescription>
            Gracias por tu compra. Tu orden ha sido procesada correctamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <p className="text-sm font-medium">
              Número de Orden: {receiptNumber}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <AtSign className="mr-2 h-4 w-4" />
              Email: {email}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm">
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg">Marialy Nutrición</h3>
              <p>Recibo de Compra</p>
            </div>
            <div className="mb-4">
              <p>Fecha: {orderDetails.date}</p>
              <p>Hora: {orderDetails.time}</p>
              <p>Orden: {receiptNumber}</p>
            </div>
            <div className="border-t border-b border-dashed border-gray-300 py-2 mb-4">
              {lineItems.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{item.description}</span>
                    <div className="text-right">
                      {item.amount_discount > 0 && (
                        <span className="block text-gray-500 line-through">
                          $
                          {(
                            (item.amount_total + item.amount_discount) /
                            100
                          ).toFixed(2)}{" "}
                          {item.currency.toUpperCase()}
                        </span>
                      )}
                      <span>
                        ${(item.amount_total / 100).toFixed(2)}{" "}
                        {item.currency.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>
                ${(total / 100).toFixed(2)}{" "}
                {lineItems[0]?.currency.toUpperCase()}
              </span>
            </div>
            <div className="mt-4 text-center text-xs">
              <p>Gracias por tu compra</p>
              <p>www.nutralech.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Próximos Pasos:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Recibirás un email de confirmación a{" "}
                <span className="font-semibold">{email}</span> con los detalles
                de tu orden.
              </li>
              <li>
                Nuestro equipo se pondrá en contacto contigo para agendar tu
                consulta.
              </li>
              <li>
                Prepara cualquier pregunta o inquietud que tengas para tu
                sesión.
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <Button asChild>
            <Link href="/">
              Ir a Inicio <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {receiptUrl && (
            <Link prefetch={false} target="_blank" href={receiptUrl}>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Descargar Recibo
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
