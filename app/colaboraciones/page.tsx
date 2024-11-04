import Collabs from "@/components/sections/collabs";
import { generatePageMetadata } from "@/lib/generateMetadata";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Colaboraciones con Marialy Alonso",
    description:
      "¿Interesado en colaborar con Nutralech? Trabajos realizados en eventos y con diferentes marcas para mejorar tu salud y bienestar.",
    keywords: [
      "salud, bienestar, colaboraciones, nutrición, consejos, recetas, asesoría, personalizada, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/contacto",
    },
  });
}

export default function ColaboracionesPage() {
  return <Collabs />;
}
