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
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { sendGTMEvent } from "@next/third-parties/google";
import { Check, Percent, Star, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { lazy, Suspense, useCallback, useState } from "react";

export default function PricingSection() {
  const [showPackages, setShowPackages] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [StripeCheckout, setStripeCheckout] = useState<any>(null);

  const individualPlans = [
    {
      name: "Consulta de Seguimiento",
      price: "800",
      priceId: "price_1OnRiLBoTKroQtb9a7nJ4Ngs",
      description:
        "Ideal para quienes quieren dar seguimiento al progreso del plan alimenticio y nutricional.",
      features: [
        { name: "Video llamada de 1 hora con Marialy", cross: false },
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
        { name: "Soporte prioritario 24/7", cross: false },
        { name: "Análisis de composición corporal", cross: false },
      ],
    },
    {
      name: "Consulta Inicial",
      price: "1,200",
      priceId: "price_1OXswiBoTKroQtb9waoDv2Uc",
      description:
        "Perfecto para quienes buscan un cambio sostenible con seguimiento continuo y personalizado.",
      features: [
        { name: "Video llamada de 1 hora con Marialy", cross: false },
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
        { name: "Soporte prioritario 24/7", cross: false },
        { name: "Análisis de composición corporal", cross: false },
      ],
      popular: true,
    },
    {
      name: "Plan a Distancia",
      price: "600",
      priceId: "price_1OlfqUBoTKroQtb9SILPRluq",
      description:
        "La opción más económica para resultados a largo plazo. No incluye seguimiento.",
      features: [
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Cuestionario de evaluación", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 3 semanas", cross: false },
        { name: "Video llamada de 1 hora con Marialy", cross: true },
        { name: "Soporte por chat ilimitado", cross: true },
        { name: "Soporte prioritario 24/7", cross: true },
        { name: "Análisis de composición corporal", cross: true },
      ],
    },
  ];

  const packages = [
    {
      name: "Paquete Básico",
      originalPrice: "2,000",
      discountedPrice: "1,700",
      priceId: "price_1OnRkMBoTKroQtb99t7ogi4v",
      description:
        "Perfecto para empezar a cambiar tu estilo de vida y alimentación.",
      features: [
        { name: "1 Consulta Inicial", cross: false },
        { name: "1 Consulta de Seguimiento", cross: false },
        { name: "Video llamada de 1 hora con Marialy", cross: false },
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
        { name: "Soporte prioritario 24/7", cross: false },
        { name: "Análisis de composición corporal", cross: false },
      ],
    },
    {
      name: "Paquete Transformación",
      originalPrice: "3,600",
      discountedPrice: "3,060",
      priceId: "price_1OnRnhBoTKroQtb9ASAfjfzP",
      description:
        "El plan ideal para quienes buscan transformar su vida por completo.",
      features: [
        { name: "1 Consulta Inicial", cross: false },
        { name: "3 Consulta de Seguimiento", cross: false },
        { name: "Video llamada de 1 hora con Marialy", cross: false },
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
        { name: "Soporte prioritario 24/7", cross: false },
        { name: "Análisis de composición corporal", cross: false },
      ],
      popular: true,
    },
    {
      name: "Paquete Profesional",
      originalPrice: "2,800",
      discountedPrice: "2,380",
      priceId: "price_1OnRpiBoTKroQtb900K1PuWY",
      description:
        "Ideal para una transformación profunda para quien quiere un buen cambio.",
      features: [
        { name: "1 Consulta Inicial", cross: false },
        { name: "2 Consulta de Seguimiento", cross: false },
        { name: "Video llamada de 1 hora con Marialy", cross: false },
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento recomendado cada 3 semanas", cross: false },
        {
          name: "Soporte por chat ilimitado (directamente con Marialy)",
          cross: false,
        },
        { name: "Soporte prioritario 24/7", cross: false },
        { name: "Análisis de composición corporal", cross: false },
      ],
    },
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
        <DialogContent className="sm:max-w-[90vw] w-[90vw] h-[90vh] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Completar Pago</DialogTitle>
          </DialogHeader>
          <div className="h-[calc(90vh-80px)] overflow-hidden">
            {selectedPriceId && StripeCheckout && (
              <StripeCheckout priceId={selectedPriceId} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <section className="py-24 bg-gradient-to-b from-white to-pink-50/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <span className="text-lg text-[#DA5F6F]">Precios</span>
            <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
              Planes Diseñados para Ti
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades y objetivos de
              salud.
            </p>
          </div>

          <div className="flex flex-col overflow-scroll items-center justify-center mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Métodos de pago aceptados
            </p>
            <div className="flex items-center gap-6">
              <Image
                unoptimized
                src="/images/logos/oxxo-logo.svg"
                alt="OXXO"
                width={80}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <Image
                unoptimized
                src="/images/logos/amex.svg"
                alt="American Express"
                width={80}
                height={40}
                className="h-12 w-auto object-contain"
              />
              <Image
                unoptimized
                src="/images/logos/mastercard.svg"
                alt="Mastercard"
                width={80}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <Image
                unoptimized
                src="/images/logos/visa.svg"
                alt="Visa"
                width={80}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <Image
                unoptimized
                src="/images/logos/spei.svg"
                alt="SPEI"
                width={80}
                height={40}
                className="h-8 w-auto object-contain"
              />
              {/* Add other payment logos here */}
            </div>
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
            <div
              className={`flex items-center ${
                showPackages
                  ? "text-[#DA5F6F] bg-[#DA5F6F]/10"
                  : "text-zinc-700 bg-zinc-100"
              } px-4 py-2 rounded-full transition-colors duration-300`}
            >
              <Percent className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {showPackages
                  ? "Ahorras hasta un 15% con los paquetes"
                  : "Cambia a paquetes y ahorra hasta un 15%"}
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                          ${plan.originalPrice}
                        </span>
                        <span className="text-[#DA5F6F]">
                          ${plan.discountedPrice}
                        </span>
                      </>
                    ) : (
                      <>${plan.price}</>
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
