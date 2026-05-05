import { prisma } from "@/lib/prisma";
import { PageBlockList } from "@/components/blocks/BlockRenderer";
import { PageLayout } from "@/components/PageLayout";
import { LandingPage } from "@/components/home/LandingPage";
import { getLandingContent } from "@/lib/landing-content";
import type { BlockData, BlockType, BlockContent } from "@/lib/blocks/types";

export default async function Page() {
  const homePage = await prisma.page.findUnique({
    where: { slug: "home", published: true },
    include: { blocks: { orderBy: { order: "asc" } } },
  });

  // Fallback to legacy system if the new "home" page isn't ready/published
  if (!homePage) {
    const content = await getLandingContent();
    return <LandingPage content={content} />;
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
}
