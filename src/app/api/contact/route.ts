import { NextRequest, NextResponse } from "next/server";

export type ContactPayload = {
  name: string;
  email: string;
  messageType: string;
  message: string;
  referringPage?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, messageType, message, referringPage } = body;

    if (!name?.trim() || !email?.trim() || !messageType?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, message type, and message are required." },
        { status: 400 }
      );
    }

    // Log for review (replace with email notification or persistence when ready)
    console.info("[Contact]", {
      name: name.trim(),
      email: email.trim(),
      messageType: messageType.trim(),
      message: message.trim(),
      referringPage: referringPage || null,
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
