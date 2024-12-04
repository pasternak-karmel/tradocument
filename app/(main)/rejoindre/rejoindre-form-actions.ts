"use server";

import { UserRejoindre } from "@/actions/rejoindre";
import { SaveVerifCode } from "@/actions/users";
import { db } from "@/db/drizzle";
import { codeVerification } from "@/db/schema";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { RejoindreFormValues } from "@/schemas";
import { generateVerificationCode } from "@/utils/2fa-utils";
import { eq } from "drizzle-orm";

export async function submitRejoindreForm(data: RejoindreFormValues) {
  const verificationCode = generateVerificationCode();
  await sendTwoFactorTokenEmail(data.email, verificationCode);
  await SaveVerifCode(data.email, verificationCode);
  return {
    success: true,
    message: "Verification code sent",
  };
}

export async function verifyCode(
  data: RejoindreFormValues,
  code: string
): Promise<{ success: boolean; message: string }> {
  if (!code) {
    return { success: false, message: "Verification code is required" };
  }

  if (!data.email) {
    return { success: false, message: "Email is required" };
  }
  const storedCodes = await db
    .select()
    .from(codeVerification)
    .where(eq(codeVerification.email, data.email))
    .limit(1);

  if (storedCodes.length === 0) {
    return {
      success: false,
      message: "No verification code found for this email",
    };
  }

  const storedCode = storedCodes[0].code;
  if (code === storedCode) {
    const result = await UserRejoindre(data);
    if (result.error) {
      return { success: false, message: result.error };
    }

    await db
      .delete(codeVerification)
      .where(eq(codeVerification.email, data.email));

    return { success: true, message: "Form submitted successfully" };
  } else {
    return { success: false, message: "Invalid verification code" };
  }
}
