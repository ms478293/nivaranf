import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  createContentPost,
  getDashboardContentPosts,
  ContentTableMissingError,
} from "@/lib/content/posts";
import { requireDashboardAuth } from "@/lib/content/api-auth";
import type { ContentStatus, ContentType } from "@/lib/content/types";
import { buildCanonicalPath } from "@/lib/content/automation";

const CONTENT_TYPES = new Set(["Article", "Story", "News", "Blog"]);
const CONTENT_STATUSES = new Set(["draft", "published"]);

function revalidateContentPaths(pathname?: string) {
  if (pathname) revalidatePath(pathname);
  revalidatePath("/articles");
  revalidatePath("/stories");
  revalidatePath("/news");
  revalidatePath("/blogs");
  revalidatePath("/sitemap.xml");
}

function toErrorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  if (message === "Unauthorized") {
    return NextResponse.json({ error: message }, { status: 401 });
  }
  if (error instanceof ContentTableMissingError) {
    return NextResponse.json({ error: message }, { status: 503 });
  }
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET(request: NextRequest) {
  try {
    await requireDashboardAuth(request);

    const status = request.nextUrl.searchParams.get("status");
    const type = request.nextUrl.searchParams.get("type");
    const search = request.nextUrl.searchParams.get("search") || "";

    const filters = {
      status:
        status && (CONTENT_STATUSES.has(status) || status === "all")
          ? (status as ContentStatus | "all")
          : "all",
      type:
        type && (CONTENT_TYPES.has(type) || type === "all")
          ? (type as ContentType | "all")
          : "all",
      search,
    };

    const posts = await getDashboardContentPosts(filters);
    return NextResponse.json({ posts });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireDashboardAuth(request);
    const body = await request.json();

    const post = await createContentPost(body);
    revalidateContentPaths(buildCanonicalPath(post.content_type, post.slug));

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
