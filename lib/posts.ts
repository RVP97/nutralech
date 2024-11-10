import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";

export interface Post {
  slug: string;
  title: string;
  publishDate: string;
  categories?: string[];
  excerpt?: string;
  content?: string;
  seoDescription?: string;
  author?: {
    name: string;
    avatar: string;
    role: string;
  };
}

const POSTS_DIR = path.join(process.cwd(), "public/posts");

export async function getPosts(): Promise<Omit<Post, "content">[]> {
  try {
    const files = await readdir(POSTS_DIR);

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(".mdx", "");
          const filePath = path.join(POSTS_DIR, file);
          const fileContent = await readFile(filePath, "utf8");
          const { data } = matter(fileContent);

          return {
            slug,
            title: data.title,
            publishDate: data.publishDate,
            categories: data.categories || [],
            excerpt: data.excerpt || "",
            seoDescription: data.seoDescription || "",
            author: data.author || undefined,
          };
        })
    );

    // Sort posts by date (newest first)
    return posts.sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const fileContent = await readFile(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    publishDate: data.publishDate,
    categories: data.categories || [],
    excerpt: data.excerpt || "",
    seoDescription: data.seoDescription || "",
    content,
    author: data.author || undefined,
  };
}
