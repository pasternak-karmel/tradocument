import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { DemandeDevis } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez vous connecter avant de pourvoir continuer",
        },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    // const userProfile = (
    //   await db.select().from(users).where(eq(users.id, userId))
    // )[0];

    const values = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      documentType,
      sourceLanguage,
      targetLanguage,
      wordCount,
      additionalInfo,
      deliveryAddress,
      montant,
      distance,
      url,
    } = values;

    const traductionValues = {
      userId,
      nom: lastName,
      prenom: firstName,
      email,
      fichier: url,
      montant: Math.floor(montant),
      numero: phone,
      pays: country,
      typeDocument: documentType,
      langueSource: sourceLanguage,
      langueTraduit: targetLanguage,
      page: wordCount,
      infoSupl: additionalInfo,
      adresseDepart: deliveryAddress.departureAddress,
      adresseArriver: deliveryAddress.shippingAddress,
    };

    const [result] = await db
      .insert(DemandeDevis)
      .values(traductionValues)
      .returning();

    return NextResponse.json(
      { success: true, message: result.id! },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: "Une erreur s'est produite" },
      { status: 500 }
    );
  }
}
