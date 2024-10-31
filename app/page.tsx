import AboutMeComponent from "@/components/sections/about-me";
import Hero from "@/components/sections/hero";
import PersonalizedAttention from "@/components/sections/personalized-attention";
import PricingSectionComponent from "@/components/sections/pricing-section";
import TestimonialsComponent from "@/components/sections/testimonials";
import WhatIOfferComponent from "@/components/sections/what-i-offer";
import Whatsapp from "@/components/sections/whatsapp";

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
    </div>
  );
}
