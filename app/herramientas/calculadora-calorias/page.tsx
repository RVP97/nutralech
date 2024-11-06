import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Apple, Book, Calendar, Info } from "lucide-react";
import Link from "next/link";
import { CalorieCalculator } from "./calorie-calculator";

export default function CalorieCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/">Inicio</Link>
        <span>{">"}</span>
        <Link href="/tools">Herramientas</Link>
        <span>{">"}</span>
        <span className="text-foreground">Calculadora de Calorías</span>
      </nav>

      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-2">
          HERRAMIENTAS
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Calculadora de Calorías
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Calcula tus necesidades calóricas diarias de manera fácil y rápida.
          Obtén una estimación precisa basada en tu perfil personal y objetivos
          de peso.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <CalorieCalculator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Entendiendo el Balance Calórico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                El balance calórico es la relación entre las calorías que
                consumes y las que gastas. Un ajuste moderado es clave para
                resultados saludables y sostenibles:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Balance Negativo (Pérdida):</strong> Un déficit de
                  250-500 calorías/día resulta en una pérdida de 0.25-0.5kg por
                  semana. Déficits mayores pueden provocar pérdida de masa
                  muscular y ralentización metabólica.
                </li>
                <li>
                  <strong>Balance Neutro (Mantenimiento):</strong> Consumir las
                  mismas calorías que gastas mantiene tu peso actual. Ideal para
                  estabilizar el peso y mejorar la composición corporal.
                </li>
                <li>
                  <strong>Balance Positivo (Ganancia):</strong> Un superávit de
                  250-500 calorías/día permite ganar 0.25-0.5kg por semana.
                  Superávits mayores pueden resultar en ganancia excesiva de
                  grasa corporal.
                </li>
                <li>
                  <strong>Factores Influyentes:</strong>
                  <ul className="list-none mt-1 ml-4 text-muted-foreground">
                    <li>• Metabolismo basal (65-75% del gasto total)</li>
                    <li>• Actividad física (15-30% del gasto)</li>
                    <li>• Efecto térmico de los alimentos (10% del gasto)</li>
                    <li>• Composición corporal y masa muscular</li>
                  </ul>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Consejos para el Balance Calórico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Come una variedad de alimentos nutritivos.</li>
                <li>Controla el tamaño de las porciones.</li>
                <li>Mantén un registro de tu ingesta calórica.</li>
                <li>Combina una dieta equilibrada con ejercicio regular.</li>
                <li>Ajusta tu ingesta según tus objetivos de salud y peso.</li>
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
            Alimentación Balanceada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Una alimentación balanceada es clave para una buena salud,
            independientemente de tu objetivo de peso:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Incluye una variedad de frutas y verduras en cada comida.</li>
            <li>Opta por granos integrales y proteínas magras.</li>
            <li>Incorpora grasas saludables en cantidades moderadas.</li>
            <li>
              Limita el consumo de alimentos procesados y azúcares añadidos.
            </li>
            <li>Mantente hidratado bebiendo suficiente agua durante el día.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Recuerda que esta calculadora proporciona una estimación. Para un plan
          nutricional personalizado que se ajuste a tus objetivos de peso,
          consulta con un profesional de la salud.
        </p>
      </div>

      <div className="mt-12 bg-gradient-to-r from-[#DA5F6F] to-[#DA5F6F]/80 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para optimizar tu nutrición?</span>
            <span className="block text-gray-100">
              Agenda una consulta personalizada hoy.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#DA5F6F] bg-white hover:bg-gray-50">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
