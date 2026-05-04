"use client";

import { Check, ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WhatIOfferComponent() {
	const specialties = [
		"Relación con la Comida",
		"Síndrome de Ovario Poliquístico",
		"Aprende a Comer Bien",
		"Pérdida de Grasa",
		"Aumento de Masa Muscular",
		"Mejora de Rendimiento",
		"Mejora de Salud Hormonal",
		"Resistencia a la Insulina",
	];

	const services = [
		{
			title: "Consultas en línea",
			description: "Sesiones de 60 minutos por videollamada, desde donde estés.",
			href: "#precios" as Route,
		},
		{
			title: "Planes a distancia",
			description: "Evaluación, plan alimenticio y recomendaciones sin videollamada.",
			href: "#precios" as Route,
		},
		{
			title: "Consejos en Instagram",
			description: "Recetas, tips y contenido gratuito todas las semanas.",
			href: "https://www.instagram.com/nutralech/" as Route,
			external: true,
		},
		{
			title: "Blog de nutrición",
			description: "Artículos sobre alimentación, hábitos y bienestar.",
			href: "/blog" as Route,
		},
	];

	return (
		<section className="py-24 bg-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
					<div>
						<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F]">
							Lo que ofrezco
						</p>
						<h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
							Planes alimenticios personalizados
						</h2>
						<p className="mt-6 text-lg leading-relaxed text-[oklch(45%_0.01_12)] max-w-xl">
							Mis ofertas consisten en servicios de asesoría nutricional de
							alta calidad, personalizados según tus necesidades únicas. Mi
							enfoque integral se fundamenta en el conocimiento científico y
							la práctica basada en evidencia.
						</p>

						<div className="mt-10 space-y-1">
							{services.map((service) => (
								<Link
									key={service.title}
									prefetch={false}
									href={service.href}
									target={service.external ? "_blank" : undefined}
									className="group flex items-center justify-between rounded-xl px-5 py-4 transition-colors duration-200 hover:bg-[oklch(97%_0.008_12)]"
								>
									<div>
										<h3 className="text-base font-medium text-[oklch(22%_0.005_12)]">
											{service.title}
										</h3>
										<p className="mt-0.5 text-sm text-[oklch(50%_0.01_12)]">
											{service.description}
										</p>
									</div>
									<ArrowRight className="h-4 w-4 shrink-0 text-[oklch(70%_0.01_12)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#DA5F6F]" />
								</Link>
							))}
						</div>
					</div>

					<div className="rounded-2xl bg-[oklch(97.5%_0.008_12)] p-8 lg:p-10">
						<h3 className="font-serif text-2xl font-medium text-[oklch(22%_0.005_12)]">
							Áreas de enfoque
						</h3>
						<p className="mt-3 text-sm leading-relaxed text-[oklch(50%_0.01_12)]">
							Cada plan se adapta a tu situación. Estas son algunas de las
							áreas donde puedo ayudarte.
						</p>

						<ul className="mt-8 space-y-4">
							{specialties.map((specialty) => (
								<li key={specialty} className="flex items-center gap-3">
									<Check className="h-4 w-4 shrink-0 text-[#DA5F6F]" />
									<span className="text-[15px] text-[oklch(30%_0.005_12)]">
										{specialty}
									</span>
								</li>
							))}
						</ul>

						<div className="mt-10">
							<Link prefetch={false} href="#precios">
								<Button className="rounded-full bg-[#DA5F6F] hover:bg-[#C54B5B] text-white px-8 h-12">
									Ver planes y precios
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
