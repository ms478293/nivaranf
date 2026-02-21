import { NextResponse } from "next/server";
import {
  getContentPortalSessionCookieOptions,
} from "@/lib/content/portal-session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    ...getContentPortalSessionCookieOptions(),
    value: "",
    maxAge: 0,
  });
  response.cookies.set({
    name: "authToken",
    value: "",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set({
    name: "refreshToken",
    value: "",
    path: "/",
    maxAge: 0,
  });
  return response;
}
