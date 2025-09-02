import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-background to-[#ffe5e5] pt-16 pb-8 px-4 relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo Section */}
          <div className="flex items-start">
            <Link
              prefetch={false}
              href="/"
              className="group flex items-center space-x-2"
            >
              <svg
                viewBox="0 0 49 34"
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  d="M 4.071 11.084 C 4.071 11.084 2.168 26.266 18.051 26.266 C 18.051 26.266 22.01 11.084 4.071 11.084 Z"
                  fill="#FF756D"
                />
                <path
                  d="M 44.429 4.722 C 22.823 4.722 20.824 18.311 21.221 25.288 C 24.871 14.76 34.822 12.436 34.822 12.436 C 25.322 18.179 23.374 28.546 23.247 29.278 C 47.374 28.347 44.429 4.722 44.429 4.722 Z"
                  fill="#FF756D"
                />
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF756D] to-[#FF9B9B] bg-clip-text text-transparent">
                Nutralech
              </span>
            </Link>
          </div>

          {/* Mis Links Section */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Mis Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                prefetch={false}
                href="/"
                className="text-muted-foreground hover:text-[#FF756D] transition-colors"
              >
                Inicio
              </Link>
              <Link
                prefetch={false}
                href="/contacto"
                className="text-muted-foreground hover:text-[#FF756D] transition-colors"
              >
                Contacto
              </Link>
              <Link
                prefetch={false}
                href="/#precios"
                className="text-muted-foreground hover:text-[#FF756D] transition-colors"
              >
                Planes
              </Link>
            </nav>
          </div>

          {/* Ubicación Section */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Ubicación</h3>
            <div className="flex flex-col space-y-3 text-muted-foreground">
              <p>Ciudad de México</p>
              <p>Consultas para todo el mundo</p>
            </div>
          </div>

          {/* Contáctame Section */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Contáctame</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Link
                  prefetch={false}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/message/BLYZCVYW2MOAJ1"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-[#FF756D] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 175.216 175.552"
                    className="h-6 w-6"
                  >
                    <defs>
                      <linearGradient
                        id="b"
                        x1="85.915"
                        x2="86.535"
                        y1="32.567"
                        y2="137.092"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#57d163" />
                        <stop offset="1" stopColor="#23b33a" />
                      </linearGradient>
                      <filter
                        id="a"
                        width="1.115"
                        height="1.114"
                        x="-.057"
                        y="-.057"
                        colorInterpolationFilters="sRGB"
                      >
                        <feGaussianBlur stdDeviation="3.531" />
                      </filter>
                    </defs>
                    <path
                      fill="#b3b3b3"
                      d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
                      filter="url(#a)"
                    />
                    <path
                      fill="#fff"
                      d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
                    />
                    <path
                      fill="url(#b)"
                      d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
                    />
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
                    />
                  </svg>
                  <span>+52 744 346 8252</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Link
                  prefetch={false}
                  href="mailto:contacto@nutralech.com"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-[#FF756D] transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>contacto@nutralech.com</span>
                </Link>
              </div>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-[#FF756D] to-[#FF9B9B] text-white hover:from-[#FF9B9B] hover:to-[#FF756D] transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
            >
              <Link prefetch={false} href="/contacto">
                Contáctame
              </Link>
            </Button>
            <div className="mt-6 flex space-x-4">
              <Link
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/nutralech/"
                className="text-muted-foreground hover:text-[#FF756D] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@nutralech"
                className="text-muted-foreground hover:text-[#FF756D] transition-colors"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </Link>
              <Link
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/nutralech/"
                className="text-muted-foreground hover:text-[#FF756D] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/@Nutralech"
                className="text-muted-foreground hover:text-[#FF756D] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-[#FFCACA] pt-8 text-center text-sm text-muted-foreground">
          Nutralech © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
