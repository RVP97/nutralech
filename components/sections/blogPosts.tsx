"use client";

import type { Post } from "@/lib/posts";
import Link from "next/link";

export function Posts({ posts }: { posts: Omit<Post, "content">[] }) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.slug} className="border-b pb-8">
          <h2 className="text-2xl font-bold mb-2">
            <Link
              href={`/blog/${post.slug}`}
              className="text-gray-900 hover:text-[#DA5F6F] transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          <div className="text-sm text-gray-600 mb-4">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {post.excerpt && <p className="text-gray-600 mb-4">{post.excerpt}</p>}
          {(post.categories ?? []).length > 0 && (
            <div className="flex gap-2">
              {(post.categories ?? []).map((category) => (
                <span
                  key={category}
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
