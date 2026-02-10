import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // TODO: Connect to your email service (Mailchimp, SendGrid, etc.)
    // For now, log the subscription and return success
    console.log("Newsletter subscription:", email);

    // Example: Forward to backend API
    // const res = await fetch("https://api.nivaranfoundation.org/api/newsletter/subscribe", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
