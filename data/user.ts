import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

import { users } from "@/db/schema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user.length > 0 ? user[0] : null;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return user.length > 0 ? user[0] : null;
  } catch {
    return null;
  }
};
