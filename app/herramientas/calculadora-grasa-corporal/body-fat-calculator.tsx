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

interface BodyFatCalculation {
  method: string;
  percentage: number;
  description: string;
}

interface BodyFatRecommendation {
  title: string;
  description: string;
  calculations: BodyFatCalculation[];
  category: string;
  healthStatus: string;
  keyPoints: string[];
}

function calculateBodyFat(
  age: string,
  gender: string,
  height: string,
  weight: string,
  waist: string,
  neck: string,
  hip: string,
  unitSystem: string
): BodyFatCalculation[] {
  const ageNum = parseFloat(age);
  const weightNum = parseFloat(weight);
  const waistNum = parseFloat(waist);
  const neckNum = parseFloat(neck);
  const hipNum = parseFloat(hip);

  // Convert to metric if needed
  const heightCm =
    unitSystem === "metric"
      ? parseFloat(height)
      : height.split("-").map(Number)[0] * 30.48 +
        height.split("-").map(Number)[1] * 2.54;
  const weightKg = unitSystem === "metric" ? weightNum : weightNum * 0.453592;
  const waistCm = unitSystem === "metric" ? waistNum : waistNum * 2.54;
  const neckCm = unitSystem === "metric" ? neckNum : neckNum * 2.54;
  const hipCm = unitSystem === "metric" ? hipNum : hipNum * 2.54;

  const calculations: BodyFatCalculation[] = [];

  // US Navy Method
  let navyBF: number;
  if (gender === "male") {
    const waistMinusNeck = waistCm - neckCm;
    // Validate that waist is larger than neck (physiologically reasonable)
    if (waistMinusNeck <= 0) {
      navyBF = 5; // Minimum reasonable body fat percentage
    } else {
      navyBF =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waistMinusNeck) +
            0.15456 * Math.log10(heightCm)) -
        450;
    }
  } else {
    const waistPlusHipMinusNeck = waistCm + hipCm - neckCm;
    // Validate that waist + hip is larger than neck
    if (waistPlusHipMinusNeck <= 0) {
      navyBF = 10; // Minimum reasonable body fat percentage for women
    } else {
      navyBF =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistPlusHipMinusNeck) +
            0.221 * Math.log10(heightCm)) -
        450;
    }
  }

  calculations.push({
    method: "US Navy",
    percentage: Math.max(3, Math.min(50, navyBF)), // Ensure reasonable bounds
    description: "Método basado en medidas corporales, ampliamente utilizado",
  });

  // BMI-based estimation (Deurenberg formula)
  const bmi = weightKg / ((heightCm / 100) * (heightCm / 100));
  const deurenbergBF =
    1.2 * bmi + 0.23 * ageNum - 10.8 * (gender === "male" ? 1 : 0) - 5.4;

  calculations.push({
    method: "Deurenberg",
    percentage: Math.max(0, deurenbergBF),
    description: "Estimación basada en IMC, edad y género",
  });

  // Jackson-Pollock estimation (using body measurements)
  let jacksonBF: number;
  if (gender === "male") {
    // For men: uses chest, abdomen, and thigh (simplified using waist as proxy)
    const bodyDensity =
      1.10938 -
      0.0008267 * waistCm +
      0.0000016 * Math.pow(waistCm, 2) -
      0.0002574 * ageNum;
    jacksonBF = (4.95 / bodyDensity - 4.5) * 100;
  } else {
    // For women: uses tricep, suprailium, and thigh (simplified using waist and hip)
    const bodyDensity =
      1.0994921 -
      0.0009929 * ((waistCm + hipCm) / 2) +
      0.0000023 * Math.pow((waistCm + hipCm) / 2, 2) -
      0.0001392 * ageNum;
    jacksonBF = (4.95 / bodyDensity - 4.5) * 100;
  }

  calculations.push({
    method: "Jackson-Pollock",
    percentage: Math.max(3, Math.min(50, jacksonBF)), // Reasonable bounds
    description:
      "Fórmula basada en densidad corporal y medidas antropométricas",
  });

  return calculations;
}

function getBodyFatCategory(
  percentage: number,
  gender: string
): { category: string; healthStatus: string; color: string } {
  if (gender === "male") {
    if (percentage < 6)
      return {
        category: "Muy Bajo",
        healthStatus: "Puede ser poco saludable",
        color: "text-blue-600",
      };
    if (percentage < 14)
      return {
        category: "Atlético",
        healthStatus: "Excelente",
        color: "text-green-600",
      };
    if (percentage < 18)
      return {
        category: "Bueno",
        healthStatus: "Saludable",
        color: "text-green-500",
      };
    if (percentage < 25)
      return {
        category: "Aceptable",
        healthStatus: "Normal",
        color: "text-yellow-600",
      };
    return {
      category: "Alto",
      healthStatus: "Mejorable",
      color: "text-red-600",
    };
  } else {
    if (percentage < 14)
      return {
        category: "Muy Bajo",
        healthStatus: "Puede ser poco saludable",
        color: "text-blue-600",
      };
    if (percentage < 21)
      return {
        category: "Atlético",
        healthStatus: "Excelente",
        color: "text-green-600",
      };
    if (percentage < 25)
      return {
        category: "Bueno",
        healthStatus: "Saludable",
        color: "text-green-500",
      };
    if (percentage < 32)
      return {
        category: "Aceptable",
        healthStatus: "Normal",
        color: "text-yellow-600",
      };
    return {
      category: "Alto",
      healthStatus: "Mejorable",
      color: "text-red-600",
    };
  }
}

function getBodyFatRecommendation(
  calculations: BodyFatCalculation[],
  gender: string,
  age: string
): BodyFatRecommendation {
  const avgPercentage =
    calculations.reduce((sum, calc) => sum + calc.percentage, 0) /
    calculations.length;
  const categoryInfo = getBodyFatCategory(avgPercentage, gender);

  let keyPoints: string[] = [];

  if (avgPercentage < (gender === "male" ? 6 : 14)) {
    keyPoints = [
      "Un porcentaje muy bajo de grasa puede afectar funciones hormonales",
      "Considera aumentar gradualmente la ingesta calórica",
      "Consulta con un profesional de la salud",
      "Enfócate en grasas saludables en tu dieta",
    ];
  } else if (avgPercentage < (gender === "male" ? 18 : 25)) {
    keyPoints = [
      "Mantén tus hábitos actuales de ejercicio y alimentación",
      "Continúa con entrenamiento de fuerza para preservar masa muscular",
      "Asegura una ingesta adecuada de proteínas",
      "Monitorea tu progreso regularmente",
    ];
  } else {
    keyPoints = [
      "Un déficit calórico moderado puede ayudar a reducir grasa corporal",
      "Combina cardio con entrenamiento de fuerza",
      "Prioriza alimentos integrales y proteínas magras",
      "Mantén la consistencia en tus hábitos saludables",
    ];
  }

  return {
    title: "Análisis de Grasa Corporal",
    description: `Tu porcentaje estimado promedio de grasa corporal es ${avgPercentage.toFixed(
      1
    )}%, lo que se clasifica como "${categoryInfo.category}".`,
    calculations,
    category: categoryInfo.category,
    healthStatus: categoryInfo.healthStatus,
    keyPoints,
  };
}

export function BodyFatCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [unitSystem, setUnitSystem] = useState("metric");
  const [recommendation, setRecommendation] =
    useState<BodyFatRecommendation | null>(null);
  const [errors, setErrors] = useState({
    age: "",
    height: "",
    weight: "",
    waist: "",
    neck: "",
    hip: "",
  });

  const calculateBodyFatPercentage = () => {
    const newErrors = {
      age: "",
      height: "",
      weight: "",
      waist: "",
      neck: "",
      hip: "",
    };

    let hasErrors = false;

    if (!age) {
      newErrors.age = "Por favor, ingresa tu edad";
      hasErrors = true;
    }
    if (!height) {
      newErrors.height = "Por favor, ingresa tu altura";
      hasErrors = true;
    }
    if (!weight) {
      newErrors.weight = "Por favor, ingresa tu peso";
      hasErrors = true;
    }
    if (!waist) {
      newErrors.waist = "Por favor, ingresa tu medida de cintura";
      hasErrors = true;
    }
    if (!neck) {
      newErrors.neck = "Por favor, ingresa tu medida de cuello";
      hasErrors = true;
    }
    if (gender === "female" && !hip) {
      newErrors.hip = "Por favor, ingresa tu medida de cadera";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    const calculations = calculateBodyFat(
      age,
      gender,
      height,
      weight,
      waist,
      neck,
      hip,
      unitSystem
    );

    setRecommendation(getBodyFatRecommendation(calculations, gender, age));
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">
          Calculadora de Grasa Corporal
        </CardTitle>
        <CardDescription>
          Estima tu porcentaje de grasa corporal usando medidas corporales
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unitSystem">Sistema de Medidas</Label>
            <Select value={unitSystem} onValueChange={setUnitSystem}>
              <SelectTrigger id="unitSystem">
                <SelectValue placeholder="Selecciona el sistema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Métrico (cm/kg)</SelectItem>
                <SelectItem value="imperial">Imperial (ft-in/lb)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age}</p>
              )}
            </div>

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

          <div className="space-y-2">
            <Label htmlFor="weight">
              Peso ({unitSystem === "metric" ? "kg" : "lb"})
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder={unitSystem === "metric" ? "70" : "154"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="waist">
                Cintura ({unitSystem === "metric" ? "cm" : "in"})
              </Label>
              <Input
                id="waist"
                type="number"
                placeholder={unitSystem === "metric" ? "80" : "32"}
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
              />
              {errors.waist && (
                <p className="text-sm text-red-500">{errors.waist}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="neck">
                Cuello ({unitSystem === "metric" ? "cm" : "in"})
              </Label>
              <Input
                id="neck"
                type="number"
                placeholder={unitSystem === "metric" ? "35" : "14"}
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
              />
              {errors.neck && (
                <p className="text-sm text-red-500">{errors.neck}</p>
              )}
            </div>
          </div>

          {gender === "female" && (
            <div className="space-y-2">
              <Label htmlFor="hip">
                Cadera ({unitSystem === "metric" ? "cm" : "in"})
              </Label>
              <Input
                id="hip"
                type="number"
                placeholder={unitSystem === "metric" ? "95" : "37"}
                value={hip}
                onChange={(e) => setHip(e.target.value)}
              />
              {errors.hip && (
                <p className="text-sm text-red-500">{errors.hip}</p>
              )}
            </div>
          )}

          <Button
            onClick={calculateBodyFatPercentage}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Grasa Corporal
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
              <div
                className={`font-medium ${
                  getBodyFatCategory(
                    recommendation.calculations.reduce(
                      (sum, calc) => sum + calc.percentage,
                      0
                    ) / recommendation.calculations.length,
                    gender
                  ).color
                }`}
              >
                {recommendation.category} - {recommendation.healthStatus}
              </div>
            </div>

            <div className="space-y-3">
              {recommendation.calculations.map((calc, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{calc.method}</div>
                    <div className="text-lg font-bold">
                      {calc.percentage.toFixed(1)}%
                    </div>
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
                <span className="font-medium">
                  Recomendaciones Personalizadas
                </span>
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
