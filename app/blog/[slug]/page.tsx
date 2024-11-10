import { FloatingShareButton } from "@/components/sections/floating-share-button";
import { ReadingProgress } from "@/components/sections/reading-progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { getPost, getPosts } from "@/lib/posts";
import { useMDXComponents } from "@/mdx-components";
import { Calendar, CalendarIcon, TagIcon, UserIcon } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const post = await getPost(slug);
    return generatePageMetadata({
      title: `${post.title} | Blog Nutralech`,
      description: post.seoDescription || post.title,
      keywords: ["blog", "nutrición", ...(post.categories || [])],
      openGraph: {
        url: `https://www.nutralech.com/blog/${slug}`,
      },
    });
  } catch {
    return generatePageMetadata({
      title: "Post no encontrado | Blog Nutralech",
      description: "El artículo que buscas no existe",
      keywords: ["blog", "nutrición"],
      openGraph: {
        url: "https://www.nutralech.com/blog",
      },
    });
  }
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const post = await getPost(slug);
    const formattedDate = new Date(post.publishDate).toLocaleDateString(
      "es-MX",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    return (
      <div className="">
        <ReadingProgress />
        <article
          id="blog-post"
          className="max-w-[95%] min-w-[95%] md:max-w-[85%] md:min-w-[85%] lg:max-w-[80%] lg:min-w-[80%] pt-24 pb-12 mx-auto"
        >
          <Card className="border-none shadow-none bg-gradient-to-b from-[#ffe5e5] to-background">
            <CardHeader className="pt-12 pb-4 space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-xl text-gray-800">{post.excerpt}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/images/marialy.webp" alt="Nutralech" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Nutralech</p>
                  <div className="flex items-center text-sm text-gray-800">
                    <CalendarIcon className="mr-1 h-3 w-3" aria-hidden="true" />
                    <time dateTime={post.publishDate}>{formattedDate}</time>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      <TagIcon className="mr-1 h-3 w-3" aria-hidden="true" />
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <div className="px-4 prose prose-lg max-w-none">
            {post.content && (
              <MDXRemote
                source={post.content}
                components={useMDXComponents({})}
              />
            )}
          </div>
          <FloatingShareButton
            url={`https://www.nutralech.com/blog/${slug}`}
            title={post.title}
          />
        </article>
        <div className="mt-12 bg-gradient-to-r from-[#DA5F6F] to-[#DA5F6F]/80  shadow-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">¿Listo para mejorar tu salud?</span>
              <span className="block text-gray-100">
                Agenda una consulta personalizada hoy.
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link prefetch={false} href="/#precios">
                  <Button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#DA5F6F] bg-white hover:bg-gray-50">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Consulta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
