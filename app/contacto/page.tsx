import ContactPageComponent from "@/components/sections/contact-page";
import { generatePageMetadata } from "@/lib/generateMetadata";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Contacta a Marialy Alonso",
    description:
      "Contacta a Marialy Alonso, mejor conocida como Nutralech, para asesoría nutricional personalizada y consejos para un bienestar equilibrado y sostenible.",
    keywords: [
      "salud, bienestar, contacto, nutrición, consejos, recetas, asesoría, personalizada, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/contacto",
    },
  });
}

export default function ContactPage() {
  return <ContactPageComponent />;
}
