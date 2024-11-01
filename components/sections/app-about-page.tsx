import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CalendarCheck, Check, Leaf, Star } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Mí | Marialy Rodriguez",
  description:
    "Descubre la pasión y experiencia de Marialy Rodriguez en nutrición y bienestar.",
};

const services = [
  {
    title: "Consultas Personalizadas",
    description: "Planes adaptados a tu estilo de vida único",
  },
  {
    title: "Asesoramiento Global",
    description: "Nutrición sin fronteras, desde cualquier parte del mundo",
  },
  {
    title: "Sesiones Virtuales",
    description: "Experiencias de consulta inmersivas en alta definición",
  },
  {
    title: "Seguimiento Continuo",
    description: "Apoyo constante en tu viaje hacia el bienestar",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/50">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjE4LCA5NSwgMTExLCAwLjA3KSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#DA5F6F]/20 blur-[128px]" />
      <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-yellow-200/30 blur-[128px]" />

      <div className="container relative px-4 mx-auto">
        <section className="py-8 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center lg:gap-8 xl:gap-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-[#DA5F6F] font-semibold bg-[#DA5F6F]/10 px-4 py-2 rounded-full">
                <Leaf className="h-5 w-5" />
                Nutrición & Bienestar
              </div>

              <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl text-gray-900">
                Marialy <span className="text-[#DA5F6F]">Alonso</span>
              </h1>

              <p className="text-xl text-gray-600 md:text-2xl max-w-xl leading-relaxed">
                Transformando vidas a través de la{" "}
                <span className="font-semibold text-[#DA5F6F]">
                  nutrición consciente
                </span>{" "}
                y el{" "}
                <span className="font-semibold text-[#DA5F6F]">
                  bienestar integral
                </span>
                .
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="#consulta"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#DA5F6F] px-8 font-medium text-white transition-colors hover:bg-[#DA5F6F]/90 text-lg"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Agenda tu Consulta
                </Link>

                <Link
                  href="#servicios"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-[#DA5F6F] bg-transparent px-8 font-medium text-[#DA5F6F] transition-colors hover:bg-[#DA5F6F]/5 text-lg"
                >
                  Explora Mis Servicios
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 fill-[#DA5F6F] text-[#DA5F6F]"
                    />
                  ))}
                </div>
                <p className="text-sm">Más de 500 clientes satisfechos</p>
              </div>
            </div>

            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[#DA5F6F]/20 to-yellow-200/30 rounded-3xl transform rotate-3"></div>
              <Image
                src="/images/marialy.webp"
                alt="Marialy Rodriguez"
                width={600}
                height={600}
                className="rounded-3xl shadow-lg relative z-10 transform -rotate-3 transition-transform hover:rotate-0 duration-300 w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="py-16" id="servicios">
          <h2 className="text-3xl font-serif font-medium text-center mb-8">
            Mis Servicios
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {service.description}
                  </p>
                  <Button
                    variant="link"
                    className="text-[#DA5F6F] hover:text-[#C54E5E] p-0 h-auto font-semibold mt-auto"
                  >
                    Saber más <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-serif font-medium text-center mb-8">
            Mi Enfoque
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Mi Filosofía</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Creo firmemente en que la nutrición va más allá de contar
                  calorías. Se trata de nutrir tu cuerpo, mente y espíritu de
                  manera integral. Mi enfoque se basa en la ciencia más
                  reciente, pero también en la comprensión profunda de que cada
                  persona es única.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Pilares de mi Trabajo
                </h3>
                <ul className="space-y-4">
                  {[
                    "Nutrición personalizada basada en tu estilo de vida",
                    "Integración de hábitos saludables sostenibles",
                    "Apoyo emocional y motivacional continuo",
                    "Educación nutricional para decisiones informadas",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-[#DA5F6F] mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* <section className="py-16">
          <h2 className="text-3xl font-serif font-medium text-center mb-8">
            Certificaciones y Educación
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Nutrióloga Certificada",
                institution: "Universidad Iberoamericana",
                year: "2022",
              },
            ].map((cert, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{cert.institution}</p>
                  <p className="text-sm text-gray-500">{cert.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        <section className="py-16">
          <div className="bg-gradient-to-br from-[#DA5F6F] to-[#FF8C94] text-white rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-medium mb-6">
                ¿Listo para transformar tu vida?
              </h2>
              <p className="text-xl mb-8 leading-relaxed">
                Descubre cómo una nutrición personalizada puede elevar cada
                aspecto de tu vida. Juntos, crearemos un plan que se adapte
                perfectamente a tus necesidades y metas, guiándote hacia un
                futuro más saludable y equilibrado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-white text-[#DA5F6F] hover:bg-gray-100 text-lg px-8 py-6 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Comienza Tu Viaje Nutricional
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent hover:text-white border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full transition-colors duration-300"
                >
                  Conoce Más
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -mb-12 -ml-12"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mt-16 -mr-16"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
