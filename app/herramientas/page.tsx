import AppToolsPage from "@/components/sections/app-tools-page";
import { generatePageMetadata } from "@/lib/generateMetadata";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Herramientas de Nutrición",
    description:
      "Descubre mis herramientas de nutrición gratuitas diseñadas para ayudarte en tu viaje hacia una vida más saludable.",
    keywords: [
      "salud, bienestar, calculadora, imc, nutrición, consejos, recetas, asesoría, personalizada, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/herramientas",
    },
  });
}

export default function AppTools() {
  return <AppToolsPage />;
}
