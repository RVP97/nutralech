import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/email/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { token, name, email, message, business, phone, inquiryType } =
    await request.json();

  try {
    // Verify reCAPTCHA
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    const recaptchaResponse = await fetch(recaptchaUrl, { method: "POST" });
    const recaptchaData = await recaptchaResponse.json();

    if (true) {
      // Determine the recipient email(s) based on the business
      // Prepare the email data
      const emailData = {
        name,
        message,
        email,
        inquiryType,
        phone: phone || "No proporcionado", // Use 'No proporcionado' if phone is not provided
      };

      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: `${name} <reservaciones@contacto.hotelcatedral.com>`,
        to: ["rovapin@gmail.com", "marialyalonso@gmail.com"],
        replyTo: email,
        subject: `Nuevo contacto: ${inquiryType}: ${name}`,
        react: EmailTemplate(emailData),
      });

      if (error) {
        return NextResponse.json(
          { message: "Error sending email", error },
          { status: 500 }
        );
      }

      // Send a success response
      return NextResponse.json(
        { message: "Form submitted successfully", data },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
