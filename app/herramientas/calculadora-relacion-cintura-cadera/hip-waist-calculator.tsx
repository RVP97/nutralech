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

interface WHRCalculation {
  ratio: number;
  risk: string;
  description: string;
}

interface WHRRecommendation {
  title: string;
  description: string;
  calculation: WHRCalculation;
  keyPoints: string[];
}

function calculateWHR(
  waist: number,
  hip: number,
  gender: string
): WHRCalculation {
  const ratio = waist / hip;

  let risk = "";
  let description = "";

  if (gender === "male") {
    if (ratio <= 0.85) {
      risk = "Bajo";
      description = "Distribución de grasa corporal saludable";
    } else if (ratio <= 0.95) {
      risk = "Moderado";
      description = "Riesgo moderado para la salud";
    } else {
      risk = "Alto";
      description = "Mayor riesgo de problemas de salud";
    }
  } else {
    if (ratio <= 0.75) {
      risk = "Bajo";
      description = "Distribución de grasa corporal saludable";
    } else if (ratio <= 0.85) {
      risk = "Moderado";
      description = "Riesgo moderado para la salud";
    } else {
      risk = "Alto";
      description = "Mayor riesgo de problemas de salud";
    }
  }

  return { ratio, risk, description };
}

function getRiskColor(risk: string) {
  switch (risk.toLowerCase()) {
    case "bajo":
      return "bg-green-50 text-green-700 border-green-200";
    case "moderado":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "alto":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export function WHRCalculator() {
  const [gender, setGender] = useState("female");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [recommendation, setRecommendation] =
    useState<WHRRecommendation | null>(null);
  const [errors, setErrors] = useState({
    waist: "",
    hip: "",
  });
  const [unitSystem, setUnitSystem] = useState("metric");

  const calculateRatio = () => {
    const newErrors = { waist: "", hip: "" };
    let hasErrors = false;

    if (!waist) {
      newErrors.waist = "Por favor, ingresa la medida de tu cintura";
      hasErrors = true;
    }
    if (!hip) {
      newErrors.hip = "Por favor, ingresa la medida de tus caderas";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    const waistNum = parseFloat(waist);
    const hipNum = parseFloat(hip);

    const calculation = calculateWHR(waistNum, hipNum, gender);

    setRecommendation({
      title: "Índice Cintura-Cadera (ICC)",
      description: `Tu índice cintura-cadera es ${calculation.ratio.toFixed(
        2
      )}, lo que indica un riesgo ${calculation.risk.toLowerCase()}.`,
      calculation,
      keyPoints: [
        "Un ICC elevado indica mayor riesgo cardiovascular",
        "La distribución de grasa abdominal es un indicador importante de salud",
        "Mantén una dieta equilibrada y actividad física regular",
        "Consulta con un profesional de la salud para una evaluación completa",
      ],
    });
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">
          Calculadora de Relación Cintura-Cadera
        </CardTitle>
        <CardDescription>
          Calcula tu índice cintura-cadera para evaluar la distribución de grasa
          corporal
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
            <Label htmlFor="waist">
              Medida de Cintura ({unitSystem === "metric" ? "cm" : "in"})
            </Label>
            <Input
              id="waist"
              type="number"
              placeholder="80"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
            />
            {errors.waist && (
              <p className="text-sm text-red-500">{errors.waist}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="hip">
              Medida de Caderas ({unitSystem === "metric" ? "cm" : "in"})
            </Label>
            <Input
              id="hip"
              type="number"
              placeholder="100"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
            />
            {errors.hip && <p className="text-sm text-red-500">{errors.hip}</p>}
          </div>

          <Button
            onClick={calculateRatio}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Relación
          </Button>
        </div>

        {recommendation && (
          <div className="space-y-4">
            <div
              className={`rounded-lg border p-4 space-y-2 ${getRiskColor(
                recommendation.calculation.risk
              )}`}
            >
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                <span className="font-medium">{recommendation.title}</span>
              </div>
              <div className="text-sm">{recommendation.description}</div>
            </div>

            <div
              className={`rounded-lg p-4 ${getRiskColor(
                recommendation.calculation.risk
              )}`}
            >
              <div className="font-medium">Resultado</div>
              <div className="text-2xl font-bold">
                {recommendation.calculation.ratio.toFixed(2)}
              </div>
              <div className="text-sm font-medium">
                Nivel de Riesgo: {recommendation.calculation.risk}
              </div>
              <div className="text-sm">
                {recommendation.calculation.description}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 space-y-3 border">
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
