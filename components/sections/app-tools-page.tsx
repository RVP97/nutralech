"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "lucide-react";
import Link from "next/link";

const allTools = [
  {
    title: "Calculadora de IMC",
    description:
      "Calcula tu Índice de Masa Corporal y descubre tu rango de peso saludable.",
    link: "/tools/bmi-calculator",
    category: "Mediciones",
    tags: ["Peso", "Salud"],
  },
  {
    title: "Contador de Calorías",
    description:
      "Registra tus comidas y lleva un control de tu ingesta calórica diaria.",
    link: "/tools/calorie-counter",
    category: "Nutrición",
    tags: ["Calorías", "Dieta"],
  },
  {
    title: "Planificador de Comidas",
    description:
      "Crea planes de comidas personalizados basados en tus objetivos nutricionales.",
    link: "/tools/meal-planner",
    category: "Planificación",
    tags: ["Menú", "Organización"],
  },
  {
    title: "Seguimiento de Peso",
    description:
      "Monitorea tu progreso y visualiza tus cambios de peso a lo largo del tiempo.",
    link: "/tools/weight-tracker",
    category: "Seguimiento",
    tags: ["Peso", "Progreso"],
  },
  {
    title: "Calculadora de Metabolismo Basal",
    description:
      "Calcula tus necesidades calóricas diarias basadas en tu actividad física.",
    link: "/tools/bmr-calculator",
    category: "Mediciones",
    tags: ["Metabolismo", "Energía"],
  },
  {
    title: "Recordatorio de Hidratación",
    description:
      "Establece metas de hidratación y recibe recordatorios para beber agua.",
    link: "/tools/hydration-reminder",
    category: "Seguimiento",
    tags: ["Agua", "Hábitos"],
  },
];

export default function AppToolsPage() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-green-50/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Herramientas Nutricionales
          </Badge>
          <h1 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
            Recursos para Tu Bienestar
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestras herramientas gratuitas diseñadas para ayudarte en
            tu viaje hacia una vida más saludable.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allTools.map((tool, index) => (
            <Card
              key={index}
              className="flex flex-col border-t-4 border-[#DA5F6F] hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className="bg-[#DA5F6F]/10 text-[#DA5F6F] border-[#DA5F6F]"
                  >
                    {tool.category}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-medium">
                  {tool.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 w-full justify-start">
                  {tool.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="flex items-center gap-1 bg-gray-100 text-gray-700"
                    >
                      <Tag size={12} />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href={tool.link} className="w-full">
                  <Button className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white transition-colors duration-300">
                    Usar Herramienta
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-medium mb-4">
            ¿Necesitas ayuda personalizada?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestras herramientas son un gran punto de partida, pero para un
            plan nutricional completamente adaptado a tus necesidades, considera
            una consulta personalizada.
          </p>
          <Link href="#consulta">
            <Button
              size="lg"
              className="bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white transition-colors duration-300"
            >
              Agenda una Consulta
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
