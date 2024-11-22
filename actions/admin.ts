"use server";
import { db } from "@/db/drizzle";
import { DemandeDevis, DEMANDEDEVIS, traduction, TRADUCTION, users } from "@/db/schema";
import { ServerActionResponse } from "@/types";
import { de } from "date-fns/locale";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//user: pending
//admin attribue: processing
//traducteur: confirmation
//admin: confirmed

//a faire

//rejoindre formulaire avec loading et envoyer un email (pending carmel)

//demander devis refine for langue (done)

//contact page (pending carmel)

//traduction page: faire contenir les infos sur la page

//nom prenom lieu de naissance date nationnalité adresse document date 1 et date 2 piece d'identité signature

//apreès a use tanstack query pour les données du devis sur la page traduction

export async function updatedTraduction(
  TraductionId: string,
  traducteurId: string
): Promise<
  ServerActionResponse<{ traduction: DEMANDEDEVIS; translatorEmail: string }>
> {
  try {
    const [updatedTraduction] = await db
      .update(DemandeDevis)
      .set({
        traducteur: traducteurId,
        status: "processing",
      })
      .where(eq(DemandeDevis.id, TraductionId))
      .returning();

    if (!updatedTraduction) {
      return { error: "Devis non trouvé" };
    }

    const [translator] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, traducteurId))
      .limit(1);

    if (!translator || !translator.email) {
      return { error: "Translator not found" };
    }

    revalidatePath("/dashboard");
    return {
      data: {
        traduction: updatedTraduction,
        translatorEmail: translator.email,
      },
    };
  } catch (error) {
    console.error("Error updating devis:", error);
    return { error: "Failed to update devis" };
  }
}

// export async function deleteCourse(
//   courseId: string
// ): Promise<ServerActionResponse<boolean>> {
//   try {
//     await db.delete(ec).where(eq(ec.id, courseId));
//     revalidatePath("/[classId]");
//     return { data: true };
//   } catch (error) {
//     console.error("Error deleting course:", error);
//     return { error: "Failed to delete course" };
//   }
// }
