import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { AnimatedList } from "@/components/ui/animated-list";
import NumberTicker from "@/components/ui/number-ticker";
import WordRotate from "@/components/ui/word-rotate";
import { ArrowRight, CalendarCheck, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen  bg-gradient-to-b from-white to-pink-50/50">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjE4LCA5NSwgMTExLCAwLjA3KSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#DA5F6F]/20 blur-[128px] animate-pulse" />
      <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-yellow-200/30 blur-[128px] animate-pulse [animation-delay:1000ms]" />

      {/* WhatsApp-style notifications */}
      {/* <div className="absolute right-4 top-4 z-10 w-full max-w-[360px] sm:right-8">
        <AnimatedList delay={2000} className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-start gap-3 rounded-2xl bg-[#F0F2F5] p-3 shadow-sm">
            <div className="relative shrink-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/images/marialy.webp"
                  alt="Marialy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <svg
                  viewBox="0 0 256 259"
                  width="12"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z"
                    fill="#00E676"
                  />
                  <path
                    d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z"
                    fill="#FFF"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-medium text-[#1B1D21]">Marialy</p>
                <span className="text-rose-500">❤️</span>
              </div>
              <p className="text-sm text-[#1B1D21]">G</p>
            </div>
            <div className="text-xs text-[#8696A0] mt-1">Reply</div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-[#F0F2F5] p-3 shadow-sm">
            <div className="relative shrink-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/images/marialy.webp"
                  alt="Marialy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <svg
                  viewBox="0 0 256 259"
                  width="12"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z"
                    fill="#00E676"
                  />
                  <path
                    d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z"
                    fill="#FFF"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-medium text-[#1B1D21]">Marialy</p>
              </div>
              <p className="text-sm text-[#1B1D21]">G</p>
            </div>
            <div className="text-xs text-[#8696A0] mt-1">Reply</div>
          </div>
        </AnimatedList>
      </div> */}

      <div className="container relative px-4 mx-auto">
        <div className="grid min-h-screen items-center gap-12 lg:grid-cols-2">
          <div className="space-y-10 pt-20 lg:pt-0 animate-fade-in">
            <div className="space-y-8">
              <AnimatedGradientText>
                <div className="inline-flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-[#DA5F6F]" />
                  Descubre tu potencial
                </div>
              </AnimatedGradientText>

              <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Inicia Tu Camino a La{" "}
                <WordRotate
                  words={["Transformación", "Mejor Vida", "Evolución"]}
                  className="relative inline-block"
                  framerProps={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -20 },
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                />
              </h1>

              <p className="max-w-lg text-lg text-muted-foreground md:text-xl">
                Con mi asesoramiento profesional, puedes alcanzar tu máximo
                potencial. Inicia hoy tu camino hacia una vida más saludable y
                equilibrada.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#consulta"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#DA5F6F] px-8 font-medium text-white transition-colors hover:bg-[#DA5F6F]/90"
              >
                <CalendarCheck className="h-5 w-5" />
                Agenda tu Consulta
              </Link>

              <Link
                href="#conoceme"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#DA5F6F]/20 bg-white px-8 font-medium text-[#DA5F6F] transition-colors hover:bg-[#DA5F6F]/5"
              >
                Conóceme
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Mobile image with overlaid statistics */}
            <div className="relative block lg:hidden">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/marialy.webp"
                  alt="Professional nutritionist"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>

              {/* Overlaid statistics */}
              <div className="absolute translate-y-1/2 bottom-0 -left-2 -right-2">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-[24px]">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xl font-bold leading-tight text-[#DA5F6F]">
                        <NumberTicker value={500} />+
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Vidas Transformadas <span>❤️</span>
                      </p>
                    </div>

                    <div>
                      <div className="text-xl font-bold leading-tight text-[#DA5F6F]">
                        <NumberTicker value={1000} />+
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Consultas Anuales <span>😊</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop statistics (hidden on mobile) */}
            <div className="hidden lg:grid gap-8 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl shadow-rose-200/10 animate-fade-in [animation-delay:200ms]">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-[#DA5F6F]">
                    <NumberTicker value={500} />+
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Vidas Transformadas ❤️
                  </p>
                </div>
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#DA5F6F]/10" />
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl shadow-rose-200/10 animate-fade-in [animation-delay:400ms]">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-[#DA5F6F]">
                    <NumberTicker value={1000} />+
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consultas Anuales 😊
                  </p>
                </div>
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#DA5F6F]/10" />
              </div>
            </div>
          </div>

          {/* Desktop image */}
          <div className="hidden lg:block relative w-full h-screen md:h-[600px] lg:h-[800px]">
            <Image
              src="/images/marialy.webp"
              alt="Professional nutritionist"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
