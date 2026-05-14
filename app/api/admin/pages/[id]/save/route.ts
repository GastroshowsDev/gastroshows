import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST /api/admin/pages/[id]/save
 * Unified transactional save for Page Metadata AND Blocks.
 */
export async function POST(req: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, slug, published, seoTitle, seoDesc, blocks } = body;

    // Verify page exists
    const existingPage = await prisma.page.findUnique({ where: { id } });
    if (!existingPage) return NextResponse.json({ ok: false, error: "Page not found" }, { status: 404 });

    // Execute everything in a single transaction
    const updatedPage = await prisma.$transaction(async (tx) => {
      // 1. Update Page Metadata
      const page = await tx.page.update({
        where: { id },
        data: {
          title,
          slug,
          published,
          seoTitle,
          seoDesc,
          updatedAt: new Date(),
        },
      });

      // 2. Replace Blocks
      if (Array.isArray(blocks)) {
        // Delete existing
        await tx.pageBlock.deleteMany({ where: { pageId: id } });
        
        // Create new ones (preserving order)
        if (blocks.length > 0) {
          await tx.pageBlock.createMany({
            data: blocks.map((block: any, index: number) => ({
              pageId: id,
              type: block.type,
              content: block.content,
              order: index,
            })),
          });
        }
      }

      return page;
    });

    // Revalidate
    if (updatedPage.slug) {
      revalidatePath(`/${updatedPage.slug}`);
      revalidatePath("/");
    }

    return NextResponse.json({ ok: true, data: updatedPage });
  } catch (err) {
    console.error("[api] POST /admin/pages/[id]/save failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to save page transactionally" }, { status: 500 });
  }
}
