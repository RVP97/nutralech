import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Iphone15Pro from "@/components/ui/iphone-15-pro";
import Marquee from "@/components/ui/marquee";
import { ArrowRight, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colabora con Marialy | Alianzas con Influencers",
  description:
    "Explora oportunidades de colaboración con Marialy Rodriguez, influencer de nutrición y bienestar.",
};

const collaborationTypes = [
  {
    title: "Contenido Patrocinado",
    description: "Publicaciones atractivas presentando tu marca o producto",
    icon: "✨",
  },
  {
    title: "Embajadora de Marca",
    description: "Alianza a largo plazo representando tu marca",
    icon: "🤝",
  },
  {
    title: "Reseñas de Productos",
    description: "Reseñas honestas y detalladas de tus productos",
    icon: "🔍",
  },
  {
    title: "Eventos Presenciales",
    description: "Apariciones personales en tus eventos o lanzamientos",
    icon: "🎉",
  },
];

const statistics = [
  { number: "780K+", label: "Seguidores" },
  { number: "2", label: "Canales Activos" },
  { number: "25-34", label: "Edad Principal" },
];

const brandLogos = [
  { src: "/images/brandLogos/birdman.webp", alt: "Birdman logo" },
  { src: "/images/brandLogos/innata.webp", alt: "Innata logo" },
  { src: "/images/brandLogos/adecoco.webp", alt: "Adecoco logo" },
  { src: "/images/brandLogos/habits.webp", alt: "Habits logo" },
  { src: "/images/brandLogos/justo.webp", alt: "Justo logo" },
  { src: "/images/brandLogos/nopalia.webp", alt: "Nopalia logo" },
  { src: "/images/brandLogos/tuny.webp", alt: "Tuny logo" },
  { src: "/images/brandLogos/nucolato.webp", alt: "Nucolato logo" },
  { src: "/images/brandLogos/casetify.webp", alt: "Casetify logo" },
  { src: "/images/brandLogos/susalia.webp", alt: "Susalia logo" },
  { src: "/images/brandLogos/foodnews.webp", alt: "Foodnews logo" },
  { src: "/images/brandLogos/chilito.webp", alt: "Chilito logo" },
];

export default function CollaboratePage() {
  return (
    <div className="mt-6 bg-gradient-to-b from-white to-pink-50/50">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjE4LCA5NSwgMTExLCAwLjA3KSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#DA5F6F]/20 blur-[128px]" />
      <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-yellow-200/30 blur-[128px]" />

      <div className=" relative mx-auto py-16 max-w-[95%]">
        <section className="text-center mb-12">
          <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl text-gray-900 mb-6">
            Colabora con <span className="text-[#DA5F6F]">Marialy</span>
          </h1>
          <p className="text-xl text-gray-600 md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12">
            Creemos contenido impactante juntos e inspiremos a millones hacia un
            estilo de vida más saludable.
          </p>
        </section>

        <section className="md:mb-24 mb-12">
          <div className="grid xl:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-medium text-gray-900">
                ¿Por Qué Colaborar Conmigo?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Como influencer de nutrición y bienestar, aporto una mezcla
                única de experiencia, autenticidad y engagement a cada
                colaboración. Mi audiencia confía en mis recomendaciones y
                valora el contenido que creo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {statistics.map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-white hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-[#DA5F6F] mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-8">
                <Iphone15Pro
                  src="/images/instagram.webp"
                  className="transform scale-75 sm:scale-90"
                />
                <Iphone15Pro
                  src="/images/tiktok.webp"
                  className="transform scale-75 sm:scale-90 -mt-32 sm:mt-0 sm:translate-y-8"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-8">
            <span className="text-lg text-[#DA5F6F]">No lo dejes pasar</span>
            <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
              Oportunidades de Colaboración
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              Encuentra una gran variedad de maneras para colaborar conmigo
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {collaborationTypes.map((collab, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="text-4xl mb-4">{collab.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {collab.title}
                  </h3>
                  <p className="text-gray-600">{collab.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="md:mb-24 mb-12">
          <div className="text-center mb-8">
            <span className="text-lg text-[#DA5F6F]">
              Colaboración Constante
            </span>
            <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
              Han Confiado en Mí
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              Estas son algunas de las marcas que han confiado en mí para
              promover sus productos
            </p>
          </div>
          <Marquee className="py-8">
            {brandLogos.map((logo, index) => (
              <div key={index} className="mx-8">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="opacity-100 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </Marquee>
        </section>

        <section className="mb-24">
          <Card className="bg-white overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="md:p-12 p-4 bg-gradient-to-br from-[#DA5F6F] to-[#FF8C94] text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 transform rotate-45"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
                  <h2 className="text-4xl font-serif font-medium mb-8 relative z-10">
                    Conectemos
                  </h2>
                  <p className="mb-12 text-lg leading-relaxed relative z-10">
                    ¿Lista para crear algo increíble juntos? Contáctame
                    directamente a través de cualquiera de estos canales. ¡Me
                    emociona escuchar tus ideas!
                  </p>
                  <div className="space-y-8 relative z-10">
                    <a
                      href="https://wa.me/message/BLYZCVYW2MOAJ1"
                      className="flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-white text-[#DA5F6F] rounded-full p-3 mr-4">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-6 w-6"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </div>
                      <span className="md:text-xl text-lg hover:underline">
                        +52 744 346 8252
                      </span>
                    </a>
                    <a
                      href="mailto:colaboraciones@nutralech.com"
                      className="flex items-center"
                    >
                      <div className="bg-white text-[#DA5F6F] rounded-full p-3 mr-4">
                        <Mail className="h-6 w-6" />
                      </div>
                      <span className="md:text-xl text-lg hover:underline">
                        colaboraciones@nutralech.com
                      </span>
                    </a>
                  </div>
                </div>
                <div className="relative h-96 md:h-auto">
                  <Image
                    unoptimized
                    src="/images/walking.svg"
                    alt="Marialy working"
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
