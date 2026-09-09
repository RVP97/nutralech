"use client";

import { FileText, Heart, Puzzle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = [
	{
		number: "01",
		icon: FileText,
		title: "Compras y llenas tu documento",
		description:
			"Eliges tu plan, pagas en línea y recibes un documento para compartir tus datos, objetivos, hábitos, rutina y preferencias.",
	},
	{
		number: "02",
		icon: Puzzle,
		title: "Recibes tu plan personalizado",
		description:
			"Con esa información elaboro tu plan de alimentación con equivalencias, menú ejemplo y recomendaciones adaptadas a tu vida.",
	},
	{
		number: "03",
		icon: Heart,
		title: "Lo aplicas con apoyo continuo",
		description:
			"Puedes escribirme por WhatsApp para dudas del plan y, cuando lo necesites, actualizarlo con el Plan de seguimiento.",
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
							Así funciona el plan a distancia
						</h2>
						<p className="mt-6 text-lg leading-relaxed text-[oklch(45%_0.01_12)] max-w-xl">
							Sin citas ni videollamadas. Un proceso claro para que recibas una
							guía realista, personalizada y fácil de aplicar en tu día a día.
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

						<Link
							prefetch={false}
							href="#precios"
							className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[#DA5F6F] px-8 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B]"
						>
							Empezar mi plan
						</Link>
					</div>

					<div className="relative">
						<div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
							<Image
								src="/images/marialy-2.webp"
								alt="Plan de nutrición personalizado a distancia con Marialy Alonso"
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
