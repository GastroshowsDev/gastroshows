import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageBlockList } from "@/components/blocks/BlockRenderer";
import { PageLayout } from "@/components/PageLayout";
import { LandingPage } from "@/components/home/LandingPage";
import { getLandingContent } from "@/lib/landing-content";
import { JsonLd, restaurantSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import type { BlockData, BlockType, BlockContent } from "@/lib/blocks/types";

export const metadata: Metadata = {
  title: "GastroShows · Menú Degustación y Cena Clandestina en Barcelona",
  description:
    "Vive la cena clandestina más exclusiva de Barcelona. Ubicación secreta, menú degustación en 4 actos, gin-tonic premium y experiencia gastronómica única. Máximo 12 personas.",
  keywords:
    "cena clandestina barcelona, menu degustacion barcelona, restaurante secreto, experiencia gastronomica, sopar clandesti, tasting menu barcelona, cena privada barcelona",
  alternates: {
    canonical: "https://gastroshows.es",
  },
  openGraph: {
    title: "Cena Clandestina Barcelona · Menú Degustación Exclusivo",
    description: "Ubicación secreta, 4 actos gastronómicos, 7 bebidas premium. Una experiencia culinaria única que comienza antes de que llegues.",
    type: "website",
    locale: "es_ES",
  },
};

export default async function Page() {
  let homePage = null;

  try {
    homePage = await prisma.page.findUnique({
      where: { slug: "home", published: true },
      include: { blocks: { orderBy: { order: "asc" } } },
    });
  } catch (e) {
    // Table might not exist yet, use fallback
  }

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
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: "GastroShows", url: "https://gastroshows.es" },
      ])} />
      <main>
        <PageBlockList blocks={blocks} />
      </main>
    </PageLayout>
  );
}
