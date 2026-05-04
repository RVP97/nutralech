import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FloatingShareButton } from "@/components/sections/floating-share-button";
import { ReadingProgress } from "@/components/sections/reading-progress";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { getPost, getPosts } from "@/lib/posts";

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
		const [day, month, year] = post.publishDate.split("/");
		const dateObj = new Date(
			parseInt(year, 10),
			parseInt(month, 10) - 1,
			parseInt(day, 10),
		);
		const isoDate = dateObj.toISOString();
		const formattedDate = dateObj.toLocaleDateString("es-MX", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		const articleJsonLd = {
			"@context": "https://schema.org",
			"@type": "Article",
			headline: post.title,
			description: post.seoDescription || post.excerpt || post.title,
			image: "https://www.nutralech.com/images/marialy.webp",
			datePublished: isoDate,
			dateModified: isoDate,
			author: {
				"@type": "Person",
				name: "Marialy Alonso",
				url: "https://www.nutralech.com/acerca-de-mi",
			},
			publisher: {
				"@type": "Organization",
				name: "Nutralech",
				logo: {
					"@type": "ImageObject",
					url: "https://www.nutralech.com/icons/android-icon-192x192.png",
				},
			},
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": `https://www.nutralech.com/blog/${slug}`,
			},
		};

		return (
			<div>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(articleJsonLd),
					}}
				/>
				<ReadingProgress />

				<article id="blog-post" className="mx-auto max-w-3xl px-4 pt-28 pb-16">
					{/* Header */}
					<header className="mb-12">
						{post.categories && post.categories.length > 0 && (
							<div className="mb-4 flex flex-wrap gap-3">
								{post.categories.map((category) => (
									<span
										key={category}
										className="text-xs font-medium tracking-wide uppercase text-[#DA5F6F]"
									>
										{category.charAt(0).toUpperCase() + category.slice(1)}
									</span>
								))}
							</div>
						)}

						<h1 className="font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
							{post.title}
						</h1>

						{post.excerpt && (
							<p className="mt-4 text-lg leading-relaxed text-[oklch(45%_0.01_12)]">
								{post.excerpt}
							</p>
						)}

						<div className="mt-6 flex items-center gap-3">
							<Image
								src="/images/marialy.webp"
								alt="Marialy Alonso"
								width={36}
								height={36}
								className="rounded-full"
							/>
							<div className="text-sm">
								<p className="font-medium text-[oklch(22%_0.005_12)]">
									Marialy Alonso
								</p>
								<div className="flex items-center gap-1.5 text-[oklch(55%_0.01_12)]">
									<Calendar className="h-3 w-3" aria-hidden="true" />
									<time dateTime={isoDate}>{formattedDate}</time>
								</div>
							</div>
						</div>
					</header>

					{/* Content */}
					<div className="prose prose-lg max-w-none">
						{post.content && (
							<MDXRemote
								source={post.content}
								components={{
									h1: ({ children, ...props }) => (
										<h1
											{...props}
											className="font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] mt-12 mb-6"
										>
											{children}
										</h1>
									),
									h2: ({ children, ...props }) => (
										<h2
											{...props}
											className="font-serif text-2xl font-medium tracking-tight text-[oklch(18%_0.005_12)] mt-10 mb-4"
										>
											{children}
										</h2>
									),
									h3: ({ children, ...props }) => (
										<h3
											{...props}
											className="text-xl font-semibold text-[oklch(20%_0.005_12)] mt-8 mb-3"
										>
											{children}
										</h3>
									),
									p: ({ children, ...props }) => (
										<div
											{...props}
											className="text-[oklch(35%_0.005_12)] leading-relaxed mb-6"
										>
											{children}
										</div>
									),
									strong: ({ children, ...props }) => (
										<strong
											{...props}
											className="font-semibold text-[oklch(22%_0.005_12)]"
										>
											{children}
										</strong>
									),
									em: ({ children, ...props }) => (
										<em
											{...props}
											className="italic text-[oklch(30%_0.005_12)]"
										>
											{children}
										</em>
									),
									ul: ({ children, ...props }) => (
										<ul
											{...props}
											className="list-disc pl-6 mb-6 space-y-2"
										>
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
											className="text-[oklch(35%_0.005_12)] marker:text-[oklch(65%_0.005_12)]"
										>
											{children}
										</li>
									),
									a: ({ children, href, ...props }) => (
										<Link
											href={href ?? "#"}
											prefetch={false}
											{...props}
											className="text-[#DA5F6F] hover:text-[#C54B5B] underline underline-offset-2 decoration-[#DA5F6F]/30 hover:decoration-[#DA5F6F] transition-colors duration-150"
										>
											{children}
										</Link>
									),
									img: ({ src, alt, ...props }) => (
										<div className="my-8">
											<Image
												{...props}
												src={src ?? ""}
												alt={alt || "Imagen del artículo"}
												width={800}
												height={400}
												className="rounded-xl mx-auto"
											/>
										</div>
									),
									code: ({ children, ...props }) => (
										<code
											{...props}
											className="bg-[oklch(96%_0.005_12)] text-[#DA5F6F] rounded px-1.5 py-0.5 font-mono text-sm"
										>
											{children}
										</code>
									),
									pre: ({ children, ...props }) => (
										<pre
											{...props}
											className="bg-[oklch(16%_0.005_12)] text-[oklch(90%_0.005_12)] rounded-xl p-5 mb-6 overflow-x-auto text-sm"
										>
											{children}
										</pre>
									),
									blockquote: ({ children, ...props }) => (
										<blockquote
											{...props}
											className="my-6 rounded-xl bg-[oklch(97%_0.01_12)] px-6 py-5 text-[oklch(35%_0.01_12)] italic"
										>
											{children}
										</blockquote>
									),
									table: ({ children, ...props }) => (
										<div className="overflow-x-auto mb-6 rounded-xl border border-[oklch(92%_0.005_12)]">
											<table
												{...props}
												className="min-w-full divide-y divide-[oklch(92%_0.005_12)]"
											>
												{children}
											</table>
										</div>
									),
									th: ({ children, ...props }) => (
										<th
											{...props}
											className="px-5 py-3 bg-[oklch(97%_0.005_12)] text-left text-xs font-medium uppercase tracking-wider text-[oklch(50%_0.005_12)]"
										>
											{children}
										</th>
									),
									td: ({ children, ...props }) => (
										<td
											{...props}
											className="px-5 py-3.5 text-sm text-[oklch(35%_0.005_12)]"
										>
											{children}
										</td>
									),
									hr: () => (
										<hr className="my-10 border-t border-[oklch(92%_0.005_12)]" />
									),
								}}
							/>
						)}
					</div>

					<FloatingShareButton
						url={`https://www.nutralech.com/blog/${slug}`}
						title={post.title}
					/>
				</article>

				{/* CTA */}
				<div className="border-t border-[oklch(92%_0.005_12)]">
					<div className="mx-auto max-w-3xl px-4 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
						<div>
							<h2 className="font-serif text-xl font-medium text-[oklch(18%_0.005_12)]">
								Quieres un plan personalizado?
							</h2>
							<p className="mt-1 text-sm text-[oklch(50%_0.01_12)]">
								Agenda una consulta para recomendaciones adaptadas a ti.
							</p>
						</div>
						<Link
							prefetch={false}
							href="/#precios"
							className="shrink-0 inline-flex h-11 items-center rounded-full bg-[#DA5F6F] px-7 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B]"
						>
							Ver planes
						</Link>
					</div>
				</div>
			</div>
		);
	} catch {
		notFound();
	}
}
