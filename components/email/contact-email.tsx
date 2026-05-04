import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import type * as React from "react";

interface EmailTemplateProps {
	name: string;
	email: string;
	phone: string;
	inquiryType: string;
	message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	name,
	email,
	phone,
	inquiryType,
	message,
}) => {
	const previewText = `Contacto de ${name}: ${inquiryType}`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={header}>
						<Heading style={headerTitle}>
							Nuevo contacto
						</Heading>
						<Text style={headerSubtitle}>{inquiryType}</Text>
					</Section>

					<Section style={content}>
						<Row style={fieldRow}>
							<Column>
								<Text style={label}>Nombre</Text>
								<Text style={value}>{name}</Text>
							</Column>
						</Row>
						<Row style={fieldRow}>
							<Column>
								<Text style={label}>Email</Text>
								<Text style={value}>{email}</Text>
							</Column>
						</Row>
						<Row style={fieldRow}>
							<Column>
								<Text style={label}>Teléfono</Text>
								<Text style={value}>{phone}</Text>
							</Column>
						</Row>
						<Row style={{ padding: "16px 24px 24px" }}>
							<Column>
								<Text style={label}>Mensaje</Text>
								<Text style={messageText}>{message}</Text>
							</Column>
						</Row>

						<Row style={{ padding: "0 24px 24px" }}>
							<Column style={{ textAlign: "center" as const }}>
								<a href={`mailto:${email}`} style={replyButton}>
									Responder a {name}
								</a>
							</Column>
						</Row>
					</Section>

					<Text style={footer}>
						Nutralech · nutralech.com
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

const main = {
	backgroundColor: "#f8f7f6",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	padding: "24px 0",
};

const container = {
	maxWidth: "520px",
	margin: "0 auto",
};

const header = {
	backgroundColor: "#DA5F6F",
	borderRadius: "12px 12px 0 0",
	padding: "28px 24px",
	textAlign: "center" as const,
};

const headerTitle = {
	fontSize: "22px",
	fontWeight: "600" as const,
	color: "#ffffff",
	margin: "0 0 4px",
};

const headerSubtitle = {
	fontSize: "14px",
	color: "rgba(255, 255, 255, 0.85)",
	margin: "0",
};

const content = {
	backgroundColor: "#ffffff",
	borderRadius: "0 0 12px 12px",
	border: "1px solid #eee",
	borderTop: "none",
};

const fieldRow = {
	padding: "16px 24px 0",
};

const label = {
	fontSize: "11px",
	fontWeight: "600" as const,
	textTransform: "uppercase" as const,
	letterSpacing: "0.05em",
	color: "#999",
	margin: "0 0 2px",
};

const value = {
	fontSize: "15px",
	color: "#2a2a2a",
	margin: "0",
};

const messageText = {
	fontSize: "15px",
	color: "#2a2a2a",
	lineHeight: "1.6",
	margin: "0",
	whiteSpace: "pre-wrap" as const,
};

const replyButton = {
	backgroundColor: "#DA5F6F",
	borderRadius: "8px",
	color: "#ffffff",
	display: "inline-block",
	fontSize: "14px",
	fontWeight: "600" as const,
	padding: "12px 28px",
	textDecoration: "none",
};

const footer = {
	textAlign: "center" as const,
	fontSize: "12px",
	color: "#999",
	padding: "20px 0 0",
};
