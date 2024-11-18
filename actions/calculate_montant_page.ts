"use server";

import axios from "axios";
import { PDFDocument } from "pdf-lib";
import mammoth from "mammoth";
import ExcelJS from "exceljs";
import { auth } from "@/auth";
import { showError } from "@/function/notification-toast";

// Function to get the page count for PDF files
export async function getPDFPageCount(fileUrl: string): Promise<number | null> {
  try {
    const token = await auth();
    const response = await axios(fileUrl, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const pdfDoc = await PDFDocument.load(response.data);
    const pageCount = pdfDoc.getPageCount();

    return pageCount * 69;
  } catch (error) {
    console.error(
      "Erreur lors du téléchargement ou de l'analyse du fichier:",
      error
    );
    showError("Erreur lors du téléchargement ou de l'analyse du fichier:");
    return null;
  }
}

// Function to get the page count for DOCX files
async function getDocxPageCount(fileUrl: string): Promise<number | null> {
  try {
    const token = await auth();
    const response = await axios(fileUrl, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ensure `response.data` is a valid array buffer
    const arrayBuffer = response.data;
    if (!arrayBuffer) {
      showError("Failed to retrieve file data.");
      return null;
    }

    const result = await mammoth.extractRawText({ buffer: arrayBuffer });
    if (!result.value) {
      showError("Mammoth failed to extract text from the document.");
      return null;
    }

    const wordCount = result.value.split(/\s+/).length;
    const wordsPerPage = 300;
    const pageCount = Math.ceil(wordCount / wordsPerPage);

    return pageCount * 69;
  } catch (error) {
    console.error("Error processing DOCX file:", error);
    showError("Error processing DOCX file:");
    return null;
  }
}

// Function to get the page count for Excel files
export async function getExcelPageCount(
  fileUrl: string
): Promise<number | null> {
  try {
    const token = await auth();
    const response = await axios(fileUrl, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(response.data);

    const sheetCount = workbook.worksheets.length;
    const pagesPerSheet = 1; // Assume each sheet counts as one "page"
    const pageCount = sheetCount * pagesPerSheet;

    return pageCount * 69; // Adjust price per page
  } catch (error) {
    showError("Erreur lors de l'analyse du fichier Excel:");
    return null;
  }
}

export async function calculateMontantPage(
  fileUrl: string
): Promise<number | null> {
  try {
    const token = await auth();
    const response = await axios.head(fileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = response.headers["content-type"];

    if (contentType === "application/pdf") {
      return await getPDFPageCount(fileUrl);
    } else if (
      contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return await getDocxPageCount(fileUrl);
    } else if (
      contentType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return await getExcelPageCount(fileUrl);
    } else {
      // Handle unsupported file types
      showError("Type de fichier non supporter");
      console.error("Unsupported file type:", contentType);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la détermination du type de fichier:", error);
    showError("Erreur lors de la détermination du type de fichier:");
    return null;
  }
}
