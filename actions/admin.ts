"use server";
import { db } from "@/db/drizzle";
import { traduction, TRADUCTION, users } from "@/db/schema";
import { ServerActionResponse } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//user: pending
//admin attribue: processing
//traducteur: confirmation

// todo carmel
// Tu dois changer le type de la bd pour prendre un array (done)
//dans chaque function pour uploader les fichiers tu retournes toutes les url que tu insere mainan dans la bd

// export async function addCourse(
//   semesterId: string,
//   courseData: Users
// ): Promise<ServerActionResponse<TRADUCTION>> {
//   try {
//     // First create the UE
//     const [newUE] = await db
//       .insert(traduction)
//       .values({
//         name: courseData.contenu,
//         credits: courseData.cect,
//         semesterId,
//         classId: courseData.classId,
//       })
//       .returning();

//     // Then create the EC
//     const [newEC] = await db
//       .insert(ec)
//       .values({
//         name: courseData.enseignement,
//         ueId: newUE.id,
//         codeEC: courseData.codeEC,
//         contenu: courseData.contenu,
//         enseignement: courseData.enseignement,
//         cours: courseData.cours,
//         tpTd: courseData.tpTd,
//         sp: courseData.sp,
//         tpe: courseData.tpe,
//         ctt: courseData.ctt,
//         cect: courseData.cect,
//         cc: courseData.cc,
//         et: courseData.et,
//         ccEt: courseData.ccEt,
//       })
//       .returning();

//     revalidatePath("/[classId]");
//     return { data: newEC };
//   } catch (error) {
//     console.error("Error adding course:", error);
//     return { error: "Failed to add course" };
//   }
// }

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
