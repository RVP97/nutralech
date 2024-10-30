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
import { Switch } from "@/components/ui/switch";
import { Check, Percent, Star, X } from "lucide-react";
import { useState } from "react";

export default function PricingSection() {
  const [showPackages, setShowPackages] = useState(false);

  const individualPlans = [
    {
      name: "Consulta Única",
      price: "80",
      description: "Ideal para una evaluación inicial o consulta puntual.",
      features: [
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento por 2 semanas", cross: false },
        { name: "Consultas de seguimiento", cross: true },
        { name: "Ajustes semanales del plan", cross: true },
        { name: "Acceso a recetas exclusivas", cross: true },
        { name: "Soporte por chat ilimitado", cross: true },
        { name: "Acceso a workshops", cross: true },
        { name: "Soporte prioritario 24/7", cross: true },
        { name: "Análisis de composición corporal", cross: true },
      ],
    },
    {
      name: "Plan Mensual",
      price: "200",
      description: "Perfecto para quienes buscan un cambio sostenible.",
      features: [
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento por 2 semanas", cross: false },
        { name: "4 consultas de seguimiento", cross: false },
        { name: "Ajustes semanales del plan", cross: false },
        { name: "Acceso a recetas exclusivas", cross: false },
        { name: "Soporte por chat ilimitado", cross: false },
        { name: "Acceso a workshops", cross: true },
        { name: "Soporte prioritario 24/7", cross: true },
        { name: "Análisis de composición corporal", cross: true },
      ],
      popular: true,
    },
    {
      name: "Plan Trimestral",
      price: "500",
      description: "La mejor opción para resultados a largo plazo.",
      features: [
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "Seguimiento por 2 semanas", cross: false },
        { name: "12 consultas de seguimiento", cross: false },
        { name: "Ajustes semanales del plan", cross: false },
        { name: "Acceso a recetas exclusivas", cross: false },
        { name: "Soporte por chat ilimitado", cross: false },
        { name: "Acceso a workshops", cross: false },
        { name: "Soporte prioritario 24/7", cross: false },
        { name: "Análisis de composición corporal", cross: true },
      ],
    },
  ];

  const packages = [
    {
      name: "Paquete Básico",
      originalPrice: "350",
      discountedPrice: "300",
      description: "Inicio perfecto para tu transformación.",
      features: [
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "3 meses de seguimiento", cross: false },
        { name: "6 consultas de seguimiento", cross: false },
        { name: "Ajustes semanales del plan", cross: false },
        { name: "Acceso a recetas exclusivas", cross: false },
        { name: "Soporte por chat ilimitado", cross: false },
        { name: "Acceso a workshops", cross: true },
        { name: "Soporte prioritario 24/7", cross: true },
        { name: "Análisis de composición corporal", cross: true },
      ],
    },
    {
      name: "Paquete Premium",
      originalPrice: "700",
      discountedPrice: "600",
      description: "Transformación completa con apoyo intensivo.",
      features: [
        { name: "Evaluación nutricional completa", cross: false },
        { name: "Plan alimenticio personalizado", cross: false },
        { name: "Recomendaciones de suplementación", cross: false },
        { name: "6 meses de seguimiento", cross: false },
        { name: "12 consultas de seguimiento", cross: false },
        { name: "Ajustes semanales del plan", cross: false },
        { name: "Acceso a recetas exclusivas", cross: false },
        { name: "Soporte por chat ilimitado", cross: false },
        { name: "Acceso a todos los workshops", cross: false },
        { name: "Soporte prioritario 24/7", cross: false },
        { name: "Análisis de composición corporal", cross: false },
      ],
      popular: true,
    },
  ];

  return (
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
                    / {showPackages ? "paquete" : "mes"}
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
                >
                  Elegir Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
