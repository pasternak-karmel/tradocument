import { demandeDevis } from "@/schemas";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { z } from "zod";

export default function DemandeDevisEmail(
  values: z.infer<typeof demandeDevis>
) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <Html>
      <Head />
      <Preview>Récapitulatif de votre demande de devis - Tradocument</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://tradocument.vercel.app/logo-removebg-preview.png"
            width="170"
            height="50"
            alt="Tradocument"
            style={logo}
          />
          <Heading style={heading}>Récapitulatif de votre demande</Heading>
          <Text style={subheading}>
            Bonjour{" "}
            <strong style={strongText}>
              {values.firstName} {values.lastName}
            </strong>
            ,
          </Text>
          <Text style={paragraph}>
            Nous vous remercions pour votre demande de devis. Voici un
            récapitulatif détaillé des informations que vous nous avez fournies
            :
          </Text>
          <Section style={detailsContainer}>
            <table style={table}>
              <tbody>
                <DetailRow label="Email" value={values.email} />
                <DetailRow label="Téléphone" value={`+${values.phone}`} />
                <DetailRow label="Pays" value={values.country} />
                <DetailRow
                  label="Type de document"
                  value={values.documentType}
                />
                {values.customDocumentType && (
                  <DetailRow
                    label="Document type spécifique"
                    value={values.customDocumentType}
                  />
                )}
                <DetailRow
                  label="Langue source"
                  value={values.sourceLanguage}
                />
                <DetailRow label="Langue cible" value={values.targetLanguage} />
                {values.additionalInfo && (
                  <DetailRow
                    label="Informations supplémentaires"
                    value={values.additionalInfo}
                  />
                )}
                {values.deliveryAddress && (
                  <>
                    <DetailRow
                      label="Adresse de départ"
                      value={values.deliveryAddress.departureAddress}
                    />
                    {/* <DetailRow label="Adresse d'expédition" value={values.deliveryAddress.shippingAddress} /> */}
                  </>
                )}
                <DetailRow
                  label="Envoyé le"
                  value={`${formattedDate} à ${formattedTime}`}
                />
              </tbody>
            </table>
          </Section>
          <Text style={paragraph}>
            Notre équipe d'experts va examiner attentivement votre demande et
            vous contactera dans les plus brefs délais.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Si vous souhaitez modifier ces informations ou avez des questions
            supplémentaires, n'hésitez pas à nous contacter à{" "}
            <Link href="mailto:contact@tradocument.com" style={link}>
              contact@tradocument.com
            </Link>{" "}
            ou au{" "}
            <Link href="tel:+33123456789" style={link}>
              +33 1 23 45 67 89
            </Link>
            .
          </Text>
          <Text style={footer}>
            © {new Date().getFullYear()} Tradocument. Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <tr>
    <td style={detailLabel}>{label}</td>
    <td style={detailValue}>{value}</td>
  </tr>
);

const main = {
  backgroundColor: "#f4f7fa",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto 30px",
  display: "block",
};

const heading = {
  color: "#1a202c",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 30px",
  lineHeight: "32px",
};

const subheading = {
  fontSize: "20px",
  lineHeight: "28px",
  fontWeight: "600",
  color: "#2d3748",
  marginBottom: "20px",
};

const paragraph = {
  color: "#4a5568",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "24px",
};

const detailsContainer = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "30px",
  border: "1px solid #e2e8f0",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const detailLabel = {
  color: "#4a5568",
  fontWeight: "600",
  padding: "8px 12px 8px 0",
  verticalAlign: "top",
  width: "40%",
};

const detailValue = {
  color: "#1a202c",
  padding: "8px 0",
  verticalAlign: "top",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "30px 0",
};

const footer = {
  color: "#a0aec0",
  fontSize: "12px",
  marginTop: "30px",
  textAlign: "center" as const,
};

const strongText = {
  color: "#2d3748",
  fontWeight: "600",
};

const link = {
  color: "#3182ce",
  textDecoration: "none",
};
