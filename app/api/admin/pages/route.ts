import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/pages — List all pages
 */
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        _count: { select: { blocks: true } },
      },
    });
    return NextResponse.json({ ok: true, data: pages });
  } catch (err) {
    console.error("[api] GET /admin/pages failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to list pages" }, { status: 500 });
  }
}

/**
 * POST /api/admin/pages — Create a new page
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      title: string;
      slug: string;
      seoTitle?: string;
      seoDesc?: string;
    };

    if (!body.title || !body.slug) {
      return NextResponse.json({ ok: false, error: "Title and slug are required" }, { status: 400 });
    }

    // Normalize slug
    const slug = body.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Check for existing
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
    }

    const page = await prisma.page.create({
      data: {
        title: body.title,
        slug,
        seoTitle: body.seoTitle ?? body.title,
        seoDesc: body.seoDesc,
      },
    });

    return NextResponse.json({ ok: true, data: page }, { status: 201 });
  } catch (err) {
    console.error("[api] POST /admin/pages failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to create page" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/pages — Bulk delete pages
 */
export async function DELETE(req: Request) {
  try {
    const { ids } = (await req.json()) as { ids: string[] };
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ ok: false, error: "No IDs provided" }, { status: 400 });
    }

    // Protection: Do not delete home page
    const pagesToDelete = await prisma.page.findMany({
      where: { id: { in: ids }, slug: { not: "home" } },
      select: { id: true }
    });

    const finalIds = pagesToDelete.map(p => p.id);

    if (finalIds.length === 0) {
      return NextResponse.json({ ok: true, message: "No deletable pages found" });
    }

    await prisma.page.deleteMany({
      where: { id: { in: finalIds } }
    });

    return NextResponse.json({ ok: true, deletedCount: finalIds.length });
  } catch (err) {
    console.error("[api] DELETE /admin/pages failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete pages" }, { status: 500 });
  }
}
