import { type NextRequest, NextResponse } from "next/server";
import * as React from "react";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/email/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	const { token, name, email, message, phone, inquiryType } =
		await request.json();

	try {
		const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
		const recaptchaResponse = await fetch(recaptchaUrl, { method: "POST" });
		const recaptchaData = await recaptchaResponse.json();

		if (!recaptchaData.success) {
			return NextResponse.json(
				{ message: "reCAPTCHA verification failed" },
				{ status: 400 },
			);
		}

		const emailData = {
			name,
			message,
			email,
			inquiryType,
			phone: phone || "No proporcionado",
		};

		const { data, error } = await resend.emails.send({
			from: `Nutralech Contacto <contacto@contacto.hotelcatedral.com>`,
			to: ["rovapin@gmail.com", "marialyalonso@gmail.com"],
			replyTo: email,
			subject: `Nuevo contacto: ${inquiryType} – ${name}`,
			react: React.createElement(EmailTemplate, emailData),
		});

		if (error) {
			return NextResponse.json(
				{ message: "Error sending email", error },
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ message: "Form submitted successfully", data },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error processing form submission:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
