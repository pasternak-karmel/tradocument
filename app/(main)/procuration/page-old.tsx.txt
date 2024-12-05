'use client'

import React, { useState, useRef } from "react"
import { format } from "date-fns"
import { fr } from 'date-fns/locale'
import { motion } from "framer-motion"
import SignaturePad from 'react-signature-canvas'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, RefreshCw } from 'lucide-react'

interface ProcurationFormData {
  typeProcuration: string
  nomMandant: string
  prenomMandant: string
  dateNaissanceMandant: string
  lieuNaissanceMandant: string
  nationaliteMandant: string
  adresseMandant: string
  dateDebut: string
  dateFin: string
  lieuSignature: string
  pieceIdentiteMandant: File | null
  signature: string
}

export default function ProcurationComplete() {
  const today = format(new Date(), "dd/MM/yyyy")
  const signaturePadRef = useRef<SignaturePad>(null)
  const [formData, setFormData] = useState<ProcurationFormData>({
    typeProcuration: "",
    nomMandant: "",
    prenomMandant: "",
    dateNaissanceMandant: "",
    lieuNaissanceMandant: "",
    nationaliteMandant: "",
    adresseMandant: "",
    dateDebut: "",
    dateFin: "",
    lieuSignature: "",
    pieceIdentiteMandant: null,
    signature: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData((prev) => ({ ...prev, pieceIdentiteMandant: file }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear()
    }
  }

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
    // Helper function for centered text
    const drawCenteredText = (text: string, y: number, font = helveticaFont, size = 12) => {
      const textWidth = font.widthOfTextAtSize(text, size);
      page.drawText(text, {
        x: (page.getWidth() - textWidth) / 2,
        y,
        size,
        font,
      });
    };
  
    // Draw header
    drawCenteredText("Objet : Procuration", 800, helveticaBold, 14);
  
    // Draw main content
    const startY = 750;
    const lineHeight = 20;
    let currentY = startY;
  
    // Format dates
    const birthDate = formData.dateNaissanceMandant
      ? format(new Date(formData.dateNaissanceMandant), "dd/MM/yyyy", { locale: fr })
      : "___/___/____";
  
    const today = format(new Date(), "dd/MM/yyyy", { locale: fr });
  
    // First paragraph
    page.drawText(`Je, soussigné(e) ${formData.prenomMandant} ${formData.nomMandant},`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    currentY -= lineHeight;
    page.drawText(`né(e) le ${birthDate} à ${formData.lieuNaissanceMandant},`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    currentY -= lineHeight;
    page.drawText(`de nationalité ${formData.nationaliteMandant},`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    currentY -= lineHeight;
    page.drawText(`demeurant à ${formData.adresseMandant},`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    currentY -= lineHeight * 2;
    page.drawText(`donne par la présente pouvoir à l'entité Tradocument,`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    // Draw horizontal line
    currentY -= lineHeight;
    page.drawLine({
      start: { x: 50, y: currentY },
      end: { x: 545, y: currentY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  
    currentY -= lineHeight * 2;
    page.drawText(`afin qu'elle puisse récupérer le document suivant en mon nom :`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    currentY -= lineHeight;
    page.drawText(`${formData.typeProcuration}`, {
      x: 70,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    // Draw another horizontal line
    currentY -= lineHeight;
    page.drawLine({
      start: { x: 50, y: currentY },
      end: { x: 545, y: currentY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  
    // Duration text
    currentY -= lineHeight * 2;
    const durationText = formData.dateFin
      ? `Cette procuration est confiée à Tradocument pour une durée du ${formData.dateDebut} au ${formData.dateFin}.`
      : `Cette procuration est confiée à Tradocument pour une durée indéterminée.`;
  
    page.drawText(durationText, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    currentY -= lineHeight;
    page.drawText(`Je me réserve la possibilité d'y mettre fin à tout moment.`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    // Draw another horizontal line
    currentY -= lineHeight;
    page.drawLine({
      start: { x: 50, y: currentY },
      end: { x: 545, y: currentY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  
    // Responsibility text
    currentY -= lineHeight * 2;
    page.drawText(
      `Je conserve la responsabilité de toutes les actions effectuées par le mandataire`,
      {
        x: 50,
        y: currentY,
        size: 12,
        font: helveticaFont,
      }
    );
  
    currentY -= lineHeight;
    page.drawText(`en vertu de la présente procuration.`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    // Date and signature section
    currentY -= lineHeight * 3;
    page.drawText(`Fait le ${today}, en 2 (deux) exemplaires originaux,`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
  
    // Signature sections
    currentY -= lineHeight * 3;
    drawCenteredText("SIGNATURE DU MANDANT", currentY, helveticaBold, 12);
  
    // Add signature if available
    if (signaturePadRef.current) {
      const signatureData = signaturePadRef.current.toDataURL();
      const signatureImage = await pdfDoc.embedPng(signatureData);
      page.drawImage(signatureImage, {
        x: 197.5,
        y: currentY - 100,
        width: 200,
        height: 100,
      });
    }
  
   // Mandataire signature section
currentY -= lineHeight * 8;
drawCenteredText("SIGNATURE DU MANDATAIRE", currentY, helveticaBold, 12);

// Ajouter une image de signature pour le mandataire
try {
  // Charger l'image de signature
  const mandataireSignatureUrl = "/signature-mandataire.png"; // Remplacez par le chemin correct
  const mandataireSignatureResponse = await fetch(mandataireSignatureUrl);
  const mandataireSignatureData = await mandataireSignatureResponse.arrayBuffer();
  const mandataireSignatureImage = await pdfDoc.embedPng(mandataireSignatureData);

  // Dessiner l'image de la signature sur le PDF
  page.drawImage(mandataireSignatureImage, {
    x: (page.getWidth() - 200) / 2, // Centré horizontalement
    y: currentY - 50, // Ajuster selon la position souhaitée
    width: 200, // Largeur de l'image
    height: 30, // Hauteur de l'image
  });
} catch (error) {
  console.error("Erreur lors du chargement de la signature du mandataire :", error);
}

  
    // Footer text for attached document
    currentY -= lineHeight * 10;
    page.drawText(`Pièce jointe : Copie de la pièce d'identité.`, {
      x: 50,
      y: 30, // Bas de la page
      size: 10,
      font: helveticaFont,
    });
  
    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `procuration-${formData.nomMandant}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Création de Procuration
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Formulaire de Procuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <h3 className="text-lg font-semibold">Informations du Mandant</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomMandant">Nom</Label>
                  <Input
                    id="nomMandant"
                    name="nomMandant"
                    value={formData.nomMandant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prenomMandant">Prénom</Label>
                  <Input
                    id="prenomMandant"
                    name="prenomMandant"
                    value={formData.prenomMandant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lieuNaissanceMandant">Lieu de naissance</Label>
                <Input
                  id="lieuNaissanceMandant"
                  name="lieuNaissanceMandant"
                  value={formData.lieuNaissanceMandant}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateNaissanceMandant">Date de naissance</Label>
                <Input
                  type="date"
                  id="dateNaissanceMandant"
                  name="dateNaissanceMandant"
                  value={formData.dateNaissanceMandant}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nationaliteMandant">Nationalité</Label>
                <Input
                  id="nationaliteMandant"
                  name="nationaliteMandant"
                  value={formData.nationaliteMandant}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="adresseMandant">Adresse</Label>
                <Input
                  id="adresseMandant"
                  name="adresseMandant"
                  value={formData.adresseMandant}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="typeProcuration">Document à récupérer</Label>
                <Select onValueChange={handleSelectChange("typeProcuration")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type du document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acte de naissance">Acte de naissance</SelectItem>
                    <SelectItem value="Permis de conduire">Permis de conduire</SelectItem>
                    <SelectItem value="Acte de mariage">Acte de mariage</SelectItem>
                    <SelectItem value="Autorisation pour ken">Autorisation pour ken</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateDebut">Date de début (optionnel)</Label>
                  <Input
                    type="date"
                    id="dateDebut"
                    name="dateDebut"
                    value={formData.dateDebut}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
                  <Input
                    type="date"
                    id="dateFin"
                    name="dateFin"
                    value={formData.dateFin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pieceIdentiteMandant">Copie de la pièce d'identité du Mandant</Label>
                <Input
                  type="file"
                  id="pieceIdentiteMandant"
                  name="pieceIdentiteMandant"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
              </div>
              <div className="space-y-2">
                <Label>Votre signature</Label>
                <div className="border rounded-lg p-2 bg-white">
                  <SignaturePad
                    ref={signaturePadRef}
                    canvasProps={{
                      className: "w-full h-40 border rounded",
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearSignature}
                    className="mt-2"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Effacer la signature
                  </Button>
                </div>
              </div>
              <Button
                type="button"
                className="w-full"
                onClick={generatePDF}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger le PDF
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-gray-700 bg-white p-8 rounded-lg min-h-[29.7cm] w-full max-w-[21cm] mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="font-bold">Objet : Procuration</h2>
              </div>
              <div className="space-y-6 text-justify">
                <p>
                  Je, soussigné(e) {formData.prenomMandant || "___"}{" "}
                  {formData.nomMandant || "___"}, né(e) le{" "}
                  {formData.dateNaissanceMandant || "___"}{" "}
                  à {formData.lieuNaissanceMandant || "___"}, donne par la
                  présente pouvoir à l'entité{" "}
                  <span className="font-semibold">Tradocument</span>,
                </p>
                <div className="w-full border-b border-black"></div>
                <p>
                  afin qu'elle puisse récupérer le document suivant en mon nom:
                </p>
                <li>{formData.typeProcuration || "___"}</li>
                <div className="w-full border-b border-black"></div>
                <p>
                  Cette procuration est confiée à{" "}
                  <span className="font-semibold">Tradocument</span> pour une
                  durée
                  {formData.dateFin
                    ? ` du ${formData.dateDebut} au ${formData.dateFin}`
                    : " indéterminée"}
                  . Je me réserve la possibilité d'y mettre fin à tout moment.
                </p>
                <div className="w-full border-b border-black my-4"></div>
                <p>
                  Je conserve la responsabilité de toutes les actions effectuées
                  par le mandataire en vertu de la présente procuration.
                </p>
                <div className="mt-12">
                  <p>Fait le {today}, en 2 (deux) exemplaires originaux,</p>
                </div>
                <div className="space-y-8 mt-16">
                  <div>
                    <p className="text-center font-bold mb-16">
                      SIGNATURE DU MANDANT
                    </p>
                    <div className="w-full text-center">
                      <div className="border-b border-black w-48 mx-auto"></div>
                      <div className="border-b border-black w-48 mx-auto mt-2"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-center font-bold mb-16">
                      SIGNATURE DU MANDATAIRE
                    </p>
                    <div className="w-full text-center">
                      <div className="border-b border-black w-48 mx-auto"></div>
                      <div className="border-b border-black w-48 mx-auto mt-2"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <p>Pièce jointe: Copie de la pièce d'identité du mandant</p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}