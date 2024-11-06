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
import { Scale } from "lucide-react";
import { useState } from "react";

interface BMICategory {
  category: string;
  color: string;
}

export function BMICalculatorForm() {
  const [height, setHeight] = useState({ cm: "", feet: "", inches: "" });
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateBMI = () => {
    if (unit === "metric" && (!height.cm || !weight)) {
      setErrorMessage("Por favor, ingresa tanto la altura como el peso.");
      return;
    }
    if (unit === "imperial" && (!height.feet || !weight)) {
      setErrorMessage("Por favor, ingresa tanto la altura como el peso.");
      return;
    }
    setErrorMessage("");
    let bmiValue: number;
    if (unit === "metric") {
      const heightInMeters = parseFloat(height.cm) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      const heightInInches =
        parseFloat(height.feet) * 12 + parseFloat(height.inches || "0");
      bmiValue = (parseFloat(weight) * 703) / (heightInInches * heightInInches);
    }
    setBmi(Math.round(bmiValue * 10) / 10);
  };

  const getBMICategory = (bmi: number): BMICategory => {
    if (bmi < 18.5) return { category: "Bajo peso", color: "text-blue-600" };
    if (bmi < 25) return { category: "Peso normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Sobrepeso", color: "text-yellow-600" };
    return { category: "Obesidad", color: "text-red-600" };
  };

  const getHealthSuggestion = (bmi: number) => {
    if (bmi < 18.5) {
      return "Considera aumentar tu ingesta calórica y consultar con un profesional de la salud para un plan personalizado.";
    }
    if (bmi < 25) {
      return "¡Excelente! Mantén tus hábitos saludables de alimentación y ejercicio.";
    }
    if (bmi < 30) {
      return "Considera ajustar tu dieta y aumentar tu actividad física. Una reducción gradual de peso puede ser beneficiosa.";
    }
    return "Es recomendable consultar con un profesional de la salud para desarrollar un plan de pérdida de peso seguro y efectivo.";
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Calcula tu IMC</CardTitle>
        <CardDescription>
          Ingresa tus datos para calcular tu Índice de Masa Corporal
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="unit">Sistema de Medida</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger id="unit">
                <SelectValue placeholder="Selecciona el sistema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Métrico (kg/cm)</SelectItem>
                <SelectItem value="imperial">Imperial (lb/pies)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {unit === "metric" ? (
              <div className="space-y-2">
                <Label htmlFor="height-cm">Altura (cm)</Label>
                <Input
                  id="height-cm"
                  type="number"
                  placeholder="170"
                  value={height.cm}
                  onChange={(e) => setHeight({ ...height, cm: e.target.value })}
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="height-feet">Altura (pies)</Label>
                  <Input
                    id="height-feet"
                    type="number"
                    placeholder="5"
                    value={height.feet}
                    onChange={(e) =>
                      setHeight({ ...height, feet: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height-inches">Altura (pulgadas)</Label>
                  <Input
                    id="height-inches"
                    type="number"
                    placeholder="7"
                    value={height.inches}
                    onChange={(e) =>
                      setHeight({ ...height, inches: e.target.value })
                    }
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="weight">
                Peso ({unit === "metric" ? "kg" : "lb"})
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "70" : "154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <Button
            onClick={calculateBMI}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular IMC
          </Button>
        </div>

        {bmi && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Tu IMC Calculado</span>
              </div>
              <div className="text-2xl font-bold">{bmi}</div>
              <div className={`font-medium ${getBMICategory(bmi).color}`}>
                {getBMICategory(bmi).category}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 space-y-2">
              <div className="font-medium">Recomendación de Salud</div>
              <p className="text-sm text-muted-foreground">
                {getHealthSuggestion(bmi)}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Tabla de IMC</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">IMC</th>
                  <th className="p-2 text-left">Categoría</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">Menos de 18.5</td>
                  <td className="p-2 border-b text-blue-600">Bajo peso</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">18.5 - 24.9</td>
                  <td className="p-2 border-b text-green-600">Peso normal</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">25.0 - 29.9</td>
                  <td className="p-2 border-b text-yellow-600">Sobrepeso</td>
                </tr>
                <tr>
                  <td className="p-2">30.0 o más</td>
                  <td className="p-2 text-red-600">Obesidad</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
