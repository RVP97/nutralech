import AboutMeComponent from "@/components/sections/about-me";
import FaqSection from "@/components/sections/faq-section";
import GlobalConsultations from "@/components/sections/global-consultations";
import Hero from "@/components/sections/hero";
import PersonalizedAttention from "@/components/sections/personalized-attention";
import PricingSectionComponent from "@/components/sections/pricing-section";
import StickyPlanCta from "@/components/sections/sticky-plan-cta";
import TestimonialsComponent from "@/components/sections/testimonials";
import WhatIOfferComponent from "@/components/sections/what-i-offer";
import Whatsapp from "@/components/sections/whatsapp";
import { generatePageMetadata } from "@/lib/generateMetadata";

export async function generateMetadata() {
	return generatePageMetadata({
		title: "Nutrición y Bienestar con Marialy Alonso: Nutralech",
		description:
			"Plan de alimentación a distancia 100% personalizado con Marialy Alonso. Sin consulta presencial: llena un documento y recibe tu plan adaptado a tu vida.",
		keywords: [
			"salud",
			"bienestar",
			"nutrición",
			"plan a distancia",
			"plan alimenticio personalizado",
			"nutralech",
			"marialy alonso",
			"nutriologa",
		],
		openGraph: {
			url: "https://www.nutralech.com",
		},
	});
}

const faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "¿Cómo funciona el Plan a distancia?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Al contratar recibes un documento para llenar con tus datos, objetivos, hábitos de alimentación, rutina, actividad física, horarios, gustos y preferencias. Con esa información elaboro un plan de alimentación 100% personalizado, sin necesidad de consulta presencial ni videollamada.",
			},
		},
		{
			"@type": "Question",
			name: "¿Incluye videollamada?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "No. El Plan a distancia es completamente asíncrono: tú envías tu información por el documento y yo te entrego el plan listo para aplicar en tu día a día.",
			},
		},
		{
			"@type": "Question",
			name: "¿Cuánto tarda en llegar mi plan?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Una vez que recibo tu documento completo, elaboro y te entrego el plan en aproximadamente 5 a 7 días hábiles.",
			},
		},
		{
			"@type": "Question",
			name: "¿Qué diferencia hay entre Plan inicial y Plan de seguimiento?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "El Plan inicial ($1,200 MXN) es para quienes contratan por primera vez. El Plan de seguimiento ($1,000 MXN) es para actualizar tu plan cuando ya tienes uno previo y quieres ajustes según tus avances u objetivos nuevos.",
			},
		},
		{
			"@type": "Question",
			name: "¿Qué incluye el plan?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Plan de alimentación personalizado, sistema de equivalencias para variar alimentos, un menú ejemplo, recomendaciones según tus hábitos y objetivos, estrategias para comer fuera de casa y tips prácticos para adaptar el plan a tu rutina.",
			},
		},
		{
			"@type": "Question",
			name: "¿Puedo escribirte por WhatsApp después de comprar?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sí. Puedes enviarme el documento lleno y dudas relacionadas con tu plan por WhatsApp o por correo a marialyalonso@gmail.com.",
			},
		},
		{
			"@type": "Question",
			name: "¿Trabajas con condiciones médicas específicas?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sí, tengo experiencia en nutrición para condiciones como diabetes, hipertensión y enfermedades autoinmunes. Siempre trabajo en coordinación con tu equipo médico cuando es relevante.",
			},
		},
	],
};

export default function Home() {
	return (
		<div>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<Hero />
			<WhatIOfferComponent />
			<PricingSectionComponent />
			<TestimonialsComponent />
			<PersonalizedAttention />
			<Whatsapp />
			<AboutMeComponent />
			<GlobalConsultations />
			<FaqSection />
			<StickyPlanCta />
		</div>
	);
}
