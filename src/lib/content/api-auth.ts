import type { NextRequest } from "next/server";

function isLikelyJwt(token: string) {
  const parts = token.split(".");
  return parts.length === 3 && token.length > 24;
}

export async function requireDashboardAuth(request: NextRequest) {
  // Only trust the first-party auth cookie.
  const token = request.cookies.get("authToken")?.value || "";
  if (!token || !isLikelyJwt(token)) {
    throw new Error("Unauthorized");
  }

  return token;
}
