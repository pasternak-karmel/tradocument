import { ProcurationFormData } from "@/schemas";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generatePDF(
  data: ProcurationFormData,
  signatureFile?: File
) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Helper function for centered text
  const drawCenteredText = (
    text: string,
    y: number,
    font = helveticaFont,
    size = 12
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (page.getWidth() - textWidth) / 2,
      y,
      size,
      font,
    });
  };

  // Title
  drawCenteredText("PROCURATION", 800, helveticaBold, 16);

  // Mandator's information
  let currentY = 750;
  const lineHeight = 20;

  page.drawText("Je soussigné(e),", {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(`Nom - Prénom : ${data.nom} ${data.prenom}`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(
    `Né(e) le : ${format(new Date(data.dateNaissance), "dd/MM/yyyy", {
      locale: fr,
    })}`,
    { x: 50, y: currentY, size: 12, font: helveticaFont }
  );
  currentY -= lineHeight;

  page.drawText(`À : ${data.lieuNaissance}`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(`Nationalité : ${data.nationalite}`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(`Domicilié(e) à : ${data.adresse}`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(`Numéro d'identité ou de passeport : ${data.numeroIdentite}`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight * 2;

  // Attorney's information
  page.drawText("DÉCLARE DONNER POUVOIR À :", {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaBold,
  });
  currentY -= lineHeight;

  page.drawText(
    `Nom- Prénom : DJOSSOU Carmel`,
    { x: 50, y: currentY, size: 12, font: helveticaFont }
  );
  currentY -= lineHeight;

  // Continue with all other fields...
   // Informations supplémentaires sur le mandataire
   page.drawText(
    `Né(e) le : 01/01/1970`,
    { x: 50, y: currentY, size: 12, font: helveticaFont }
  );
  currentY -= lineHeight;

  page.drawText(`À : La mairie de Paris`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(`Nationalité : Française`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(`Domicilié(e) à : La reunion de la mairie de Paris`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(
    `Numéro d'identité ou de passeport 2019521111`,
    { x: 50, y: currentY, size: 12, font: helveticaFont }
  );
  currentY -= lineHeight * 2;

  // Objet et institution
  page.drawText("OBJET DE LA PROCURATION :", {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaBold,
  });
  currentY -= lineHeight;

  page.drawText(`Institution : ${data.institution}`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(`Documents à fournir : ${data.documents.join(", ")}`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight * 2;


  // Signature
  page.drawText("SIGNATURE :", {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaBold,
  });
  currentY -= lineHeight;

  page.drawText(`Lieu : ${data.lieuSignature}`, {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });
  currentY -= lineHeight;

  page.drawText(
    `Date : ${format(new Date(data.dateSignature), "dd/MM/yyyy", { locale: fr })}`,
    { x: 50, y: currentY, size: 12, font: helveticaFont }
  );
  currentY -= lineHeight * 2;

  if (signatureFile) {
    const signatureBytes = await signatureFile.arrayBuffer();
    const signatureImage = await pdfDoc.embedPng(signatureBytes);
    const signatureDims = signatureImage.scale(0.5);

    page.drawImage(signatureImage, {
      x: 50,
      y: currentY - signatureDims.height,
      width: signatureDims.width,
      height: signatureDims.height,
    });
    currentY -= signatureDims.height + lineHeight;
  } else {
    page.drawText("Signature manquante.", {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
    currentY -= lineHeight;
  }

  // Finalisation
  page.drawText("Fait pour servir et valoir ce que de droit.", {
    x: 50,
    y: currentY,
    size: 12,
    font: helveticaFont,
  });

  // Save and download the PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `procuration-${data.nom}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
