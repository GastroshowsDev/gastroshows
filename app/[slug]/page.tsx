import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageBlockList } from "@/components/blocks/BlockRenderer";
import { PageLayout } from "@/components/PageLayout";
import type { BlockData, BlockType, BlockContent } from "@/lib/blocks/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

/**
 * Dynamic page route — renders any page created in the Page Builder.
 *
 * URL: gastroshows.es/{slug}
 *
 * Reserved slugs that should NOT be caught here:
 *   - admin, api, aviso-legal, privacidad, eventos, canjear
 *   (these have their own route folders and take priority)
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const page = await prisma.page.findUnique({
    where: { slug },
    select: { seoTitle: true, seoDesc: true, ogImage: true, title: true },
  });

  if (!page) return {};

  return {
    title: page.seoTitle || page.title,
    description: page.seoDesc || undefined,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDesc || undefined,
      ...(page.ogImage && { images: [page.ogImage] }),
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  const page = await prisma.page.findUnique({
    where: { slug, published: true },
    include: { blocks: { orderBy: { order: "asc" } } },
  });

  if (!page) {
    notFound();
  }

  const blocks: BlockData[] = page.blocks.map((b) => ({
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
