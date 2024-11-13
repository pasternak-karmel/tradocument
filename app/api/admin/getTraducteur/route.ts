import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const traducteur = await db
      .select()
      .from(users)
      .where(eq(users.role, "traducteur"));

    return NextResponse.json(traducteur);
  } catch (error) {
    console.error("Error retrieving traducteur:", error);
    return NextResponse.json(
      { error: "Failed to retrieve traducteur" },
      { status: 500 }
    );
  }
}
