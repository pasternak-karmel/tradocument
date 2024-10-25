import { InsertTraduction, traduction } from "@/db/schema";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

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

    const userProfile = (
      await db.select().from(users).where(eq(users.id, userId))
    )[0];

    if (!userProfile?.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez vérifier votre email avant de pourvoir continuer",
        },
        { status: 400 }
      );
    }

    const values = await req.json();
    const { fichier, traduire_de, traduire_pour } = values;

    console.log(`Les values${values}`);

    const traductionValues = {
      userId,
      fichier,
      traduction_from: traduire_de,
      traduction_to: traduire_pour,
      montant: 40,
    };

    const [result] = await db
      .insert(traduction)
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
