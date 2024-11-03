"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";
import { Calendar, Heart, Puzzle, User } from "lucide-react";
import React, { forwardRef, useRef } from "react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full bg-white border-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function PersonalizedAttention() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      icon: Calendar,
      title: "Consulta Inicial Personalizada",
      description:
        "Comenzamos con una consulta detallada para entender tus necesidades únicas, historial médico y objetivos de salud.",
    },
    {
      icon: Puzzle,
      title: "Plan Nutricional a Medida",
      description:
        "Desarrollo un plan nutricional completamente personalizado que se adapta a tu estilo de vida, preferencias y metas específicas.",
    },
    {
      icon: Heart,
      title: "Seguimiento y Apoyo Continuo",
      description:
        "Te acompaño en cada paso del camino con consultas regulares, ajustes al plan según sea necesario y apoyo constante para asegurar tu éxito.",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-white">
      <div className="container px-4 mx-auto">
        <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl text-center mb-16">
          Atención Personalizada para Ti
        </h2>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground">
              En mi práctica, cada cliente recibe una atención completamente
              personalizada. Entiendo que cada persona es única, con sus propias
              necesidades, desafíos y objetivos. Mi enfoque se adapta
              específicamente a ti, asegurando que recibas el apoyo exacto que
              necesitas para alcanzar tus metas de salud y bienestar.
            </p>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#DA5F6F]/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-[#DA5F6F]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Animated Beam Demo */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#DA5F6F]/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#DA5F6F]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Comunicación Constante
                  </h3>
                  <p className="text-muted-foreground">
                    Mantén una línea directa de comunicación conmigo durante
                    todo tu proceso
                  </p>
                </div>
              </div>

              <div
                className="relative flex w-full items-center justify-center overflow-hidden p-10 bg-transparent"
                ref={containerRef}
                style={{ background: "transparent" }}
              >
                <div className="flex w-full flex-row justify-between">
                  <Circle ref={leftRef}>
                    <img
                      src="/images/marialy.webp"
                      alt="Marialy"
                      className="w-full h-full object-cover"
                    />
                  </Circle>
                  <Circle ref={rightRef}>
                    <User className="w-6 h-6 text-[#DA5F6F]" />
                  </Circle>
                </div>

                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={leftRef}
                  toRef={rightRef}
                  startYOffset={10}
                  endYOffset={10}
                  curvature={-20}
                  pathColor="#DA5F6F"
                  gradientStartColor="#DA5F6F"
                  gradientStopColor="#DA5F6F"
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={leftRef}
                  toRef={rightRef}
                  startYOffset={-10}
                  endYOffset={-10}
                  curvature={20}
                  reverse
                  pathColor="#DA5F6F"
                  gradientStartColor="#DA5F6F"
                  gradientStopColor="#DA5F6F"
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#DA5F6F]/20 to-transparent rounded-3xl blur-xl" />
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <img
                src="/images/marialy-2.webp"
                alt="Personalized nutrition consultation"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
