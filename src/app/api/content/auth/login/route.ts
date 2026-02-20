import { NextRequest, NextResponse } from "next/server";
import {
  createContentPortalSession,
  getContentPortalSessionCookieOptions,
} from "@/lib/content/portal-session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "").trim();

    const expectedUsername = process.env.CONTENT_PORTAL_USERNAME || "";
    const expectedPassword = process.env.CONTENT_PORTAL_PASSWORD || "";

    if (!expectedUsername || !expectedPassword) {
      return NextResponse.json(
        { error: "Content portal auth is not configured." },
        { status: 503 }
      );
    }

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const sessionToken = createContentPortalSession(username);
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      ...getContentPortalSessionCookieOptions(),
      value: sessionToken,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
