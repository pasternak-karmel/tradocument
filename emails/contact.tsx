import { ContactFormData } from "@/schemas";
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

export default function ContactEmailAdmin(contact: ContactFormData) {
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
      <Preview>Nouveau message de contact - Votre Entreprise</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://votre-entreprise.com/logo.png"
            width="170"
            height="50"
            alt="Votre Entreprise"
            style={logo}
          />
          <Heading style={heading}>Nouveau message de contact</Heading>
          <Text style={subheading}>Bonjour,</Text>
          <Text style={paragraph}>
            Un nouveau message de contact a été soumis par{" "}
            <strong style={strongText}>
              {contact.nom} {contact.prenom}
            </strong>
            . Voici un récapitulatif détaillé des informations fournies :
          </Text>
          <Section style={detailsContainer}>
            <table style={table}>
              <tbody>
                <DetailRow label="Nom" value={contact.nom} />
                <DetailRow label="Prénom" value={contact.prenom} />
                <DetailRow label="Email" value={contact.email} />
                <DetailRow label="Pays" value={contact.pays} />
                <DetailRow label="Ville" value={contact.ville} />
                <DetailRow label="Téléphone" value={contact.phoneNumber} />
                <DetailRow label="Objet" value={contact.objet} />
                <DetailRow label="Message" value={contact.message} />
                <DetailRow
                  label="Envoyé le"
                  value={`${formattedDate} à ${formattedTime}`}
                />
              </tbody>
            </table>
          </Section>
          <Text style={paragraph}>
            Merci de prendre en charge ce message dans les plus brefs délais.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            © {new Date().getFullYear()} Votre Entreprise. Tous droits réservés.
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
    <td style={detailValue}>{value}</td>
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

