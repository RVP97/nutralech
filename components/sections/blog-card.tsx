"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
import type { Post } from "@/lib/posts";
import { CalendarIcon, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface BlogCardsProps {
  posts: Omit<Post, "content">[];
}

const POSTS_PER_PAGE = 10;

export function Posts({ posts }: BlogCardsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.categories?.forEach((category) => tagSet.add(category));
    });
    return Array.from(tagSet)
      .sort()
      .map((tag) => ({
        label: tag.charAt(0).toUpperCase() + tag.slice(1),
        value: tag,
      }));
  }, [posts]);

  // Filter posts by selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts;
    }
    return posts.filter((post) =>
      selectedTags.some((tag) => post.categories?.includes(tag))
    );
  }, [posts, selectedTags]);

  const { currentPosts, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    return { currentPosts, totalPages };
  }, [filteredPosts, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to very top of page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Reset to page 1 when tags change
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const showPages = 5; // Number of page buttons to show

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div>
      {/* Tag Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Filtrar por temas:
          </span>
        </div>
        <div className="w-full sm:w-[300px]">
          <MultiSelect
            options={allTags}
            value={selectedTags}
            onValueChange={handleTagsChange}
            placeholder="Seleccionar temas"
            maxCount={2}
            className="w-full"
          />
        </div>
      </div>

      {/* Results count */}
      {selectedTags.length > 0 && (
        <div className="mb-6 text-sm text-muted-foreground">
          Mostrando {filteredPosts.length} artículo
          {filteredPosts.length !== 1 ? "s" : ""} sobre{" "}
          {selectedTags.length === 1 ? "el tema" : "los temas"}:{" "}
          <span className="font-medium">
            {selectedTags
              .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
              .join(", ")}
          </span>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col h-full">
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
            <CardContent className="flex-grow">
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
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4 text-[#DA5F6F]" />
                <time dateTime={post.publishDate}>
                  {(() => {
                    const [day, month, year] = post.publishDate.split("/");
                    return new Date(
                      `${year}-${month}-${day}`
                    ).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  })()}
                </time>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="w-full sm:w-auto mt-auto"
              >
                <Button className="bg-[#DA5F6F] text-white hover:bg-[#C54E5E] w-full">
                  Leer Artículo
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* No results message */}
      {currentPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            No se encontraron artículos para los temas seleccionados.
          </p>
          <Button
            variant="outline"
            onClick={() => handleTagsChange([])}
            className="text-[#DA5F6F] border-[#DA5F6F] hover:bg-[#DA5F6F] hover:text-white"
          >
            Ver todos los artículos
          </Button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Posts count info */}
          <div className="text-sm text-muted-foreground">
            Mostrando {(currentPage - 1) * POSTS_PER_PAGE + 1} a{" "}
            {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} de{" "}
            {filteredPosts.length} artículos
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center space-x-2">
            {/* Previous button */}
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {getPageNumbers().map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "bg-[#DA5F6F] text-white hover:bg-[#C54E5E]"
                      : ""
                  }
                >
                  {pageNum}
                </Button>
              ))}
            </div>

            {/* Next button */}
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
