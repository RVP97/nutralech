import { Metadata } from "next";

export interface MetadataParams {
  title: string;
  description: string;
  keywords: string[]; // This remains as an array
  openGraph: {
    url: string;
  };
}

export function generatePageMetadata(params: MetadataParams): Metadata {
  return {
    title: params.title,
    description: params.description,
    keywords: params.keywords,
    openGraph: {
      title: params.title,
      type: "website",
      siteName: "Nutralech: Marialy Alonso",
      url: params.openGraph.url,
      locale: "es-MX",
      description: params.description,
      images: [
        {
          url: "/images/marialy.webp",
          width: 1200,
          height: 630,
          alt: "Foto de frente en blanco y negro de Marialy Alonso",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images: "/images/marialy.webp",
    },
    alternates: {
      canonical: params.openGraph.url,
    },
  };
}
