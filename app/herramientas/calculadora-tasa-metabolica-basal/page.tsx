import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { Activity, Apple, Book, Calendar, Info } from "lucide-react";
import Link from "next/link";
import { BMRCalculator } from "./bmr-calculator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de Tasa Metabólica Basal",
    description:
      "Calcula tu tasa metabólica basal (TMB) y conoce las calorías que tu cuerpo necesita en reposo. Herramienta desarrollada por Nutralech.",
    keywords: [
      "tasa metabólica basal, TMB, metabolismo, calorías en reposo, nutrición, salud, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-tasa-metabolica-basal",
    },
  });
}

export default function BMRCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/">Inicio</Link>
        <span>{">"}</span>
        <Link href="/herramientas">Herramientas</Link>
        <span>{">"}</span>
        <span className="text-foreground">
          Calculadora de Tasa Metabólica Basal
        </span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de Tasa Metabólica Basal
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Calcula las calorías que tu cuerpo necesita en reposo. Conoce tu
          metabolismo basal para planificar mejor tu nutrición y objetivos de
          salud.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BMRCalculator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                ¿Qué es la Tasa Metabólica Basal?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                La Tasa Metabólica Basal (TMB) representa la cantidad mínima de
                energía que tu cuerpo necesita para mantener sus funciones
                vitales en reposo:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Funciones Básicas:</strong> Mantiene procesos como la
                  respiración, circulación sanguínea, regulación de temperatura
                  y funcionamiento de órganos.
                </li>
                <li>
                  <strong>Factores Influyentes:</strong>
                  <ul className="list-none mt-1 ml-4 text-muted-foreground">
                    <li>• Edad (disminuye con los años)</li>
                    <li>• Masa muscular (mayor músculo = mayor TMB)</li>
                    <li>• Género (varía según composición corporal)</li>
                    <li>• Genética y hormonas</li>
                  </ul>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Cómo Usar tu TMB
              </CardTitle>
              <CardDescription>
                Tu TMB es el punto de partida para calcular tus necesidades
                calóricas diarias totales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">
                    1. Calcula tus calorías diarias totales
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Multiplica tu TMB por tu factor de actividad:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Sedentario (poco o ningún ejercicio): TMB × 1.2</li>
                    <li>Ejercicio ligero (1-3 días/semana): TMB × 1.375</li>
                    <li>Ejercicio moderado (3-5 días/semana): TMB × 1.55</li>
                    <li>Ejercicio intenso (6-7 días/semana): TMB × 1.725</li>
                    <li>Ejercicio muy intenso: TMB × 1.9</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">
                    2. Ajusta según tus objetivos
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Mantener peso: Consume las calorías calculadas</li>
                    <li>Perder peso: Reduce 300-500 calorías del total</li>
                    <li>Ganar peso: Aumenta 300-500 calorías al total</li>
                  </ul>
                </div>

                <div className="text-sm text-muted-foreground border-t pt-4">
                  <strong className="text-foreground">Importante:</strong> Estos
                  cálculos son estimaciones. Ajusta según tu progreso y{" "}
                  <Link
                    prefetch={false}
                    href="/#precios"
                    className="text-blue-600 hover:underline"
                  >
                    agenda tu consulta
                  </Link>{" "}
                  conmigo para un plan personalizado.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Recursos Adicionales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Guía de Macronutrientes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Planificación de Comidas Saludables
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Mitos y Verdades sobre las Calorías
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Consulta con Nutricionistas
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="h-5 w-5" />
            Optimizando tu TMB con la Alimentación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Tu alimentación puede influir significativamente en tu tasa
            metabólica basal. Aquí algunos puntos clave para optimizarla:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Consume proteína en cada comida para mantener y desarrollar masa
              muscular, lo que aumenta tu TMB.
            </li>
            <li>
              Mantén un horario regular de comidas para estabilizar tu
              metabolismo.
            </li>
            <li>
              Incluye alimentos termogénicos como chile, jengibre y té verde que
              pueden estimular temporalmente el metabolismo.
            </li>
            <li>
              No restrinjas demasiado las calorías, ya que esto puede ralentizar
              tu TMB.
            </li>
            <li>
              Combina tu alimentación con ejercicio de resistencia para aumentar
              tu masa muscular y, por ende, tu TMB.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Recuerda que esta calculadora proporciona una estimación. Para un plan
          nutricional personalizado que se ajuste a tus objetivos de peso,{" "}
          <Link
            prefetch={false}
            href="/#precios"
            className="text-blue-600 hover:underline"
          >
            agenda tu consulta
          </Link>{" "}
          conmigo.
        </p>
      </div>

      <div className="mt-12 bg-gradient-to-r from-[#DA5F6F] to-[#DA5F6F]/80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para mejorar tu salud?</span>
            <span className="block text-gray-100">
              Agenda una consulta personalizada hoy.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link prefetch={false} href="/#precios">
                <Button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#DA5F6F] bg-white hover:bg-gray-50">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Consulta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
