import { prisma } from "@/lib/prisma";
import { PageBlockList } from "@/components/blocks/BlockRenderer";
import { PageLayout } from "@/components/PageLayout";
import { LandingPage } from "@/components/home/LandingPage";
import { getLandingContent } from "@/lib/landing-content";
import type { BlockData, BlockType, BlockContent } from "@/lib/blocks/types";

export default async function Page() {
  try {
    const homePage = await prisma.page.findFirst({
      where: {
        OR: [{ slug: "inicio" }, { slug: "home" }],
        published: true,
      },
      include: { blocks: { orderBy: { order: "asc" } } },
    });

    if (!homePage) {
      // If no page is found at all, we show a basic message or 404
      return (
        <div className="flex h-screen items-center justify-center">
          <p className="text-zinc-500">Página de inicio no configurada.</p>
        </div>
      );
    }

    const blocks: BlockData[] = homePage.blocks.map((b) => ({
      id: b.id,
      type: b.type as BlockType,
      content: b.content as BlockContent,
      order: b.order,
    }));

    return (
      <PageLayout>
        <main>
          <PageBlockList blocks={blocks} />
        </main>
      </PageLayout>
    );
  } catch (error) {
    console.error("Error rendering home page:", error);
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error al cargar la página de inicio.</p>
      </div>
    );
  }
}
