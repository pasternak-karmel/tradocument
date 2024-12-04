import { RejoindreSchema } from "@/schemas";
import React from "react";
import { z } from "zod";


export default function RejoindreAdminEmailTemplate(
  data: z.infer<typeof RejoindreSchema>
) {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <img
          src="https://tradocument.vercel.app/logo-removebg-preview.png"
          width="170"
          height="50"
          alt="Tradocument"
          style={styles.logo}
        />
      </div>

      {/* Title Section */}
      <h1 style={styles.title}>Nouvelle Candidature: {data.specialite}</h1>

      {/* Personal Information */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Informations Personnelles</h2>
        <table style={styles.infoTable}>
          <tbody>
            <InfoRow label="Nom" value={data.nom} />
            <InfoRow label="Prénom" value={data.prenom} />
            <InfoRow label="Email" value={data.email} />
            <InfoRow label="Pays" value={data.pays} />
            <InfoRow label="Ville" value={data.ville} />
            <InfoRow label="Adresse" value={data.adresse} />
          </tbody>
        </table>
      </div>

      {/* Company Information */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Informations de l'Entreprise</h2>
        <table style={styles.infoTable}>
          <tbody>
            <InfoRow label="Nom de la Société" value={data.nomSociete} />
            <InfoRow
              label="Adresse de la Société"
              value={data.adresseSociete}
            />
            <InfoRow
              label="Téléphone de la Société"
              value={data.telephoneSociete}
            />
            <InfoRow
              label="Téléphone Mobile de la Société"
              value={data.whatsapp}
            />
          </tbody>
        </table>
      </div>

      {/* Application Details */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Détails de la Candidature</h2>
        <table style={styles.infoTable}>
          <tbody>
            <InfoRow label="Spécialité" value={data.specialite} />
            <InfoRow
              label="Commentaire"
              value={data.commentaire || "Aucun commentaire fourni"}
            />
          </tbody>
        </table>
      </div>

      {/* Attached Files */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Fichiers Joints</h2>
        {data.url && data.url.length > 0 ? (
          <ul style={styles.fileList}>
            {data.url.map((url, index) => (
              <li key={index} style={styles.fileItem}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  Document {index + 1}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noFiles}>Aucun fichier joint</p>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          Cette candidature a été soumise le {new Date().toLocaleString()}.
        </p>
      </div>
    </div>
  );
}

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <tr>
    <td style={styles.infoLabel}>{label} :</td>
    <td style={styles.infoValue}>{value}</td>
  </tr>
);

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  logo: {
    display: "block",
    margin: "0 auto",
  },
  title: {
    fontSize: "24px",
    color: "#1f2937",
    textAlign: "center" as const,
    marginBottom: "20px",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "10px",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  infoTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  infoLabel: {
    fontSize: "14px",
    color: "#4b5563",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
    fontWeight: "bold",
    width: "40%",
  },
  infoValue: {
    fontSize: "14px",
    color: "#1f2937",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  fileList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  fileItem: {
    marginBottom: "8px",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "bold",
  },
  noFiles: {
    fontSize: "14px",
    color: "#4b5563",
  },
  footer: {
    textAlign: "center" as const,
    marginTop: "20px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "20px",
  },
  footerText: {
    fontSize: "12px",
    color: "#6b7280",
  },
};
