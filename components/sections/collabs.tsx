import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Iphone15Pro from "@/components/ui/iphone-15-pro";
import Marquee from "@/components/ui/marquee";

const brandLogos = [
	{ src: "/images/brandLogos/birdman.webp", alt: "Birdman" },
	{ src: "/images/brandLogos/innata.webp", alt: "Innata" },
	{ src: "/images/brandLogos/adecoco.webp", alt: "Adecoco" },
	{ src: "/images/brandLogos/habits.webp", alt: "Habits" },
	{ src: "/images/brandLogos/justo.webp", alt: "Justo" },
	{ src: "/images/brandLogos/nopalia.webp", alt: "Nopalia" },
	{ src: "/images/brandLogos/tuny.webp", alt: "Tuny" },
	{ src: "/images/brandLogos/nucolato.webp", alt: "Nucolato" },
	{ src: "/images/brandLogos/casetify.webp", alt: "Casetify" },
	{ src: "/images/brandLogos/susalia.webp", alt: "Susalia" },
	{ src: "/images/brandLogos/foodnews.webp", alt: "Foodnews" },
	{ src: "/images/brandLogos/chilito.webp", alt: "Chilito" },
];

export default function CollaboratePage() {
	return (
		<div className="bg-[oklch(99%_0.005_12)]">
			{/* Hero */}
			<section className="pt-32 pb-20 px-4">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F] mb-4">
						Colaboraciones
					</p>
					<h1 className="font-serif text-4xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-5xl lg:text-6xl">
						Tu marca, mi audiencia, resultados reales
					</h1>
					<p className="mt-6 text-lg leading-relaxed text-[oklch(45%_0.01_12)] max-w-2xl mx-auto">
						780K seguidores en Instagram y TikTok confían en mis
						recomendaciones de nutrición y bienestar. Creo contenido que conecta
						porque viene de experiencia real, no de un guión.
					</p>
					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
						<a
							href="mailto:colaboraciones@nutralech.com"
							className="inline-flex h-12 items-center justify-center rounded-full bg-[#DA5F6F] px-8 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B]"
						>
							colaboraciones@nutralech.com
						</a>
						<a
							href="https://wa.me/message/BLYZCVYW2MOAJ1"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-12 items-center justify-center rounded-full border border-[oklch(85%_0.005_12)] px-8 text-sm font-medium text-[oklch(30%_0.005_12)] transition-colors duration-200 hover:border-[#DA5F6F] hover:text-[#DA5F6F]"
						>
							WhatsApp
						</a>
					</div>
				</div>
			</section>

			{/* Brand logos */}
			<section className="border-y border-[oklch(93%_0.005_12)] py-8">
				<Marquee pauseOnHover repeat={6} className="[--duration:35s] [--gap:3rem]">
					{brandLogos.map((logo) => (
						<div key={logo.alt} className="px-6">
							<Image
								src={logo.src}
								alt={logo.alt}
								width={140}
								height={70}
								className="h-12 w-auto object-contain"
							/>
						</div>
					))}
				</Marquee>
			</section>

			{/* Why collaborate */}
			<section className="py-24 px-4">
				<div className="mx-auto max-w-6xl">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F] mb-3">
								Por qué colaborar conmigo
							</p>
							<h2 className="font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl">
								Audiencia comprometida, resultados medibles
							</h2>
							<p className="mt-5 text-base leading-relaxed text-[oklch(45%_0.01_12)] max-w-lg">
								Mi comunidad son mujeres y hombres de 25 a 34 años interesados
								en nutrición, bienestar y hábitos sostenibles. No son
								seguidores pasivos: preguntan, compran, recomiendan.
							</p>

							{/* Proof points as inline list, not stat cards */}
							<dl className="mt-10 space-y-6">
								<div className="flex items-baseline gap-4">
									<dt className="text-2xl font-semibold tabular-nums text-[oklch(18%_0.005_12)] w-24 shrink-0">780K+</dt>
									<dd className="text-sm leading-relaxed text-[oklch(45%_0.01_12)]">
										Seguidores entre Instagram y TikTok, con crecimiento orgánico constante.
									</dd>
								</div>
								<div className="flex items-baseline gap-4">
									<dt className="text-2xl font-semibold tabular-nums text-[oklch(18%_0.005_12)] w-24 shrink-0">4.2%</dt>
									<dd className="text-sm leading-relaxed text-[oklch(45%_0.01_12)]">
										Engagement rate promedio, por encima del estándar de la industria.
									</dd>
								</div>
								<div className="flex items-baseline gap-4">
									<dt className="text-2xl font-semibold tabular-nums text-[oklch(18%_0.005_12)] w-24 shrink-0">12+</dt>
									<dd className="text-sm leading-relaxed text-[oklch(45%_0.01_12)]">
										Marcas han confiado en colaboraciones recurrentes.
									</dd>
								</div>
							</dl>
						</div>

						<div className="flex justify-center items-center gap-4 sm:gap-6">
							<Iphone15Pro
								src="/images/instagram.webp"
								className="w-48 sm:w-56 lg:w-64"
							/>
							<Iphone15Pro
								src="/images/tiktok.webp"
								className="w-48 sm:w-56 lg:w-64 translate-y-8"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Collaboration formats */}
			<section className="py-24 px-4 bg-[oklch(96.5%_0.01_12)]">
				<div className="mx-auto max-w-6xl">
					<div className="max-w-2xl mb-14">
						<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F] mb-3">
							Formatos
						</p>
						<h2 className="font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl">
							Cómo trabajamos juntos
						</h2>
					</div>

					{/* Asymmetric layout instead of identical cards */}
					<div className="grid md:grid-cols-2 gap-6">
						<div className="rounded-2xl bg-white p-8 md:p-10">
							<span className="text-xs font-medium tracking-wide uppercase text-[oklch(55%_0.005_12)]">01</span>
							<h3 className="mt-3 text-xl font-medium text-[oklch(18%_0.005_12)]">
								Contenido patrocinado
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[oklch(45%_0.01_12)] max-w-md">
								Posts, reels y stories que integran tu producto en mi contenido
								de nutrición. Cada pieza se siente como parte natural de lo que
								ya publico, porque lo es.
							</p>
						</div>
						<div className="rounded-2xl bg-white p-8 md:p-10">
							<span className="text-xs font-medium tracking-wide uppercase text-[oklch(55%_0.005_12)]">02</span>
							<h3 className="mt-3 text-xl font-medium text-[oklch(18%_0.005_12)]">
								Embajadora de marca
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[oklch(45%_0.01_12)] max-w-md">
								Alianzas a largo plazo donde tu marca se vuelve parte de mi
								rutina real. Múltiples touchpoints, contenido recurrente,
								resultados que crecen con el tiempo.
							</p>
						</div>
						<div className="rounded-2xl bg-white p-8 md:p-10">
							<span className="text-xs font-medium tracking-wide uppercase text-[oklch(55%_0.005_12)]">03</span>
							<h3 className="mt-3 text-xl font-medium text-[oklch(18%_0.005_12)]">
								Reseñas de producto
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[oklch(45%_0.01_12)] max-w-md">
								Pruebo tu producto, doy mi opinión honesta. Mi audiencia valora
								la transparencia; solo recomiendo lo que realmente usaría.
							</p>
						</div>
						<div className="rounded-2xl bg-white p-8 md:p-10">
							<span className="text-xs font-medium tracking-wide uppercase text-[oklch(55%_0.005_12)]">04</span>
							<h3 className="mt-3 text-xl font-medium text-[oklch(18%_0.005_12)]">
								Eventos presenciales
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[oklch(45%_0.01_12)] max-w-md">
								Apariciones en lanzamientos, activaciones y eventos de marca.
								Contenido en vivo que amplifica el alcance del evento.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-24 px-4">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl">
						Platiquemos de tu proyecto
					</h2>
					<p className="mt-5 text-base leading-relaxed text-[oklch(45%_0.01_12)]">
						Cuéntame sobre tu marca y lo que buscas lograr. Respondo en menos de
						48 horas con una propuesta personalizada.
					</p>
					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
						<a
							href="mailto:colaboraciones@nutralech.com"
							className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[#DA5F6F] px-8 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B]"
						>
							<Mail className="h-4 w-4" />
							Escríbeme
						</a>
						<a
							href="https://wa.me/message/BLYZCVYW2MOAJ1"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-12 items-center gap-2.5 rounded-full border border-[oklch(85%_0.005_12)] px-8 text-sm font-medium text-[oklch(30%_0.005_12)] transition-colors duration-200 hover:border-[#DA5F6F] hover:text-[#DA5F6F]"
						>
							WhatsApp directo
						</a>
					</div>
					<p className="mt-6 text-xs text-[oklch(62%_0.005_12)]">
						También puedes usar el{" "}
						<Link href="/contacto" className="underline underline-offset-2 hover:text-[#DA5F6F]">
							formulario de contacto
						</Link>{" "}
						seleccionando "Colaboración profesional".
					</p>
				</div>
			</section>
		</div>
	);
}
