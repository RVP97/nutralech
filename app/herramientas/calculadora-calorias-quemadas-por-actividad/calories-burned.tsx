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
import { ActivityCombobox } from "./activity-combobox";

interface CalorieCalculation {
  caloriesBurned: number;
  intensity: string;
  mets: number;
}

interface ActivityRecommendation {
  title: string;
  caloriesBurned: number;
  calculation: CalorieCalculation;
  keyPoints: string[];
}

// MET values for different activities
const activities = {
  caminar: {
    light: 2.5, // Caminata casual
    moderate: 3.5, // Caminata rápida
    vigorous: 4.5, // Caminata muy rápida
  },
  correr: {
    light: 7.0, // Trote 8 km/h
    moderate: 9.0, // Carrera 10 km/h
    vigorous: 11.0, // Carrera 11+ km/h
  },
  ciclismo: {
    light: 4.0, // Ciclismo recreativo
    moderate: 6.0, // Ciclismo moderado
    vigorous: 8.0, // Ciclismo intenso
  },
  natacion: {
    light: 5.0, // Natación recreativa
    moderate: 7.0, // Natación moderada
    vigorous: 9.0, // Natación intensa
  },
  baloncesto: {
    light: 4.5, // Tiros libres
    moderate: 6.0, // Juego general
    vigorous: 8.0, // Juego competitivo
  },
  futbol: {
    light: 4.0, // Casual
    moderate: 7.0, // Juego general
    vigorous: 10.0, // Competitivo
  },
  voleibol: {
    light: 3.0, // Casual
    moderate: 4.0, // Juego general
    vigorous: 6.0, // Competitivo
  },
  tenis: {
    light: 4.0, // Dobles
    moderate: 6.0, // Individual general
    vigorous: 8.0, // Individual competitivo
  },
  badminton: {
    light: 3.5, // Casual
    moderate: 5.5, // Juego general
    vigorous: 7.0, // Competitivo
  },
  pesas: {
    light: 3.0, // Esfuerzo ligero
    moderate: 4.0, // Esfuerzo moderado
    vigorous: 6.0, // Esfuerzo intenso
  },
  crossfit: {
    light: 5.0, // Movimientos básicos
    moderate: 8.0, // Entrenamiento regular
    vigorous: 12.0, // Entrenamiento intenso
  },
  yoga: {
    light: 2.5, // Hatha yoga
    moderate: 3.5, // Power yoga
    vigorous: 4.5, // Ashtanga yoga
  },
  boxeo: {
    light: 6.0, // Saco de boxeo
    moderate: 9.0, // Sparring
    vigorous: 12.0, // Competición
  },
  artesMarciales: {
    light: 5.0, // Práctica/Ejercicios
    moderate: 7.0, // Entrenamiento general
    vigorous: 10.0, // Sparring intenso
  },
  baile: {
    light: 3.5, // Baile suave
    moderate: 5.0, // Baile general
    vigorous: 7.0, // Baile aeróbico
  },
  esqui: {
    light: 5.0, // Descenso moderado
    moderate: 7.0, // Campo traviesa
    vigorous: 9.0, // Competición
  },
  remo: {
    light: 3.5, // Esfuerzo ligero
    moderate: 7.0, // Esfuerzo moderado
    vigorous: 8.5, // Esfuerzo intenso
  },
  senderismo: {
    light: 3.0, // Terreno ligero
    moderate: 5.0, // Terreno moderado
    vigorous: 7.0, // Terreno empinado
  },
  escalada: {
    light: 5.0, // Escalada interior
    moderate: 7.5, // Escalada deportiva
    vigorous: 9.0, // Escalada montaña
  },
  pilates: {
    light: 2.5, // Principiante
    moderate: 3.5, // Intermedio
    vigorous: 4.5, // Avanzado
  },
  zumba: {
    light: 4.0, // Principiante
    moderate: 6.0, // Intermedio
    vigorous: 8.0, // Avanzado
  },
  spinning: {
    light: 5.0, // Clase suave
    moderate: 8.0, // Clase regular
    vigorous: 10.0, // Clase intensa
  },
  aerobics: {
    light: 4.0, // Bajo impacto
    moderate: 6.0, // Alto impacto
    vigorous: 8.0, // Muy alto impacto
  },
  eliptica: {
    light: 4.0, // Esfuerzo ligero
    moderate: 6.0, // Esfuerzo moderado
    vigorous: 8.0, // Esfuerzo intenso
  },
  paddel: {
    light: 4.0, // Casual
    moderate: 6.0, // Juego regular
    vigorous: 8.0, // Competitivo
  },
  rugby: {
    light: 6.0, // Entrenamiento
    moderate: 8.0, // Juego amistoso
    vigorous: 10.0, // Competición
  },
  hockey: {
    light: 5.0, // Práctica
    moderate: 7.0, // Juego recreativo
    vigorous: 9.0, // Competición
  },
  patinaje: {
    light: 3.5, // Recreativo
    moderate: 5.0, // Velocidad moderada
    vigorous: 7.0, // Velocidad alta
  },
  surfing: {
    light: 3.0, // Principiante
    moderate: 5.0, // Intermedio
    vigorous: 7.0, // Avanzado
  },
  jumpingRope: {
    light: 8.0, // Ritmo lento
    moderate: 10.0, // Ritmo moderado
    vigorous: 12.0, // Ritmo rápido
  },
  taichi: {
    light: 2.0, // Principiante
    moderate: 3.0, // Intermedio
    vigorous: 4.0, // Avanzado
  },
  kickboxing: {
    light: 5.0, // Técnica básica
    moderate: 7.0, // Entrenamiento general
    vigorous: 9.0, // Entrenamiento intenso
  },
  atletismo: {
    light: 4.0, // Entrenamiento técnico
    moderate: 6.0, // Entrenamiento general
    vigorous: 8.0, // Competición
  },
  gimnasiaRitmica: {
    light: 3.5, // Práctica básica
    moderate: 5.0, // Rutina general
    vigorous: 7.0, // Rutina competitiva
  },
} as const;

// Add this translation map
const intensityTranslations = {
  light: "Suave",
  moderate: "Moderada",
  vigorous: "Vigorosa",
} as const;

function calculateCaloriesBurned(
  weight: number,
  duration: number,
  activity: keyof typeof activities,
  intensity: keyof typeof activities.caminar,
  unitSystem: string
): CalorieCalculation {
  // Convert weight to kg if in imperial
  const weightInKg = unitSystem === "imperial" ? weight * 0.453592 : weight;

  // Get MET value for activity and intensity
  const mets = activities[activity][intensity];

  // Formula: Calories = MET × weight (kg) × time (hours)
  const hours = duration / 60;
  const caloriesBurned = mets * weightInKg * hours;

  return {
    caloriesBurned: Math.round(caloriesBurned),
    intensity,
    mets,
  };
}

function getIntensityColor(intensity: string) {
  switch (intensity) {
    case "light":
      return "bg-green-50 text-green-700 border-green-200";
    case "moderate":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "vigorous":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export function CaloriesBurnedCalculator() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState<keyof typeof activities>("caminar");
  const [intensity, setIntensity] =
    useState<keyof typeof activities.caminar>("moderate");
  const [recommendation, setRecommendation] =
    useState<ActivityRecommendation | null>(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [errors, setErrors] = useState({
    weight: "",
    duration: "",
  });

  const calculateCalories = () => {
    const newErrors = { weight: "", duration: "" };
    let hasErrors = false;

    if (!weight) {
      newErrors.weight = "Por favor, ingresa tu peso";
      hasErrors = true;
    }
    if (!duration) {
      newErrors.duration = "Por favor, ingresa la duración de la actividad";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    const weightNum = parseFloat(weight);
    const durationNum = parseFloat(duration);

    const calculation = calculateCaloriesBurned(
      weightNum,
      durationNum,
      activity as keyof typeof activities,
      intensity,
      unitSystem
    );

    setRecommendation({
      title: "Calorías Quemadas",
      caloriesBurned: calculation.caloriesBurned,
      calculation,
      keyPoints: [
        `MET (Metabolic Equivalent): ${calculation.mets} - Indica la intensidad de la actividad comparada con el estado de reposo`,
        "Esta es una estimación basada en promedios. Las calorías reales quemadas pueden variar según factores como edad, composición corporal y nivel de condición física",
        "La eficiencia del ejercicio mejora con la técnica correcta y la consistencia en el entrenamiento",
        "Para un plan de ejercicios personalizado y seguro, consulta con un profesional de la salud o entrenador certificado",
        "Mantén una hidratación adecuada y escucha a tu cuerpo durante el ejercicio",
      ],
    });
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">
          Calculadora de Calorías Quemadas
        </CardTitle>
        <CardDescription>
          Calcula las calorías quemadas según tu actividad física
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="space-y-4">
          {/* Unit System Select */}
          <div className="space-y-2">
            <Label htmlFor="unitSystem">Sistema de Medidas</Label>
            <Select value={unitSystem} onValueChange={setUnitSystem}>
              <SelectTrigger id="unitSystem">
                <SelectValue placeholder="Selecciona el sistema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Métrico (kg)</SelectItem>
                <SelectItem value="imperial">Imperial (lb)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <Label htmlFor="weight">
              Peso ({unitSystem === "metric" ? "kg" : "lb"})
            </Label>
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

          {/* Activity Select */}
          <div className="space-y-2">
            <Label htmlFor="activity">Actividad</Label>
            <ActivityCombobox
              value={activity}
              onChange={(value) =>
                setActivity(value as keyof typeof activities)
              }
            />
          </div>

          {/* Intensity Select */}
          <div className="space-y-2">
            <Label htmlFor="intensity">Intensidad</Label>
            <Select
              value={intensity}
              onValueChange={(value: keyof typeof activities.caminar) =>
                setIntensity(value)
              }
            >
              <SelectTrigger id="intensity">
                <SelectValue placeholder="Selecciona la intensidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Suave</SelectItem>
                <SelectItem value="moderate">Moderada</SelectItem>
                <SelectItem value="vigorous">Vigorosa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration Input */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duración (minutos)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            {errors.duration && (
              <p className="text-sm text-red-500">{errors.duration}</p>
            )}
          </div>

          <Button
            onClick={calculateCalories}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Calorías
          </Button>
        </div>

        {/* Results Section */}
        {recommendation && (
          <div className="space-y-4">
            <div
              className={`rounded-lg border p-4 space-y-2 ${getIntensityColor(
                recommendation.calculation.intensity
              )}`}
            >
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                <span className="font-medium">{recommendation.title}</span>
              </div>
              <div className="text-2xl font-bold">
                {recommendation.caloriesBurned} calorías
              </div>
              <div className="text-sm">
                Intensidad:{" "}
                {intensityTranslations[recommendation.calculation.intensity]}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 space-y-3 border">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Información Importante</span>
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
