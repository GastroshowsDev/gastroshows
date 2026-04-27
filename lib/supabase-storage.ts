/**
 * Supabase Storage client for the media gallery.
 *
 * Handles file uploads, listing, and deletion in the "media" bucket.
 * Each upload is tracked in the `MediaAsset` table for the admin gallery.
 */

import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const BUCKET = "media";

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error("[supabase-storage] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

/**
 * Upload a file to Supabase Storage and track it in MediaAsset.
 */
export async function uploadMedia(
  file: Buffer,
  filename: string,
  mimeType: string
): Promise<{ id: string; url: string }> {
  const supabase = getClient();

  // Generate a unique storage path to avoid collisions
  const timestamp = Date.now();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `uploads/${timestamp}_${safeName}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType: mimeType,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`[supabase-storage] Upload failed: ${uploadError.message}`);
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(storagePath);

  const url = urlData.publicUrl;

  // Track in database
  const asset = await prisma.mediaAsset.create({
    data: {
      filename: safeName,
      url,
      storagePath,
      mimeType,
      sizeBytes: file.length,
    },
  });

  return { id: asset.id, url: asset.url };
}

/**
 * List all media assets, most recent first.
 */
export async function listMedia(limit = 100, cursor?: string) {
  return prisma.mediaAsset.findMany({
    take: limit,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Delete a media asset from both Storage and the database.
 */
export async function deleteMedia(id: string): Promise<void> {
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) return;

  const supabase = getClient();

  // Delete from storage (don't throw if file is already gone)
  await supabase.storage.from(BUCKET).remove([asset.storagePath]);

  // Delete from database
  await prisma.mediaAsset.delete({ where: { id } });
}
