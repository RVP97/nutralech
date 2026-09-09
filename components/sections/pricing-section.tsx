"use client";

import { Check, Copy } from "lucide-react";
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

interface PlanTier {
	name: string;
	price: string;
	priceId: string;
	description: string;
	features: string[];
	popular?: boolean;
}

interface StripeCheckoutProps {
	priceId: string;
}

const sharedFeatures = [
	"Plan de alimentación personalizado.",
	"Sistema de equivalencias para que puedas variar tus alimentos y no depender de un menú rígido.",
	"Una opción de menú ejemplo para ayudarte a visualizar cómo organizar tus comidas.",
	"Recomendaciones personalizadas de acuerdo con tus hábitos y objetivos.",
	"Opciones y estrategias para cuando comes fuera de casa.",
	"Recomendaciones prácticas para que puedas adaptar el plan a tu rutina y estilo de vida.",
];

const planTiers: PlanTier[] = [
	{
		name: "Plan inicial",
		price: "1,200",
		priceId: "price_1UDoYxBoTKroQtb9eaEjMz8v",
		description:
			"Tu primer plan a distancia: un documento para conocer tus datos, objetivos, hábitos y rutina, y a partir de ahí un plan 100% personalizado.",
		features: sharedFeatures,
		popular: true,
	},
	{
		name: "Plan de seguimiento",
		price: "1,000",
		priceId: "price_1UDoZIBoTKroQtb96qUzoQz8",
		description:
			"Actualiza tu plan a distancia con base en tus avances, cambios de hábitos y nuevos objetivos, sin consulta presencial.",
		features: sharedFeatures,
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
					<div className="text-center mb-6">
						<p className="text-sm font-medium tracking-wide uppercase text-[#DA5F6F]">
							Precios
						</p>
						<h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[oklch(18%_0.005_12)] sm:text-4xl lg:text-5xl">
							Plan a distancia
						</h2>
						<p className="mt-4 text-base text-[oklch(50%_0.01_12)] max-w-2xl mx-auto leading-relaxed">
							Recibe un plan de alimentación 100% personalizado, diseñado de
							acuerdo con tus objetivos, hábitos, estilo de vida y rutina, sin
							necesidad de realizar una consulta presencial.
						</p>
					</div>

					<div className="mx-auto mb-12 max-w-2xl rounded-2xl border border-[oklch(92%_0.005_12)] bg-[oklch(98.5%_0.005_12)] px-6 py-5 text-left">
						<p className="text-sm font-medium text-[oklch(18%_0.005_12)]">
							¿Cómo funciona?
						</p>
						<p className="mt-2 text-sm leading-relaxed text-[oklch(45%_0.01_12)]">
							Al contratar tu plan recibirás un documento que deberás llenar con
							información sobre ti: tus datos, objetivos, hábitos de
							alimentación, rutina, actividad física, estilo de vida, horarios,
							gustos y preferencias. Con base en toda esta información elaboraré
							un plan de alimentación completamente personalizado y adaptado a
							tu día a día.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
						{planTiers.map((plan) => {
							const isHighlighted = plan.popular;

							return (
								<div
									key={plan.priceId}
									className={`relative flex flex-col rounded-2xl border p-8 transition-shadow duration-200 ${
										isHighlighted
											? "border-[#DA5F6F]/30 bg-[oklch(98.5%_0.01_12)] shadow-sm"
											: "border-[oklch(92%_0.005_12)] bg-white hover:shadow-sm"
									}`}
								>
									{isHighlighted && (
										<span className="absolute -top-3 left-6 rounded-full bg-[#DA5F6F] px-3.5 py-1 text-xs font-medium text-white">
											Más popular
										</span>
									)}

									<h3 className="text-lg font-medium text-[oklch(18%_0.005_12)]">
										{plan.name}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-[oklch(50%_0.01_12)]">
										{plan.description}
									</p>

									<div className="mt-6 flex items-baseline gap-2">
										<span className="text-3xl font-semibold tabular-nums text-[oklch(18%_0.005_12)]">
											${plan.price}
										</span>
										<span className="text-sm text-[oklch(55%_0.01_12)]">MXN</span>
									</div>

									<ul className="mt-8 flex-1 space-y-3">
										{plan.features.map((feature) => (
											<li key={feature} className="flex items-start gap-2.5">
												<Check className="mt-0.5 h-4 w-4 shrink-0 text-[#DA5F6F]" />
												<span className="text-sm leading-relaxed text-[oklch(35%_0.005_12)]">
													{feature}
												</span>
											</li>
										))}
									</ul>

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

					<p className="mt-10 mx-auto max-w-2xl text-center text-sm leading-relaxed text-[oklch(50%_0.01_12)]">
						La idea no es darte una dieta genérica, sino crear una guía que
						puedas aplicar de manera realista en tu día a día y que se adapte a
						ti.
					</p>

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
