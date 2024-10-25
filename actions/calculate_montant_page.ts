// import mammoth from "mammoth";
"use server";

import { auth } from "@/auth";
import axios from "axios";
import { PDFDocument } from "pdf-lib";

export async function getPDFPageCount(fileUrl: string) {
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

    return pageCount * 40;
  } catch (error) {
    console.error(
      "Erreur lors du téléchargement ou de l'analyse du fichier:",
      error
    );
    return null;
  }
}

// async function getDocxPageCount(file: File): Promise<number> {
//   const arrayBuffer = await file.arrayBuffer();
//   const result = await mammoth.extractRawText({ arrayBuffer });
//   const wordCount = result.value.split(/\s+/).length;
//   const wordsPerPage = 300; // Par exemple, 300 mots par page
//   const pageCount = Math.ceil(wordCount / wordsPerPage);
//   return pageCount;
// }

// export const calculateMontantPage = async (
//   fileUrl: string
// ): Promise<number> => {
//   let pageCount = 0;
//   const fileType = file.type;

//   if (fileType === "application/pdf") {
//     pageCount = await getPDFPageCount(file);
//   } else if (
//     fileType ===
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     pageCount = await getDocxPageCount(file);
//   }

//   const pricePerPage = 40;
//   const totalPrice = pageCount * pricePerPage;

//   return totalPrice;
// };
