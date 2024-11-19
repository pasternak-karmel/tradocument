"use server";
import { db } from "@/db/drizzle";
import { traduction, TRADUCTION, users } from "@/db/schema";
import { ServerActionResponse } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//user: pending
//admin attribue: processing
//traducteur: confirmation
//admin: confirmed


//a faire

//rejoindre formulaire avec loading et envoyer un email

//demander devis refine for langue

//contact page

//traduction page: faire contenir les infos sir la page

export async function updatedTraduction(
  TraductionId: string,
  traducteurId: string
): Promise<
  ServerActionResponse<{ traduction: TRADUCTION; translatorEmail: string }>
> {
  try {
    const [updatedTraduction] = await db
      .update(traduction)
      .set({
        traducteur: traducteurId,
        status: "processing",
      })
      .where(eq(traduction.id, TraductionId))
      .returning();

    if (!updatedTraduction) {
      return { error: "Traduction not found" };
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
    console.error("Error updating course:", error);
    return { error: "Failed to update traduction" };
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
