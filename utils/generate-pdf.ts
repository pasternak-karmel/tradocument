import { ProcurationFormData } from "@/schemas";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generatePDF(data: ProcurationFormData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Format A4 (595 x 842 points)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Helpers
  const marginX = 50;
  const drawText = (
    text: string,
    x: number,
    y: number,
    font = helveticaFont,
    size = 12
  ) => {
    page.drawText(text, {
      x,
      y,
      size,
      font,
    });
  };

  const drawCenteredText = (
    text: string,
    y: number,
    font = helveticaBold,
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

  // Titre du document
  drawCenteredText("PROCURATION", 780, helveticaBold, 18);

  // Début de la procuration
  let currentY = 740;
  const lineHeight = 20;

  drawText(
    `Je soussigné(e), ${data.nom.toUpperCase()} ${data.prenom.toUpperCase()},`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight;

  drawText(
    `né(e) le ${format(new Date(data.dateNaissance), "dd/MM/yyyy", {
      locale: fr,
    })}, à ${
      data.lieuNaissance
    }, de nationalité ${data.nationalite.toLowerCase()},`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight;

  drawText(
    `et domicilié(e) à ${data.adresse}, porteur(se) de la pièce d'identité numéro ${data.numeroIdentite},`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight * 2;

  drawText(
    `déclare par la présente donner procuration pleine et entière à :`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight * 2;

  // Informations du mandataire
  drawText(
    `Monsieur/Madame DJOSSOU Carmel, né(e) le 01/01/1970, à La mairie de Paris,`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight;

  drawText(
    `de nationalité française, domicilié(e) à La réunion de la mairie de Paris, et porteur(se) de la pièce d'identité numéro 2019521111,`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight * 2;

  // Objet de la procuration
  drawText("Pour objet :", marginX, currentY, helveticaBold);
  currentY -= lineHeight;

  drawText(
    `Représenter mes intérêts auprès de l'institution suivante : ${data.institution},`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight;

  drawText(
    `et effectuer les démarches nécessaires pour fournir les documents suivants :`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight;

  drawText(`${data.documents.join(", ")}.`, marginX, currentY, helveticaFont);
  currentY -= lineHeight * 2;

  drawText(
    `Cette procuration est valable jusqu'au ${
      data.dateLimite
        ? format(new Date(data.dateLimite), "dd/MM/yyyy", { locale: fr })
        : "révocation par écrit"
    }.`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight * 2;

  // Clause de réserve
  drawText(
    `En foi de quoi, je signe la présente procuration pour servir et valoir ce que de droit.`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight * 2;

  // Signature
  drawText("Fait à :", marginX, currentY, helveticaBold);
  drawText(`${data.lieuSignature}`, marginX + 60, currentY, helveticaFont);
  currentY -= lineHeight;

  drawText(
    `Le : ${format(new Date(data.dateSignature), "dd/MM/yyyy", {
      locale: fr,
    })}`,
    marginX,
    currentY,
    helveticaFont
  );
  currentY -= lineHeight * 2;

  drawText("Signature du mandant :", marginX, currentY, helveticaBold);
  currentY -= lineHeight * 3;

  // drawText("Signature du mandataire :", marginX, currentY, helveticaBold);

  // drawCenteredText(
  //   "------------ FIN DE LA PROCURATION ------------",
  //   currentY - 60,
  //   helveticaFont,
  //   10
  // );

  // Génération du PDF
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
