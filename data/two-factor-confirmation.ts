import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

import { twoFactorConfirmations } from "@/db/schema";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const [twoFactorConfirmation] = await db
      .select()
      .from(twoFactorConfirmations)
      .where(eq(twoFactorConfirmations.userId, userId))
      .limit(1);

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
