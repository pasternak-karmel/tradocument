import { NextResponse } from "next/server";
import QRCode from "qrcode";
import speakeasy from "speakeasy";

export async function GET() {
  const secret = speakeasy.generateSecret({ name: "Tradocument" });

  if (!secret.otpauth_url) {
    return NextResponse.json(
      { error: "Error generating OTP URL" },
      { status: 500 }
    );
  }

  try {
    const data = await QRCode.toDataURL(secret.otpauth_url);
    return NextResponse.json({
      data,
      secret: secret.base32,
    });
  } catch (error) {
    console.error("QR Code generation error:", error);
    return NextResponse.json(
      { error: "Error generating QR code" },
      { status: 500 }
    );
  }
}
