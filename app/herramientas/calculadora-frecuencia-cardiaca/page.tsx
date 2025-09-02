import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { Activity, Book, Calendar, Heart, Info } from "lucide-react";
import Link from "next/link";
import { HeartRateZonesCalculator } from "./heart-rate-calculator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Calculadora de Zonas de Frecuencia Cardíaca",
    description:
      "Calcula tus zonas de frecuencia cardíaca para optimizar tus entrenamientos. Herramienta desarrollada por Nutralech.",
    keywords: [
      "frecuencia cardíaca, zonas de entrenamiento, ritmo cardíaco, ejercicio, entrenamiento, salud cardiovascular, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas/calculadora-frecuencia-cardiaca",
    },
  });
}

export default function HeartRateCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/">Inicio</Link>
        <span>{">"}</span>
        <Link href="/herramientas">Herramientas</Link>
        <span>{">"}</span>
        <span className="text-foreground">
          Calculadora de Zonas de Frecuencia Cardíaca
        </span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de Zonas de Frecuencia Cardíaca
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Calcula tus zonas de frecuencia cardíaca para optimizar tus
          entrenamientos y alcanzar tus objetivos de forma eficiente y segura.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <HeartRateZonesCalculator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                ¿Qué son las Zonas de Frecuencia Cardíaca?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Las zonas de frecuencia cardíaca son rangos específicos que nos
                ayudan a medir y controlar la intensidad del ejercicio:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Funciones:</strong> Ayudan a optimizar el
                  entrenamiento y alcanzar objetivos específicos.
                </li>
                <li>
                  <strong>Factores Influyentes:</strong>
                  <ul className="list-none mt-1 ml-4 text-muted-foreground">
                    <li>• Edad</li>
                    <li>• Condición física</li>
                    <li>• Frecuencia cardíaca en reposo</li>
                    <li>• Nivel de entrenamiento</li>
                  </ul>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Tipos de Entrenamiento por Zona
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">
                    Entrenamiento de Recuperación
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Zonas 1-2 | Ideal para días de descanso activo,
                    calentamiento y enfriamiento. Ejemplos: Caminata ligera,
                    yoga suave, estiramientos dinámicos.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">
                    Entrenamiento de Resistencia
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Zonas 2-3 | Perfecto para sesiones largas y desarrollo de
                    base aeróbica. Ejemplos: Ciclismo de fondo, natación
                    continua, carrera suave.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Entrenamiento de Tempo</h3>
                  <p className="text-muted-foreground mb-2">
                    Zonas 3-4 | Mejora el umbral de lactato y la resistencia
                    cardiovascular. Ejemplos: Carrera a ritmo medio, HIIT
                    moderado, ciclismo de intensidad.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">
                    Entrenamiento de Intervalos
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Zonas 4-5 | Para mejorar velocidad y potencia máxima.
                    Ejemplos: Sprints, HIIT intenso, intervalos de velocidad.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Entrenamiento Mixto</h3>
                  <p className="text-muted-foreground mb-2">
                    Todas las zonas | Combina diferentes intensidades para un
                    entrenamiento completo. Ejemplos: Deportes de equipo,
                    crossfit, entrenamiento en circuito.
                  </p>
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
                    href="/herramientas/calculadora-calorias"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Calorías
                  </Link>
                </li>
                <li>
                  <Link
                    href="/herramientas/calculadora-tasa-metabolica-basal"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Tasa Metabólica Basal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/herramientas/calculadora-hidratacion"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Hidratación
                  </Link>
                </li>
                <li>
                  <Link
                    href="/herramientas/calculadora-proteina"
                    prefetch={false}
                    className="text-blue-600 hover:underline"
                  >
                    Calculadora de Proteína Diaria
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
            <Heart className="h-5 w-5" />
            Optimizando tu Entrenamiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Para aprovechar al máximo tus zonas de frecuencia cardíaca:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Realiza un calentamiento adecuado en Zona 1 antes de aumentar la
              intensidad.
            </li>
            <li>
              Varía tus entrenamientos entre diferentes zonas según tus
              objetivos.
            </li>
            <li>Mantén un registro de tus entrenamientos y progreso.</li>
            <li>Escucha a tu cuerpo y respeta los períodos de recuperación.</li>
            <li>
              Combina entrenamientos de diferentes intensidades durante la
              semana.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Esta calculadora proporciona una estimación de tus zonas de frecuencia
          cardíaca. Para un plan de entrenamiento personalizado,{" "}
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
            <span className="block">
              ¿Listo para optimizar tu entrenamiento?
            </span>
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
