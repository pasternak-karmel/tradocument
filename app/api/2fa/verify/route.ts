import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { base32secret, pin } = body;

  if (!base32secret || !pin) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const verified = speakeasy.totp.verify({
    secret: base32secret,
    encoding: "base32",
    token: pin,
  });

  return NextResponse.json({ success: verified });
}
