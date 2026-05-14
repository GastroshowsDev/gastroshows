import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/pages/[id] — Get page with all blocks
 */
export async function GET(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        blocks: { orderBy: { order: "asc" } },
      },
    });

    if (!page) {
      return NextResponse.json({ ok: false, error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: page });
  } catch (err) {
    console.error("[api] GET /admin/pages/[id] failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to get page" }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/pages/[id] — Update page metadata
 */
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = (await req.json()) as {
      title?: string;
      slug?: string;
      published?: boolean;
      seoTitle?: string;
      seoDesc?: string;
      ogImage?: string;
      ogType?: string;
      twitterCard?: string;
      robots?: string;
      canonical?: string;
      hreflang?: any;
      schemaOrg?: any;
      noIndexAfter?: string | null;
    };

    // Normalize slug if provided
    let slug: string | undefined;
    if (body.slug !== undefined) {
      slug = body.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      // Check uniqueness (excluding self)
      const existing = await prisma.page.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existing) {
        return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
      }
    }

    const page = await prisma.page.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(slug !== undefined && { slug }),
        ...(body.published !== undefined && { published: body.published }),
        ...(body.seoTitle !== undefined && { seoTitle: body.seoTitle }),
        ...(body.seoDesc !== undefined && { seoDesc: body.seoDesc }),
        ...(body.ogImage !== undefined && { ogImage: body.ogImage }),
        ...(body.ogType !== undefined && { ogType: body.ogType }),
        ...(body.twitterCard !== undefined && { twitterCard: body.twitterCard }),
        ...(body.robots !== undefined && { robots: body.robots }),
        ...(body.canonical !== undefined && { canonical: body.canonical }),
        ...(body.hreflang !== undefined && { hreflang: body.hreflang }),
        ...(body.schemaOrg !== undefined && { schemaOrg: body.schemaOrg }),
        ...(body.noIndexAfter !== undefined && { noIndexAfter: body.noIndexAfter ? new Date(body.noIndexAfter) : null }),
      },
    });

    if (page.slug) {
      revalidatePath(`/${page.slug}`);
      revalidatePath("/");
    }

    return NextResponse.json({ ok: true, data: page });
  } catch (err) {
    console.error("[api] PATCH /admin/pages/[id] failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to update page" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/pages/[id] — Delete a page and all its blocks
 */
export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) {
      return NextResponse.json({ ok: false, error: "Page not found" }, { status: 404 });
    }

    // Prevent deleting the home page
    if (page.slug === "home") {
      return NextResponse.json({ ok: false, error: "Cannot delete the home page" }, { status: 403 });
    }

    await prisma.page.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api] DELETE /admin/pages/[id] failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete page" }, { status: 500 });
  }
}
