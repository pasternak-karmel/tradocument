import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { DemandeDevis } from "@/db/schema";
import { NextResponse } from "next/server";

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
      additionalInfo,
      deliveryAddress,
      montant,
    } = values;

    const traductionValues = {
      userId,
      nom: lastName,
      prenom: firstName,
      email,
      fichier: values.url ? values.url : undefined,
      montant: Math.floor(montant),
      numero: phone,
      pays: country,
      typeDocument: documentType,
      langueSource: sourceLanguage,
      langueTraduit: targetLanguage,
      infoSupl: additionalInfo,
      adresseDepart: values.deliveryAddress
        ? deliveryAddress.departureAddress
        : undefined,
      adresseArriver: values.deliveryAddress
        ? deliveryAddress.shippingAddress
        : undefined,
      type: values.deliveryAddress ? true : false,
      institution: values.institution,
    };

    const [result] = await db
      .insert(DemandeDevis)
      .values(traductionValues)
      .returning();
    const info = {
      montant: result.montant,
      date: result.created_at.toDateString(),
      type: result.type,
      fichier: result.fichier,
    };

    return NextResponse.json(
      { success: true, message: result.id!, info: info },
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
