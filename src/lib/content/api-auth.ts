import type { NextRequest } from "next/server";
import { verifyContentPortalSession } from "./portal-session";
import { CONTENT_PORTAL_SESSION_COOKIE } from "./constants";

function isLikelyJwt(token: string) {
  const parts = token.split(".");
  return parts.length === 3 && token.length > 24;
}

export async function requireDashboardAuth(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value || "";
  if (authToken && isLikelyJwt(authToken)) {
    return authToken;
  }

  const portalSession =
    request.cookies.get(CONTENT_PORTAL_SESSION_COOKIE)?.value || "";
  if (verifyContentPortalSession(portalSession)) {
    return portalSession;
  }

  if (!authToken) {
    throw new Error("Unauthorized");
  }

  throw new Error("Unauthorized");
}
