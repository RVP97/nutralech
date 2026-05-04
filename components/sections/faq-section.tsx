"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
	{
		question: "¿Cómo funciona la consulta nutricional inicial?",
		answer:
			"La consulta inicial es una sesión de 60 minutos donde evaluamos tu historial médico, hábitos alimenticios y objetivos de salud. Desarrollamos un plan nutricional personalizado basado en esta información.",
	},
	{
		question: "¿Con qué frecuencia debo tener sesiones de seguimiento?",
		answer:
			"Recomendamos sesiones de seguimiento cada 2-4 semanas, dependiendo de tus objetivos y progreso. Estas sesiones nos permiten ajustar tu plan según sea necesario.",
	},
	{
		question: "¿Puedo contactarte entre sesiones si tengo preguntas?",
		answer: (
			<>
				Puedes contactarme por{" "}
				<a
					href="mailto:dudas@nutralech.com"
					className="text-[#DA5F6F] font-medium hover:underline"
				>
					correo electrónico
				</a>{" "}
				o{" "}
				<a
					href="https://wa.me/message/BLYZCVYW2MOAJ1"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#DA5F6F] font-medium hover:underline"
				>
					WhatsApp
				</a>{" "}
				entre sesiones para preguntas rápidas. Para consultas más extensas,
				podemos programar una mini-sesión.
			</>
		),
	},
	{
		question: "¿Trabajas con condiciones médicas específicas?",
		answer:
			"Sí, tengo experiencia en nutrición para diversas condiciones médicas como diabetes, hipertensión, y enfermedades autoinmunes. Siempre trabajo en coordinación con tu equipo médico.",
	},
	{
		question: "¿Ofreces planes de comidas y recetas?",
		answer:
			"Sí, proporciono planes de comidas personalizados y una selección de recetas adaptadas a tus preferencias y necesidades nutricionales como parte de tu plan.",
	},
	{
		question: "¿En qué eres diferente a otras nutricionistas?",
		answer:
			"Mi enfoque se centra en la nutrición sostenible y el equilibrio entre cuerpo y mente. Todo mi trabajo es personalizado para adaptarse a tus necesidades y objetivos específicos, y siempre coordino con tu equipo médico cuando es relevante.",
	},
];

export default function FaqSection() {
	return (
		<section id="faq" className="py-24 bg-[oklch(97.5%_0.008_12)]">
			<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F]">
						Preguntas frecuentes
					</p>
					<h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl">
						¿Tienes alguna pregunta?
					</h2>
				</div>

				<Accordion type="single" collapsible className="w-full space-y-2">
					{faqItems.map((item, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="rounded-xl bg-white px-6 border-none"
						>
							<AccordionTrigger className="text-left text-[15px] font-medium text-[oklch(22%_0.005_12)] hover:no-underline py-5">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="text-sm leading-relaxed text-[oklch(45%_0.01_12)] pb-5">
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
