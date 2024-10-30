"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Globe, Instagram, Laptop, Rss } from "lucide-react";
import Link from "next/link";

export default function WhatIOfferComponent() {
  const services = [
    {
      icon: <Laptop className="h-12 w-12 text-[#DA5F6F]" />,
      title: "Consultas en Línea",
      href: "#consultas",
    },
    {
      icon: <Globe className="h-12 w-12 text-[#DA5F6F]" />,
      title: "Planes a Distancia",
      href: "#planes",
    },
    {
      icon: <Instagram className="h-12 w-12 text-[#DA5F6F]" />,
      title: "Ve mis Consejos en Instagram",
      href: "https://instagram.com",
    },
    {
      icon: <Rss className="h-12 w-12 text-[#DA5F6F]" />,
      title: "Lee los Artículos de mi Blog",
      href: "/blog",
    },
  ];

  const specialties = [
    "Relación con la Comida",
    "Síndrome de Ovario Poliquístico",
    "Aprende a Comer Bien",
    "Pérdida de Grasa",
    "Aumento de Masa Muscular",
    "Mejora de Rendimiento",
    "Mejora de Salud Hormonal",
    "Resistencia a la Insulina",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-pink-50/50">
      <div className="container px-4 mx-auto">
        <span className="text-lg text-[#DA5F6F]">Explora lo que ofrezco</span>

        <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl md:text-6xl max-w-4xl">
          Planes Alimenticios Personalizados
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-medium">{service.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-serif font-medium">
                Áreas de Enfoque
              </h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Mis ofertas consisten en servicios de coaching nutricional de
                alta calidad, personalizados según tus necesidades únicas. Mi
                enfoque integral se fundamenta en el conocimiento científico y
                una profunda dedicación a tu bienestar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {specialties.map((specialty, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[#DA5F6F]" />
                  <span>{specialty}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white px-8"
            >
              <Link href="#agendar">Agendar Consulta</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
