import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/admin/web/export
 * Exports all pages and their blocks to a JSON format compatible with the importer.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const pages = await prisma.page.findMany({
      include: {
        blocks: {
          orderBy: { order: "asc" }
        }
      }
    });

    // Transform to a format that the importer can iterate over if needed,
    // or just return the array. The importer currently expects a single page object.
    // We will provide a wrapper or just the list.
    
    return NextResponse.json({ 
      ok: true, 
      data: pages.map(p => ({
        title: p.title,
        slug: p.slug,
        seoTitle: p.seoTitle,
        seoDesc: p.seoDesc,
        ogImage: p.ogImage,
        blocks: p.blocks.map(b => ({
          type: b.type,
          content: b.content
        }))
      }))
    });
  } catch (err: any) {
    console.error("[api] GET /admin/web/export failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to export pages" }, { status: 500 });
  }
}
