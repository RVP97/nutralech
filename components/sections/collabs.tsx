import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Iphone15Pro from "@/components/ui/iphone-15-pro";
import Marquee from "@/components/ui/marquee";
import {
  ArrowRight,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/50">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjE4LCA5NSwgMTExLCAwLjA3KSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#DA5F6F]/20 blur-[128px]" />
      <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-yellow-200/30 blur-[128px]" />

      <div className=" relative mx-auto py-16 max-w-[95%]">
        <section className="text-center mb-24">
          <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl text-gray-900 mb-6">
            Colabora con <span className="text-[#DA5F6F]">Marialy</span>
          </h1>
          <p className="text-xl text-gray-600 md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12">
            Creemos contenido impactante juntos e inspiremos a millones hacia un
            estilo de vida más saludable.
          </p>
          {/* <Button
            size="lg"
            className="bg-[#DA5F6F] hover:bg-[#C54E5E] text-white text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Iniciar Colaboración
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button> */}
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
          <h2 className="text-4xl font-serif font-medium text-center mb-12">
            Oportunidades de Colaboración
          </h2>
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
          <h2 className="text-4xl font-serif font-medium text-center md:mb-12 mb-6">
            Han Confiado en Mí
          </h2>
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
                      className="flex items-center group"
                    >
                      <div className="bg-white text-[#DA5F6F] rounded-full p-3 mr-4 group-hover:bg-[#DA5F6F] group-hover:text-white transition-colors duration-300">
                        <Phone className="h-6 w-6" />
                      </div>
                      <span className="md:text-xl text-lg group-hover:underline">
                        +52 744 346 8252
                      </span>
                    </a>
                    <a
                      href="mailto:colaboraciones@nutralech.com"
                      className="flex items-center group"
                    >
                      <div className="bg-white text-[#DA5F6F] rounded-full p-3 mr-4 group-hover:bg-[#DA5F6F] group-hover:text-white transition-colors duration-300">
                        <Mail className="h-6 w-6" />
                      </div>
                      <span className="md:text-xl text-lg group-hover:underline">
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
