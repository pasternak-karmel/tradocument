import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

import { accounts } from "@/db/schema";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .limit(1);

    return account;
  } catch {
    return null;
  }
};
