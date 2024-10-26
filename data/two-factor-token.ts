import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

import { twoFactorTokens } from "@/db/schema";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const [twoFactorToken] = await db
      .select()
      .from(twoFactorTokens)
      .where(eq(twoFactorTokens.token, token))
      .limit(1);

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const [twoFactorToken] = await db
      .select()
      .from(twoFactorTokens)
      .where(eq(twoFactorTokens.email, email))
      .limit(1);

    return twoFactorToken;
  } catch {
    return null;
  }
};
