import { ProcurationFormData } from "@/schemas";
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

export default function ProcurationEmail(values: ProcurationFormData) {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de votre procuration - Tradocument</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://tradocument.vercel.app/logo-removebg-preview.png"
            width="170"
            height="50"
            alt="Tradocument"
            style={logo}
          />
          <Heading style={heading}>Confirmation de votre procuration</Heading>
          <Text style={subheading}>
            Bonjour{" "}
            <strong style={strongText}>
              {values.nom} {values.prenom}
            </strong>
            ,
          </Text>
          <Text style={paragraph}>
            Nous confirmons la réception de votre procuration. Voici un
            récapitulatif des informations fournies :
          </Text>
          <Section style={detailsContainer}>
            <table style={table}>
              <tbody>
                <DetailRow
                  label="Type de document"
                  value={values.documents.join(", ")}
                />
                <DetailRow
                  label="Date de naissance"
                  value={values.dateNaissance}
                />
                <DetailRow
                  label="Lieu de naissance"
                  value={values.lieuNaissance}
                />
                <DetailRow
                  label="Nationalité"
                  value={values.nationalite}
                />
                
                <DetailRow
                  label="Date Limite"
                  value={values.dateLimite ?? ''} />
                <DetailRow
                  label="Lieu de récupération"
                  value={values.institution} />
                
                <p>Signé le : {values.dateSignature} à {values.lieuSignature}</p>
              </tbody>
            </table>
          </Section>
          <Text style={paragraph}>
            Votre procuration a été enregistrée avec succès dans notre système.
            Vous pouvez la consulter à tout moment dans votre espace personnel.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Pour toute question ou modification, n'hésitez pas à nous contacter
            à{" "}
            <Link href="mailto:contact@tradocument.com" style={link}>
              contact@tradocument.com
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
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const subheading = {
  color: "#1a202c",
  fontSize: "18px",
  margin: "20px 0",
};

const paragraph = {
  color: "#4a5568",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "20px 0",
};

const detailsContainer = {
  margin: "20px 0",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const detailLabel = {
  color: "#718096",
  padding: "8px 12px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "14px",
  textAlign: "left" as const,
  width: "40%",
};

const detailValue = {
  color: "#1a202c",
  padding: "8px 12px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "14px",
  textAlign: "left" as const,
};

const link = {
  color: "#2b6cb0",
  textDecoration: "underline",
};

const strongText = {
  color: "#2d3748",
  fontWeight: "bold",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "30px 0",
};

const footer = {
  color: "#718096",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "40px 0 0",
};
