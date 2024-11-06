import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { Activity, Apple, Book, Calendar, Info } from "lucide-react";
import Link from "next/link";
import { BMICalculatorForm } from "./bmi-calculator-form";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de IMC (Índice de Masa Corporal)",
    description:
      "Calcula tu Índice de Masa Corporal de manera fácil y rápida. Obtén resultados precisos y recomendaciones personalizadas en segundos.",
    keywords: [
      "salud, bienestar, calculadora, imc, nutrición, consejos, recetas, asesoría, personalizada, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-imc",
    },
  });
}

export default function BMICalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link prefetch={false} href="/">
          Inicio
        </Link>
        <span>{">"}</span>
        <Link prefetch={false} href="/herramientas">
          Herramientas
        </Link>
        <span>{">"}</span>
        <span className="text-foreground">Calculadora de IMC</span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de IMC
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Calcula tu Índice de Masa Corporal de manera fácil y rápida. Obtén
          resultados precisos y recomendaciones personalizadas en segundos.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BMICalculatorForm />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Más allá del IMC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Aunque el IMC es útil, no es el único indicador de salud. Otros
                factores importantes incluyen:
              </p>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li className="pl-2">
                  <span className="relative -left-2">
                    Porcentaje de grasa corporal
                  </span>
                </li>
                <li className="pl-2">
                  <span className="relative -left-2">
                    Distribución de la grasa corporal
                  </span>
                </li>
                <li className="pl-2">
                  <span className="relative -left-2">Masa muscular</span>
                </li>
                <li className="pl-2">
                  <span className="relative -left-2">Edad y sexo</span>
                </li>
                <li className="pl-2">
                  <span className="relative -left-2">
                    Condición física general
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Hábitos para una Vida Saludable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li className="pl-2">
                  <span className="relative -left-2">
                    Practica mindfulness y meditación para reducir el estrés.
                  </span>
                </li>
                <li className="pl-2">
                  <span className="relative -left-2">
                    Incorpora ejercicios de fuerza y flexibilidad en tu rutina.
                  </span>
                </li>
                <li className="pl-2">
                  <span className="relative -left-2">
                    Prioriza el sueño reparador con una rutina nocturna
                    constante.
                  </span>
                </li>
                <li className="pl-2">
                  <span className="relative -left-2">
                    Mantén un equilibrio entre vida laboral y personal.
                  </span>
                </li>
                <li className="pl-2">
                  <span className="relative -left-2">
                    Cultiva relaciones sociales positivas y de apoyo.
                  </span>
                </li>
              </ul>
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
                    Guía de Nutrición Balanceada
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Programa de Ejercicios para Principiantes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Técnicas de Manejo del Estrés
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
            Nutrición Balanceada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Una dieta equilibrada es clave para mantener un peso saludable.
            Considera estos consejos:
          </p>
          <ul className="list-disc ml-4 mt-2 space-y-1">
            <li className="pl-2">
              <span className="relative -left-2">
                Incluye una variedad de colores en tus comidas para asegurar
                diversos nutrientes.
              </span>
            </li>
            <li className="pl-2">
              <span className="relative -left-2">
                Opta por granos integrales en lugar de refinados.
              </span>
            </li>
            <li className="pl-2">
              <span className="relative -left-2">
                Incorpora proteínas magras y fuentes vegetales de proteína.
              </span>
            </li>
            <li className="pl-2">
              <span className="relative -left-2">
                Limita el consumo de alimentos procesados y azúcares añadidos.
              </span>
            </li>
            <li className="pl-2">
              <span className="relative -left-2">
                Practica la alimentación consciente, prestando atención a las
                señales de hambre y saciedad.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Recuerda que el IMC es solo una guía general. Para una evaluación más
          precisa de tu salud y un plan personalizado, consulta con un
          profesional médico.
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
