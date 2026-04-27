import { NextResponse } from "next/server";
import { uploadMedia, listMedia, deleteMedia } from "@/lib/supabase-storage";

/**
 * GET /api/admin/media — List all media assets
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const cursor = url.searchParams.get("cursor") ?? undefined;
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 100);

    const assets = await listMedia(limit, cursor);
    return NextResponse.json({ ok: true, data: assets });
  } catch (err) {
    console.error("[api] GET /admin/media failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to list media" }, { status: 500 });
  }
}

/**
 * POST /api/admin/media — Upload a new media asset
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadMedia(buffer, file.name, file.type);

    return NextResponse.json({ ok: true, data: result });
  } catch (err) {
    console.error("[api] POST /admin/media failed:", err);
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/media — Delete a media asset
 */
export async function DELETE(req: Request) {
  try {
    const { id } = (await req.json()) as { id: string };

    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    }

    await deleteMedia(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api] DELETE /admin/media failed:", err);
    return NextResponse.json({ ok: false, error: "Delete failed" }, { status: 500 });
  }
}
