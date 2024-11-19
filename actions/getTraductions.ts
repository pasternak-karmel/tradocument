"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { db } from "@/db/drizzle";
import { TRADUCTION, traduction, users } from "@/db/schema";
import { currentUserId } from "@/lib/auth";
import { AcceptTraducteur } from "@/lib/mail";
import { AddTraducteur } from "@/schemas";
import { ServerActionResponse } from "@/types";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

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

export const GetAdminTraduction = async ()=> {
  const session = await auth();
  if (
    !session ||
    (session?.user.role !== "admin" && session?.user.role !== "traducteur")
  ) {
    return { error: "Vous n'êtes pas autorisé à être ici" };
  }

  const articleAttente = await db.select().from(traduction);

  if (!articleAttente || articleAttente.length === 0) {
    return { error: "Pas encore de traduction. Commencez par en créer une!" };
  }

  return articleAttente;
  // return {data: articleAttente};
};

export async function CreateTraducteur(values: z.infer<typeof AddTraducteur>) {
  // : Promise<ServerActionResponse<USERSDB[]>>
  try {
    const validatedFields = AddTraducteur.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, nom, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Un utilisateur est déjà enregistré avec cet email!" };
    }

    const hashedPassword = await bcrypt.hash(
      password || Math.random().toString(36).slice(-8),
      10
    );

    const [] = await db
      .insert(users)
      .values({ email, name: nom, password: hashedPassword })
      .returning();

    await AcceptTraducteur(email, password || hashedPassword);

    return { success: "Traducteur créer avec succès" };
  } catch (error) {
    console.error("Erreur lors de la création du compte", error);
    return { error: "Erreur lors de la création du compte" };
  }
}
