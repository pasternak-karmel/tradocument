"use server";

import { demandeDevis } from "@/schemas";

export type FormState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phone?: string[];
    country?: string[];
    documentType?: string[];
    customDocumentType?: string[];
    sourceLanguage?: string[];
    targetLanguage?: string[];
    additionalInfo?: string[];
    termsAccepted?: string[];
    url?: string[];
  };
  message: string;
};

export async function SubmitDevisForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = demandeDevis.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    documentType: formData.get("documentType"),
    customDocumentType: formData.get("customDocumentType"),
    sourceLanguage: formData.get("sourceLanguage"),
    targetLanguage: formData.get("targetLanguage"),
    additionalInfo: formData.get("additionalInfo"),
    termsAccepted: formData.get("termsAccepted") === "on",
    deliveryAddress: {
      departureAddress: formData.get("deliveryAddress.departureAddress"),
    },
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Il y a des erreurs dans le formulaire. Veuillez les corriger.",
    };
  }

  console.log(validatedFields.data);

  // Here you can add your logic for form submission, file upload, etc.
  // For now, we'll just return a success message
  return {
    errors: {},
    message: "Formulaire soumis avec succès!",
  };
}
