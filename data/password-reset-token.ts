import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

import { passwordResetTokens } from "@/db/schema";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
      .limit(1);

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email))
      .limit(1);

    return passwordResetToken;
  } catch {
    return null;
  }
};
