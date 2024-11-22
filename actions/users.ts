"use server";

import { db } from "@/db/drizzle";
import { procurations } from "@/db/schema";
import { currentUser } from "@/lib/auth";
import { ProcurationFormData } from "@/schemas";
import { eq, and } from "drizzle-orm";

export const CreateProcuration = async (values: ProcurationFormData) => {
  const today = new Date();
  const user = await currentUser();

  if (!user?.id) {
    return { error: "Vous n'êtes pas connecté" };
  }

  if (user.role !== "user") {
    return { error: "Vous n'avez pas les droits pour créer une procuration" };
  }

  // Check for existing procuration of the same type
  const existingProcuration = await db
    .select()
    .from(procurations)
    .where(
      and(
        eq(procurations.userId, user.id),
        eq(procurations.typeProcuration, values.typeProcuration)
      )
    )
    .limit(1);

  if (existingProcuration.length > 0) {
    const existing = existingProcuration[0];
    
    if (existing.dateFin) {
      const endDate = new Date(existing.dateFin);
      if (endDate > today) {
        //procuration valide
        return { 
          success: true, 
          message: "Une procuration valide de ce type existe déjà." 
        };
      } else {
        // Update the existing procuration if it has expired
        try {
          const [updatedProcuration] = await db
            .update(procurations)
            .set({
              ...values,
              piece: values.piece ? values.piece : [],
              dateDebut: new Date().toISOString().split('T')[0],
            })
            .where(eq(procurations.id, existing.id))
            .returning();

          return { 
            maj: true, 
            message: "La procuration existante a été mise à jour.",
            procuration: updatedProcuration 
          };
        } catch (error) {
          console.error(error);
          return {
            error: "Une erreur est survenue lors de la mise à jour de la procuration",
          };
        }
      }
    }
  }

  // Create a new procuration if it doesn't exist or is of a different type
  try {
    const [newProcuration] = await db
      .insert(procurations)
      .values({
        ...values,
        piece: values.piece ? values.piece : [],
        userId: user.id,
        dateDebut: new Date().toISOString().split('T')[0], // Set today as the start date
      })
      .returning();

    return { 
      success: true, 
      message: "Une nouvelle procuration a été créée.",
      procuration: newProcuration 
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Une erreur est survenue lors de la création de la procuration",
    };
  }
};

