"use client";

import Image from "next/image";

export default function TestimonialsComponent() {
	const testimonials = [
		{
			name: "Rodrigo Valle",
			handle: "@rodrigo.vallep",
			image: "/images/testimonial-profile/rodrigo.webp",
			quote:
				"Gracias a Marialy, he logrado mis objetivos de salud con facilidad y eficacia. Su conocimiento y enfoque personalizado son excepcionales. ¡Totalmente recomendado!",
		},
		{
			name: "Emma Pinto",
			handle: "@chefeemmapinto",
			image: "/images/testimonial-profile/emma.webp",
			quote:
				"¡La mejor nutrióloga! Obtuve súper buenos resultados sin hacer nada extremo ni estando en dietas restrictivas. Me encanta que todo mi plan fue muy balanceado y que diario me apoya en todas mis dudas.",
		},
		{
			name: "Helena Molina",
			handle: "@helenamolinar",
			image: "/images/testimonial-profile/helena.webp",
			quote:
				"¡Increíble lo que he logrado con la ayuda de Marialy! No solo me ayuda a cumplir mis metas sino que tengo una mejor relación con la comida. La recomiendo 100% a quien sea que esté buscando a una nutrióloga.",
		},
	];

	return (
		<section className="py-24 bg-[oklch(97.5%_0.008_12)]">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl">
					<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F]">
						Testimonios
					</p>
					<h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl">
						Lo que dicen mis pacientes
					</h2>
				</div>

				<div className="mt-14 grid gap-6 md:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<figure
							key={index}
							className="rounded-2xl bg-white p-8 transition-shadow duration-200 hover:shadow-md"
						>
							<blockquote className="text-[15px] leading-relaxed text-[oklch(35%_0.005_12)]">
								"{testimonial.quote}"
							</blockquote>
							<figcaption className="mt-6 flex items-center gap-3">
								<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
									<Image
										src={testimonial.image}
										alt={testimonial.name}
										fill
										quality={50}
										className="object-cover"
									/>
								</div>
								<div>
									<div className="text-sm font-medium text-[oklch(22%_0.005_12)]">
										{testimonial.name}
									</div>
									<div className="text-xs text-[oklch(55%_0.01_12)]">
										{testimonial.handle}
									</div>
								</div>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}
