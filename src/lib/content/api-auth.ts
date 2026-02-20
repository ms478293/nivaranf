import type { NextRequest } from "next/server";

export async function requireDashboardAuth(request: NextRequest) {
  const bearerToken = request.headers.get("authorization")?.startsWith("Bearer ")
    ? request.headers.get("authorization")?.replace("Bearer ", "")
    : null;

  const token = bearerToken || request.cookies.get("authToken")?.value || "";
  if (!token) {
    throw new Error("Unauthorized");
  }

  return token;
}
