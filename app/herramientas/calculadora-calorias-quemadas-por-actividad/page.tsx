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
import { CaloriesBurnedCalculator } from "./calories-burned";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de Calorías Quemadas por Actividad",
    description:
      "Calcula las calorías quemadas durante diferentes actividades físicas y ejercicios. Herramienta precisa basada en valores MET estándar.",
    keywords: [
      "calculadora calorías quemadas, ejercicio, actividad física, MET, gasto calórico, fitness, salud, nutrición, nutralech",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-calorias-quemadas-por-actividad",
    },
  });
}

export default function CaloriesBurnedCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/">Inicio</Link>
        <span>{">"}</span>
        <Link href="/herramientas">Herramientas</Link>
        <span>{">"}</span>
        <span className="text-foreground">
          Calculadora de Calorías Quemadas por Actividad
        </span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de Calorías Quemadas por Actividad
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Calcula con precisión las calorías que quemas durante diferentes
          actividades físicas y ejercicios basado en tu peso y la intensidad del
          ejercicio.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <CaloriesBurnedCalculator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                ¿Qué es el MET?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                El MET (Equivalente Metabólico) es una medida que indica la
                intensidad de una actividad física:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>1 MET:</strong> Energía consumida en reposo
                </li>
                <li>
                  <strong>Actividad Ligera:</strong> 2-3 METs
                </li>
                <li>
                  <strong>Actividad Moderada:</strong> 3-6 METs
                </li>
                <li>
                  <strong>Actividad Vigorosa:</strong> 6+ METs
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
                  <strong>Peso Corporal:</strong> A mayor peso, mayor gasto
                  calórico durante la misma actividad
                </li>
                <li>
                  <strong>Intensidad del Ejercicio:</strong> El esfuerzo
                  realizado determina significativamente las calorías quemadas
                </li>
                <li>
                  <strong>Nivel de Condición Física:</strong> Las personas
                  entrenadas suelen quemar calorías más eficientemente
                </li>
                <li>
                  <strong>Composición Corporal:</strong> El músculo quema más
                  calorías que la grasa, incluso en reposo
                </li>
                <li>
                  <strong>Edad:</strong> El metabolismo tiende a ralentizarse
                  con la edad, afectando el gasto calórico
                </li>
                <li>
                  <strong>Temperatura Ambiente:</strong> El cuerpo puede quemar
                  más calorías en ambientes fríos o muy calientes
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
            Consejos para Maximizar el Gasto Calórico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3">
            Para optimizar la quema de calorías durante el ejercicio:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Mantén una intensidad apropiada para tu nivel de condición física
            </li>
            <li>
              Combina ejercicios cardiovasculares con entrenamiento de fuerza
            </li>
            <li>Incorpora intervalos de alta intensidad en tu rutina</li>
            <li>Mantén una buena hidratación durante el ejercicio</li>
            <li>Asegura una recuperación adecuada entre sesiones</li>
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
