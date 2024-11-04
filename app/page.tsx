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
      "salud, bienestar, nutrición, consejos, recetas, asesoría, personalizada, nutralech, marialy alonso, nutriologa",
    ],
    openGraph: {
      url: "https://www.nutralech.com",
    },
  });
}

export default function Home() {
  return (
    <div>
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
