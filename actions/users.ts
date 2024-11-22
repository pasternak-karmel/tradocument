"use server";

import { db } from "@/db/drizzle";
import { procurations } from "@/db/schema";
import { currentUser } from "@/lib/auth";
import { ProcurationFormData } from "@/schemas";
import { eq } from "drizzle-orm";

export const CreateProcuration = async (values: ProcurationFormData) => {
  console.log(values);
  const today = new Date();
  const user = await currentUser();

  if (!user.id) {
    return { error: "Vous n'êtes pas connecté" };
  }

  if (user.role !== "user") {
    return { error: "Vous n'avez pas les droits pour créer une procuration" };
  }

  const existingProcuration = await db
    .select({
      id: procurations.id,
      typeProcuration: procurations.typeProcuration,
      dateDebut: procurations.dateDebut,
      dateFin: procurations.dateFin,
    })
    .from(procurations)
    .where(eq(procurations.userId, user.id));

  //proc exist
  if (existingProcuration.length > 0) {
    //meme type de proc
    if (existingProcuration[0].typeProcuration === values.typeProcuration) {
      //verif de date
      if (existingProcuration[0].dateDebut && existingProcuration[0].dateFin) {
        if (existingProcuration[0].dateFin > today.toDateString()) {
          return { success: true };
        }
      }
      //doit refaire la proc
    }
  }

  try {
    const [procuration] = await db
      .insert(procurations)
      .values({
        ...values,
        piece: values.piece ? values.piece : [],
        userId: user.id,
      })
      .returning();

    return { new: true };
  } catch (error) {
    console.log(error);
    return {
      error: "Une erreur est survenue",
    };
  }
};
