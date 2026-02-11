import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // TODO: Connect to your email service or backend
    // Options:
    // 1. Send email via SendGrid/Resend/Nodemailer
    // 2. Forward to backend API
    // 3. Store in database
    console.log("Contact form submission:", { name, email, subject, message });

    // Example: Send to backend API
    // const res = await fetch("https://api.nivaranfoundation.org/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, subject, message }),
    // });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
