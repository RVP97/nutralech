import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Post } from "@/lib/posts";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

interface BlogCardsProps {
  posts: Omit<Post, "content">[];
}

export function Posts({ posts }: BlogCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.slug} className="h-full">
          <div className="h-2 bg-[#DA5F6F]" />
          <CardHeader>
            <h2 className="text-2xl font-bold text-black mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="text-gray-900 hover:text-[#DA5F6F] transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {(post.categories ?? []).map((category, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {post.excerpt && (
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            )}
            {post.author && (
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  {/* <AvatarFallback className="bg-[#DA5F6F] text-white">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback> */}
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.author.role}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto">
            <div className="text-sm text-muted-foreground flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4 text-[#DA5F6F]" />
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <Link href={`/blog/${post.slug}`} className="w-full sm:w-auto">
              <Button className="bg-[#DA5F6F] text-white hover:bg-[#C54E5E] w-full">
                Leer Artículo
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
