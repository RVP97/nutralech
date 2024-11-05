import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, CheckCircle, Download } from "lucide-react";
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
  time: number;
  lineItems: LineItem[];
  calendarUrl?: string;
  calendarButtonText?: string;
  consultaDistancia?: boolean;
}

const CLINICAL_FORMS = {
  hombres:
    "https://emghocojucownsmpmrii.supabase.co/storage/v1/object/public/formulario/historia/Historia%20Clinica%20Hombres.pdf",
  mujeres:
    "https://emghocojucownsmpmrii.supabase.co/storage/v1/object/public/formulario/historia/Historia%20Clinica%20Mujeres.pdf",
} as const;

export default function SuccessfulPayment({
  receiptUrl,
  receiptNumber,
  email,
  time,
  lineItems,
  calendarUrl = "https://cal.com/nutralech/inicial",
  calendarButtonText = "Agendar Sesión",
  consultaDistancia = false,
}: SuccessfulPaymentProps) {
  const total = lineItems.reduce((sum, item) => sum + item.amount_total, 0);

  const orderDetails = {
    date: new Date(time * 1000).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: new Date(time * 1000).toLocaleTimeString("es-ES", {
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
              {/* <AtSign className="mr-2 h-4 w-4" /> */}
              Email: {email}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm">
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg">Marialy Alonso: Nutralech</h3>
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
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li className="pl-2">
                Recibirás un email de confirmación a{" "}
                <span className="font-semibold">{email}</span> con los detalles
                de tu orden.
              </li>
              {consultaDistancia && (
                <li className="pl-2">
                  Por favor llena la historia clínica y envíamela por correo a{" "}
                  <span className="font-semibold">marialyalonso@gmail.com</span>{" "}
                  o por WhatsApp al{" "}
                  <Link
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/message/BLYZCVYW2MOAJ1"
                    className="font-bold whitespace-nowrap"
                  >
                    +52 744 346 8252
                  </Link>
                </li>
              )}
              {!consultaDistancia && (
                <li className="pl-2">
                  Para agendar tu sesión, por favor usa el botón de abajo o
                  envíame un mensaje a{" "}
                  <Link
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/message/BLYZCVYW2MOAJ1"
                    className="font-bold whitespace-nowrap"
                  >
                    +52 744 346 8252
                  </Link>
                </li>
              )}
              <li className="pl-2">
                Prepara cualquier pregunta o inquietud que tengas para tu
                sesión.
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          {consultaDistancia ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Descargar Formulario <Download className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    prefetch={false}
                    href={CLINICAL_FORMS.hombres}
                    target="_blank"
                    className="w-full"
                  >
                    Hombres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    prefetch={false}
                    href={CLINICAL_FORMS.mujeres}
                    target="_blank"
                    className="w-full"
                  >
                    Mujeres
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link prefetch={false} target="_blank" href={calendarUrl}>
                {calendarButtonText} <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
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
