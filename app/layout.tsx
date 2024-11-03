import Navbar from "@/components/sections/navbar";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://www.nutralech.com"),
    title: {
      default: "Nutralech: Marialy Alonso",
      template: "%s | Nutralech",
    },
    description:
      "Descubre la excelencia culinaria y eventos excepcionales con Grupo Cassatt en la Ciudad de México.",
    keywords:
      "restaurantes, eventos, gastronomía, Ciudad de México, experiencias culinarias",
    applicationName: "Grupo Cassatt",
    authors: [{ name: "Grupo Cassatt" }],
    creator: "Grupo Cassatt",
    publisher: "Grupo Cassatt",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "es_MX",
      url: "https://www.cassatt.mx/",
      siteName: "Grupo Cassatt",
      title: "Grupo Cassatt - Restaurantes y Eventos en la Ciudad de México",
      description:
        "Experimenta la mejor gastronomía y eventos inolvidables con Grupo Cassatt en la Ciudad de México.",
      images: [
        {
          url: "/assets/images/platillos/pescado.webp",
          width: 1200,
          height: 630,
          alt: "Platillo de pescado de Grupo Cassatt",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@grupocassatt",
      creator: "@grupocassatt",
      title: "Grupo Cassatt - Restaurantes y Eventos en la Ciudad de México",
      description:
        "Experimenta la mejor gastronomía y eventos inolvidables con Grupo Cassatt en la Ciudad de México.",
      images: "/assets/images/platillos/pescado.webp",
    },
    icons: {
      icon: [
        { url: "/icons/favicon.ico", sizes: "any" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        {
          url: "/icons/android-icon-36x36.png",
          sizes: "36x36",
          type: "image/png",
        },
        {
          url: "/icons/android-icon-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          url: "/icons/android-icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          url: "/icons/android-icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          url: "/icons/android-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          url: "/icons/android-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/icons/apple-icon-57x57.png",
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-76x76.png",
          sizes: "76x76",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-114x114.png",
          sizes: "114x114",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-120x120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          url: "/icons/apple-icon-precomposed.png",
          sizes: "180x180",
          type: "image/png",
        },
        { url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        { rel: "icon", url: "/icons/ms-icon-70x70.png", sizes: "70x70" },
        { rel: "icon", url: "/icons/ms-icon-144x144.png", sizes: "144x144" },
        { rel: "icon", url: "/icons/ms-icon-150x150.png", sizes: "150x150" },
        { rel: "icon", url: "/icons/ms-icon-310x310.png", sizes: "310x310" },
      ],
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Food & Drink",
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* <GoogleTagManager gtmId="GTM-WQGRBVZW" /> */}
      <body
        className={`${inter.className} mt-8 md:mt-16 flex flex-col min-h-screen`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
