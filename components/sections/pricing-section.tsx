"use client";

import { Check, Copy, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { type ComponentType, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface IndividualPlan {
	name: string;
	price: string;
	priceId: string;
	description: string;
	features: { name: string; cross: boolean }[];
	popular?: boolean;
	selfCare?: boolean;
}

interface Package {
	name: string;
	originalPrice: string;
	discountedPrice: string;
	priceId: string;
	description: string;
	features: { name: string; cross: boolean }[];
	popular?: boolean;
}

interface StripeCheckoutProps {
	priceId: string;
}

const individualPlans: IndividualPlan[] = [
	{
		name: "Consulta de Seguimiento",
		price: "800",
		priceId: "price_1QHcX3BoTKroQtb9iezs2h2q",
		description:
			"Para dar seguimiento a tus metas y evaluar tu progreso después de la consulta inicial.",
		features: [
			{ name: "Evaluación integral completa", cross: false },
			{ name: "Plan alimenticio personalizado (basado en menú) o seguimiento de relación con la comida", cross: false },
			{ name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
			{ name: "Soporte por chat ilimitado (directamente con Marialy)", cross: false },
		],
	},
	{
		name: "Consulta Inicial",
		price: "1,200",
		priceId: "price_1QHcqHBoTKroQtb9EcQsiBUO",
		description:
			"Te conozco y adapto un plan personalizado a tus necesidades específicas.",
		features: [
			{ name: "Evaluación nutricional completa", cross: false },
			{ name: "Plan alimenticio personalizado (basado en menú)", cross: false },
			{ name: "Recomendaciones de suplementación", cross: false },
			{ name: "Consulta de primera vez", cross: false },
			{ name: "Soporte por chat ilimitado (directamente con Marialy)", cross: false },
		],
		popular: true,
	},
	{
		name: "Mejora tu relación con la comida",
		price: "1,200",
		priceId: "price_1S6bWaBoTKroQtb9yWPxT3lG",
		description:
			"Aprende a alimentarte sin restricciones ni culpa. Alimentación intuitiva y hábitos sostenibles.",
		features: [
			{ name: "Consulta online personalizada (60 minutos)", cross: false },
			{ name: "Practica la alimentación intuitiva", cross: false },
			{ name: "Reconecta con tus señales de hambre y saciedad", cross: false },
			{ name: "Crea hábitos que te acerquen a tu peso y bienestar ideal", cross: false },
			{ name: "Espacio para disfrutar la comida sin culpa", cross: false },
			{ name: "Construye confianza en tus elecciones alimentarias", cross: false },
			{ name: "Logra un estilo de vida sostenible y saludable", cross: false },
			{ name: "Soporte por chat ilimitado (directamente con Marialy)", cross: false },
		],
		selfCare: true,
	},
];

const packages: Package[] = [
	{
		name: "Paquete Básico",
		originalPrice: "2,000",
		discountedPrice: "1,700",
		priceId: "price_1QHcY3BoTKroQtb9oY63GCl3",
		description:
			"Perfecto para empezar a cambiar tu estilo de vida y alimentación.",
		features: [
			{ name: "1 Consulta Inicial", cross: false },
			{ name: "1 Consulta de Seguimiento", cross: false },
			{ name: "Evaluación nutricional completa", cross: false },
			{ name: "Plan alimenticio personalizado (basado en macros o menú)", cross: false },
			{ name: "Recomendaciones de suplementación", cross: false },
			{ name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
			{ name: "Soporte por chat ilimitado (directamente con Marialy)", cross: false },
		],
	},
	{
		name: "Paquete Transformación",
		originalPrice: "3,600",
		discountedPrice: "3,060",
		priceId: "price_1QHcYLBoTKroQtb9bjxsrz4x",
		description:
			"El plan ideal para quienes buscan transformar su vida por completo.",
		features: [
			{ name: "1 Consulta Inicial", cross: false },
			{ name: "3 Consultas de Seguimiento", cross: false },
			{ name: "Evaluación nutricional completa", cross: false },
			{ name: "Plan alimenticio personalizado (basado en macros o menú)", cross: false },
			{ name: "Recomendaciones de suplementación", cross: false },
			{ name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
			{ name: "Soporte por chat ilimitado (directamente con Marialy)", cross: false },
		],
		popular: true,
	},
	{
		name: "Paquete Profesional",
		originalPrice: "2,800",
		discountedPrice: "2,380",
		priceId: "price_1QHcYeBoTKroQtb9zJO7l4lD",
		description:
			"Ideal para una transformación profunda para quien quiere un buen cambio.",
		features: [
			{ name: "1 Consulta Inicial", cross: false },
			{ name: "2 Consultas de Seguimiento", cross: false },
			{ name: "Evaluación nutricional completa", cross: false },
			{ name: "Plan alimenticio personalizado (basado en macros o menú)", cross: false },
			{ name: "Recomendaciones de suplementación", cross: false },
			{ name: "Seguimiento recomendado cada 2 o 3 semanas", cross: false },
			{ name: "Soporte por chat ilimitado (directamente con Marialy)", cross: false },
		],
	},
];

function CopyButton({ text, label }: { text: string; label: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}, [text]);

	return (
		<Button
			variant="ghost"
			size="sm"
			className="flex items-center gap-1 text-[oklch(50%_0.01_12)] hover:text-[#DA5F6F]"
			onClick={handleCopy}
		>
			<Copy className="h-3.5 w-3.5" />
			<span className="text-xs">{copied ? "Copiado" : label}</span>
		</Button>
	);
}

export default function PricingSection() {
	const [showPackages, setShowPackages] = useState(false);
	const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
	const [StripeCheckout, setStripeCheckout] =
		useState<ComponentType<StripeCheckoutProps> | null>(null);

	const handlePlanSelection = async (priceId: string) => {
		setSelectedPriceId(priceId);

		const StripeCheckoutComponent = dynamic(
			() => import("@/lib/stripe-checkout"),
			{
				loading: () => (
					<div className="flex h-full w-full items-center justify-center">
						<div className="h-6 w-6 animate-spin rounded-full border-2 border-[oklch(85%_0.01_12)] border-t-[#DA5F6F]" />
					</div>
				),
				ssr: false,
			},
		);

		setStripeCheckout(() => StripeCheckoutComponent);
	};

	const activePlans = showPackages ? packages : individualPlans;

	return (
		<>
			<Dialog
				open={!!selectedPriceId}
				onOpenChange={() => setSelectedPriceId(null)}
			>
				<DialogContent className="sm:max-w-[90vw] w-[95vw] h-[90vh] max-h-[90vh] flex flex-col rounded-xl z-100">
					<DialogHeader className="shrink-0">
						<DialogTitle className="text-[oklch(18%_0.005_12)]">Completar pago</DialogTitle>
					</DialogHeader>
					<div className="flex-1 overflow-y-auto">
						{selectedPriceId && StripeCheckout && (
							<StripeCheckout priceId={selectedPriceId} />
						)}
					</div>
				</DialogContent>
			</Dialog>

			<section id="precios" className="py-24 bg-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="text-center mb-10">
						<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F]">
							Precios
						</p>
						<h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
							Elige tu plan
						</h2>
						<p className="mt-4 text-base text-[oklch(50%_0.01_12)] max-w-lg mx-auto">
							Consultas individuales para empezar, o paquetes con hasta 15% de ahorro
							si buscas un proceso completo.
						</p>
					</div>

					{/* Toggle */}
					<div className="flex justify-center mb-12">
						<div className="inline-flex rounded-full bg-[oklch(96%_0.005_12)] p-1">
							<button
								type="button"
								onClick={() => setShowPackages(false)}
								className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
									!showPackages
										? "bg-white text-[oklch(18%_0.005_12)] shadow-sm"
										: "text-[oklch(50%_0.01_12)] hover:text-[oklch(30%_0.005_12)]"
								}`}
							>
								Planes individuales
							</button>
							<button
								type="button"
								onClick={() => setShowPackages(true)}
								className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
									showPackages
										? "bg-white text-[oklch(18%_0.005_12)] shadow-sm"
										: "text-[oklch(50%_0.01_12)] hover:text-[oklch(30%_0.005_12)]"
								}`}
							>
								Paquetes
								<span className="ml-1.5 text-xs text-[#DA5F6F]">-15%</span>
							</button>
						</div>
					</div>

					{/* Plans grid */}
					<div
						className={`grid gap-6 md:grid-cols-2 ${
							activePlans.length === 2
								? "lg:grid-cols-2 max-w-4xl mx-auto"
								: "lg:grid-cols-3"
						}`}
					>
						{activePlans.map((plan, index) => {
							const isPopular = plan.popular;
							const isSelfCare = (plan as IndividualPlan).selfCare;
							const isHighlighted = isPopular || isSelfCare;

							return (
								<div
									key={index}
									className={`relative flex flex-col rounded-2xl border p-8 transition-shadow duration-200 ${
										isHighlighted
											? "border-[#DA5F6F]/30 bg-[oklch(98.5%_0.01_12)] shadow-sm"
											: "border-[oklch(92%_0.005_12)] bg-white hover:shadow-sm"
									}`}
								>
									{/* Badge */}
									{isPopular && (
										<span className="absolute -top-3 left-6 rounded-full bg-[#DA5F6F] px-3.5 py-1 text-xs font-medium text-white">
											Más popular
										</span>
									)}
									{isSelfCare && (
										<span className="absolute -top-3 left-6 rounded-full bg-[oklch(65%_0.15_160)] px-3.5 py-1 text-xs font-medium text-white">
											Self care
										</span>
									)}

									{/* Name + description */}
									<h3 className="text-lg font-medium text-[oklch(18%_0.005_12)]">
										{plan.name}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-[oklch(50%_0.01_12)]">
										{plan.description}
									</p>

									{/* Price */}
									<div className="mt-6 flex items-baseline gap-2">
										{showPackages ? (
											<>
												<span className="text-sm line-through text-[oklch(65%_0.005_12)]">
													${(plan as Package).originalPrice}
												</span>
												<span className="text-3xl font-semibold tabular-nums text-[oklch(18%_0.005_12)]">
													${(plan as Package).discountedPrice}
												</span>
											</>
										) : (
											<span className="text-3xl font-semibold tabular-nums text-[oklch(18%_0.005_12)]">
												${(plan as IndividualPlan).price}
											</span>
										)}
										<span className="text-sm text-[oklch(55%_0.01_12)]">MXN</span>
									</div>

									{/* Features */}
									<ul className="mt-8 flex-1 space-y-3">
										{plan.features.map((feature, idx) => (
											<li key={idx} className="flex items-start gap-2.5">
												{feature.cross ? (
													<X className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(82%_0.005_12)]" />
												) : (
													<Check className="mt-0.5 h-4 w-4 shrink-0 text-[#DA5F6F]" />
												)}
												<span
													className={`text-sm leading-relaxed ${
														feature.cross
															? "text-[oklch(72%_0.005_12)]"
															: "text-[oklch(35%_0.005_12)]"
													}`}
												>
													{feature.name}
												</span>
											</li>
										))}
									</ul>

									{/* CTA */}
									<button
										type="button"
										onClick={() => handlePlanSelection(plan.priceId)}
										className={`mt-8 flex h-12 w-full items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
											isHighlighted
												? "bg-[#DA5F6F] text-white hover:bg-[#C54B5B] focus-visible:outline-[#DA5F6F]"
												: "bg-[oklch(18%_0.005_12)] text-white hover:bg-[oklch(25%_0.005_12)] focus-visible:outline-[oklch(18%_0.005_12)]"
										}`}
									>
										Elegir plan
									</button>
								</div>
							);
						})}
					</div>

					{/* Payment methods + transfer info (below cards) */}
					<div className="mt-16 flex flex-col items-center gap-4">
						<p className="text-xs font-medium tracking-wide uppercase text-[oklch(60%_0.005_12)]">
							Métodos de pago
						</p>
						<div className="flex items-center gap-6">
							<Image unoptimized src="/images/logos/visa.svg" alt="Visa" width={48} height={24} className="h-6 w-auto object-contain opacity-60" />
							<Image unoptimized src="/images/logos/mastercard.svg" alt="Mastercard" width={48} height={24} className="h-6 w-auto object-contain opacity-60" />
							<Image unoptimized src="/images/logos/amex.svg" alt="American Express" width={48} height={24} className="h-8 w-auto object-contain opacity-60" />
							<Image unoptimized src="/images/logos/oxxo-logo.svg" alt="OXXO" width={48} height={24} className="h-6 w-auto object-contain opacity-60" />
						</div>

						<Dialog>
							<DialogTrigger asChild>
								<button
									type="button"
									className="mt-1 inline-flex items-center gap-2 text-sm text-[oklch(50%_0.01_12)] underline underline-offset-4 decoration-[oklch(85%_0.005_12)] transition-colors duration-200 hover:text-[#DA5F6F] hover:decoration-[#DA5F6F]/30"
								>
									<Image unoptimized src="/images/logos/spei.svg" alt="SPEI" width={20} height={20} className="h-4 w-auto object-contain" />
									Ver datos para transferencia
								</button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-md rounded-xl">
								<DialogHeader>
									<DialogTitle className="text-[oklch(18%_0.005_12)]">Transferencia bancaria</DialogTitle>
								</DialogHeader>
								<div className="space-y-4 pt-2">
									<div className="space-y-3">
										{[
											{ label: "Banco", value: "BBVA Bancomer", copyValue: "BBVA Bancomer" },
											{ label: "Titular", value: "Marialy Alonso Echenique", copyValue: "Marialy Alonso Echenique" },
											{ label: "Cuenta", value: "159 382 7239", copyValue: "1593827239" },
											{ label: "CLABE", value: "0121 8001 5938 272395", copyValue: "012180015938272395" },
										].map((item) => (
											<div key={item.label} className="flex items-center justify-between rounded-lg bg-[oklch(97.5%_0.005_12)] px-4 py-3">
												<div className="text-sm">
													<span className="text-[oklch(50%_0.01_12)]">{item.label}: </span>
													<span className="font-medium text-[oklch(22%_0.005_12)]">{item.value}</span>
												</div>
												<CopyButton text={item.copyValue} label="Copiar" />
											</div>
										))}
									</div>
									<p className="text-sm leading-relaxed text-[oklch(50%_0.01_12)]">
										Envía el comprobante a{" "}
										<Link prefetch={false} href="mailto:pagos@nutralech.com" className="font-medium text-[oklch(22%_0.005_12)] hover:text-[#DA5F6F]">
											pagos@nutralech.com
										</Link>{" "}
										o por WhatsApp al{" "}
										<Link prefetch={false} href="https://wa.me/message/BLYZCVYW2MOAJ1" className="font-medium text-[oklch(22%_0.005_12)] hover:text-[#DA5F6F]">
											+52 744 346 8252
										</Link>
									</p>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</section>
		</>
	);
}
