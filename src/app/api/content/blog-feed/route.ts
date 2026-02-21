import { NextRequest, NextResponse } from "next/server";
import { getBlogFeed } from "@/lib/content/posts";

export async function GET(request: NextRequest) {
  const rawLimit = Number(request.nextUrl.searchParams.get("limit") || "200");
  const limit = Number.isFinite(rawLimit)
    ? Math.max(1, Math.min(Math.floor(rawLimit), 500))
    : 200;

  const posts = await getBlogFeed(limit);
  return NextResponse.json({ posts });
}
