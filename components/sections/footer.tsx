import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  title: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterData {
  sections: FooterSection[];
  copyright: string;
}

const footerData: FooterData = {
  sections: [
    {
      title: "INFORMACIÓN",
      links: [
        { title: "SOBRE NOSOTROS", url: "/about" },
        { title: "UBICACIÓN", url: "/location" },
        { title: "PREGUNTAS FRECUENTES", url: "/faq" },
        { title: "CONTACTO", url: "/contact" },
      ],
    },
    {
      title: "HABITACIONES",
      links: [
        { title: "HABITACIÓN ESTÁNDAR", url: "/rooms/standard" },
        { title: "HABITACIÓN SUPERIOR", url: "/rooms/superior" },
        { title: "SUITE JUNIOR", url: "/rooms/junior-suite" },
        { title: "SUITE MASTER", url: "/rooms/master-suite" },
      ],
    },
    {
      title: "SERVICIOS",
      links: [
        { title: "RESTAURANTE", url: "/services/restaurant" },
        { title: "EVENTOS", url: "/services/events" },
        { title: "BUSINESS CENTER", url: "/services/business" },
        { title: "ESTACIONAMIENTO", url: "/services/parking" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { title: "TÉRMINOS Y CONDICIONES", url: "/legal/terms" },
        { title: "POLÍTICA DE PRIVACIDAD", url: "/legal/privacy" },
        { title: "POLÍTICA DE COOKIES", url: "/legal/cookies" },
        { title: "AVISO LEGAL", url: "/legal/notice" },
      ],
    },
  ],
  copyright: "© [YEAR] Hotel Catedral. Todos los derechos reservados.",
};

export default function Footer() {
  return (
    <footer className="bg-[#DA5F6F] text-slate-900 py-12 px-4 md:px-6 tracking-wider">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <svg viewBox="0 0 49 34" className="w-12 h-12 mb-4">
            <path
              d="M 4.071 11.084 C 4.071 11.084 2.168 26.266 18.051 26.266 C 18.051 26.266 22.01 11.084 4.071 11.084 Z"
              fill="#FF756D"
            />
            <path
              d="M 44.429 4.722 C 22.823 4.722 20.824 18.311 21.221 25.288 C 24.871 14.76 34.822 12.436 34.822 12.436 C 25.322 18.179 23.374 28.546 23.247 29.278 C 47.374 28.347 44.429 4.722 44.429 4.722 Z"
              fill="#FF756D"
            />
          </svg>
          <div className="text-2xl font-serif tracking-widest">NUTRALECH</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerData.sections.map((section, index) => (
            <div key={index}>
              <div className="text-xs font-serif italic mb-4 tracking-widest text-slate-900">
                {section.title}
              </div>
              <ul className="space-y-2 tracking-widest">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      prefetch={false}
                      href={link.url}
                      className="hover:underline text-[10px] text-slate-800 hover:text-slate-950"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800/30 pt-8">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <Link
                prefetch={false}
                href="https://www.facebook.com/HotelCatedralMX/"
                className="text-slate-800 hover:text-slate-950"
              >
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                prefetch={false}
                href="https://www.instagram.com/hotelcatedralcdmx/"
                className="text-slate-800 hover:text-slate-950"
              >
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
            <p className="text-[10px] tracking-widest text-slate-800">
              {footerData.copyright.replace(
                "[YEAR]",
                new Date().getFullYear().toString()
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
