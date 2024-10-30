"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function TestimonialsComponent() {
  const testimonials = [
    {
      name: "Rodrigo Valle",
      handle: "@rodrigo.vallep",
      image: "/images/marialy.webp",
      quote:
        "Gracias a Marialy, he logrado mis objetivos de salud con facilidad y eficacia. Su conocimiento y enfoque personalizado son excepcionales. ¡Totalmente recomendado!",
    },
    {
      name: "Emma Pinto",
      handle: "@chefeemmapinto",
      image: "/images/marialy.webp",
      quote:
        "¡La mejor nutrióloga! Obtuve súper buenos resultados sin hacer nada extremo ni estando en dietas restrictivas. Me encanta que todo mi plan fue muy balanceado y que diario me apoya en todas mis dudas.",
    },
    {
      name: "Helena Molina",
      handle: "@helenamolinar",
      image: "/images/marialy.webp",
      quote:
        "¡Increíble lo que he logrado con la ayuda de Marialy! No solo me ayuda a cumplir mis metas sino que tengo una mejor relación con la comida. La recomiendo 100% a quien sea que esté buscando a una nutrióloga.",
    },
  ];

  return (
    <section className="py-2 bg-gradient-to-b from-pink-50/50 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="text-lg text-[#DA5F6F]">Testimonios</span>
          <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
            Lo Que Dicen Mis Pacientes
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 transition-all hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.handle}
                  </div>
                </div>
              </div>
              <blockquote className="mt-4 text-muted-foreground">
                {testimonial.quote}
              </blockquote>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
