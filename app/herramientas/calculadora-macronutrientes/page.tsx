import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { Activity, Apple, Book, Calendar, Info } from "lucide-react";
import Link from "next/link";
import { MacroCalculatorForm } from "./macronutrient-form";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de Macronutrientes",
    description:
      "Calcula tu distribución óptima de macronutrientes para tu dieta.",
    keywords: [
      "salud, bienestar, calculadora, imc, nutrición, consejos, recetas, asesoría, personalizada, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-macronutrientes",
    },
  });
}

export default function MacroCalculatorPage() {
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
          Calculadora de Macronutrientes
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Optimiza tu nutrición calculando la distribución ideal de
          macronutrientes según tus objetivos específicos. Obtén una guía
          personalizada de proteínas, carbohidratos y grasas para alcanzar tus
          metas de forma saludable.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <MacroCalculatorForm />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Guía Completa de Macronutrientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Los macronutrientes son nutrientes esenciales que tu cuerpo
                necesita en grandes cantidades para funcionar correctamente:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Proteínas (4 kcal/g)</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Fundamentales para la construcción y reparación muscular
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Esenciales para el sistema inmunológico
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Ayudan en la producción de enzimas y hormonas
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Carbohidratos (4 kcal/g)
                  </h3>
                  <ul className="list-disc ml-4 space-y-1">
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Principal fuente de energía para el cuerpo
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Fundamentales para el funcionamiento cerebral
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Preservan la masa muscular durante el ejercicio
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Grasas (9 kcal/g)</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Vitales para la absorción de vitaminas liposolubles (A,
                        D, E, K)
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Esenciales para la producción hormonal
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Proporcionan energía de larga duración
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Factores que Afectan tus Macros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Nivel de Actividad</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Sedentario: Requiere menos carbohidratos, enfoque en
                        proteínas
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Moderadamente activo: Balance equilibrado de macros
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Muy activo: Mayor necesidad de carbohidratos y proteínas
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Composición Corporal</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Mayor masa muscular requiere más proteína para
                        mantenimiento
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        El porcentaje de grasa corporal influye en la
                        sensibilidad a carbohidratos
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        La edad afecta el metabolismo y necesidades
                        nutricionales
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Horario y Estilo de Vida
                  </h3>
                  <ul className="list-disc ml-4 space-y-1">
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Timing de comidas afecta la utilización de nutrientes
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Estrés y sueño impactan el metabolismo hormonal
                      </span>
                    </li>
                    <li className="pl-2">
                      <span className="relative -left-2">
                        Preferencias alimentarias influyen en la adherencia
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Recursos y Consejos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link
                    prefetch={false}
                    href="/herramientas/calculadora-calorias"
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Calorías
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/herramientas/calculadora-hidratacion"
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Hidratación
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/herramientas/calculadora-imc"
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de IMC
                  </Link>
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
            Fuentes Óptimas de Macronutrientes
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
