import AboutMeComponent from "@/components/sections/about-me";
import FaqSection from "@/components/sections/faq-section";
import GlobalConsultations from "@/components/sections/global-consultations";
import Hero from "@/components/sections/hero";
import PersonalizedAttention from "@/components/sections/personalized-attention";
import PricingSectionComponent from "@/components/sections/pricing-section";
import TestimonialsComponent from "@/components/sections/testimonials";
import WhatIOfferComponent from "@/components/sections/what-i-offer";
import Whatsapp from "@/components/sections/whatsapp";
import { generatePageMetadata } from "@/lib/generateMetadata";

export async function generateMetadata() {
	return generatePageMetadata({
		title: "Nutrición y Bienestar con Marialy Alonso: Nutralech",
		description:
			"Mejora tu salud con Nutralech y Marialy Alonso. Asesoría nutricional personalizada, recetas y consejos para un bienestar equilibrado y sostenible.",
		keywords: [
			"salud",
			"bienestar",
			"nutrición",
			"consejos",
			"recetas",
			"asesoría",
			"personalizada",
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
			name: "¿Cómo funciona la consulta nutricional inicial?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "La consulta inicial es una sesión de 60 minutos donde evaluamos tu historial médico, hábitos alimenticios y objetivos de salud. Desarrollamos un plan nutricional personalizado basado en esta información.",
			},
		},
		{
			"@type": "Question",
			name: "¿Con qué frecuencia debo tener sesiones de seguimiento?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Recomendamos sesiones de seguimiento cada 2-4 semanas, dependiendo de tus objetivos y progreso. Estas sesiones nos permiten ajustar tu plan según sea necesario.",
			},
		},
		{
			"@type": "Question",
			name: "¿Puedo contactarte entre sesiones si tengo preguntas?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "¡Absolutamente! Puedes contactarme por correo electrónico o WhatsApp entre sesiones para preguntas rápidas. Para consultas más extensas, podemos programar una mini-sesión.",
			},
		},
		{
			"@type": "Question",
			name: "¿Trabajas con condiciones médicas específicas?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sí, tengo experiencia en nutrición para diversas condiciones médicas como diabetes, hipertensión, y enfermedades autoinmunes. Siempre trabajo en coordinación con tu equipo médico.",
			},
		},
		{
			"@type": "Question",
			name: "¿Ofreces planes de comidas y recetas?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sí, proporciono planes de comidas personalizados y una selección de recetas adaptadas a tus preferencias y necesidades nutricionales como parte de tu plan.",
			},
		},
		{
			"@type": "Question",
			name: "¿En qué eres diferente a otras nutricionistas?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Soy una nutricionista con un enfoque centrado en la salud y el bienestar, con un enfoque en la nutrición sostenible y el equilibrio entre cuerpo y mente. Mi objetivo es guiarte hacia un estilo de vida más saludable y sostenible, no solo en términos nutricionales, sino también en términos de valores y prácticas. Todo mi trabajo es personalizado para adaptarse a tus necesidades y objetivos específicos.",
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
			<TestimonialsComponent />
			<PersonalizedAttention />
			<Whatsapp />
			<PricingSectionComponent />
			<AboutMeComponent />
			<GlobalConsultations />
			<FaqSection />
		</div>
	);
}
