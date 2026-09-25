"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Clock,
	MessageCircle,
	MousePointerClick,
	ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { IPhone } from "@/components/whatsapp-demo/iphone";
import { WhatsAppDemo } from "@/components/whatsapp-demo/whatsapp-demo";

const features = [
	{
		icon: MessageCircle,
		title: "Comunicación Directa",
		description:
			"Estoy siempre disponible para responder tus preguntas y brindarte apoyo personalizado a través de nuestra plataforma de mensajería segura.",
	},
	{
		icon: Clock,
		title: "Respuestas Rápidas",
		description:
			"Me comprometo a responder a tus mensajes en un plazo máximo de 24 horas, asegurando que recibas la atención que necesitas de manera oportuna.",
	},
	{
		icon: ThumbsUp,
		title: "Seguimiento Personalizado",
		description:
			"Adapto mi enfoque a tus necesidades individuales, ofreciendo consejos y ajustes personalizados a tu plan nutricional según tu progreso.",
	},
];

export default function PersonalizedCommunicationSection() {
	const [engaged, setEngaged] = useState(false);

	return (
		<section className="overflow-hidden bg-[oklch(97.5%_0.008_12)] py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-14 max-w-2xl">
					<p className="text-sm font-medium uppercase tracking-wide text-[#DA5F6F]">
						Acceso directo
					</p>
					<h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
						Comunicación personalizada
					</h2>
				</div>

				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className="space-y-8">
						<p className="text-lg leading-relaxed text-[oklch(45%_0.01_12)]">
							Estoy disponible para responder tus preguntas y apoyarte con
							ajustes a tu plan. Respuestas en un plazo máximo de 24 horas,
							adaptadas a tu progreso.
						</p>
						<div className="space-y-5">
							{features.map((feature) => (
								<div key={feature.title} className="flex items-start gap-4">
									<div className="mt-0.5 shrink-0">
										<feature.icon className="h-5 w-5 text-[#DA5F6F]" />
									</div>
									<div>
										<h3 className="text-base font-medium text-[oklch(22%_0.005_12)]">
											{feature.title}
										</h3>
										<p className="mt-1 text-sm text-[oklch(50%_0.01_12)]">
											{feature.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="relative mx-auto w-full max-w-[360px]">
						<div
							aria-hidden
							className="pointer-events-none absolute -inset-x-16 top-1/4 bottom-1/4 -z-0 rounded-full bg-[radial-gradient(closest-side,rgba(218,95,111,0.18),transparent)] blur-2xl"
						/>
						<IPhone maxScale={0.82}>
							<WhatsAppDemo onEngage={() => setEngaged(true)} />
						</IPhone>
						<div className="mt-6 flex h-6 justify-center">
							<AnimatePresence>
								{!engaged && (
									<motion.p
										initial={{ opacity: 0, y: 4 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -4 }}
										className="flex items-center gap-2 text-sm text-[oklch(45%_0.01_12)]"
									>
										<MousePointerClick className="h-4 w-4 text-[#DA5F6F]" />
										Es interactivo: abre el chat y escríbele a Marialy
									</motion.p>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
