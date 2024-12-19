import { ProcurationFormData } from "@/schemas";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePDF(data: ProcurationFormData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Helper functions
  const drawText = (text: string, x: number, y: number, font = timesRoman, size = 11, color = rgb(0, 0, 0)) => {
    page.drawText(text, { x, y, size, font, color });
  };

  const drawCenteredText = (text: string, y: number, font = timesBold, size = 14) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (page.getWidth() - textWidth) / 2,
      y,
      size,
      font,
    });
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    page.drawLine({
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  };

  // Document title
  drawCenteredText("PROCURATION", 800, timesBold, 18);
  drawLine(50, 790, 545, 790);

  // Content
  let y = 750;
  const lineHeight = 20;

  drawText(`Je, soussigné(e) ${data.prenom} ${data.nom.toUpperCase()}`, 140, y, timesBold);
  y -= lineHeight;

  drawText(`Né(e) le ${format(new Date(data.dateNaissance), "dd/MM/yyyy", { locale: fr })} à ${data.lieuNaissance},`, 50, y);
  y -= lineHeight;

  drawText(`de nationalité ${data.nationalite},`, 50, y);
  y -= lineHeight;

  drawText(`demeurant à ${data.adresse},`, 50, y);
  y -= lineHeight;

  drawText(`titulaire de la pièce d'identité numéro ${data.numeroIdentite},`, 50, y);
  y -= lineHeight ;

  drawText("donne par la présente pouvoir à :", 50, y);
  y -= lineHeight;

  drawText("Monsieur/Madame DJOSSOU Carmel", 50, y, timesBold);
  y -= lineHeight;

  drawText("Né(e) le 01/01/1970 à La mairie de Paris,", 50, y);
  y -= lineHeight;

  drawText("de nationalité française,", 50, y);
  y -= lineHeight;

  drawText("domicilié(e) à La réunion de la mairie de Paris,", 50, y);
  y -= lineHeight;

  drawText("titulaire de la pièce d'identité numéro 2019521111,", 50, y);
  y -= lineHeight * 2;

  drawText("Afin de :", 50, y, timesBold);
  y -= lineHeight;

  drawText(`Représenter mes intérêts auprès de l'institution suivante : ${data.institution},`, 70, y);
  y -= lineHeight;

  drawText("et effectuer les démarches nécessaires pour fournir les documents suivants :", 70, y);
  y -= lineHeight;

  data.documents.forEach((doc) => {
    drawText(`- ${doc}`, 90, y);
    y -= lineHeight;
  });

  y -= lineHeight;

  if (data.dateLimite) {
    drawText(`Cette procuration est valable jusqu'au ${format(new Date(data.dateLimite), "dd/MM/yyyy", { locale: fr })}.`, 50, y, timesRoman);
  y -= lineHeight * 2;

  drawText("Je conserve la responsabilité de toutes les actions effectuées par le mandataire", 50, y);
  y -= lineHeight;
  drawText("en vertu de la présente procuration.", 50, y);
  y -= lineHeight * 2;

  drawText(`Fait à ${data.lieuSignature}, le ${format(new Date(data.dateSignature), "dd/MM/yyyy", { locale: fr })}, en 2 (deux) exemplaires originaux.`, 50, y);
  y -= lineHeight * 3;

  // Signature boxes
  const boxWidth = 200;
  const boxHeight = 80;
  
  page.drawRectangle({
    x: 50,
    y: y - boxHeight,
    width: boxWidth,
    height: boxHeight,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
  drawText("SIGNATURE DU MANDANT", 70, y + 10, timesBold, 10);

  page.drawRectangle({
    x: 545 - boxWidth,
    y: y - boxHeight,
    width: boxWidth,
    height: boxHeight,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
  drawText("SIGNATURE DU MANDATAIRE", 375, y + 10, timesBold, 10);

  y -= boxHeight + 30;

  drawText("Pièce jointe : Copie de la pièce d'identité.", 50, y, timesRoman, 10);

  // Footer
  drawLine(50, 50, 545, 50);
  drawCenteredText("Page 1/1", 30, timesRoman, 10);

  // Generate and download PDF
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
}}