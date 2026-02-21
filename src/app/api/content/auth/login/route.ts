import { NextRequest, NextResponse } from "next/server";
import {
  createContentPortalSession,
  getContentPortalSessionCookieOptions,
} from "@/lib/content/portal-session";

const LEGACY_AUTH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

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

    // Best-effort bridge: sign into legacy API so existing dashboard modules
    // that read authToken/refreshToken continue to work with the same credentials.
    const authBaseUrl = (process.env.AUTH_API_BASE_URL || "https://api.nivaranfoundation.org").replace(/\/+$/, "");
    try {
      const legacyAuthResponse = await fetch(`${authBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ email: username, password }),
      });

      if (legacyAuthResponse.ok) {
        const tokens = (await legacyAuthResponse.json()) as {
          accessToken?: string;
          refreshToken?: string;
        };

        if (tokens.accessToken) {
          response.cookies.set({
            name: "authToken",
            value: tokens.accessToken,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: LEGACY_AUTH_TOKEN_TTL_SECONDS,
          });
        }

        if (tokens.refreshToken) {
          response.cookies.set({
            name: "refreshToken",
            value: tokens.refreshToken,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: LEGACY_AUTH_TOKEN_TTL_SECONDS,
          });
        }
      }
    } catch {
      // Ignore legacy API login failures: content portal auth still succeeds.
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
