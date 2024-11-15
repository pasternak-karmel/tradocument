import { db } from "@/db/drizzle";
import { traduction } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all semesters
    const Alltraduction = await db.select().from(traduction);

    if (Alltraduction.length === 0) {
      return NextResponse.json(
        { message: "Pas de traduction trouvé" },
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
    await db
      .update(traduction)
      .set({ status })
      .where(eq(traduction.id, documentId));

    return NextResponse.json({ message: "Translation updated successfully" });
  } catch (error) {
    console.error("Error updating translation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
