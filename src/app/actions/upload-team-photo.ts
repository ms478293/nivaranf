"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

const BUCKET = "local-partner-photos";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Ensures the storage bucket exists (creates if missing).
 */
async function ensureBucket() {
  const { data: buckets } = await supabaseAdmin.storage.listBuckets();
  const exists = buckets?.some((b) => b.id === BUCKET);
  if (!exists) {
    const { error } = await supabaseAdmin.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_SIZE,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
    });
    if (error && !error.message.includes("already exists")) {
      console.error("Bucket creation error:", error);
      throw new Error("Failed to create storage bucket.");
    }
  }
}

/**
 * Upload a team member photo. Accepts FormData with a single "file" field.
 * Returns the public URL on success.
 */
export async function uploadTeamPhoto(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) {
      return { error: "No file provided." };
    }

    if (!file.type.startsWith("image/")) {
      return { error: "Only image files are allowed." };
    }

    if (file.size > MAX_SIZE) {
      return { error: "Image must be under 5 MB." };
    }

    await ensureBucket();

    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "jpg";
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);
    const filePath = `members/${safeName}_${timestamp}.${ext}`;

    const buffer = await file.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Photo upload error:", uploadError);
      return { error: "Failed to upload photo. Please try again." };
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filePath);

    return { url: publicUrl };
  } catch (err: any) {
    console.error("uploadTeamPhoto error:", err);
    return { error: err?.message || "Upload failed." };
  }
}
