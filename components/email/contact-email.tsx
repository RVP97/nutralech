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
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string; // No longer optional
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
  const previewText = `Solicitud de contacto de ${name}: ${inquiryType} - Detalle del mensaje: ${message}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Solicitud de contacto: {inquiryType}
                </Heading>
                <Text style={paragraph}>
                  <b>Nombre: </b>
                  {name}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Teléfono: </b>
                  {phone}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Tipo de consulta: </b>
                  {inquiryType}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Mensaje: </b>
                  {message}
                </Text>
              </Column>
            </Row>
            <Row
              style={{ ...boxInfos, paddingTop: "20px", paddingBottom: "20px" }}
            >
              <Column style={{ padding: "0 20px" }}>
                <a
                  href={`mailto:${email}`}
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: "0",
                    color: "#fff",
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "12px 24px",
                    textDecoration: "none",
                    textAlign: "center",
                    maxWidth: "300px",
                    margin: "0 auto",
                  }}
                >
                  Responder al mensaje
                </a>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © {new Date().getFullYear()} | Grupo Cassatt, México |
            www.nutralech.mx
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px",
};
