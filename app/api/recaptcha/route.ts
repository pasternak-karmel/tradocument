import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const secretKey = process.env.RECAPTCHA_SITE_KEY;

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: "POST" }
    );

    const data = await response.json();

    return data.success
      ? NextResponse.json({ success: true }, { status: 200 })
      : NextResponse.json({ success: false }, { status: 400 });
  } catch (error) {
    console.error("Error during reCAPTCHA verification:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
