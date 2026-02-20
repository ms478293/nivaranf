import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  ContentTableMissingError,
  deleteContentPost,
  getContentPostById,
  updateContentPost,
} from "@/lib/content/posts";
import { requireDashboardAuth } from "@/lib/content/api-auth";
import { buildCanonicalPath } from "@/lib/content/automation";

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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireDashboardAuth(request);
    const { id } = await context.params;
    const post = await getContentPostById(id);
    return NextResponse.json({ post });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireDashboardAuth(request);
    const { id } = await context.params;
    const body = await request.json();

    const existing = await getContentPostById(id);
    const updated = await updateContentPost(id, body);

    revalidateContentPaths(
      buildCanonicalPath(existing.content_type, existing.slug)
    );
    revalidateContentPaths(buildCanonicalPath(updated.content_type, updated.slug));

    return NextResponse.json({ post: updated });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireDashboardAuth(request);
    const { id } = await context.params;
    const existing = await getContentPostById(id);

    await deleteContentPost(id);
    revalidateContentPaths(
      buildCanonicalPath(existing.content_type, existing.slug)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
