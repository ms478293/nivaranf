import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireDashboardAuth } from "@/lib/content/api-auth";
import { slugify } from "@/lib/content/automation";
import { supabaseAdmin } from "@/lib/supabase/server";

const CONTENT_IMAGE_BUCKET = "content-images";
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
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

function resolveFileExtension(file: File) {
  const byType = EXTENSION_BY_TYPE[file.type];
  if (byType) return byType;

  const fromName = file.name.split(".").pop()?.toLowerCase();
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
    return;
  }

  if (!existing.public) {
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

    const formData = await request.formData();
    const file = formData.get("file");
    const rawSlug = String(formData.get("slug") || "cover-image");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, GIF, and AVIF files are allowed." },
        { status: 415 }
      );
    }

    if (file.size <= 0) {
      return NextResponse.json({ error: "Uploaded file is empty." }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 4MB." },
        { status: 413 }
      );
    }

    await ensureContentImageBucket();

    const safeSlug = slugify(rawSlug) || "cover-image";
    const extension = resolveFileExtension(file);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const rand = crypto.randomBytes(4).toString("hex");
    const path = `covers/${stamp}-${safeSlug}-${rand}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(CONTENT_IMAGE_BUCKET)
      .upload(path, Buffer.from(arrayBuffer), {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabaseAdmin.storage.from(CONTENT_IMAGE_BUCKET).getPublicUrl(path);

    return NextResponse.json({
      url: data.publicUrl,
      path,
      size: file.size,
      contentType: file.type,
    });
  } catch (error) {
    return toErrorResponse(error);
  }
}
