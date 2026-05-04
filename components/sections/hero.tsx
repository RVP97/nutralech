import { CalendarCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
	return (
		<section className="relative min-h-screen overflow-hidden bg-[oklch(98.5%_0.008_12)]">
			<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid min-h-screen items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
					<div className="space-y-8 pt-28 lg:pt-0">
						<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F]">
							Nutrición personalizada
						</p>

						<h1 className="font-serif text-4xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-5xl lg:text-6xl xl:text-7xl" style={{ lineHeight: 1.08 }}>
							Planes que se adaptan a tu vida, no al revés
						</h1>

						<p className="max-w-lg text-lg leading-relaxed text-[oklch(45%_0.01_12)]">
							Consulta inicial de 60 minutos, plan alimenticio a medida y
							seguimiento directo con Marialy por WhatsApp. Sin dietas
							restrictivas, sin fórmulas genéricas.
						</p>

						<div className="flex flex-wrap items-center gap-4 pt-2">
							<Link
								prefetch={false}
								href="#precios"
								className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#DA5F6F] px-8 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5F6F]"
							>
								<CalendarCheck className="h-5 w-5" />
								Agenda tu consulta
							</Link>

							<Link
								prefetch={false}
								href="/acerca-de-mi"
								className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[oklch(85%_0.01_12)] px-8 text-[15px] font-medium text-[oklch(30%_0.01_12)] transition-colors duration-200 hover:border-[#DA5F6F]/40 hover:text-[#DA5F6F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5F6F]"
							>
								Conoce a Marialy
							</Link>
						</div>

						<div className="flex items-center gap-6 pt-4 text-sm text-[oklch(50%_0.01_12)]">
							<span>Consultas en línea</span>
							<span className="h-1 w-1 rounded-full bg-[oklch(75%_0.01_12)]" />
							<span>Pacientes en 6 continentes</span>
							<span className="h-1 w-1 rounded-full bg-[oklch(75%_0.01_12)]" />
							<span>Soporte por WhatsApp</span>
						</div>
					</div>

					{/* Mobile image */}
					<div className="relative block lg:hidden">
						<div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
							<Image
								src="/images/marialy.webp"
								alt="Marialy Alonso, nutricionista profesional de Nutralech"
								fill
								sizes="(max-width: 768px) 100vw, 600px"
								className="object-cover"
								priority
							/>
						</div>
					</div>

					{/* Desktop image */}
					<div className="relative hidden lg:block">
						<div className="relative h-[min(85vh,720px)] w-full overflow-hidden rounded-3xl">
							<Image
								src="/images/marialy.webp"
								alt="Marialy Alonso, nutricionista profesional de Nutralech"
								fill
								sizes="600px"
								className="object-cover"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
