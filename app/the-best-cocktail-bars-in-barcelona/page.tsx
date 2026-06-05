import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "The Best Cocktail Bars in Barcelona | Top 5 Venues",
  description: "Discover the best cocktail bars in Barcelona. Bobby's Free, Paradiso, Tuxedo Social Club, Dry Martini, Club 61. Creative drinks and cozy atmospheres.",
  keywords: "best cocktail bars barcelona, cocktail bars bcn, where to drink barcelona, craft cocktails barcelona",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/the-best-cocktail-bars-in-barcelona/" },
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://gastroshows.es/the-best-cocktail-bars-in-barcelona/",
    siteName: "GastroShows",
    title: "The Best Cocktail Bars in Barcelona",
    description: "Top cocktail venues with creative drinks and unique atmospheres.",
  },
};

export default function BestCocktailBarsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Best Cocktail Bars", url: "https://gastroshows.es/the-best-cocktail-bars-in-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({
        title: "The Best Cocktail Bars in Barcelona",
        description: "Guide to the top cocktail bars with creative drinks and unique atmospheres.",
        publishedAt: "2022-07-15T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "the-best-cocktail-bars-in-barcelona",
        image: "https://gastroshows.es/images/cocktail-bars/hero-cocktails.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Best Cocktail Bars</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            The Best Cocktail Bars in Barcelona
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A <strong>wide variety of drinks, both classic and contemporary</strong>, served in venues with neat decoration and cozy atmosphere. Discover Barcelona's best cocktail bars.
          </p>
        </header>

        <section id="bobbys-free" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Bobby's Free — Secret Location</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>A clandestine bar experience</strong> with classic cocktails and house creations. The retro and cozy style features leather sofas and comfortable armchairs perfect for relaxing.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Food menu:</strong> Tapas including croquettes, Iberian ham, patatas bravas. Beyond just drinks, it's a complete experience.
          </p>
        </section>

        <section id="paradiso" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Paradiso — Creative & Sophisticated</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Located in El Born neighborhood, <strong>Paradiso specializes in creative and sophisticated cocktails using unusual ingredients.</strong> Each drink comes in original glasses and cups designed for that specific creation.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Food pairing:</strong> Tapas and innovative dishes made with quality ingredients enhance the cocktail experience.
          </p>
        </section>

        <section id="tuxedo" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Tuxedo Social Club — Gracia's Hidden Gem</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Found in Gracia neighborhood behind an <strong>unmarked door with staircase entry.</strong> The venue features an <strong>exceptional cocktail menu</strong> in an atmosphere decorated with antique books and vinyl record collections.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Cuisine:</strong> Classic to innovative tapas paired perfectly with signature cocktails.
          </p>
        </section>

        <section id="dry-martini" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Dry Martini — World-Class Institution</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Located in Eixample district, <strong>Dry Martini has been serving exceptional cocktails since 1978.</strong> Specializing in classic cocktails: Dry Martini, Manhattan, Negroni, Old Fashioned.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Reputation:</strong> Considered one of the best cocktail bars in the world. A Barcelona institution for quality spirits and mixology expertise.
          </p>
        </section>

        <section id="club-61" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Club 61 — Intimate & Modern</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            In Raval district, <strong>Club 61 creates creative and sophisticated cocktails using fresh, quality ingredients.</strong> The intimate, vintage-modern décor provides the perfect setting for an evening out.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Entertainment:</strong> Live music performances enhance the experience. <strong>Food:</strong> Dishes paired with cocktails.
          </p>
        </section>

        <section id="consejos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Tips for Cocktail Hopping in Barcelona</h2>
          <ul className="space-y-3 text-foreground/90">
            <li>• <strong>Start early:</strong> Many bars get crowded after 10 PM.</li>
            <li>• <strong>Try house specials:</strong> Bartenders create unique drinks daily.</li>
            <li>• <strong>Pair with tapas:</strong> Food enhances the cocktail experience.</li>
            <li>• <strong>Ask for recommendations:</strong> Expert bartenders know what you'll love.</li>
            <li>• <strong>Dress smart-casual:</strong> Most upscale bars prefer neat appearance.</li>
          </ul>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">After Cocktails? Enjoy a Gastronomic Experience</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Combine your night with a unique dining experience. Our tasting menus pair perfectly with premium beverages.</p>
          <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Discover Our Experiences</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Related Gastronomic Guides</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/donde-cenar-en-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Where to Dine in Barcelona</p>
              <p className="text-sm text-muted-foreground">Secret dining spots with excellent cuisine.</p>
            </Link>
            <Link href="/taller-cocteles-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cocktail Workshop Barcelona</p>
              <p className="text-sm text-muted-foreground">Learn mixology from professional bartenders.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
