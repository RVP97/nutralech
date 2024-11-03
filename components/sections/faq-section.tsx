"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        ¡Absolutamente! Puedes contactarme por{" "}
        <a
          href="mailto:dudas@nutralech.com"
          className="text-primary font-medium hover:underline"
        >
          correo electrónico
        </a>{" "}
        o{" "}
        <a
          href="https://wa.me/message/BLYZCVYW2MOAJ1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:underline"
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
      "Soy una nutricionista con un enfoque centrado en la salud y el bienestar, con un enfoque en la nutrición sostenible y el equilibrio entre cuerpo y mente. Mi objetivo es guiarte hacia un estilo de vida más saludable y sostenible, no solo en términos nutricionales, sino también en términos de valores y prácticas. Todo mi trabajo es personalizado para adaptarse a tus necesidades y objetivos específicos.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="py-12 bg-gradient-to-b from-white to-pink-50/50"
    >
      <div className=" px-4 mx-auto">
        <div className="text-center mb-8">
          <span className="text-lg text-[#DA5F6F]">
            ¿Tienes alguna pregunta?
          </span>
          <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
            Preguntas Frecuentes
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre mis servicios
            de nutrición
          </p>
        </div>
        <Card className="w-full max-w-[95%] md:max-w-[85%] mx-auto">
          {/* <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Preguntas Frecuentes
            </CardTitle>
            <CardDescription>
              Encuentra respuestas a las preguntas más comunes sobre nuestros
              servicios de nutrición
            </CardDescription>
          </CardHeader> */}
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
