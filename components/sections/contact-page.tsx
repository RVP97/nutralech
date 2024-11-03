import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, CreditCard, HelpCircle, PiggyBank } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SimplifiedContactForm from "./simplified-contact-form";

export default function ContactPageComponent() {
  const contactOptions = [
    {
      title: "Pacientes Existentes",
      description:
        "¿Ya eres paciente? Estaré encantada de personalmente ayudarte con cualquier consulta.",
      icon: CreditCard,
      link: "#contact-form",
    },
    {
      title: "Nuevos Pacientes",
      description:
        "¿Interesado en comenzar tu viaje hacia una mejor salud? Habla conmigo para resolver cualquier duda.",
      icon: PiggyBank,
      link: "#contact-form",
    },
    {
      title: "Consultas Profesionales",
      description:
        "¿Eres un profesional de la salud interesado en colaborar? Conéctate conmigo para ver cómo podemos trabajar juntos.",
      icon: Building2,
      link: "#contact-form",
    },
  ];

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="bg-[#DA5F6F] text-white">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight">
                Contacta con Marialy
              </h1>
              <p className="text-base md:text-xl text-white/90">
                ¿Tienes alguna pregunta? Puedes encontrar la respuesta en mis{" "}
                <Link
                  href="/#faq"
                  className="underline underline-offset-4 hover:text-white"
                >
                  preguntas frecuentes
                </Link>
                , o consulta todas las formas de contactarnos a continuación.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="flex -space-x-2">
                  {[
                    "/images/testimonial-profile/rodrigo.webp",
                    "/images/testimonial-profile/emma.webp",
                    "/images/testimonial-profile/helena.webp",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative w-8 h-8 rounded-full border-2 border-[#DA5F6F] overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`Paciente satisfecho ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium">
                  +500 pacientes felices me avalan
                </p>
              </div>
              <div className="inline-block bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <div className="flex flex-wrap divide-x divide-white/10">
                  <div className="px-6 py-3 flex items-center">
                    <div className="w-5 flex justify-center">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    <span className="text-sm font-medium">
                      Disponible ahora
                    </span>
                  </div>
                  <div className="px-6 py-3 flex items-center">
                    <div className="w-5 flex justify-center">
                      <span className="text-amber-400">★</span>
                    </div>
                    <span className="text-sm font-medium">
                      4.9/5 en reseñas
                    </span>
                  </div>
                  <div className="px-6 py-3 flex items-center">
                    <div className="w-5 flex justify-center">
                      <span className="text-blue-400">⚡</span>
                    </div>
                    <span className="text-sm font-medium">
                      Respuesta en &lt;24h
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden">
              <Image
                unoptimized
                src="/images/contact-drawing.svg"
                alt="Equipo de atención al cliente"
                fill
                className="rounded-2xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="container px-4 mx-auto -mt-8 md:-mt-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactOptions.map((option, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="space-y-4 flex-grow">
                  <div className="bg-[#DA5F6F]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-[#DA5F6F]" />
                  </div>
                  <h2 className="text-xl font-medium">{option.title}</h2>
                  <p className="text-muted-foreground">{option.description}</p>
                </div>
                <Link href="#contact-form" className="mt-4">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-[#DA5F6F] hover:text-[#DA5F6F]/80"
                  >
                    Contactar
                    <span className="ml-2">→</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className=" px-4 mx-auto py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium tracking-tight mb-4">
              Envíame un mensaje
            </h2>
            <p className="text-muted-foreground">
              Complete el formulario a continuación y te responderé lo antes
              posible.
            </p>
          </div>
          <SimplifiedContactForm />
        </div>
      </div>

      {/* Help Center Section */}
      <div className="container px-4 mx-auto py-8">
        <Card className="bg-slate-50 border-none">
          <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-white p-4 rounded-full">
              <HelpCircle className="w-8 h-8 text-[#DA5F6F]" />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-xl font-medium">Preguntas Frecuentes</h2>
              <p className="text-muted-foreground">
                Encuentra respuestas rápidas a preguntas comunes en mis
                preguntas frecuentes.
              </p>
            </div>
            <Link href="/#faq" className="sm:ml-auto mt-4 sm:mt-0">
              <Button variant="outline">Visitar Preguntas Frecuentes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
