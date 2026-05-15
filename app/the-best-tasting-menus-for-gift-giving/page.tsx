import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "The best tasting menus for gift giving | GastroShows",
  description: "The best tasting menus to give as a gift in Barcelona: clandestine dinner, Osmosis, Asagumo, El Goxo, La Mundana. Gastronomy delivery and experiences.",
  keywords: "tasting menu gift, gastronomic gift barcelona, clandestine dinner gift, food gift barcelona",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/the-best-tasting-menus-for-gift-giving/", languages: { es: "/los-mejores-menus-degustacion-para-regalar/" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/the-best-tasting-menus-for-gift-giving/", siteName: "GastroShows", title: "The best tasting menus for gift giving", description: "Best gastronomic gifts in Barcelona." },
};

const options = [
  { id: "clandestine", name: "THE CLANDESTINE DINNER: RELAX A REAL EXPERIENCE", body: ["A **secret-space dining event** discovered through clues and riddles. Features a **12-dish tasting menu with wine and cava pairings**, ending with premium gin and tonics and surprise elements throughout."], cta: { label: "Give as a gift", href: "/regalo" } },
  { id: "osmosis", name: "OSMOSIS: tasting menu with tradition and innovation", body: ["About **20 dishes for home delivery** featuring **cod fritters, croquettes, vegetables** and main courses like **monkfish suquet, shank, lamb back**, made with refined techniques."] },
  { id: "asagumo", name: "ASAGUMO: TASTING MENU TO GIVE AS A GIFT UNBEATABLE VALUE FOR MONEY", body: ["Japanese cuisine featuring **sushi, gyozas, tuna tartar** with exquisite sauce, and a **mix of sashimi: salmon, tuna and scallop**. The freshest sushi delivery in Barcelona."] },
  { id: "el-goxo", name: "EL GOXO: A FUSION TASTING MENU AS A GIFT", body: ["Chef **Dabiz Muñoz's restaurant** offering homemade food with **ingenuity and fresh local products in a rock/punk style**. Featuring **ribs to prepare your own tacos** as a signature dish."] },
  { id: "la-mundana", name: "LA MUNDANA: MARKET TASTING MENU", body: ["Delivers **quality dishes blending different cuisines** with easy preparation, impeccable presentation, and unbeatable flavour. A 'mundane' but triumphant experience."] },
];

export default function TastingMenusGiftENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Tasting menus for gift giving", url: "https://gastroshows.es/the-best-tasting-menus-for-gift-giving/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "The best tasting menus for gift giving", description: "Best gastronomic gifts in Barcelona.", publishedAt: "2022-10-10T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "the-best-tasting-menus-for-gift-giving" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Tasting menus for gifts</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">The best tasting menus for gift giving</h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img src="/images/the-best-tasting-menus-for-gift-giving/hero-tasting-menus-gift-giving.jpg"
              alt="The best tasting menus for gift giving in Barcelona — clandestine dinner, Osmosis, Asagumo, El Goxo"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">If you share gastronomy, make it one of the best tasting menus to give as a gift. <strong>Barcelona restaurants</strong> propose tasting menus to enjoy inside or outside the home, maintaining top quality.</p>
        </header>

        {options.map((o) => (
          <section key={o.id} id={o.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{o.name}</h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              {o.body.map((p, i) => (<p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />))}
              {o.cta && (<Link href={o.cta.href} className="inline-block bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">{o.cta.label}</Link>)}
            </div>
          </section>
        ))}

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Related posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/clandestine-dinner-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ The clandestine dinner</p>
              <p className="text-sm text-muted-foreground">Secret dinner experience.</p>
            </Link>
            <Link href="/gift-card" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Gift Card</p>
              <p className="text-sm text-muted-foreground">Gastronomic experience as a gift.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
