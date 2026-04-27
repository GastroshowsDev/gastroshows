import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

type BlockInput = {
  id?: string;
  type: string;
  content: Prisma.InputJsonValue;
  order: number;
};

/**
 * PUT /api/admin/pages/[id]/blocks — Save all blocks for a page (full replace)
 *
 * Receives an array of blocks and replaces all existing blocks for the page.
 * This is simpler and safer than incremental updates for a visual editor.
 */
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const { blocks } = (await req.json()) as { blocks: BlockInput[] };

    if (!Array.isArray(blocks)) {
      return NextResponse.json({ ok: false, error: "blocks must be an array" }, { status: 400 });
    }

    // Verify page exists
    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) {
      return NextResponse.json({ ok: false, error: "Page not found" }, { status: 404 });
    }

    // Replace all blocks in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete all existing blocks
      await tx.pageBlock.deleteMany({ where: { pageId: id } });

      // Create new blocks
      if (blocks.length > 0) {
        await tx.pageBlock.createMany({
          data: blocks.map((block, index) => ({
            pageId: id,
            type: block.type,
            content: block.content,
            order: block.order ?? index,
          })),
        });
      }

      // Touch the page's updatedAt
      await tx.page.update({
        where: { id },
        data: { updatedAt: new Date() },
      });
    });

    // Return updated page with blocks
    const updated = await prisma.page.findUnique({
      where: { id },
      include: { blocks: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    console.error("[api] PUT /admin/pages/[id]/blocks failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to save blocks" }, { status: 500 });
  }
}
