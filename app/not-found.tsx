import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container min-h-[80vh] px-6 pt-24 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-medium text-[#DA5F6F] dark:text-[#DA5F6F]">
            Error 404
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Hemos perdido esta página
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Lo sentimos, la página que buscas no existe.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link
              href="/#precios"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>Agendar Consulta</span>
            </Link>

            <Link
              href="/"
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-[#DA5F6F] rounded-lg shrink-0 sm:w-auto hover:bg-[#DA5F6F]/90 dark:hover:bg-[#DA5F6F]/90 dark:bg-[#DA5F6F]"
            >
              Ir al inicio
            </Link>
          </div>

          <div className="mt-10 space-y-6">
            <div>
              <Link
                href="/#precios"
                className="inline-flex items-center text-sm text-[#DA5F6F] gap-x-2 dark:text-[#DA5F6F] hover:underline"
              >
                <span>Planes de Alimentación</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Descubre todos los planes de alimentación disponibles.
              </p>
            </div>

            <div>
              <Link
                href="/acerca-de-mi"
                className="inline-flex items-center text-sm text-[#DA5F6F] gap-x-2 dark:text-[#DA5F6F] hover:underline"
              >
                <span>Acerca de Marialy</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Conoce más sobre mi y mi enfoque en la nutrición.
              </p>
            </div>

            <div>
              <Link
                href="/contacto"
                className="inline-flex items-center text-sm text-[#DA5F6F] gap-x-2 dark:text-[#DA5F6F] hover:underline"
              >
                <span>Habla conmigo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Estoy aquí para ayudarte con cualquier consulta o duda.
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <Image
            src="/images/marialy.webp"
            alt="404 No Encontrado"
            width={2070}
            height={1380}
            className="w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
