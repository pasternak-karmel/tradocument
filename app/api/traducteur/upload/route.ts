import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { DemandeDevis } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const values = await req.json();
  console.log(values);

  const { id, url } = values;

  if (!id || !url) {
    return NextResponse.json(
      { error: "ID and url are required" },
      { status: 400 }
    );
  }

  const session = await auth();

  if (
    !session ||
    !session.user ||
    session.user.role.trim().toLowerCase() !== "traducteur"
  ) {
    console.log("Unauthorized Access: Role is not traducteur");
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const [traductionExist] = await db
      .select()
      .from(DemandeDevis)
      .where(eq(DemandeDevis.id, id))
      .limit(1);

    if (traductionExist.traducteur !== session?.user.id) {
      return NextResponse.json(
        { error: "Ce fichier ne vous a pas été assigné" },
        { status: 403 }
      );
    }

    if (traductionExist.fichierTraduis !== null) {
      return NextResponse.json(
        {
          error: "fichier déjà uploader pas vous ou quelqu'un d'autre",
        },
        { status: 400 }
      );
    }

    await db
      .update(DemandeDevis)
      .set({ fichierTraduis: url, status: "confirmation" })
      .where(eq(DemandeDevis.id, id));

    revalidatePath("/dashboard");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
