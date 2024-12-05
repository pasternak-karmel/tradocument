"use server";

import { db } from "@/db/drizzle";
import { codeVerification, procurations } from "@/db/schema";
import { currentUser } from "@/lib/auth";
import { ProcurationFormData } from "@/schemas";
import { and, eq } from "drizzle-orm";

export const CreateProcuration = async (values: ProcurationFormData) => {
  const today = new Date();
  const user = await currentUser();

  if (!user?.id) {
    return { error: "Vous n'êtes pas connecté" };
  }

  if (user.role !== "user") {
    return { error: "Vous n'avez pas les droits pour créer une procuration" };
  }

  // Vérification de l'existence d'une procuration similaire
  const existingProcuration = await db
    .select()
    .from(procurations)
    .where(
      and(
        eq(procurations.userId, user.id),
        eq(procurations.institution, values.institution)
      )
    )
    .limit(1);

  if (existingProcuration.length > 0) {
    const existing = existingProcuration[0];

    if (existing.dateLimite) {
      const endDate = new Date(existing.dateLimite);
      if (endDate > today) {
        // Une procuration valide existe déjà
        return {
          success: true,
          message: "Une procuration valide pour cette institution existe déjà.",
        };
      } else {
        // Mettre à jour une procuration expirée
        try {
          const [updatedProcuration] = await db
            .update(procurations)
            .set({
              ...values,
              pieceIdentite: values.pieceIdentite ?? [],
              signature: values.signature ?? [],
            })
            .where(eq(procurations.id, existing.id))
            .returning();

          return {
            maj: true,
            message: "La procuration existante a été mise à jour.",
            procuration: updatedProcuration,
          };
        } catch (error) {
          console.error(error);
          return {
            error:
              "Une erreur est survenue lors de la mise à jour de la procuration.",
          };
        }
      }
    }
  }

  // Créer une nouvelle procuration si elle n'existe pas
  try {
    const [newProcuration] = await db
      .insert(procurations)
      .values({
        ...values,
        userId: user.id,
        dateLimite: values.dateLimite || null,
        pieceIdentite: values.pieceIdentite || [],
        signature: values.signature || [],
      })
      .returning();

    return {
      success: true,
      message: "Une nouvelle procuration a été créée.",
      procuration: newProcuration,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Une erreur est survenue lors de la création de la procuration.",
    };
  }
};

export const SaveVerifCode = async (email: string, code: string) => {
  try {
    const [] = await db
      .insert(codeVerification)
      .values({
        email,
        code,
        type: "verification",
      })
      .returning();
    return { success: true, message: "Code envoyé avec succès" };
  } catch (error) {
    console.error(error);
    return { error: "Une erreur est survenue lors de l'envoi du code" };
  }
};
