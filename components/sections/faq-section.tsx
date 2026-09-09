"use client";

import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
	{
		question: "¿Cómo funciona el Plan a distancia?",
		answer:
			"Al contratar recibes un documento para llenar con tus datos, objetivos, hábitos de alimentación, rutina, actividad física, horarios, gustos y preferencias. Con esa información elaboro un plan de alimentación 100% personalizado, sin necesidad de consulta presencial ni videollamada.",
	},
	{
		question: "¿Incluye videollamada?",
		answer:
			"No. El Plan a distancia es completamente asíncrono: tú envías tu información por el documento y yo te entrego el plan listo para aplicar en tu día a día.",
	},
	{
		question: "¿Cuánto tarda en llegar mi plan?",
		answer:
			"Una vez que recibo tu documento completo, elaboro y te entrego el plan en aproximadamente 5 a 7 días hábiles.",
	},
	{
		question: "¿Qué diferencia hay entre Plan inicial y Plan de seguimiento?",
		answer:
			"El Plan inicial ($1,200 MXN) es para quienes contratan por primera vez. El Plan de seguimiento ($1,000 MXN) es para actualizar tu plan cuando ya tienes uno previo y quieres ajustes según tus avances u objetivos nuevos.",
	},
	{
		question: "¿Qué incluye el plan?",
		answer:
			"Plan de alimentación personalizado, sistema de equivalencias para variar alimentos, un menú ejemplo, recomendaciones según tus hábitos y objetivos, estrategias para comer fuera de casa y tips prácticos para adaptar el plan a tu rutina.",
	},
	{
		question: "¿Puedo escribirte por WhatsApp después de comprar?",
		answer: (
			<>
				Sí. Puedes enviarme el documento lleno y dudas relacionadas con tu plan
				por{" "}
				<a
					href="https://wa.me/message/BLYZCVYW2MOAJ1"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#DA5F6F] font-medium hover:underline"
				>
					WhatsApp
				</a>{" "}
				o por correo a{" "}
				<a
					href="mailto:marialyalonso@gmail.com"
					className="text-[#DA5F6F] font-medium hover:underline"
				>
					marialyalonso@gmail.com
				</a>
				.
			</>
		),
	},
	{
		question: "¿Trabajas con condiciones médicas específicas?",
		answer:
			"Sí, tengo experiencia en nutrición para condiciones como diabetes, hipertensión y enfermedades autoinmunes. Siempre trabajo en coordinación con tu equipo médico cuando es relevante.",
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
							key={item.question}
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

				<div className="mt-10 text-center">
					<Link
						prefetch={false}
						href="#precios"
						className="inline-flex h-12 items-center justify-center rounded-full bg-[#DA5F6F] px-8 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B]"
					>
						Ver plan a distancia
					</Link>
				</div>
			</div>
		</section>
	);
}
