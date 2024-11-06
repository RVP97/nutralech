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

function getCalorieSuggestion(
  calories: number,
  gender: string,
  height: string,
  weight: string,
  weightGoal: string,
  activityLevel: string
): NutritionRecommendation {
  const heightCm = parseFloat(height);
  const weightKg = parseFloat(weight);
  const bmi = weightKg / ((heightCm / 100) * (heightCm / 100));
  const isUnderweight = bmi < 18.5;
  const isOverweight = bmi > 25;

  if (calories < 1200) {
    return {
      title: "Precaución: Nivel Muy Bajo de Calorías",
      description: `Este nivel de calorías está por debajo de lo recomendado para una persona de ${heightCm}cm y ${weightKg}kg. ${
        isUnderweight
          ? "Especialmente considerando que tu IMC indica que podrías estar en bajo peso, "
          : ""
      }es crucial que consultes con un profesional de la salud antes de seguir una dieta tan restrictiva.`,
      keyPoints: [
        "Considera aumentar gradualmente tu ingesta calórica",
        "Prioriza proteínas magras y grasas saludables",
        "Monitorea tu energía y estado de ánimo",
        "Realiza chequeos regulares con un profesional",
      ],
    };
  }

  if (weightGoal.includes("lose")) {
    const baseDesc =
      gender === "female"
        ? `Para una mujer de ${heightCm}cm, este nivel calórico permite una pérdida de peso saludable${
            isOverweight ? ", especialmente considerando tu IMC actual" : ""
          }.`
        : `Para un hombre de ${heightCm}cm, este rango calórico permite una pérdida de peso gradual${
            isOverweight ? ", apropiada para tu IMC actual" : ""
          }.`;

    return {
      title:
        weightGoal === "loseExtreme"
          ? "Déficit Calórico Significativo"
          : "Déficit Calórico Moderado",
      description: `${baseDesc} ${
        weightGoal === "loseExtreme"
          ? "Con un déficit de 500 calorías, podrías perder aproximadamente 0.5kg por semana."
          : "Con un déficit de 250 calorías, podrías perder aproximadamente 0.25kg por semana."
      }`,
      keyPoints: [
        `Asegura una ingesta mínima de ${
          gender === "female" ? "1.6" : "1.8"
        }g de proteína por kg de peso`,
        "Distribuye tus calorías en 4-5 comidas para controlar el hambre",
        "Prioriza alimentos ricos en fibra para mayor saciedad",
        `Mantén una hidratación de ${
          gender === "female" ? "2-2.5" : "2.5-3"
        } litros diarios`,
      ],
    };
  }

  if (weightGoal.includes("gain")) {
    return {
      title:
        weightGoal === "gainExtreme"
          ? "Superávit Calórico Significativo"
          : "Superávit Calórico Moderado",
      description: `Para ${
        gender === "female" ? "una mujer" : "un hombre"
      } de ${heightCm}cm, este nivel calórico permite una ganancia de peso controlada${
        isUnderweight ? ", apropiada para tu IMC actual" : ""
      }. ${
        weightGoal === "gainExtreme"
          ? "Con un superávit de 500 calorías, podrías ganar aproximadamente 0.5kg por semana."
          : "Con un superávit de 250 calorías, podrías ganar aproximadamente 0.25kg por semana."
      }`,
      keyPoints: [
        `Consume ${
          gender === "female" ? "1.8-2" : "2-2.2"
        }g de proteína por kg de peso`,
        "Incluye carbohidratos complejos para energía sostenida",
        "Añade grasas saludables para alcanzar tus calorías objetivo",
        "Considera el entrenamiento de fuerza para optimizar la ganancia muscular",
      ],
    };
  }

  // For maintenance
  return {
    title: "Mantenimiento del Peso Actual",
    description: `Este nivel calórico está diseñado para mantener tu peso actual de ${weightKg}kg. ${
      isUnderweight
        ? "Considera aumentar gradualmente tus calorías para alcanzar un peso más saludable."
        : isOverweight
        ? "Podrías beneficiarte de un ligero déficit calórico para mejorar tu composición corporal."
        : "Tu IMC está en un rango saludable, este nivel calórico te ayudará a mantenerlo."
    }`,
    keyPoints: [
      `Mantén una ingesta de ${
        gender === "female" ? "1.6-1.8" : "1.8-2"
      }g de proteína por kg de peso`,
      "Equilibra macronutrientes según tu nivel de actividad",
      "Ajusta las calorías según cambios en tu actividad diaria",
      "Monitorea tu peso y energía semanalmente",
    ],
  };
}

export function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [weightGoal, setWeightGoal] = useState("maintain");
  const [calories, setCalories] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    age: "",
    height: "",
    weight: "",
  });

  const calculateCalories = () => {
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

    let bmr: number;
    if (gender === "male") {
      bmr =
        88.362 +
        13.397 * parseFloat(weight) +
        4.799 * parseFloat(height) -
        5.677 * parseFloat(age);
    } else {
      bmr =
        447.593 +
        9.247 * parseFloat(weight) +
        3.098 * parseFloat(height) -
        4.33 * parseFloat(age);
    }

    let totalCalories: number;
    switch (activityLevel) {
      case "sedentary":
        totalCalories = bmr * 1.2;
        break;
      case "lightlyActive":
        totalCalories = bmr * 1.375;
        break;
      case "moderatelyActive":
        totalCalories = bmr * 1.55;
        break;
      case "active":
        totalCalories = bmr * 1.725;
        break;
      case "veryActive":
        totalCalories = bmr * 1.9;
        break;
      default:
        totalCalories = bmr;
    }

    // Adjust calories based on weight goal
    switch (weightGoal) {
      case "loseExtreme":
        totalCalories -= 500;
        break;
      case "loseMild":
        totalCalories -= 250;
        break;
      case "maintain":
        // No adjustment needed
        break;
      case "gainMild":
        totalCalories += 250;
        break;
      case "gainExtreme":
        totalCalories += 500;
        break;
    }

    setCalories(Math.round(totalCalories));
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Calcula tus Calorías</CardTitle>
        <CardDescription>
          Ingresa tus datos para calcular tus necesidades calóricas diarias
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
            <Label htmlFor="height">Altura (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            {errors.height && (
              <p className="text-sm text-red-500">{errors.height}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
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
            onClick={calculateCalories}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Calorías
          </Button>
        </div>

        {calories && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  Tus Calorías Diarias Recomendadas
                </span>
              </div>
              <div className="text-2xl font-bold">{calories} kcal</div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  {
                    getCalorieSuggestion(
                      calories,
                      gender,
                      height,
                      weight,
                      weightGoal,
                      activityLevel
                    ).title
                  }
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {
                  getCalorieSuggestion(
                    calories,
                    gender,
                    height,
                    weight,
                    weightGoal,
                    activityLevel
                  ).description
                }
              </p>
              <div className="pt-2 space-y-2">
                <div className="text-sm font-medium">
                  Recomendaciones personalizadas:
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {getCalorieSuggestion(
                    calories,
                    gender,
                    height,
                    weight,
                    weightGoal,
                    activityLevel
                  ).keyPoints.map((point, index) => (
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
