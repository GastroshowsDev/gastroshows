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
