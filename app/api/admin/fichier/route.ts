import { db } from "@/db/drizzle";
import { DemandeDevis, users } from "@/db/schema";
import { AcceptTraduction, rejectedTraduction } from "@/lib/mail";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all semesters
    const Alltraduction = await db.select().from(DemandeDevis);

    if (Alltraduction.length === 0) {
      return NextResponse.json(
        { message: "Pas de demande trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(Alltraduction);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request
  // { params }: { params: { id: string } }
) {
  // const { id } = params;
  const { status, documentId } = await request.json();

  try {
    const [traductionUpdated] = await db
      .update(DemandeDevis)
      .set({ status })
      .where(eq(DemandeDevis.id, documentId))
      .returning();

    if (status === "completed") {
      await AcceptTraduction(traductionUpdated.email, traductionUpdated.nom);
    }

    if (status === "rejected") {
      const [traducteurEmail] = await db
        .select()
        .from(users)
        .where(eq(users.id, traductionUpdated.traducteur!));

      await rejectedTraduction(traducteurEmail.email!, traductionUpdated.nom);

      // todo: delete file in edge storage
      const [] = await db
        .update(DemandeDevis)
        .set({ status: "rejected", fichierTraduis: null })
        .where(eq(DemandeDevis.id, documentId))
        .returning();
    }

    return NextResponse.json({ message: "Devis mise à jour avec succès" });
  } catch (error) {
    console.error("Error updating devis:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
