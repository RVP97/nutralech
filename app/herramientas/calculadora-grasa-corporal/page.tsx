import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { Activity, Book, Calendar, Info, Ruler } from "lucide-react";
import Link from "next/link";
import { BodyFatCalculator } from "./body-fat-calculator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de Grasa Corporal",
    description:
      "Calcula tu porcentaje de grasa corporal usando métodos científicos precisos. Obtén análisis detallado y recomendaciones personalizadas.",
    keywords: [
      "calculadora grasa corporal, porcentaje grasa, composición corporal, US Navy, Deurenberg, Jackson-Pollock, salud, fitness, nutralech",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-grasa-corporal",
    },
  });
}

export default function BodyFatCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/">Inicio</Link>
        <span>{">"}</span>
        <Link href="/herramientas">Herramientas</Link>
        <span>{">"}</span>
        <span className="text-foreground">Calculadora de Grasa Corporal</span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de Grasa Corporal
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Estima tu porcentaje de grasa corporal usando métodos científicos
          precisos. Obtén un análisis detallado de tu composición corporal y
          recomendaciones personalizadas.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BodyFatCalculator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                ¿Por qué es importante el porcentaje de grasa corporal?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                El porcentaje de grasa corporal es un indicador más preciso de
                la salud que el IMC, ya que distingue entre masa grasa y masa
                muscular:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Función Hormonal:</strong> La grasa corporal afecta la
                  producción de hormonas como estrógeno y testosterona
                </li>
                <li>
                  <strong>Riesgo Cardiovascular:</strong> El exceso de grasa,
                  especialmente abdominal, aumenta el riesgo de enfermedades
                  cardíacas
                </li>
                <li>
                  <strong>Metabolismo:</strong> La composición corporal influye
                  en la tasa metabólica basal
                </li>
                <li>
                  <strong>Rendimiento:</strong> Un porcentaje óptimo mejora el
                  rendimiento físico y la calidad de vida
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Métodos de Cálculo Utilizados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">US Navy</h3>
                  <p className="text-sm text-muted-foreground">
                    Método desarrollado por la Marina de EE.UU., basado en
                    circunferencias corporales. Ampliamente validado y preciso
                    para la mayoría de personas.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Deurenberg</h3>
                  <p className="text-sm text-muted-foreground">
                    Fórmula que utiliza IMC, edad y género. Especialmente útil
                    para poblaciones generales y tiene en cuenta los cambios
                    relacionados con la edad.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Jackson-Pollock</h3>
                  <p className="text-sm text-muted-foreground">
                    Basado en investigación científica extensa. Versión
                    simplificada que proporciona estimaciones confiables sin
                    necesidad de equipos especializados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Rangos de Grasa Corporal Saludables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Hombres</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Atlético:</span>
                      <span className="text-green-600">6-13%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bueno:</span>
                      <span className="text-green-500">14-17%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aceptable:</span>
                      <span className="text-yellow-600">18-24%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alto:</span>
                      <span className="text-red-600">25%+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Mujeres</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Atlético:</span>
                      <span className="text-green-600">14-20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bueno:</span>
                      <span className="text-green-500">21-24%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aceptable:</span>
                      <span className="text-yellow-600">25-31%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alto:</span>
                      <span className="text-red-600">32%+</span>
                    </div>
                  </div>
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
                    href="/herramientas/calculadora-relacion-cintura-cadera"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Relación Cintura-Cadera
                  </Link>
                </li>
                <li>
                  <Link
                    href="/herramientas/calculadora-calorias"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Calorías
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
            <Activity className="h-5 w-5" />
            Consejos para Mejorar tu Composición Corporal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3">
            Para optimizar tu porcentaje de grasa corporal y mejorar tu salud
            general:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Combina entrenamiento de fuerza con ejercicio cardiovascular
              regular
            </li>
            <li>
              Mantén un déficit calórico moderado si necesitas reducir grasa
              corporal
            </li>
            <li>
              Prioriza alimentos integrales y proteínas magras en tu dieta
            </li>
            <li>Asegura un descanso adecuado de 7-9 horas por noche</li>
            <li>
              Mantén niveles de estrés bajo control con técnicas de relajación
            </li>
            <li>Hidrata tu cuerpo adecuadamente durante todo el día</li>
            <li>Sé consistente con tus hábitos saludables a largo plazo</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">
              Importante: Limitaciones de las Estimaciones
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                Estas calculadoras proporcionan estimaciones basadas en fórmulas
                científicas, pero pueden tener variaciones según:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nivel de hidratación y momento del día</li>
                <li>Distribución única de masa muscular</li>
                <li>Diferencias étnicas y genéticas</li>
                <li>Precisión en las medidas corporales</li>
              </ul>
              <p>
                Para mediciones más precisas, considera métodos como DEXA scan,
                bioimpedancia profesional, o consulta con especialistas en
                composición corporal.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Recuerda que estas calculadoras proporcionan estimaciones. Para un
          análisis completo de composición corporal y un plan personalizado,{" "}
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
            <span className="block">
              ¿Quieres optimizar tu composición corporal?
            </span>
            <span className="block text-gray-100">
              Obtén un plan personalizado para alcanzar tus objetivos.
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
