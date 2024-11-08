"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Scale } from "lucide-react";
import { useState } from "react";

interface MacroRatios {
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

const MACRO_PREFERENCES: Record<string, MacroRatios> = {
  balanced: {
    protein: 0.3,
    carbs: 0.4,
    fat: 0.3,
    description:
      "Distribución equilibrada ideal para mantenimiento y salud general.",
  },
  "high-protein": {
    protein: 0.4,
    carbs: 0.3,
    fat: 0.3,
    description:
      "Mayor contenido proteico, ideal para deportistas y ganancia muscular.",
  },
  "high-carb": {
    protein: 0.25,
    carbs: 0.55,
    fat: 0.2,
    description: "Alto en carbohidratos, óptimo para deportes de resistencia.",
  },
  "low-carb": {
    protein: 0.35,
    carbs: 0.25,
    fat: 0.4,
    description: "Reducido en carbohidratos, bueno para control de peso.",
  },
  keto: {
    protein: 0.3,
    carbs: 0.05,
    fat: 0.65,
    description: "Muy bajo en carbohidratos y alto en grasas para cetosis.",
  },
  mediterranean: {
    protein: 0.25,
    carbs: 0.45,
    fat: 0.3,
    description: "Basado en la dieta mediterránea, rico en grasas saludables.",
  },
};

export function MacroCalculatorForm() {
  const [calories, setCalories] = useState("");
  const [preference, setPreference] = useState("balanced");
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });
  const [errorMessage, setErrorMessage] = useState("");

  const calculateMacros = () => {
    if (!calories) {
      setErrorMessage("Por favor, ingresa las calorías diarias.");
      return;
    }

    const caloriesNum = parseFloat(calories);
    if (caloriesNum <= 0 || caloriesNum > 10000) {
      setErrorMessage(
        "Por favor, ingresa un valor de calorías válido (entre 1 y 10000)."
      );
      return;
    }

    setErrorMessage("");
    const totalCalories = parseFloat(calories);
    const selectedPreference = MACRO_PREFERENCES[preference];

    setMacros({
      protein: Math.round((totalCalories * selectedPreference.protein) / 4),
      carbs: Math.round((totalCalories * selectedPreference.carbs) / 4),
      fat: Math.round((totalCalories * selectedPreference.fat) / 9),
    });
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Calcula tus Macronutrientes</CardTitle>
        <CardDescription>
          Ingresa tus datos para calcular tus macronutrientes ideales
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="preference">Preferencia de Macros</Label>
            <Select value={preference} onValueChange={setPreference}>
              <SelectTrigger id="preference">
                <SelectValue placeholder="Selecciona tu preferencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Equilibrado</SelectItem>
                <SelectItem value="high-protein">Alto en Proteína</SelectItem>
                <SelectItem value="high-carb">Alto en Carbohidratos</SelectItem>
                <SelectItem value="low-carb">Bajo en Carbohidratos</SelectItem>
                <SelectItem value="keto">Cetogénico</SelectItem>
                <SelectItem value="mediterranean">Mediterráneo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="calories">Calorías Diarias</Label>
            <Input
              id="calories"
              type="number"
              placeholder="2000"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <Button
            onClick={calculateMacros}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Macronutrientes
          </Button>
        </div>

        {/* {macros && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Tu Plan de Macronutrientes</span>
              </div>
              <div className="text-2xl font-bold">
                {macros.protein}g Proteína, {macros.carbs}g Carbohidratos,{" "}
                {macros.fat}g Grasas
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 space-y-2">
              <div className="font-medium">Información del Plan</div>
              <p className="text-sm text-muted-foreground">
                {MACRO_PREFERENCES[preference].description}
              </p>
            </div>
          </div>
        )} */}
        {/* Also update the results display to be more mobile-friendly */}
        {macros && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  Distribución de Macronutrientes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">
                    Proteína
                  </div>
                  <div className="text-xl font-bold">{macros.protein}g</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">
                    Carbohidratos
                  </div>
                  <div className="text-xl font-bold">{macros.carbs}g</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm text-yellow-600 font-medium">
                    Grasas
                  </div>
                  <div className="text-xl font-bold">{macros.fat}g</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 space-y-2">
              <div className="font-medium">Información del Plan</div>
              <p className="text-sm text-muted-foreground">
                {MACRO_PREFERENCES[preference].description}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Distribución por Preferencia
          </h3>

          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <colgroup>
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Preferencia</th>
                  <th className="p-2 text-left">Proteína</th>
                  <th className="p-2 text-left">Carbohidratos</th>
                  <th className="p-2 text-left">Grasas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">Equilibrado</td>
                  <td className="p-2 border-b">30%</td>
                  <td className="p-2 border-b">40%</td>
                  <td className="p-2 border-b">30%</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Alto en Proteína</td>
                  <td className="p-2 border-b">40%</td>
                  <td className="p-2 border-b">30%</td>
                  <td className="p-2 border-b">30%</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Alto en Carbohidratos</td>
                  <td className="p-2 border-b">25%</td>
                  <td className="p-2 border-b">55%</td>
                  <td className="p-2 border-b">20%</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Bajo en Carbohidratos</td>
                  <td className="p-2 border-b">35%</td>
                  <td className="p-2 border-b">25%</td>
                  <td className="p-2 border-b">40%</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Cetogénico</td>
                  <td className="p-2 border-b">30%</td>
                  <td className="p-2 border-b">5%</td>
                  <td className="p-2 border-b">65%</td>
                </tr>
                <tr>
                  <td className="p-2">Mediterráneo</td>
                  <td className="p-2">25%</td>
                  <td className="p-2">45%</td>
                  <td className="p-2">30%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - Shown only on Mobile */}
          <div className="md:hidden space-y-4">
            {Object.entries(MACRO_PREFERENCES).map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg border p-4">
                <div className="font-medium mb-2">
                  {key === "balanced" && "Equilibrado"}
                  {key === "high-protein" && "Alto en Proteína"}
                  {key === "high-carb" && "Alto en Carbohidratos"}
                  {key === "low-carb" && "Bajo en Carbohidratos"}
                  {key === "keto" && "Cetogénico"}
                  {key === "mediterranean" && "Mediterráneo"}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="text-blue-600 font-medium">Proteína</div>
                    <div>{Math.round(value.protein * 100)}%</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <div className="text-green-600 font-medium">Carbos</div>
                    <div>{Math.round(value.carbs * 100)}%</div>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded">
                    <div className="text-yellow-600 font-medium">Grasas</div>
                    <div>{Math.round(value.fat * 100)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
