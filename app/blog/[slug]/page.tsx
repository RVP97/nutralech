import { FloatingShareButton } from "@/components/sections/floating-share-button";
import { ReadingProgress } from "@/components/sections/reading-progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { getPost, getPosts } from "@/lib/posts";
import { Calendar, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
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
      title: `${post.title}`,
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
    const formattedDate = (() => {
      const [day, month, year] = post.publishDate.split("/");
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      ).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    })();

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
                    <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
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
                      <Tag className="mr-1 h-3 w-3" aria-hidden="true" />
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
                components={{
                  // Headings
                  h1: ({ children, ...props }) => (
                    <h1
                      {...props}
                      className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 mt-8 text-gray-800"
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children, ...props }) => (
                    <h2
                      {...props}
                      className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 mt-8"
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }) => (
                    <h3
                      {...props}
                      className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 mt-6"
                    >
                      {children}
                    </h3>
                  ),
                  // Text elements
                  p: ({ children, ...props }) => (
                    <div
                      {...props}
                      className="text-gray-700 leading-relaxed mb-6"
                    >
                      {children}
                    </div>
                  ),
                  strong: ({ children, ...props }) => (
                    <strong {...props} className="font-bold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children, ...props }) => (
                    <em {...props} className="italic text-gray-800">
                      {children}
                    </em>
                  ),
                  // Lists
                  ul: ({ children, ...props }) => (
                    <ul {...props} className="list-disc pl-6 mb-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol
                      {...props}
                      className="list-decimal list-inside mb-6 space-y-2 pl-4"
                    >
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li
                      {...props}
                      className="text-gray-700 marker:text-gray-500"
                    >
                      {children}
                    </li>
                  ),
                  // Links and media
                  a: ({ children, href, ...props }) => (
                    <Link
                      href={href ?? "#"}
                      prefetch={false}
                      {...props}
                      className="text-[#DA5F6F] hover:text-[#C54B5B] underline underline-offset-2 transition-colors duration-200"
                    >
                      {children}
                    </Link>
                  ),
                  img: ({ src, alt, ...props }) => (
                    <div className="my-6">
                      <Image
                        {...props}
                        src={src ?? ""}
                        alt={alt ?? ""}
                        width={800}
                        height={400}
                        className="rounded-lg shadow-md mx-auto"
                      />
                    </div>
                  ),
                  // Code blocks
                  code: ({ children, ...props }) => (
                    <code
                      {...props}
                      className="bg-gray-100 text-[#DA5F6F] rounded px-1.5 py-0.5 font-mono text-sm"
                    >
                      {children}
                    </code>
                  ),
                  pre: ({ children, ...props }) => (
                    <pre
                      {...props}
                      className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6 overflow-x-auto"
                    >
                      {children}
                    </pre>
                  ),
                  // Blockquotes
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      {...props}
                      className="border-l-4 border-[#DA5F6F] pl-4 italic text-gray-700 mb-6"
                    >
                      {children}
                    </blockquote>
                  ),
                  // Tables
                  table: ({ children, ...props }) => (
                    <div className="overflow-x-auto mb-6">
                      <table
                        {...props}
                        className="min-w-full divide-y divide-gray-200 border"
                      >
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children, ...props }) => (
                    <th
                      {...props}
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td
                      {...props}
                      className="px-6 py-4 whitespace-nowrap text-gray-700"
                    >
                      {children}
                    </td>
                  ),
                  // Horizontal Rule
                  hr: () => <hr className="border-t border-gray-300 my-8" />,
                }}
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
  } catch {
    notFound();
  }
}
