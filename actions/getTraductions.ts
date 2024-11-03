"use server";

import { auth } from "@/auth";
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

export const GetAdminTraduction = async () => {
  const session = await auth();
  if (!session || session?.user.role !== "admin") {
    return { error: "You're not allowed to be here!" };
  }

  const articleAttente = await db.select().from(traduction);

  if (!articleAttente || articleAttente.length === 0) {
    return { error: "Pas encore de traduction" };
  }

  return articleAttente;
};
