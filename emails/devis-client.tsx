import { demandeDevis } from "@/schemas";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";
import { z } from "zod";

export default function DemandeDevisEmail(
  values: z.infer<typeof demandeDevis>
) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Heading
            style={{
              textAlign: "center",
              color: "#333333",
              margin: "0 0 20px",
            }}
          >
            Confirmation de votre demande de devis
          </Heading>
          <Text
            style={{ fontSize: "16px", color: "#555555", marginBottom: "20px" }}
          >
            Bonjour{" "}
            <strong>
              {values.firstName} {values.lastName}
            </strong>
            ,
          </Text>
          <Text
            style={{ fontSize: "16px", color: "#555555", marginBottom: "20px" }}
          >
            Merci pour votre demande de devis. Voici les informations que nous
            avons reçues :
          </Text>

          <Section>
            <Text>
              <strong>Adresse e-mail :</strong> {values.email}
            </Text>
            <Text>
              <strong>Téléphone :</strong> {values.phone}
            </Text>
            <Text>
              <strong>Pays :</strong> {values.country}
            </Text>
            <Text>
              <strong>Type de document :</strong> {values.documentType}
            </Text>
            <Text>
              <strong>Langue source :</strong> {values.sourceLanguage}
            </Text>
            <Text>
              <strong>Langue cible :</strong> {values.targetLanguage}
            </Text>
            {values.deadline && (
              <Text>
                <strong>Délais souhaité :</strong> {values.deadline}
              </Text>
            )}
            {values.additionalInfo && (
              <Text>
                <strong>Informations supplémentaires :</strong>{" "}
                {values.additionalInfo}
              </Text>
            )}
            {values.deliveryAddress && (
              <>
                <Text>
                  <strong>Adresse de départ :</strong>{" "}
                  {values.deliveryAddress.departureAddress}
                </Text>
                <Text>
                  <strong>Adresse d'expédition :</strong>{" "}
                  {values.deliveryAddress.shippingAddress}
                </Text>
              </>
            )}
            {/* {url?.length! > 0 && (
              <>
                <Text><strong>Fichiers liés :</strong></Text>
                <ul>
                  {url?.map((link, index) => (
                    <li key={index}>
                      <a href={link} style={{ color: '#1d72b8', textDecoration: 'none' }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </>
            )} */}
          </Section>

          <Hr style={{ margin: "20px 0", borderColor: "#eaeaea" }} />

          <Text
            style={{ fontSize: "14px", color: "#555555", marginBottom: "20px" }}
          >
            Si les informations ci-dessus sont incorrectes, veuillez nous
            contacter immédiatement.
          </Text>

          <Button
            href="https://example.com/confirm"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Confirmer ma demande
          </Button>

          <Text
            style={{
              fontSize: "12px",
              color: "#aaaaaa",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Glace & Confort. Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
