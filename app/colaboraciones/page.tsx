import Collabs from "@/components/sections/collabs";
import { generatePageMetadata } from "@/lib/generateMetadata";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Colaboraciones con Marialy Alonso",
    description:
      "¿Interesado en colaborar con Nutralech? Impulsa tu marca y alcanza un público objetivo con mi audiencia de más de 780k seguidores en Instagram y TikTok.",
    keywords: [
      "salud, bienestar, colaboraciones, nutrición, consejos, recetas, asesoría, personalizada, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com/colaboraciones",
    },
  });
}

export default function ColaboracionesPage() {
  return <Collabs />;
}
