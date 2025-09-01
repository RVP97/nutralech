"use client";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
// import { sendGTMEvent } from "@next/third-parties/google";
import { Check, Copy, Percent, Star, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { lazy, Suspense, useCallback, useState } from "react";

interface IndividualPlan {
  name: string;
  price: string;
  priceId: string;
  description: string;
  features: { name: string; cross: boolean }[];
  popular?: boolean;
}

interface Package {
  name: string;
  originalPrice: string;
  discountedPrice: string;
  priceId: string;
  description: string;
  features: { name: string; cross: boolean }[];
  popular?: boolean;
}

function copyToClipboard(text: string, buttonId: string) {
  navigator.clipboard.writeText(text);

  // Get the text span element and update text
  const textSpan = document.querySelector(`#${buttonId} span`);
  if (textSpan) {
    const originalText = textSpan.textContent;
    textSpan.textContent = "Copiado";
    setTimeout(() => {
      textSpan.textContent = originalText;
    }, 1500);
  }
}

export default function PricingSection() {
  const [showPackages, setShowPackages] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [StripeCheckout, setStripeCheckout] = useState<any>(null);

  const individualPlans = [
    {
      name: "Consulta de Seguimiento",
      price: "800",
      priceId: "price_1QHcX3BoTKroQtb9iezs2h2q",
      description:
        "Después de tu consulta inicial, esta es la consulta para dar seguimiento a tus metas y evaluar tu progreso.",
      features: [
        { name: "Evaluación nutricional completa", cross: false },
        {
          name: "Plan alimenticio personalizado (basado en macros o menú)",
          cross: false,
        },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
      ],
    },
    {
      name: "Consulta Inicial",
      price: "1,200",
      priceId: "price_1QHcqHBoTKroQtb9EcQsiBUO",
      description:
        "Consulta inicial donde te conozco y adapto un plan personalizado a tus necesidades específicas.",
      features: [
        { name: "Evaluación nutricional completa", cross: false },
        {
          name: "Plan alimenticio personalizado (basado en macros o menú)",
          cross: false,
        },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Consulta de primera vez", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
      ],
      popular: true,
    },
    // {
    //   name: "Plan a Distancia",
    //   price: "600",
    //   priceId: "price_1QHcXYBoTKroQtb9Fm9BzAij",
    //   description:
    //     "La opción más económica para resultados a largo plazo. No incluye seguimiento.",
    //   features: [
    //     { name: "Evaluación nutricional completa", cross: false },
    //     { name: "Cuestionario de evaluación", cross: false },
    //     { name: "Plan alimenticio personalizado", cross: false },
    //     { name: "Recomendaciones de suplementación", cross: false },
    //     { name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
    //     { name: "Video llamada de 1 hora con Marialy", cross: true },
    //     { name: "Soporte por chat ilimitado", cross: true },
    //     { name: "Soporte prioritario 24/7", cross: true },
    //     { name: "Análisis de composición corporal", cross: true },
    //   ],
    // },
  ];

  const packages = [
    {
      name: "Paquete Básico",
      originalPrice: "2,000",
      discountedPrice: "1,700",
      priceId: "price_1QHcY3BoTKroQtb9oY63GCl3",
      description:
        "Perfecto para empezar a cambiar tu estilo de vida y alimentación.",
      features: [
        { name: "1 Consulta Inicial", cross: false },
        { name: "1 Consulta de Seguimiento", cross: false },
        { name: "Evaluación nutricional completa", cross: false },
        {
          name: "Plan alimenticio personalizado (basado en macros o menú)",
          cross: false,
        },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
      ],
    },
    {
      name: "Paquete Transformación",
      originalPrice: "3,600",
      discountedPrice: "3,060",
      priceId: "price_1QHcYLBoTKroQtb9bjxsrz4x",
      description:
        "El plan ideal para quienes buscan transformar su vida por completo.",
      features: [
        { name: "1 Consulta Inicial", cross: false },
        { name: "3 Consultas de Seguimiento", cross: false },
        { name: "Evaluación nutricional completa", cross: false },
        {
          name: "Plan alimenticio personalizado (basado en macros o menú)",
          cross: false,
        },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
      ],
      popular: true,
    },
    {
      name: "Paquete Profesional",
      originalPrice: "2,800",
      discountedPrice: "2,380",
      priceId: "price_1QHcYeBoTKroQtb9zJO7l4lD",
      description:
        "Ideal para una transformación profunda para quien quiere un buen cambio.",
      features: [
        { name: "1 Consulta Inicial", cross: false },
        { name: "2 Consultas de Seguimiento", cross: false },
        { name: "Evaluación nutricional completa", cross: false },
        {
          name: "Plan alimenticio personalizado (basado en macros o menú)",
          cross: false,
        },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
      ],
    },
    // {
    //   name: "Test",
    //   originalPrice: "2,800",
    //   discountedPrice: "2,380",
    //   priceId: "price_1Mvmc2BoTKroQtb9Kz0QKe6B",
    //   description:
    //     "Ideal para una transformación profunda para quien quiere un buen cambio.",
    //   features: [
    //     { name: "1 Consulta Inicial", cross: false },
    //     { name: "2 Consultas de Seguimiento", cross: false },
    //     { name: "Video llamada de 1 hora con Marialy", cross: false },
    //     { name: "Evaluación nutricional completa", cross: false },
    //     { name: "Plan alimenticio personalizado", cross: false },
    //     { name: "Recomendaciones de suplementación", cross: false },
    //     { name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
    //     {
    //       name: "Soporte por chat ilimitado (directamente con Marialy)",
    //       cross: false,
    //     },
    //     { name: "Soporte prioritario 24/7", cross: false },
    //     { name: "Análisis de composición corporal", cross: false },
    //   ],
    // },
  ];

  const handlePlanSelection = async (priceId: string) => {
    setSelectedPriceId(priceId);

    // Only load Stripe component when button is clicked
    const StripeCheckoutComponent = dynamic(
      () => import("@/lib/stripe-checkout"),
      {
        loading: () => (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DA5F6F]" />
          </div>
        ),
        ssr: false,
      }
    );

    setStripeCheckout(() => StripeCheckoutComponent);
  };

  return (
    <>
      <Dialog
        open={!!selectedPriceId}
        onOpenChange={() => setSelectedPriceId(null)}
      >
        <DialogContent className="sm:max-w-[90vw] w-[95vw] h-[90vh] max-h-[90vh] flex flex-col rounded-lg">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Completar Pago</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            {selectedPriceId && StripeCheckout && (
              <StripeCheckout priceId={selectedPriceId} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <section
        id="precios"
        className="py-12 md:py-8 bg-gradient-to-b from-white to-pink-50/50"
      >
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <span className="text-lg text-[#DA5F6F]">Precios</span>
            <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
              Planes Diseñados para Ti
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades y objetivos de
              salud.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Métodos de pago aceptados
            </p>
            <div className="grid grid-cols-4 sm:flex items-center gap-6 md:gap-6">
              <Image
                unoptimized
                src="/images/logos/oxxo-logo.svg"
                alt="OXXO"
                width={80}
                height={40}
                className="h-8 w-auto object-contain justify-self-center"
              />
              <Image
                unoptimized
                src="/images/logos/amex.svg"
                alt="American Express"
                width={80}
                height={40}
                className="h-12 w-auto object-contain justify-self-center"
              />
              <Image
                unoptimized
                src="/images/logos/mastercard.svg"
                alt="Mastercard"
                width={80}
                height={40}
                className="h-8 w-auto object-contain justify-self-center"
              />
              <Image
                unoptimized
                src="/images/logos/visa.svg"
                alt="Visa"
                width={80}
                height={40}
                className="h-8 w-auto object-contain justify-self-center"
              />
              {/* <Image
                unoptimized
                src="/images/logos/spei.svg"
                alt="SPEI"
                width={80}
                height={40}
                className="h-8 w-auto object-contain justify-self-center"
              /> */}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="mt-4 text-muted-foreground hover:text-[#DA5F6F] hover:border-[#DA5F6F] flex items-center gap-2"
                >
                  <Image
                    unoptimized
                    src="/images/logos/spei.svg"
                    alt="SPEI"
                    width={24}
                    height={24}
                    className="h-5 w-auto object-contain"
                  />
                  Instrucciones para Transferencia
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-lg">
                <DialogHeader>
                  <DialogTitle>
                    Información para Transferencia Bancaria
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Datos Bancarios:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Banco:</span> BBVA
                          Bancomer
                        </div>
                        <Button
                          id="copy-bank"
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() =>
                            copyToClipboard("BBVA Bancomer", "copy-bank")
                          }
                        >
                          <Copy className="h-4 w-4" />
                          <span>Copiar</span>
                        </Button>
                      </li>
                      <li className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Titular:</span> Marialy
                          Alonso Echenique
                        </div>
                        <Button
                          id="copy-name"
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() =>
                            copyToClipboard(
                              "Marialy Alonso Echenique",
                              "copy-name"
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                          <span>Copiar</span>
                        </Button>
                      </li>
                      <li className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Cuenta:</span> 159 382
                          7239
                        </div>
                        <Button
                          id="copy-cuenta"
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() =>
                            copyToClipboard("1593827239", "copy-cuenta")
                          }
                        >
                          <Copy className="h-4 w-4" />
                          <span>Copiar</span>
                        </Button>
                      </li>
                      <li className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">CLABE:</span> 0121 8001
                          5938 272395
                        </div>
                        <Button
                          id="copy-clabe"
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() =>
                            copyToClipboard("012180015938272395", "copy-clabe")
                          }
                        >
                          <Copy className="h-4 w-4" />
                          <span>Copiar</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Una vez realizada la transferencia, por favor envía el
                    comprobante a{" "}
                    <Link
                      prefetch={false}
                      href="mailto:pagos@nutralech.com"
                      className="font-bold"
                    >
                      pagos@nutralech.com
                    </Link>{" "}
                    o a través de WhatsApp al{" "}
                    <Link
                      prefetch={false}
                      href="https://wa.me/message/BLYZCVYW2MOAJ1"
                      className="font-bold"
                    >
                      +52 744 346 8252
                    </Link>
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 mb-12">
            <div className="flex items-center space-x-4">
              <span
                className={`text-lg ${
                  !showPackages
                    ? "text-[#DA5F6F] font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Planes Individuales
              </span>
              <Switch
                checked={showPackages}
                onCheckedChange={setShowPackages}
                className="data-[state=checked]:bg-[#DA5F6F]"
              />
              <span
                className={`text-lg ${
                  showPackages
                    ? "text-[#DA5F6F] font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Paquetes
              </span>
            </div>
            <button
              onClick={() => setShowPackages(true)}
              className={`flex items-center ${
                showPackages
                  ? "text-[#DA5F6F] bg-[#DA5F6F]/10"
                  : "text-zinc-700 bg-zinc-100 hover:bg-zinc-200"
              } px-4 py-2 rounded-full transition-colors duration-300`}
            >
              <Percent className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {showPackages
                  ? "Ahorras hasta un 15% con los paquetes"
                  : "Cambia a paquetes y ahorra hasta un 15%"}
              </span>
            </button>
          </div>

          <div
            className={`grid gap-8 md:grid-cols-2 ${
              showPackages
                ? "lg:grid-cols-3"
                : individualPlans.length === 2
                ? "lg:grid-cols-2 max-w-4xl mx-auto"
                : "lg:grid-cols-3"
            }`}
          >
            {(showPackages ? packages : individualPlans).map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col relative ${
                  plan.popular ? "border-[#DA5F6F] shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#DA5F6F] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" /> Más Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-bold mb-6">
                    {showPackages ? (
                      <>
                        <span className="text-2xl line-through text-muted-foreground mr-2">
                          ${(plan as Package).originalPrice}
                        </span>
                        <span className="text-[#DA5F6F]">
                          ${(plan as Package).discountedPrice}
                        </span>
                      </>
                    ) : (
                      <>${(plan as IndividualPlan).price}</>
                    )}
                    <span className="text-lg font-normal text-muted-foreground">
                      {" "}
                      MXN
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        {feature.cross ? (
                          <X className="h-5 w-5 text-zinc-300 mr-2 flex-shrink-0" />
                        ) : (
                          <Check className="h-5 w-5 text-[#DA5F6F] mr-2 flex-shrink-0" />
                        )}
                        <span
                          className={
                            feature.cross ? "text-zinc-400" : "text-zinc-900"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-[#DA5F6F] hover:bg-[#DA5F6F]/90"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    } text-white`}
                    onClick={() => handlePlanSelection(plan.priceId)}
                  >
                    Elegir Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
