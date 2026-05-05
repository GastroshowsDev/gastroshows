import { prisma } from "@/lib/prisma";
import { PageBlockList } from "@/components/blocks/BlockRenderer";
import { PageLayout } from "@/components/PageLayout";
import { EventosPage } from "@/components/home/EventosPage";
import { getLandingContent } from "@/lib/landing-content";
import type { BlockData, BlockType, BlockContent } from "@/lib/blocks/types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const pageData = await prisma.page.findUnique({
    where: { slug: "eventos", published: true },
    include: { blocks: { orderBy: { order: "asc" } } },
  });

  if (!pageData) {
    const content = await getLandingContent();
    return <EventosPage content={content} />;
  }

  const blocks: BlockData[] = pageData.blocks.map((b) => ({
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
}
