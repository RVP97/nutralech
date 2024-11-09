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
import { ProteinCalculator } from "./protein-calculator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de Proteína Diaria",
    description:
      "Calcula tus necesidades diarias de proteína basado en tu peso, nivel de actividad y objetivos. Herramienta desarrollada por Nutralech.",
    keywords: [
      "proteína, calculadora proteína, nutrición deportiva, masa muscular, recuperación, nutrición, nutralech",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-proteina",
    },
  });
}

export default function ProteinCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/">Inicio</Link>
        <span>{">"}</span>
        <Link href="/herramientas">Herramientas</Link>
        <span>{">"}</span>
        <span className="text-foreground">Calculadora de Proteína Diaria</span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de Proteína Diaria
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Calcula tus necesidades diarias de proteína basado en evidencia
          científica. Obtén recomendaciones personalizadas según tu peso, nivel
          de actividad y objetivos.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ProteinCalculator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Recomendaciones de Proteína
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Las necesidades de proteína varían según varios factores. Estas
                son las recomendaciones basadas en evidencia científica:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Sedentario:</strong> 0.8g por kg de peso corporal
                </li>
                <li>
                  <strong>Ejercicio Moderado:</strong> 1.2-1.4g por kg de peso
                </li>
                <li>
                  <strong>Entrenamiento Intenso:</strong> 1.6-1.8g por kg de
                  peso
                </li>
                <li>
                  <strong>Ganancia Muscular:</strong> 1.8-2.2g por kg de peso
                </li>
                <li>
                  <strong>Factores Adicionales:</strong>
                  <ul className="list-none mt-1 ml-4 text-muted-foreground">
                    <li>• Edad (mayores necesidades en adultos mayores)</li>
                    <li>• Recuperación de lesiones</li>
                    <li>• Restricción calórica</li>
                    <li>• Tipo de entrenamiento</li>
                  </ul>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Distribución de Proteína
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Distribuye la ingesta en 4-6 comidas al día</li>
                <li>
                  20-40g de proteína por comida para optimizar la síntesis
                  muscular
                </li>
                <li>Incluye proteína post-entrenamiento</li>
                <li>Combina fuentes animales y vegetales</li>
                <li>
                  Considera la leucina como aminoácido clave (2.5-3g por comida)
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
                    href="/herramientas/calculadora-calorias"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Calorías Diarias
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
                    href="/herramientas/calculadora-peso-ideal"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Peso Ideal
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
            Alimentación Balanceada
          </CardTitle>
          <CardDescription>
            Principios fundamentales para una nutrición óptima,
            independientemente de tus objetivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Una alimentación balanceada es fundamental para mantener una buena
              salud y optimizar el aprovechamiento de la proteína:
            </p>
            <ul className="grid gap-3">
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <span>
                  <strong>Frutas y verduras:</strong> Incluye 5 porciones
                  diarias para obtener vitaminas, minerales y antioxidantes
                  esenciales
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <span>
                  <strong>Carbohidratos complejos:</strong> Prioriza granos
                  integrales, quinoa y avena para energía sostenida
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <span>
                  <strong>Grasas saludables:</strong> Incorpora aguacate, frutos
                  secos y aceite de oliva para funciones hormonales
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <span>
                  <strong>Alimentos integrales:</strong> Reduce ultraprocesados
                  y azúcares añadidos que pueden interferir con tus objetivos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <span>
                  <strong>Hidratación:</strong> Consume 30-35ml de agua por kg
                  de peso corporal para optimizar las funciones metabólicas
                </span>
              </li>
            </ul>
          </div>
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
