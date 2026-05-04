"use client";

import { Calendar, Heart, Puzzle } from "lucide-react";
import Image from "next/image";

const steps = [
	{
		number: "01",
		icon: Calendar,
		title: "Consulta inicial personalizada",
		description:
			"Comenzamos con una consulta detallada para entender tus necesidades únicas, historial médico y objetivos de salud.",
	},
	{
		number: "02",
		icon: Puzzle,
		title: "Plan nutricional a medida",
		description:
			"Desarrollo un plan nutricional completamente personalizado que se adapta a tu estilo de vida, preferencias y metas específicas.",
	},
	{
		number: "03",
		icon: Heart,
		title: "Seguimiento y apoyo continuo",
		description:
			"Te acompaño en cada paso con consultas regulares, ajustes al plan según sea necesario y apoyo constante por WhatsApp.",
	},
];

export default function PersonalizedAttention() {
	return (
		<section id="servicios" className="py-24 bg-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-16 lg:grid-cols-2 items-center">
					<div>
						<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F]">
							Cada plan es único
						</p>
						<h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
							Atención personalizada para ti
						</h2>
						<p className="mt-6 text-lg leading-relaxed text-[oklch(45%_0.01_12)] max-w-xl">
							Cada cliente recibe una atención completamente personalizada.
							Mi enfoque se adapta específicamente a ti, asegurando que recibas
							el apoyo exacto que necesitas.
						</p>

						<div className="mt-12 space-y-10">
							{steps.map((step) => (
								<div key={step.number} className="flex gap-5">
									<div className="shrink-0 pt-1">
										<span className="block text-xs font-medium text-[#DA5F6F] tabular-nums">
											{step.number}
										</span>
									</div>
									<div>
										<h3 className="text-base font-medium text-[oklch(22%_0.005_12)]">
											{step.title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-[oklch(50%_0.01_12)]">
											{step.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="relative">
						<div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
							<Image
								src="/images/marialy-2.webp"
								alt="Consulta de nutrición personalizada con Marialy Alonso"
								className="object-cover"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
