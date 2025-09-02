import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { Activity, Apple, Book, Calendar, Info } from "lucide-react";
import Link from "next/link";
import { HydrationCalculator } from "./hydration-calculator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de Hidratación Diaria",
    description:
      "Calcula tus necesidades diarias de hidratación y mantente saludable con la herramienta de Nutralech.",
    keywords: [
      "hidratación, salud, bienestar, agua, consumo, consejos, nutrición, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-hidratacion",
    },
  });
}

export default function HydrationCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/">Inicio</Link>
        <span>{">"}</span>
        <Link href="/herramientas">Herramientas</Link>
        <span>{">"}</span>
        <span className="text-foreground">Calculadora de Hidratación</span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de Hidratación
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Calcula tus necesidades diarias de hidratación de manera fácil y
          rápida. Obtén una estimación precisa basada en tu perfil personal y
          nivel de actividad.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <HydrationCalculator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Importancia de la Hidratación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Mantenerse hidratado es esencial para el funcionamiento óptimo
                del cuerpo. Aquí hay algunos consejos para asegurar una
                hidratación adecuada:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Consumo Diario:</strong> Se recomienda beber al menos
                  8 vasos de agua al día.
                </li>
                <li>
                  <strong>Factores Influyentes:</strong> La actividad física, el
                  clima y la salud general pueden afectar tus necesidades de
                  agua.
                </li>
                <li>
                  <strong>Señales de Deshidratación:</strong> Sed, orina oscura,
                  fatiga y mareos son signos comunes.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Consejos para Mantenerse Hidratado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bebe agua regularmente a lo largo del día.</li>
                <li>Incluye alimentos ricos en agua como frutas y verduras.</li>
                <li>Evita bebidas azucaradas y con cafeína en exceso.</li>
                <li>Escucha a tu cuerpo y bebe cuando tengas sed.</li>
                <li>
                  Ajusta tu consumo de agua según tu nivel de actividad y clima.
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
                    href="/herramientas/calculadora-imc"
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de IMC
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/#precios"
                    className="text-blue-600 hover:underline"
                  >
                    Planes y Consultas
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="#"
                    className="text-blue-600 hover:underline"
                  >
                    Consulta con Nutricionistas
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
            Hidratación y Salud
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Una hidratación adecuada es clave para una buena salud,
            independientemente de tu nivel de actividad:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Incluye agua en cada comida y entre comidas.</li>
            <li>Opta por agua en lugar de bebidas azucaradas.</li>
            <li>Incorpora alimentos ricos en agua en tu dieta.</li>
            <li>Limita el consumo de alcohol y cafeína.</li>
            <li>Mantente hidratado bebiendo suficiente agua durante el día.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Recuerda que esta calculadora proporciona una estimación. Para un plan
          de hidratación personalizado que se ajuste a tus necesidades,{" "}
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
