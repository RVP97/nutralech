"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Apple,
  Book,
  Calendar,
  Facebook,
  GraduationCap,
  Heart,
  Instagram,
  Star,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutMeComponent() {
  const expertise = [
    { icon: Apple, text: "Nutrición Sostenible" },
    { icon: Heart, text: "Bienestar Integral" },
    { icon: Book, text: "Educación Nutricional" },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-pink-50/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="text-lg text-[#DA5F6F]">Conóceme</span>
          <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
            Acerca de Mí
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Image - Sticky on desktop */}
          <div className="relative lg:sticky lg:top-24 lg:self-start">
            <div className="absolute inset-0 bg-gradient-to-tl from-[#DA5F6F]/20 to-transparent rounded-3xl blur-xl" />
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src="/images/marialy.webp"
                alt="Marialy, Nutricionista"
                fill
                className="object-cover"
              />
              {/* Badge Overlays */}
              <div className="absolute top-4 left-4 hidden md:flex bg-white rounded-full py-2 px-4 shadow-lg items-center gap-2">
                <Apple className="w-4 h-4 text-[#DA5F6F]" />
                <span className="text-sm font-medium">
                  Nutrióloga Certificada
                </span>
              </div>

              <div className="absolute top-4 right-4 md:right-4 bg-white rounded-full py-2 px-4 shadow-lg flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#DA5F6F]" />
                <span className="text-sm font-medium">Enfoque Integral</span>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full py-2 px-4 shadow-lg flex items-center gap-2">
                <Star className="w-4 h-4 text-[#DA5F6F]" />
                <span className="text-sm font-medium">780K+ Seguidores</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-medium mb-4">Marialy Alonso</h3>
              <p className="text-xl text-muted-foreground mb-4">
                Nutrióloga Certificada
              </p>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-[#DA5F6F]" />
                <span className="text-sm text-muted-foreground">
                  Universidad Iberoamericana - Mención Honorífica
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">
              Con cientos de pacientes transformados, me dedico a cambiar vidas
              a través de la nutrición personalizada. Mi enfoque va más allá de
              las dietas restrictivas; creo en crear hábitos sostenibles que
              mejoren tu salud y calidad de vida a largo plazo.
            </p>

            <div className="space-y-4">
              <h4 className="text-xl font-medium">Áreas de Especialización</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {expertise.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center space-x-4 p-4">
                      <item.icon className="w-6 h-6 text-[#DA5F6F]" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-medium">Mi Filosofía</h4>
              <p className="text-muted-foreground">
                Creo que la nutrición adecuada es la base de una vida plena y
                saludable. Mi objetivo es empoderarte con el conocimiento y las
                herramientas necesarias para hacer elecciones informadas sobre
                tu alimentación, adaptadas a tu estilo de vida único.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Nutrición Basada en Evidencia</Badge>
              <Badge variant="secondary">Enfoque Holístico</Badge>
              <Badge variant="secondary">Atención Personalizada</Badge>
              <Badge variant="secondary">Educación Continua</Badge>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-medium">Sígueme en Redes Sociales</h4>
              <p className="text-muted-foreground">
                Como influencer en el mundo de la nutrición y el bienestar,
                comparto consejos, recetas y motivación diariamente en mis redes
                sociales. ¡Únete a nuestra comunidad de salud!
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/nutralech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Button variant="outline" size="icon">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="https://www.facebook.com/nutralech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Button variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="https://www.youtube.com/@Nutralech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Button variant="outline" size="icon">
                    <Youtube className="h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="https://www.tiktok.com/@nutralech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <Link prefetch={false} href="#precios">
                <Button className="bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agenda una Consulta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
