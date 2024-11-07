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

interface HydrationRecommendation {
  title: string;
  description: string;
  keyPoints: string[];
}

function getHydrationSuggestion(
  weight: string,
  activityLevel: string,
  isMetric: boolean
): { totalWaterIntake: number; recommendation: HydrationRecommendation } {
  const weightValue = parseFloat(weight);
  const weightKg = isMetric ? weightValue : weightValue * 0.453592; // Convert pounds to kg if imperial
  const baseWaterIntake = weightKg * 0.035;
  let additionalWater = 0;

  switch (activityLevel) {
    case "lightlyActive":
      additionalWater = 0.5;
      break;
    case "moderatelyActive":
      additionalWater = 1;
      break;
    case "active":
      additionalWater = 1.5;
      break;
    case "veryActive":
      additionalWater = 2;
      break;
  }

  const totalWaterIntake = baseWaterIntake + additionalWater;

  return {
    totalWaterIntake,
    recommendation: {
      title: "Recomendación de Hidratación Diaria",
      description: `Basado en tu peso de ${
        isMetric ? weightKg.toFixed(0) + "kg" : weightValue.toFixed(0) + "lbs"
      } y nivel de actividad, se recomienda consumir aproximadamente ${totalWaterIntake.toFixed(
        1
      )} litros de agua al día.`,
      keyPoints: [
        "Asegúrate de beber agua a lo largo del día, no solo cuando tengas sed.",
        "Considera aumentar la ingesta en climas cálidos o durante el ejercicio intenso.",
        "Monitorea el color de tu orina para evaluar tu nivel de hidratación.",
      ],
    },
  };
}

export function HydrationCalculator() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [isMetric, setIsMetric] = useState(true);
  const [waterIntakeUnit, setWaterIntakeUnit] = useState("liters");
  const [waterIntake, setWaterIntake] = useState<number | null>(null);
  const [recommendation, setRecommendation] =
    useState<HydrationRecommendation | null>(null);
  const [errors, setErrors] = useState({
    weight: "",
  });

  const calculateWaterIntake = () => {
    const newErrors = {
      weight: "",
    };

    if (!weight) {
      newErrors.weight = "Por favor, ingresa tu peso";
      setErrors(newErrors);
      return;
    }

    const { totalWaterIntake, recommendation } = getHydrationSuggestion(
      weight,
      activityLevel,
      isMetric
    );
    setWaterIntake(totalWaterIntake);
    setRecommendation(recommendation);
  };

  const convertToOunces = (liters: number) => liters * 33.814;

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Calcula tu Hidratación</CardTitle>
        <CardDescription>
          Ingresa tus datos para calcular tus necesidades diarias de agua
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unit-system">Sistema de Unidades</Label>
            <Select
              value={isMetric ? "metric" : "imperial"}
              onValueChange={(value) => setIsMetric(value === "metric")}
            >
              <SelectTrigger id="unit-system">
                <SelectValue>
                  {isMetric ? "Métrico (kg)" : "Imperial (lbs)"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Métrico (kg)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">
              {isMetric ? "Peso (kg)" : "Peso (lbs)"}
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder={isMetric ? "70" : "154"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Nivel de Actividad</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger id="activity">
                <SelectValue>
                  {activityLevel === "sedentary" && "Sedentario"}
                  {activityLevel === "lightlyActive" && "Ligeramente Activo"}
                  {activityLevel === "moderatelyActive" &&
                    "Moderadamente Activo"}
                  {activityLevel === "active" && "Activo"}
                  {activityLevel === "veryActive" && "Muy Activo"}
                  {!activityLevel && "Selecciona el nivel de actividad"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">
                  <div className="flex flex-col">
                    <span className="font-medium">Sedentario</span>
                    <span className="text-xs text-muted-foreground">
                      Poco o ningún ejercicio
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="lightlyActive">
                  <div className="flex flex-col">
                    <span className="font-medium">Ligeramente Activo</span>
                    <span className="text-xs text-muted-foreground">
                      Ejercicio ligero 1-3 días/semana
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="moderatelyActive">
                  <div className="flex flex-col">
                    <span className="font-medium">Moderadamente Activo</span>
                    <span className="text-xs text-muted-foreground">
                      Ejercicio moderado 3-5 días/semana
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="active">
                  <div className="flex flex-col">
                    <span className="font-medium">Activo</span>
                    <span className="text-xs text-muted-foreground">
                      Ejercicio duro 6-7 días/semana
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="veryActive">
                  <div className="flex flex-col">
                    <span className="font-medium">Muy Activo</span>
                    <span className="text-xs text-muted-foreground">
                      Ejercicio muy duro o trabajo físico diario
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateWaterIntake}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Hidratación
          </Button>
        </div>

        {waterIntake && recommendation && (
          <>
            <div className="space-y-2 mt-4">
              <Label htmlFor="water-intake-unit">
                Unidad de Ingesta de Agua
              </Label>
              <Select
                value={waterIntakeUnit}
                onValueChange={setWaterIntakeUnit}
              >
                <SelectTrigger id="water-intake-unit">
                  <SelectValue>
                    {waterIntakeUnit === "liters" ? "Litros" : "Onzas"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="liters">Litros</SelectItem>
                  <SelectItem value="ounces">Onzas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 mt-4">
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">
                    Tu Ingesta Diaria Recomendada de Agua
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  {waterIntakeUnit === "liters"
                    ? `${waterIntake.toFixed(1)} litros`
                    : `${convertToOunces(waterIntake).toFixed(1)} onzas`}
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{recommendation.title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {recommendation.description}
                </p>
                <div className="pt-2 space-y-2">
                  <div className="text-sm font-medium">
                    Recomendaciones personalizadas:
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {recommendation.keyPoints.map((point, index) => (
                      <li key={index} className="pl-1 marker:text-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
