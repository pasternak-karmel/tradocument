import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { getVerificationTokenByEmail } from "@/data/verificiation-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import {
  passwordResetTokens,
  twoFactorTokens,
  verificationTokens,
} from "@/db/schema";

// Generate a two-factor token
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const expires = Math.floor(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.delete(twoFactorTokens).where(eq(twoFactorTokens.email, email));
  }

  const twoFactorToken = await db
    .insert(twoFactorTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  // const expires = new Date(new Date().getTime() + 3600 * 1000);
  const expires = Math.floor(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email));
  }

  const passwordResetToken = await db
    .insert(passwordResetTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  // Create a Date object for expires (1 hour from now)
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.email, email));
  }

  const verificationToken = await db
    .insert(verificationTokens)
    .values({
      identifier: token,
      email,
      token,
      expires,
    })
    .returning();

  return verificationToken;
};
