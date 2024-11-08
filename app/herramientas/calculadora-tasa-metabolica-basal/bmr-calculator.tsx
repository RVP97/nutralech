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

interface NutritionRecommendation {
  title: string;
  description: string;
  keyPoints: string[];
}

function getBMRSuggestion(
  bmr: number,
  gender: string,
  height: string,
  weight: string,
  unitSystem: string
): NutritionRecommendation {
  const [feet, inches] =
    unitSystem === "imperial" ? height.split("-").map(Number) : [0, 0];

  const heightDisplay =
    unitSystem === "metric" ? `${parseFloat(height)}cm` : `${feet}'${inches}"`;

  const weightKg =
    unitSystem === "metric"
      ? parseFloat(weight)
      : parseFloat(weight) * 0.453592;
  const displayWeight = unitSystem === "metric" ? weightKg : parseFloat(weight);
  const weightUnit = unitSystem === "metric" ? "kg" : "lb";

  return {
    title: "Tu Tasa Metabólica Basal (TMB)",
    description: `Tu TMB es la cantidad de energía que tu cuerpo necesita para mantener las funciones vitales en reposo completo. Para ${
      gender === "female" ? "una mujer" : "un hombre"
    } de ${heightDisplay} y ${Math.round(
      displayWeight
    )}${weightUnit}, este es el mínimo de calorías que tu cuerpo necesita diariamente.`,
    keyPoints: [
      "La TMB representa tus necesidades calóricas básicas en reposo",
      "Para calcular tus necesidades diarias totales, multiplica tu TMB por tu factor de actividad",
      "Factores que aumentan la TMB: masa muscular, ejercicio regular, edad joven",
      "Factores que disminuyen la TMB: pérdida muscular, dietas muy restrictivas, edad avanzada",
    ],
  };
}

export function BMRCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState<number | null>(null);
  const [recommendation, setRecommendation] =
    useState<NutritionRecommendation | null>(null);
  const [errors, setErrors] = useState({
    age: "",
    height: "",
    weight: "",
  });
  const [unitSystem, setUnitSystem] = useState("metric");

  const calculateBMR = () => {
    // Reset all errors
    const newErrors = {
      age: "",
      height: "",
      weight: "",
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

    setErrors(newErrors);

    if (hasErrors) return;

    // Convert measurements if needed
    let heightInCm: number;
    let weightInKg: number;

    if (unitSystem === "metric") {
      heightInCm = parseFloat(height);
      weightInKg = parseFloat(weight);
    } else {
      const [feet, inches] = height.split("-").map(Number);
      heightInCm = feet * 30.48 + inches * 2.54;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    let bmr: number;
    if (gender === "male") {
      bmr =
        88.362 +
        13.397 * weightInKg +
        4.799 * heightInCm -
        5.677 * parseFloat(age);
    } else {
      bmr =
        447.593 +
        9.247 * weightInKg +
        3.098 * heightInCm -
        4.33 * parseFloat(age);
    }

    const calculatedBMR = Math.round(bmr);
    setCalories(calculatedBMR);
    setRecommendation(
      getBMRSuggestion(calculatedBMR, gender, height, weight, unitSystem)
    );
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">
          Calculadora de Tasa Metabólica Basal
        </CardTitle>
        <CardDescription>
          Calcula las calorías que tu cuerpo necesita en reposo completo
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Edad</Label>
            <Input
              id="age"
              type="number"
              placeholder="30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
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

          <Button
            onClick={calculateBMR}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular TMB
          </Button>
        </div>

        {calories && recommendation && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  Tu Tasa Metabólica Basal (TMB)
                </span>
              </div>
              <div className="text-2xl font-bold">{calories} kcal</div>
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
        )}
      </CardContent>
    </Card>
  );
}
