import { NextRequest, NextResponse } from "next/server";
import { getTrendingBlogFeed } from "@/lib/content/posts";

export async function GET(request: NextRequest) {
  const rawLimit = Number(request.nextUrl.searchParams.get("limit") || "4");
  const limit = Number.isFinite(rawLimit)
    ? Math.max(1, Math.min(Math.floor(rawLimit), 12))
    : 4;

  const posts = await getTrendingBlogFeed(limit);
  return NextResponse.json({ posts });
}
