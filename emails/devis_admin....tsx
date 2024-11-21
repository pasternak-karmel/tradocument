
import { Info } from "@/lib/mail";
import { demandeDevis } from "@/schemas";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { z } from "zod";

export default function DemandeDevisEmailAdmin(
  values: z.infer<typeof demandeDevis>,
  info: Info
) {
  return (
    <Html>
      <Head />
      <Preview>Nouvelle demande de devis - Tradocument</Preview>
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
          <Text style={subheading}>Bonjour,</Text>
          <Text style={paragraph}>
            Une nouvelle demande de devis a été soumise par{" "}
            <strong style={strongText}>
              {values.firstName} {values.lastName}
            </strong>
            . Voici un récapitulatif détaillé des informations fournies :
          </Text>
          <Section style={detailsContainer}>
            <table style={table}>
              <tbody>
                <DetailRow
                  label="Nom et prénom"
                  value={`${values.firstName} ${values.lastName}`}
                />
                <DetailRow label="Email" value={values.email} />
                <DetailRow label="Téléphone" value={`+${values.phone}`} />
                <DetailRow label="Pays" value={values.country} />
                <DetailRow
                  label="Type de document"
                  value={values.documentType}
                />
                <DetailRow
                  label="Langue source"
                  value={values.sourceLanguage}
                />
                <DetailRow label="Langue cible" value={values.targetLanguage} />
                {values.deadline && (
                  <DetailRow label="Délai souhaité" value={values.deadline} />
                )}
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
                    {/* Uncomment if shipping address is needed */}
                    {/* <DetailRow
                      label="Adresse d'expédition"
                      value={values.deliveryAddress.shippingAddress}
                    /> */}
                  </>
                )}
                <DetailRow
                  label="Montant total"
                  value={`${info.montant.toFixed(2)} €`}
                />
                {info.fichier.length > 0 && (
                  <DetailRow
                    label="Fichiers"
                    value={info.fichier
                      .map(
                        (fileUrl, index) =>
                          `<a href="${fileUrl}" target="_blank" style="color: blue; text-decoration: underline;">Fichier ${index + 1}</a>`
                      )
                      .join(", ")}
                  />
                )}
              </tbody>
            </table>
          </Section>
          <Text style={paragraph}>
            Merci de prendre en charge cette demande de devis dans les plus brefs
            délais.
          </Text>
          <Hr style={hr} />

          <Text style={footer}>
            © {new Date().getFullYear()} Tradocument. Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Helper component for rendering table rows
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <tr>
    <td style={detailLabel}>{label}</td>
    <td style={detailValue}>
      <span dangerouslySetInnerHTML={{ __html: value }} />
    </td>
  </tr>
);

const main = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f9f9f9",
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

const logo = {
  display: "block",
  margin: "0 auto 20px",
};

const heading = {
  fontSize: "24px",
  color: "#333333",
  textAlign: "center" as const,
  marginBottom: "20px",
};

const subheading = {
  fontSize: "18px",
  color: "#555555",
  marginBottom: "10px",
};

const paragraph = {
  fontSize: "16px",
  color: "#555555",
  lineHeight: "1.5",
  marginBottom: "20px",
};

const detailsContainer = {
  marginTop: "20px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginBottom: "20px",
};

const detailLabel = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#333333",
  padding: "10px",
  textAlign: "left" as const,
  borderBottom: "1px solid #ddd",
};

const detailValue = {
  fontSize: "14px",
  color: "#555555",
  padding: "10px",
  textAlign: "left" as const,
  borderBottom: "1px solid #ddd",
};

const hr = {
  border: "none",
  borderTop: "1px solid #eee",
  margin: "20px 0",
};

const footer = {
  fontSize: "12px",
  color: "#999999",
  textAlign: "center" as const,
  marginTop: "20px",
};


const strongText = {
  color: "#2d3748",
  fontWeight: "600",
};

const link = {
  color: "#3182ce",
  textDecoration: "none",
};
