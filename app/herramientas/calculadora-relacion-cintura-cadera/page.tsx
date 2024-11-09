import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { Activity, Book, Calendar, Info, Ruler, Scale } from "lucide-react";
import Link from "next/link";
import { WHRCalculator } from "./hip-waist-calculator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de Relación Cintura-Cadera",
    description:
      "Calcula tu relación cintura-cadera para evaluar la distribución de grasa corporal y los riesgos asociados a la salud. Herramienta basada en estándares médicos.",
    keywords: [
      "relación cintura-cadera, ICC, distribución grasa corporal, riesgo cardiovascular, medidas corporales, salud, nutrición, nutralech",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-relacion-cintura-cadera",
    },
  });
}

export default function WHRCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/">Inicio</Link>
        <span>{">"}</span>
        <Link href="/herramientas">Herramientas</Link>
        <span>{">"}</span>
        <span className="text-foreground">
          Calculadora de Relación Cintura-Cadera
        </span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de Relación Cintura-Cadera
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Determina tu distribución de grasa corporal y evalúa los riesgos
          asociados a la salud mediante el cálculo de la relación entre tu
          cintura y caderas.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <WHRCalculator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Interpretación del ICC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                La relación cintura-cadera (ICC) es un indicador importante de
                la distribución de grasa corporal:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Hombres:</strong>
                  <ul className="list-none mt-1 text-sm text-muted-foreground">
                    <li>• Riesgo Bajo: ≤ 0.85</li>
                    <li>• Riesgo Moderado: 0.85 - 0.95</li>
                    <li>• Riesgo Alto: `{">"}` 0.95</li>
                  </ul>
                </li>
                <li>
                  <strong>Mujeres:</strong>
                  <ul className="list-none mt-1 text-sm text-muted-foreground">
                    <li>• Riesgo Bajo: ≤ 0.75</li>
                    <li>• Riesgo Moderado: 0.75 - 0.85</li>
                    <li>• Riesgo Alto: `{">"}` 0.85</li>
                  </ul>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Factores que Influyen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Edad:</strong> El peso ideal puede variar en
                  diferentes etapas de la vida.
                </li>
                <li>
                  <strong>Distribución Corporal:</strong> La forma en que se
                  distribuye el peso influye en la salud general.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Interpretación de Resultados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Es importante entender que el peso ideal es una referencia, no
                un objetivo estricto:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Considéralo como un rango, no un número exacto.</li>
                <li>
                  Evalúa tu salud general, no solo el número en la báscula.
                </li>
                <li>
                  Ten en cuenta tu nivel de actividad física y estilo de vida.
                </li>
                <li>
                  Consulta con profesionales para objetivos personalizados.
                </li>
                <li>Considera otros indicadores de salud además del peso.</li>
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
                    href="/herramientas/calculadora-calorias"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Calorías Diarias
                  </Link>
                </li>
                <li>
                  <Link
                    href="/herramientas/calculadora-imc"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de IMC
                  </Link>
                </li>
                <li>
                  <Link
                    href="/herramientas/calculadora-tasa-metabolica-basal"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Metabolismo Basal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/herramientas/calculadora-macronutrientes"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Macronutrientes
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
            <Scale className="h-5 w-5" />
            Recomendaciones Generales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3">
            Para mejorar tu relación cintura-cadera y reducir el riesgo
            cardiovascular:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Mantén un programa regular de ejercicio que incluya entrenamiento
              de fuerza y cardiovascular.
            </li>
            <li>
              Limita el consumo de alimentos procesados y azúcares refinados.
            </li>
            <li>Prioriza alimentos ricos en fibra y proteínas magras.</li>
            <li>
              Combina ejercicio cardiovascular con entrenamiento de fuerza.
            </li>
            <li>Mantén un control regular de tus medidas corporales.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Recuerda que esta calculadora proporciona una estimación. Para un plan
          personalizado que considere tu historial médico y objetivos
          específicos,{" "}
          <Link
            prefetch={false}
            href="/#precios"
            className="text-blue-600 hover:underline"
          >
            agenda una consulta
          </Link>{" "}
          con nuestros especialistas.
        </p>
      </div>

      <div className="mt-12 bg-gradient-to-r from-[#DA5F6F] to-[#DA5F6F]/80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Quieres un plan personalizado?</span>
            <span className="block text-gray-100">
              Obtén asesoría profesional para alcanzar tu peso ideal.
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
