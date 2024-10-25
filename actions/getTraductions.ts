"use server";

import { db } from "@/db/drizzle";
import { traduction } from "@/db/schema";
import { currentUserId } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const GetTraduction = async (startDate?: Date, endDate?: Date) => {
  const userId = await currentUserId();
  if (!userId) {
    return { error: "You're not allowed to be here!" };
  }
  //   if (role !== UserRole.ADMIN) {
  //     return { error: "You're not allowed to be here!" };
  //   }

  //   const whereClause: any = {
  //     status: "ATTENTE",
  //     isDeleted: false,
  //     quantite: { gt: 0 },
  //   };

  //   if (startDate && endDate) {
  //     whereClause.createdAt = {
  //       gte: startDate,
  //       lte: endDate,
  //     };
  //   }

  const articleAttente = await db
    .select()
    .from(traduction)
    .where(eq(traduction.userId, userId));

  if (!articleAttente || articleAttente.length === 0) {
    return { error: "Pas encore de traduction" };
  }

  return articleAttente;
};
