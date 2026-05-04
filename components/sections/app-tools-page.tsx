import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import allTools from "@/app/herramientas/herramientas.json";

const categories = ["Nutrición", "Mediciones", "Entrenamiento"] as const;

const toolsByCategory = categories.map((cat) => ({
	name: cat,
	tools: allTools.filter((t) => t.category === cat),
}));

export default function AppToolsPage() {
	return (
		<section className="py-28 bg-[oklch(99%_0.005_12)]">
			<div className="mx-auto max-w-4xl px-4 sm:px-6">
				{/* Header */}
				<div className="mb-16">
					<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F] mb-3">
						Herramientas gratuitas
					</p>
					<h1 className="font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
						Calculadoras de nutrición
					</h1>
					<p className="mt-4 text-base leading-relaxed text-[oklch(50%_0.01_12)] max-w-xl">
						Estimaciones rápidas para calorías, macros, hidratación y más.
						Para un plan personalizado, agenda una consulta.
					</p>
				</div>

				{/* Grouped tools */}
				<div className="space-y-12">
					{toolsByCategory.map((group) => (
						<div key={group.name}>
							<h2 className="text-xs font-medium tracking-wide uppercase text-[oklch(55%_0.005_12)] mb-4">
								{group.name}
							</h2>
							<div className="divide-y divide-[oklch(94%_0.005_12)] rounded-xl border border-[oklch(92%_0.005_12)] bg-white">
								{group.tools.map((tool) => (
									<Link
										key={tool.title}
										href={tool.link as Route}
										className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl hover:bg-[oklch(98%_0.01_12)]"
									>
										<div className="min-w-0">
											<h3 className="text-sm font-medium text-[oklch(18%_0.005_12)] group-hover:text-[#DA5F6F] transition-colors duration-150">
												{tool.title}
											</h3>
											<p className="mt-0.5 text-sm text-[oklch(55%_0.01_12)] truncate">
												{tool.description}
											</p>
										</div>
										<ArrowRight className="h-4 w-4 shrink-0 text-[oklch(78%_0.005_12)] transition-all duration-150 group-hover:text-[#DA5F6F] group-hover:translate-x-0.5" />
									</Link>
								))}
							</div>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className="mt-16 rounded-2xl bg-[oklch(96.5%_0.01_12)] p-8 sm:p-10">
					<h2 className="font-serif text-xl font-medium text-[oklch(18%_0.005_12)]">
						Necesitas un plan personalizado?
					</h2>
					<p className="mt-2 text-sm leading-relaxed text-[oklch(50%_0.01_12)] max-w-lg">
						Las calculadoras dan estimaciones generales. Para recomendaciones
						adaptadas a tu cuerpo, objetivos y condiciones, una consulta es el
						siguiente paso.
					</p>
					<Link
						href="/#precios"
						className="mt-6 inline-flex h-11 items-center rounded-full bg-[#DA5F6F] px-7 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B]"
					>
						Ver planes de consulta
					</Link>
				</div>
			</div>
		</section>
	);
}
