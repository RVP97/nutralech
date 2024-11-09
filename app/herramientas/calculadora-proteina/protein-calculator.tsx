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

interface ProteinRecommendation {
  title: string;
  description: string;
  keyPoints: string[];
  dailyProtein: {
    min: number;
    target: number;
    max: number;
  };
  mealsPerDay: number;
  proteinPerMeal: {
    min: number;
    max: number;
  };
}

function getProteinRecommendation(
  weight: string,
  gender: string,
  activityLevel: string,
  weightGoal: string,
  unitSystem: string
): ProteinRecommendation {
  const weightKg =
    unitSystem === "metric"
      ? parseFloat(weight)
      : parseFloat(weight) * 0.453592;

  // Scientific protein ranges (g/kg/day)
  const proteinRanges = {
    sedentary: { min: 0.8, target: 1.0, max: 1.2 },
    lightlyActive: { min: 1.0, target: 1.2, max: 1.4 },
    moderatelyActive: { min: 1.2, target: 1.4, max: 1.6 },
    active: { min: 1.4, target: 1.6, max: 1.8 },
    veryActive: { min: 1.6, target: 1.8, max: 2.0 },
  };

  // Get base range based on activity level
  let range = proteinRanges[activityLevel as keyof typeof proteinRanges];

  // Adjust for weight goals
  if (weightGoal.includes("gain")) {
    range = {
      min: range.min + 0.2,
      target: range.target + 0.3,
      max: range.max + 0.4,
    };
  } else if (weightGoal.includes("lose")) {
    range = {
      min: range.min + 0.1,
      target: range.target + 0.2,
      max: range.max + 0.3,
    };
  }

  // Calculate daily protein needs
  const dailyProtein = {
    min: Math.round(weightKg * range.min),
    target: Math.round(weightKg * range.target),
    max: Math.round(weightKg * range.max),
  };

  // Calculate optimal meals per day based on protein amount
  const mealsPerDay = dailyProtein.target > 120 ? 5 : 4;

  // Calculate protein per meal
  const proteinPerMeal = {
    min: Math.round((dailyProtein.target / mealsPerDay) * 0.8),
    max: Math.round((dailyProtein.target / mealsPerDay) * 1.2),
  };

  // Mapeo de actividad para texto descriptivo
  const activityText = {
    sedentary: "sedentario",
    lightlyActive: "ligeramente activo",
    moderatelyActive: "moderadamente activo",
    active: "activo",
    veryActive: "muy activo",
  };

  // Mapeo de objetivos para texto descriptivo
  const goalText = {
    loseExtreme: "pérdida rápida de peso",
    loseMild: "pérdida gradual de peso",
    maintain: "mantenimiento de peso",
    gainMild: "ganancia gradual de masa",
    gainExtreme: "ganancia rápida de masa",
  };

  const displayWeight = unitSystem === "metric" ? weightKg : parseFloat(weight);
  const weightUnit = unitSystem === "metric" ? "kg" : "lb";

  return {
    title: "Recomendación de Proteína Diaria",
    description: `Para ${
      gender === "female" ? "una mujer" : "un hombre"
    } de ${displayWeight}${weightUnit}, con un nivel de actividad ${
      activityText[activityLevel as keyof typeof activityText]
    } y objetivo de ${
      goalText[weightGoal as keyof typeof goalText]
    }, se recomienda consumir entre ${dailyProtein.min}g y ${
      dailyProtein.max
    }g de proteína al día.`,
    dailyProtein,
    mealsPerDay,
    proteinPerMeal,
    keyPoints: [
      `Consumo óptimo: ${range.target}g por kg de peso corporal`,
      `Distribuye la proteína en ${mealsPerDay} comidas (${proteinPerMeal.min}-${proteinPerMeal.max}g por comida)`,
      "Consume proteína de alta calidad dentro de las 2 horas post-entrenamiento",
      `Asegura un mínimo de ${Math.round(
        weightKg * 0.05
      )}g de leucina por comida principal`,
      "Combina fuentes animales y vegetales para un perfil completo de aminoácidos",
      weightGoal.includes("gain")
        ? "Prioriza el consumo de proteína post-entrenamiento para maximizar la síntesis muscular"
        : weightGoal.includes("lose")
        ? "Mantén un alto consumo de proteína para preservar la masa muscular durante el déficit calórico"
        : "Mantén un consumo constante de proteína distribuido durante el día",
    ],
  };
}

export function ProteinCalculator() {
  const [gender, setGender] = useState("female");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [weightGoal, setWeightGoal] = useState("maintain");
  const [unitSystem, setUnitSystem] = useState("metric");
  const [recommendation, setRecommendation] =
    useState<ProteinRecommendation | null>(null);
  const [errors, setErrors] = useState({
    weight: "",
  });

  const calculateProtein = () => {
    // Simplified validation
    const newErrors = {
      weight: "",
    };

    if (!weight) {
      newErrors.weight = "Por favor, ingresa tu peso";
      setErrors(newErrors);
      return;
    }

    // Update recommendation
    setRecommendation(
      getProteinRecommendation(
        weight,
        gender,
        activityLevel,
        weightGoal,
        unitSystem
      )
    );
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Calcula tu Proteína Diaria</CardTitle>
        <CardDescription>
          Ingresa tus datos para calcular tus necesidades de proteína
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
                <SelectItem value="metric">Métrico (cm/kg)</SelectItem>
                <SelectItem value="imperial">Imperial (ft-in/lb)</SelectItem>
              </SelectContent>
            </Select>
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

          <div className="space-y-2">
            <Label htmlFor="weightGoal">Objetivo de Peso</Label>
            <Select value={weightGoal} onValueChange={setWeightGoal}>
              <SelectTrigger id="weightGoal">
                <SelectValue>
                  {weightGoal === "loseExtreme" && "Pérdida Rápida"}
                  {weightGoal === "loseMild" && "Pérdida Gradual"}
                  {weightGoal === "maintain" && "Mantener Peso"}
                  {weightGoal === "gainMild" && "Aumento Gradual"}
                  {weightGoal === "gainExtreme" && "Aumento Rápido"}
                  {!weightGoal && "Selecciona tu objetivo de peso"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="loseExtreme">
                  <div className="flex flex-col">
                    <span className="font-medium">Pérdida Rápida</span>
                    <span className="text-xs text-muted-foreground">
                      Déficit de 500 calorías
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="loseMild">
                  <div className="flex flex-col">
                    <span className="font-medium">Pérdida Gradual</span>
                    <span className="text-xs text-muted-foreground">
                      Déficit de 250 calorías
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="maintain">
                  <div className="flex flex-col">
                    <span className="font-medium">Mantener Peso</span>
                    <span className="text-xs text-muted-foreground">
                      Sin cambios en calorías
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="gainMild">
                  <div className="flex flex-col">
                    <span className="font-medium">Aumento Gradual</span>
                    <span className="text-xs text-muted-foreground">
                      Superávit de 250 calorías
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="gainExtreme">
                  <div className="flex flex-col">
                    <span className="font-medium">Aumento Rápido</span>
                    <span className="text-xs text-muted-foreground">
                      Superávit de 500 calorías
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateProtein}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Proteína
          </Button>
        </div>

        {recommendation && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  Tu Proteína Diaria Recomendada
                </span>
              </div>
              <div className="text-2xl font-bold">
                {recommendation.dailyProtein.target}g
                <span className="text-sm text-muted-foreground ml-2">
                  (rango: {recommendation.dailyProtein.min}-
                  {recommendation.dailyProtein.max}g)
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Distribuir en {recommendation.mealsPerDay} comidas (
                {recommendation.proteinPerMeal.min}-
                {recommendation.proteinPerMeal.max}g/comida)
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
                    <li
                      key={index}
                      className="pl-1 marker:text-foreground text-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
