"use server";

import { db } from "@/db/drizzle";
import { rejoindrEquipe } from "@/db/schema";
import { RejoindreSchema } from "@/schemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function UserRejoindre(values: z.infer<typeof RejoindreSchema>) {
  try {
    const [getRejoindre] = await db
      .select()
      .from(rejoindrEquipe)
      .where(eq(rejoindrEquipe.email, values.email));

    if (getRejoindre)
      return {
        error:
          "Vous avez déja envoyé une demande. Si vous pensez qu'elle prends plus de temps, veuillez contactez le support",
      };

    const [updatedTraduction] = await db
      .insert(rejoindrEquipe)
      .values({
        ...values,
        url: values.url ?? [],
      })
      .returning();

    //   .set({
    //     traducteur: traducteurId,
    //   })
    //   .where(eq(traduction.id, TraductionId))
    //   .returning();

    revalidatePath("/dashboard");
    return { data: updatedTraduction };
  } catch (error) {
    console.error("Error updating course:", error);
    return { error: "Failed to update course" };
  }
}
