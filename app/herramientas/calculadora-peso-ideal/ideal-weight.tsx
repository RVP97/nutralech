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
import { Info, Scale } from "lucide-react";
import { useState } from "react";

interface WeightCalculation {
  formula: string;
  weight: number;
  description: string;
}

interface WeightRecommendation {
  title: string;
  description: string;
  calculations: WeightCalculation[];
  keyPoints: string[];
}

function calculateIdealWeight(
  height: string,
  gender: string,
  unitSystem: string
): WeightCalculation[] {
  // Convert height to cm if imperial
  const heightCm =
    unitSystem === "metric"
      ? parseFloat(height)
      : height.split("-").map(Number)[0] * 30.48 +
        height.split("-").map(Number)[1] * 2.54;

  // Calculate using different formulas
  const calculations: WeightCalculation[] = [];

  // Devine Formula
  const devineWeight =
    gender === "male"
      ? 50 + 2.3 * ((heightCm - 152.4) / 2.54)
      : 45.5 + 2.3 * ((heightCm - 152.4) / 2.54);

  calculations.push({
    formula: "Devine",
    weight: unitSystem === "metric" ? devineWeight : devineWeight * 2.20462,
    description: "Fórmula comúnmente usada en farmacia clínica",
  });

  // Robinson Formula
  const robinsonWeight =
    gender === "male"
      ? 52 + 1.9 * ((heightCm - 152.4) / 2.54)
      : 49 + 1.7 * ((heightCm - 152.4) / 2.54);

  calculations.push({
    formula: "Robinson",
    weight: unitSystem === "metric" ? robinsonWeight : robinsonWeight * 2.20462,
    description: "Considerada más precisa para la población general",
  });

  // Miller Formula
  const millerWeight =
    gender === "male"
      ? 56.2 + 1.41 * ((heightCm - 152.4) / 2.54)
      : 53.1 + 1.36 * ((heightCm - 152.4) / 2.54);

  calculations.push({
    formula: "Miller",
    weight: unitSystem === "metric" ? millerWeight : millerWeight * 2.20462,
    description: "Fórmula que tiende a dar resultados más moderados",
  });

  return calculations;
}

function getWeightRecommendation(
  calculations: WeightCalculation[],
  gender: string,
  height: string,
  unitSystem: string
): WeightRecommendation {
  const avgWeight =
    calculations.reduce((sum, calc) => sum + calc.weight, 0) /
    calculations.length;
  const unit = unitSystem === "metric" ? "kg" : "lb";
  const heightDisplay =
    unitSystem === "metric"
      ? `${height}cm`
      : `${height.split("-")[0]}'${height.split("-")[1]}"`;

  return {
    title: "Estimación de Peso Ideal",
    description: `Para ${
      gender === "male" ? "un hombre" : "una mujer"
    } de ${heightDisplay}, el peso ideal estimado promedio es de ${avgWeight.toFixed(
      1
    )}${unit}.`,
    calculations,
    keyPoints: [
      "El peso ideal es solo una referencia y puede variar según factores individuales",
      "Considera tu estructura corporal y masa muscular",
      "Consulta con un profesional de la salud para objetivos personalizados",
      "Mantén hábitos saludables independientemente del peso",
    ],
  };
}

export function IdealWeightCalculator() {
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("");
  const [recommendation, setRecommendation] =
    useState<WeightRecommendation | null>(null);
  const [errors, setErrors] = useState({
    height: "",
  });
  const [unitSystem, setUnitSystem] = useState("metric");

  const calculateIdealWeights = () => {
    const newErrors = { height: "" };
    let hasErrors = false;

    if (!height) {
      newErrors.height = "Por favor, ingresa tu altura";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    const calculations = calculateIdealWeight(height, gender, unitSystem);
    setRecommendation(
      getWeightRecommendation(calculations, gender, height, unitSystem)
    );
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Calculadora de Peso Ideal</CardTitle>
        <CardDescription>
          Calcula tu peso ideal basado en diferentes fórmulas médicas
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Género</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Selecciona el género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="unitSystem">Sistema de Medidas</Label>
            <Select value={unitSystem} onValueChange={setUnitSystem}>
              <SelectTrigger id="unitSystem">
                <SelectValue placeholder="Selecciona el sistema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Métrico (cm)</SelectItem>
                <SelectItem value="imperial">Imperial (ft-in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">
              Altura ({unitSystem === "metric" ? "cm" : "ft-in"})
            </Label>
            {unitSystem === "metric" ? (
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            ) : (
              <div className="flex gap-2">
                <Input
                  id="heightFt"
                  type="number"
                  placeholder="5"
                  value={height.split("-")[0] || ""}
                  onChange={(e) =>
                    setHeight(
                      `${e.target.value}-${height.split("-")[1] || "0"}`
                    )
                  }
                />
                <Input
                  id="heightIn"
                  type="number"
                  placeholder="8"
                  value={height.split("-")[1] || ""}
                  onChange={(e) =>
                    setHeight(
                      `${height.split("-")[0] || "0"}-${e.target.value}`
                    )
                  }
                />
              </div>
            )}
            {errors.height && (
              <p className="text-sm text-red-500">{errors.height}</p>
            )}
          </div>

          <Button
            onClick={calculateIdealWeights}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Peso Ideal
          </Button>
        </div>

        {recommendation && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{recommendation.title}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {recommendation.description}
              </div>
            </div>

            <div className="space-y-4">
              {recommendation.calculations.map((calc, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-4">
                  <div className="font-medium">{calc.formula}</div>
                  <div className="text-2xl font-bold">
                    {calc.weight.toFixed(1)}{" "}
                    {unitSystem === "metric" ? "kg" : "lb"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {calc.description}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-gray-50 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Consideraciones Importantes</span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {recommendation.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
