"use client";

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
import { Phone } from "lucide-react";
import React, { useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const INQUIRY_OPTIONS = [
  { value: "Consulta General", label: "Consulta General" },
  { value: "Solicitar Cita", label: "Solicitar Cita" },
  { value: "Colaboración", label: "Colaboración" },
  { value: "Comentarios", label: "Comentarios" },
  { value: "Otro", label: "Otro" },
];

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      setInquiryTypeError("Por favor, seleccione un tipo de consulta.");
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
          "Gracias por su mensaje. Nos pondremos en contacto con usted pronto."
        );
      } else {
        setErrorMessage(
          "Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo más tarde."
        );
      }
    } catch {
      setErrorMessage(
        "Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo más tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        className="bg-[#F0F0F0] border-0 font-serif tracking-widest border-b border-black rounded-none focus:ring-0 focus:border-black"
        value={formData.name}
        onChange={handleInputChange}
        required
        aria-label="Nombre"
      />
      <Input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        className="bg-[#F0F0F0] border-0 border-b font-serif tracking-widest border-black rounded-none focus:ring-0 focus:border-black"
        value={formData.email}
        onChange={handleInputChange}
        required
        aria-label="Correo electrónico"
      />
      <div className="relative">
        <Phone
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Número de teléfono (opcional)"
          className="bg-[#F0F0F0] border-0 font-serif tracking-widest border-b border-black rounded-none focus:ring-0 focus:border-black pl-10"
          value={formData.phone}
          onChange={handleInputChange}
          aria-label="Número de teléfono (opcional)"
        />
      </div>
      <div className="space-y-2">
        <Select
          name="inquiryType"
          onValueChange={handleInquiryTypeChange}
          value={formData.inquiryType}
        >
          <SelectTrigger
            className={`w-full font-serif tracking-widest bg-[#F0F0F0] border-0 border-b ${
              inquiryTypeError ? "border-red-500" : "border-black"
            } rounded-none focus:ring-0 focus:border-black`}
            aria-label="Tipo de consulta"
          >
            <SelectValue placeholder="Tipo de consulta *" />
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
          <p className="text-red-500 text-xs">{inquiryTypeError}</p>
        )}
      </div>
      <Textarea
        name="message"
        placeholder="Mensaje"
        className="bg-[#F0F0F0] border-0 font-serif tracking-widest border-b border-black rounded-none focus:ring-0 focus:border-black min-h-[100px] "
        value={formData.message}
        onChange={handleInputChange}
        required
        aria-label="Mensaje"
      />
      <Button
        type="submit"
        className="px-10 w-full md:w-auto bg-[#DA5F6F] tracking-[0.25em] text-xs hover:bg-[#DA5F6F]/90 text-white rounded-none"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
      {successMessage && (
        <p className="text-gray-700 text-xs md:text-sm mt-4">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-gray-700 text-xs md:text-sm mt-4">{errorMessage}</p>
      )}
      <p className="text-xs md:text-sm font-serif tracking-widest text-gray-500">
        Este sitio está protegido por reCAPTCHA y se aplican la{" "}
        <a
          href="https://policies.google.com/privacy"
          className="text-[#DA5F6F] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Privacidad
        </a>{" "}
        y las{" "}
        <a
          href="https://policies.google.com/terms"
          className="text-[#DA5F6F] hover:underline"
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
