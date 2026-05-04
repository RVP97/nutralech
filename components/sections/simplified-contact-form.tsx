"use client";

import type React from "react";
import { useState } from "react";
import {
	GoogleReCaptchaProvider,
	useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const INQUIRY_OPTIONS = [
	{ value: "Consulta General", label: "Consulta general" },
	{ value: "Solicitar Cita", label: "Solicitar cita" },
	{ value: "Colaboración", label: "Colaboración profesional" },
	{ value: "Comentarios", label: "Comentarios" },
	{ value: "Otro", label: "Otro" },
];

const fieldClass =
	"bg-[oklch(97%_0.005_12)] border border-[oklch(90%_0.005_12)] rounded-lg text-sm text-[oklch(18%_0.005_12)] placeholder:text-[oklch(62%_0.005_12)] focus-visible:ring-[#DA5F6F]/30 focus-visible:border-[#DA5F6F]/50";

function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		inquiryType: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [inquiryTypeError, setInquiryTypeError] = useState("");

	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleInquiryTypeChange = (value: string) => {
		setFormData((prev) => ({ ...prev, inquiryType: value }));
		setInquiryTypeError("");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!executeRecaptcha) return;

		if (!formData.inquiryType) {
			setInquiryTypeError("Selecciona un tipo de consulta.");
			return;
		}

		setIsSubmitting(true);
		setSuccessMessage("");
		setErrorMessage("");

		try {
			const token = await executeRecaptcha("contact_form");
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...formData, token }),
			});

			if (response.ok) {
				setFormData({
					name: "",
					email: "",
					phone: "",
					inquiryType: "",
					message: "",
				});
				setSuccessMessage(
					"Gracias por tu mensaje. Te responderé lo antes posible.",
				);
			} else {
				setErrorMessage(
					"Hubo un error al enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.",
				);
			}
		} catch {
			setErrorMessage(
				"Hubo un error al enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="grid sm:grid-cols-2 gap-5">
				<Input
					type="text"
					name="name"
					placeholder="Nombre"
					className={fieldClass}
					value={formData.name}
					onChange={handleInputChange}
					required
					aria-label="Nombre"
				/>
				<Input
					type="email"
					name="email"
					placeholder="Correo electrónico"
					className={fieldClass}
					value={formData.email}
					onChange={handleInputChange}
					required
					aria-label="Correo electrónico"
				/>
			</div>
			<div className="grid sm:grid-cols-2 gap-5">
				<Input
					type="tel"
					name="phone"
					placeholder="Teléfono (opcional)"
					className={fieldClass}
					value={formData.phone}
					onChange={handleInputChange}
					aria-label="Número de teléfono (opcional)"
				/>
				<div>
					<Select
						name="inquiryType"
						onValueChange={handleInquiryTypeChange}
						value={formData.inquiryType}
					>
						<SelectTrigger
							className={`w-full ${fieldClass} ${
								inquiryTypeError
									? "border-red-400 focus-visible:ring-red-200"
									: ""
							}`}
							aria-label="Tipo de consulta"
						>
							<SelectValue placeholder="Tipo de consulta" />
						</SelectTrigger>
						<SelectContent>
							{INQUIRY_OPTIONS.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{inquiryTypeError && (
						<p className="mt-1.5 text-xs text-red-500">{inquiryTypeError}</p>
					)}
				</div>
			</div>
			<Textarea
				name="message"
				placeholder="Tu mensaje"
				className={`${fieldClass} min-h-[140px] resize-y`}
				value={formData.message}
				onChange={handleInputChange}
				required
				aria-label="Mensaje"
			/>

			<Button
				type="submit"
				className="h-12 w-full rounded-full bg-[#DA5F6F] text-sm font-medium text-white hover:bg-[#C54B5B] sm:w-auto sm:px-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA5F6F]"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Enviando..." : "Enviar mensaje"}
			</Button>

			{successMessage && (
				<p className="text-sm text-[oklch(40%_0.1_150)]">{successMessage}</p>
			)}
			{errorMessage && (
				<p className="text-sm text-red-500">{errorMessage}</p>
			)}

			<p className="text-xs leading-relaxed text-[oklch(62%_0.005_12)]">
				Protegido por reCAPTCHA. Aplican la{" "}
				<a
					href="https://policies.google.com/privacy"
					className="underline underline-offset-2 hover:text-[#DA5F6F]"
					target="_blank"
					rel="noopener noreferrer"
				>
					Política de Privacidad
				</a>{" "}
				y{" "}
				<a
					href="https://policies.google.com/terms"
					className="underline underline-offset-2 hover:text-[#DA5F6F]"
					target="_blank"
					rel="noopener noreferrer"
				>
					Condiciones de Servicio
				</a>{" "}
				de Google.
			</p>
		</form>
	);
}

export default function SimplifiedContactForm() {
	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
		>
			<style jsx global>{`
				.grecaptcha-badge {
					visibility: hidden;
				}
			`}</style>
			<ContactForm />
		</GoogleReCaptchaProvider>
	);
}
