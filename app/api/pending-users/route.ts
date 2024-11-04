import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { rejoindrEquipe, users } from "@/db/schema";
import { eq } from "drizzle-orm";
// import { hash } from "bcrypt";
import bcrypt from "bcryptjs";
import { AcceptTraducteur } from "@/lib/mail";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const pendingUsers = await db
      .select()
      .from(rejoindrEquipe)
      .where(eq(rejoindrEquipe.status, "attente"));

    return NextResponse.json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const [user] = await db
      .select()
      .from(rejoindrEquipe)
      .where(eq(rejoindrEquipe.id, id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, user.email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        name: `${user.nom} ${user.prenom}`,
        email: user.email,
        password: hashedPassword,
        role: "traducteur",
      })
      .returning({ id: users.id });

    await db
      .update(rejoindrEquipe)
      .set({ status: "approuvé", approved_at: new Date() })
      .where(eq(rejoindrEquipe.id, id));

    await AcceptTraducteur(user.email, tempPassword);

    return NextResponse.json({ id: newUser.id, tempPassword });
  } catch (error) {
    console.error("Error approving user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .delete(rejoindrEquipe)
      .where(eq(rejoindrEquipe.id, id));

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
