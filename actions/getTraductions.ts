"use server";

import { db } from "@/db/drizzle";
import { traduction } from "@/db/schema";
import { currentUserId } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const GetTraduction = async () => {
  const userId = await currentUserId();
  if (!userId) {
    return { error: "You're not allowed to be here!" };
  }

  const articleAttente = await db
    .select()
    .from(traduction)
    .where(eq(traduction.userId, userId));

  if (!articleAttente || articleAttente.length === 0) {
    return { error: "Pas encore de traduction" };
  }

  return articleAttente;
};