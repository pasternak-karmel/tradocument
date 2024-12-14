"use server";

import { UserRejoindre } from "@/actions/rejoindre";
import { SaveVerifCode } from "@/actions/users";
import { db } from "@/db/drizzle";
import { codeVerification } from "@/db/schema";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { RejoindreFormValues } from "@/schemas";
import { generateVerificationCode } from "@/utils/2fa-utils";
import { eq } from "drizzle-orm";

/**
 * Handles submission of the form by sending a verification code to the user's email.
 */
export async function submitRejoindreForm(
  data: RejoindreFormValues
): Promise<{ success: boolean; message: string }> {
  // Generate a verification code
  const verificationCode = generateVerificationCode();

  try {
    // Send the verification email
    await sendTwoFactorTokenEmail(data.email, verificationCode);

    // Save the code in the database
    await SaveVerifCode(data.email, verificationCode);

    return {
      success: true,
      message: "Un code de vérification a été envoyé à votre adresse email",
    };
  } catch (error) {
    console.error("Error during form submission:", error);
    return {
      success: false,
      message: "Failed to send verification code. Please try again.",
    };
  }
}

/**
 * Verifies the user-entered code and completes the form submission process.
 */
export async function verifyCode(
  data: RejoindreFormValues,
  code: string
): Promise<{ success: boolean; message: string }> {
  if (!code) {
    return { success: false, message: "Le code de vérification est requis." };
  }

  if (!data.email) {
    return { success: false, message: "L'email est requis." };
  }

  try {
    // Fetch the stored verification code
    const storedCodeEntry = await db
      .select({ code: codeVerification.code })
      .from(codeVerification)
      .where(eq(codeVerification.email, data.email))
      .limit(1);

    // Check if any entry exists
    if (storedCodeEntry.length === 0) {
      return {
        success: false,
        message: "Aucun code de vérification trouvé pour cet email.",
      };
    }

    const { code: storedCode } = storedCodeEntry[0];

    // Compare the entered code with the stored code
    if (code !== storedCode) {
      return { success: false, message: "Code de vérification invalide." };
    }

    // If the code is valid, proceed to user registration
    const result = await UserRejoindre(data);
    if (result.error) {
      return { success: false, message: result.error };
    }

    // Remove the used verification code
    await db
      .delete(codeVerification)
      .where(eq(codeVerification.email, data.email));

    return { success: true, message: "Formulaire soumis avec succès." };
  } catch (error) {
    console.error("Error during code verification:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la vérification du code.",
    };
  }
}

export async function deleteCode(email: string) {
  await db.delete(codeVerification).where(eq(codeVerification.email, email));
}
