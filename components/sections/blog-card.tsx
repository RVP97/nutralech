"use client";

import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import type { Post } from "@/lib/posts";

interface BlogCardsProps {
	posts: Omit<Post, "content">[];
}

const POSTS_PER_PAGE = 10;

function formatDate(dateStr: string): string {
	const [day, month, year] = dateStr.split("/");
	return new Date(
		parseInt(year, 10),
		parseInt(month, 10) - 1,
		parseInt(day, 10),
	).toLocaleDateString("es-MX", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function Posts({ posts }: BlogCardsProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const tagSet = new Set<string>();
	for (const post of posts) {
		for (const category of post.categories || []) {
			tagSet.add(category);
		}
	}
	const allTags = Array.from(tagSet)
		.sort()
		.map((tag) => ({
			label: tag.charAt(0).toUpperCase() + tag.slice(1),
			value: tag,
		}));

	const filteredPosts =
		selectedTags.length === 0
			? posts
			: posts.filter((post) =>
					selectedTags.some((tag) => post.categories?.includes(tag)),
				);

	const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
	const endIndex = startIndex + POSTS_PER_PAGE;
	const currentPosts = filteredPosts.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

	const goToPage = (page: number) => {
		setCurrentPage(page);
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}, 0);
	};

	const handleTagsChange = (tags: string[]) => {
		setSelectedTags(tags);
		setCurrentPage(1);
	};

	const getPageNumbers = (): number[] => {
		const pages: number[] = [];
		const showPages = 5;
		let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
		const endPage = Math.min(totalPages, startPage + showPages - 1);
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
			{/* Filter */}
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4 text-[oklch(60%_0.005_12)]" />
					<span className="text-sm text-[oklch(55%_0.01_12)]">
						Filtrar por tema:
					</span>
				</div>
				<div className="w-full sm:w-[280px]">
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

			{selectedTags.length > 0 && (
				<p className="mb-6 text-sm text-[oklch(55%_0.01_12)]">
					{filteredPosts.length} artículo{filteredPosts.length !== 1 ? "s" : ""}{" "}
					sobre{" "}
					<span className="font-medium text-[oklch(30%_0.005_12)]">
						{selectedTags
							.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
							.join(", ")}
					</span>
				</p>
			)}

			{/* Posts list */}
			<div className="divide-y divide-[oklch(94%_0.005_12)]">
				{currentPosts.map((post) => (
					<article key={post.slug} className="py-6 first:pt-0">
						<Link
							href={`/blog/${post.slug}`}
							className="group block"
						>
							<div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
								<h2 className="text-base font-medium text-[oklch(18%_0.005_12)] group-hover:text-[#DA5F6F] transition-colors duration-150">
									{post.title}
								</h2>
								<time
									dateTime={post.publishDate}
									className="text-sm text-[oklch(60%_0.005_12)] shrink-0"
								>
									{formatDate(post.publishDate)}
								</time>
							</div>
							{post.excerpt && (
								<p className="mt-1.5 text-sm leading-relaxed text-[oklch(50%_0.01_12)] max-w-2xl">
									{post.excerpt}
								</p>
							)}
							{post.categories && post.categories.length > 0 && (
								<div className="mt-2 flex flex-wrap gap-2">
									{post.categories.map((category) => (
										<span
											key={category}
											className="text-xs text-[oklch(55%_0.01_12)]"
										>
											{category.charAt(0).toUpperCase() + category.slice(1)}
										</span>
									))}
								</div>
							)}
						</Link>
					</article>
				))}
			</div>

			{/* Empty state */}
			{currentPosts.length === 0 && (
				<div className="py-16 text-center">
					<p className="text-sm text-[oklch(55%_0.01_12)] mb-4">
						No se encontraron artículos para los temas seleccionados.
					</p>
					<button
						type="button"
						onClick={() => handleTagsChange([])}
						className="text-sm text-[#DA5F6F] underline underline-offset-4 decoration-[#DA5F6F]/30 hover:decoration-[#DA5F6F]"
					>
						Ver todos los artículos
					</button>
				</div>
			)}

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[oklch(94%_0.005_12)]">
					<p className="text-sm text-[oklch(55%_0.01_12)]">
						{(currentPage - 1) * POSTS_PER_PAGE + 1}–
						{Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} de{" "}
						{filteredPosts.length}
					</p>

					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
							disabled={currentPage === 1}
							className="h-8 px-2 text-[oklch(45%_0.005_12)]"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>

						{getPageNumbers().map((pageNum) => (
							<button
								key={pageNum}
								type="button"
								onClick={() => goToPage(pageNum)}
								className={`h-8 w-8 rounded-lg text-sm transition-colors duration-150 ${
									currentPage === pageNum
										? "bg-[#DA5F6F] text-white"
										: "text-[oklch(45%_0.005_12)] hover:bg-[oklch(95%_0.005_12)]"
								}`}
							>
								{pageNum}
							</button>
						))}

						<Button
							variant="ghost"
							size="sm"
							onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="h-8 px-2 text-[oklch(45%_0.005_12)]"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
