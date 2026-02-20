import crypto from "crypto";
import { CONTENT_PORTAL_SESSION_COOKIE } from "./constants";

const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.CONTENT_PORTAL_SESSION_SECRET || "";
  if (!secret) {
    throw new Error("CONTENT_PORTAL_SESSION_SECRET is not configured.");
  }
  return secret;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payloadBase64: string) {
  return crypto.createHmac("sha256", getSecret()).update(payloadBase64).digest("hex");
}

export function createContentPortalSession(username: string) {
  const payload = JSON.stringify({
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  });
  const payloadBase64 = base64UrlEncode(payload);
  return `${payloadBase64}.${sign(payloadBase64)}`;
}

export function verifyContentPortalSession(token?: string | null) {
  try {
    if (!token) return false;

    const [payloadBase64, signature] = token.split(".");
    if (!payloadBase64 || !signature) return false;

    const expected = sign(payloadBase64);
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return false;
    }

    const payload = JSON.parse(base64UrlDecode(payloadBase64)) as {
      u?: string;
      exp?: number;
    };

    if (!payload.u || !payload.exp) return false;
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function getContentPortalSessionCookieOptions() {
  return {
    name: CONTENT_PORTAL_SESSION_COOKIE,
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
