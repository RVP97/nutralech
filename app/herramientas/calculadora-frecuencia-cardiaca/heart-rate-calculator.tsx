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
import { useState } from "react";

interface HeartRateZone {
  zone: string;
  range: string;
  bpm: string;
  description: string;
  color: string;
}

function calculateHeartRateZones(maxHR: number): HeartRateZone[] {
  return [
    {
      zone: "Zona 1 - Calentamiento",
      range: "50-60%",
      bpm: `${Math.round(maxHR * 0.5)}-${Math.round(maxHR * 0.6)}`,
      description: "Actividad muy ligera, recuperación activa",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      zone: "Zona 2 - Quema de Grasa",
      range: "60-70%",
      bpm: `${Math.round(maxHR * 0.6)}-${Math.round(maxHR * 0.7)}`,
      description: "Actividad ligera, mejora la resistencia básica",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      zone: "Zona 3 - Aeróbica",
      range: "70-80%",
      bpm: `${Math.round(maxHR * 0.7)}-${Math.round(maxHR * 0.8)}`,
      description: "Intensidad moderada, mejora la eficiencia cardiovascular",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
    },
    {
      zone: "Zona 4 - Anaeróbica",
      range: "80-90%",
      bpm: `${Math.round(maxHR * 0.8)}-${Math.round(maxHR * 0.9)}`,
      description: "Intensidad alta, mejora el rendimiento de velocidad",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    },
    {
      zone: "Zona 5 - Máxima",
      range: "90-100%",
      bpm: `${Math.round(maxHR * 0.9)}-${maxHR}`,
      description: "Intensidad máxima, intervalos cortos",
      color: "bg-red-50 border-red-200 hover:bg-red-100",
    },
  ];
}

export function HeartRateZonesCalculator() {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [zones, setZones] = useState<HeartRateZone[] | null>(null);
  const [errors, setErrors] = useState({
    age: "",
    restingHR: "",
  });

  const calculateZones = () => {
    const newErrors = {
      age: "",
      restingHR: "",
    };

    let hasErrors = false;

    if (!age) {
      newErrors.age = "Por favor, ingresa tu edad";
      hasErrors = true;
    }
    if (!restingHR) {
      newErrors.restingHR =
        "Por favor, ingresa tu frecuencia cardíaca en reposo";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    const maxHR = 220 - parseInt(age);
    const calculatedZones = calculateHeartRateZones(maxHR);
    setZones(calculatedZones);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">
          Calculadora de Zonas de Frecuencia Cardíaca
        </CardTitle>
        <CardDescription>
          Calcula tus zonas de entrenamiento para optimizar tus ejercicios
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
            <Label htmlFor="restingHR">
              Frecuencia Cardíaca en Reposo (bpm)
            </Label>
            <Input
              id="restingHR"
              type="number"
              placeholder="60"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
            />
            {errors.restingHR && (
              <p className="text-sm text-red-500">{errors.restingHR}</p>
            )}
          </div>

          <Button
            onClick={calculateZones}
            className="w-full bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white mt-4"
          >
            Calcular Zonas
          </Button>
        </div>

        {zones && (
          <div className="space-y-4">
            {zones.map((zone, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 space-y-2 transition-colors ${zone.color}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{zone.zone}</span>
                  <span className="text-sm text-muted-foreground">
                    {zone.range}
                  </span>
                </div>
                <div className="text-xl font-bold">{zone.bpm} BPM</div>
                <p className="text-sm text-muted-foreground">
                  {zone.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
