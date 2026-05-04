import Image from "next/image";
import Link from "next/link";
import SimplifiedContactForm from "./simplified-contact-form";

export default function ContactPageComponent() {
	return (
		<section className="relative">
			{/* Hero */}
			<div className="bg-[oklch(96%_0.015_12)] py-12">
				<div className="container px-4 mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
						<div className="space-y-6 max-w-xl">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[oklch(18%_0.005_12)]">
								Hablemos de tu salud
							</h1>
							<p className="text-base md:text-lg leading-relaxed text-[oklch(40%_0.01_12)]">
								Si tienes dudas sobre consultas, precios o cómo funciona el
								proceso, escríbeme directamente. También puedes revisar las{" "}
								<Link
									prefetch={false}
									href="/#faq"
									className="text-[#DA5F6F] underline underline-offset-4 decoration-[#DA5F6F]/30 hover:decoration-[#DA5F6F]"
								>
									preguntas frecuentes
								</Link>
								.
							</p>
							<div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[oklch(45%_0.01_12)]">
								<span>Respuesta en menos de 24 horas</span>
								<span className="hidden sm:inline text-[oklch(85%_0.005_12)]">|</span>
								<Link
									prefetch={false}
									href="https://wa.me/message/BLYZCVYW2MOAJ1"
									className="inline-flex items-center gap-2 text-[#DA5F6F] hover:underline underline-offset-4"
								>
									WhatsApp directo
								</Link>
							</div>
						</div>
						<div className="relative h-[280px] lg:h-[380px] rounded-2xl overflow-hidden">
							<Image
								unoptimized
								src="/images/contact-drawing.svg"
								alt="Contacto"
								fill
								className="rounded-2xl object-contain"
								priority
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Form */}
			<div id="contact-form" className="py-20 px-4">
				<div className="max-w-xl mx-auto">
					<h2 className="font-serif text-2xl font-medium tracking-tight text-[oklch(18%_0.005_12)] mb-2">
						Envíame un mensaje
					</h2>
					<p className="text-sm leading-relaxed text-[oklch(50%_0.01_12)] mb-10">
						Llena el formulario y te respondo lo antes posible.
					</p>
					<SimplifiedContactForm />
				</div>
			</div>

			{/* FAQ nudge */}
			<div className="border-t border-[oklch(92%_0.005_12)]">
				<div className="container px-4 mx-auto py-12 flex flex-col sm:flex-row items-center gap-6">
					<div className="flex-1 text-center sm:text-left">
						<h2 className="text-lg font-medium text-[oklch(18%_0.005_12)]">
							Preguntas frecuentes
						</h2>
						<p className="mt-1 text-sm text-[oklch(50%_0.01_12)]">
							Respuestas rápidas sobre consultas, pagos y seguimiento.
						</p>
					</div>
					<Link
						prefetch={false}
						href="/#faq"
						className="rounded-full border border-[oklch(85%_0.005_12)] px-6 py-2.5 text-sm font-medium text-[oklch(30%_0.005_12)] transition-colors duration-200 hover:border-[#DA5F6F] hover:text-[#DA5F6F]"
					>
						Ver preguntas frecuentes
					</Link>
				</div>
			</div>
		</section>
	);
}
