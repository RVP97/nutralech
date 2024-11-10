import { Posts } from "@/components/sections/blog-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { getPosts } from "@/lib/posts";
import Link from "next/link";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Blog de Nutrición por Marialy Alonso",
    description:
      "Artículos sobre nutrición, salud y bienestar basados en estudios científicos y experiencias prácticas de Marialy Alonso.",
    keywords: [
      "blog, nutrición, salud, bienestar, consejos, recetas, nutralech, marialy alonso",
    ],
    openGraph: {
      url: "https://www.nutralech.com/blog",
    },
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-20">
      <div className=" mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Blog de Nutrición
          </Badge>
          <h1 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
            Blog de Nutrición y Salud por Marialy Alonso
          </h1>
          <p className="mt-4 tx-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre consejos profesionales sobre nutrición, salud y bienestar.
            Artículos escritos por una nutricionista experta.
          </p>
        </div>
        <Posts posts={posts} />
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-medium mb-4">
            ¿Necesitas ayuda personalizada?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mi blog es un gran punto de partida, pero para un plan nutricional
            completamente adaptado a tus necesidades, considera una consulta
            personalizada.
          </p>
          <Link href="/#precios">
            <Button
              size="lg"
              className="bg-[#DA5F6F] hover:bg-[#DA5F6F]/90 text-white transition-colors duration-300"
            >
              Agenda una Consulta
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
