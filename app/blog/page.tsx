import Link from "next/link";
import { Posts } from "@/components/sections/blog-card";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { getPosts } from "@/lib/posts";

export async function generateMetadata() {
	return generatePageMetadata({
		title: "Blog de Nutrición por Marialy Alonso",
		description:
			"Artículos sobre nutrición, salud y bienestar basados en estudios científicos y experiencias prácticas de Marialy Alonso.",
		keywords: [
			"blog",
			"nutrición",
			"salud",
			"bienestar",
			"consejos",
			"recetas",
			"nutralech",
			"marialy alonso",
		],
		openGraph: {
			url: "https://www.nutralech.com/blog",
		},
	});
}

export default async function BlogPage() {
	const posts = await getPosts();

	return (
		<main className="py-28 px-4">
			<div className="mx-auto max-w-5xl">
				<div className="mb-14">
					<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F] mb-3">
						Blog
					</p>
					<h1 className="font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
						Nutrición, salud y hábitos
					</h1>
					<p className="mt-4 text-base leading-relaxed text-[oklch(50%_0.01_12)] max-w-xl">
						Artículos basados en evidencia sobre alimentación, bienestar y
						las preguntas que más me hacen en consulta.
					</p>
				</div>

				<div id="blog-posts">
					<Posts posts={posts} />
				</div>

				<div className="mt-16 rounded-2xl bg-[oklch(96.5%_0.01_12)] p-8 sm:p-10">
					<h2 className="font-serif text-xl font-medium text-[oklch(18%_0.005_12)]">
						Quieres ir más allá de los artículos?
					</h2>
					<p className="mt-2 text-sm leading-relaxed text-[oklch(50%_0.01_12)] max-w-lg">
						El blog es un punto de partida. Para un plan adaptado a tu
						cuerpo, objetivos y condiciones, una consulta es el siguiente paso.
					</p>
					<Link
						href="/#precios"
						className="mt-6 inline-flex h-11 items-center rounded-full bg-[#DA5F6F] px-7 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#C54B5B]"
					>
						Ver planes de consulta
					</Link>
				</div>
			</div>
		</main>
	);
}
