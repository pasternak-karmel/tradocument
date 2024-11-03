import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { traduction } from "@/db/schema";

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
