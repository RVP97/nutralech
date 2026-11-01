/** Home page FAQ: shown in the accordion and as FAQPage structured data. */
export const FAQ: { question: string; answer: string; html?: string }[] = [
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
		answer:
			"Sí. Puedes enviarme el documento lleno y dudas relacionadas con tu plan por WhatsApp o por correo a marialyalonso@gmail.com.",
		html: 'Sí. Puedes enviarme el documento lleno y dudas relacionadas con tu plan por <a href="https://wa.me/message/BLYZCVYW2MOAJ1" target="_blank" rel="noopener noreferrer" class="text-[#B5404F] font-medium hover:underline">WhatsApp</a> o por correo a <a href="mailto:marialyalonso@gmail.com" class="text-[#B5404F] font-medium hover:underline">marialyalonso@gmail.com</a>.',
	},
	{
		question: "¿Trabajas con condiciones médicas específicas?",
		answer:
			"Sí, tengo experiencia en nutrición para condiciones como diabetes, hipertensión y enfermedades autoinmunes. Siempre trabajo en coordinación con tu equipo médico cuando es relevante.",
	},
];

export const FAQ_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: FAQ.map((item) => ({
		"@type": "Question",
		name: item.question,
		acceptedAnswer: { "@type": "Answer", text: item.answer },
	})),
};
