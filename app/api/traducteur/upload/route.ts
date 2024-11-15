import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { traduction } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, url } = await req.json();

  if (!id || !url) {
    return NextResponse.json(
      { error: "ID and url are required" },
      { status: 400 }
    );
  }

  const session = await auth();
  if (!session || session.user.role !== "traducteur") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const [traductionExist] = await db
      .select()
      .from(traduction)
      .where(eq(traduction.id, id))
      .limit(1);

    if (traductionExist.traducteur !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db
      .update(traduction)
      .set({ fichierTraduis: url })
      .where(eq(traduction.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
