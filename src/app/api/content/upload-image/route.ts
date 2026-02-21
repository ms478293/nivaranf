import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireDashboardAuth } from "@/lib/content/api-auth";
import { slugify } from "@/lib/content/automation";
import { supabaseAdmin } from "@/lib/supabase/server";

const CONTENT_IMAGE_BUCKET = "content-images";
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024; // 50MB
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

type PrepareUploadBody = {
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  slug?: string;
};

function sanitizeFileName(raw: string) {
  return raw.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function resolveFileExtension(fileName: string, fileType: string) {
  const byType = EXTENSION_BY_TYPE[fileType];
  if (byType) return byType;

  const fromName = fileName.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName;
  return "jpg";
}

async function ensureContentImageBucket() {
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) {
    throw new Error(listError.message);
  }

  const existing = (buckets || []).find((bucket) => bucket.id === CONTENT_IMAGE_BUCKET);
  if (!existing) {
    const { error: createError } = await supabaseAdmin.storage.createBucket(
      CONTENT_IMAGE_BUCKET,
      {
        public: true,
        fileSizeLimit: MAX_UPLOAD_BYTES,
        allowedMimeTypes: Array.from(ALLOWED_IMAGE_TYPES),
      }
    );
    if (createError && !String(createError.message).toLowerCase().includes("already")) {
      throw new Error(createError.message);
    }
  }

  // Enforce bucket constraints even when bucket already exists.
  const { error: updateError } = await supabaseAdmin.storage.updateBucket(
    CONTENT_IMAGE_BUCKET,
    {
      public: true,
      fileSizeLimit: MAX_UPLOAD_BYTES,
      allowedMimeTypes: Array.from(ALLOWED_IMAGE_TYPES),
    }
  );
  if (updateError) {
    throw new Error(updateError.message);
  }
}

function toErrorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  if (message === "Unauthorized") {
    return NextResponse.json({ error: message }, { status: 401 });
  }
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function POST(request: NextRequest) {
  try {
    await requireDashboardAuth(request);

    const body = (await request.json()) as PrepareUploadBody;
    const fileName = sanitizeFileName(String(body?.fileName || "").trim());
    const fileType = String(body?.fileType || "").trim().toLowerCase();
    const fileSize = Number(body?.fileSize || 0);
    const rawSlug = String(body?.slug || "cover-image");

    if (!fileName) {
      return NextResponse.json({ error: "File name is required." }, { status: 400 });
    }
    if (!ALLOWED_IMAGE_TYPES.has(fileType)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, GIF, and AVIF files are allowed." },
        { status: 415 }
      );
    }
    if (!Number.isFinite(fileSize) || fileSize <= 0) {
      return NextResponse.json({ error: "Invalid file size." }, { status: 400 });
    }
    if (fileSize > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 50MB." },
        { status: 413 }
      );
    }

    await ensureContentImageBucket();

    const safeSlug = slugify(rawSlug) || "cover-image";
    const extension = resolveFileExtension(fileName, fileType);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const rand = crypto.randomBytes(4).toString("hex");
    const path = `covers/${stamp}-${safeSlug}-${rand}.${extension}`;

    const { data: signed, error: signedError } = await supabaseAdmin.storage
      .from(CONTENT_IMAGE_BUCKET)
      .createSignedUploadUrl(path);

    if (signedError || !signed?.token) {
      throw new Error(signedError?.message || "Failed to create upload token.");
    }

    const { data: publicData } = supabaseAdmin.storage
      .from(CONTENT_IMAGE_BUCKET)
      .getPublicUrl(path);

    return NextResponse.json({
      bucket: CONTENT_IMAGE_BUCKET,
      path,
      token: signed.token,
      signedUrl: signed.signedUrl,
      publicUrl: publicData.publicUrl,
      maxUploadBytes: MAX_UPLOAD_BYTES,
    });
  } catch (error) {
    return toErrorResponse(error);
  }
}
