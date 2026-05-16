import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "The best restaurants with tasting menu in Barcelona | GastroShows",
  description: "Discover the best restaurants with tasting menu in Barcelona: GastroShows clandestine dinner, Xavier Pellicer, Taberna Noroeste, Slow and Low, CRUIX and La Tartarería.",
  keywords: "tasting menu barcelona, best restaurants barcelona, gastroshows, xavier pellicer, cruix, slow and low",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/the-best-restaurants-with-tasting-menu-in-barcelona/", languages: { es: "/mejores-restaurantes-menu-degustacion-barcelona/" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/the-best-restaurants-with-tasting-menu-in-barcelona/", siteName: "GastroShows", title: "The best restaurants with tasting menu in Barcelona", description: "Top tasting menu restaurants in Barcelona." },
};

const restaurants = [
  { id: "gastroshows", name: "Gastroshows: tasting menu at La cena clandestina", body: ["**Gastroshows** offers a clandestine dinner with a **12-dish tasting menu** with wine and cava pairings. The location is secret and discovered through clues sent by email the week before.","An immersive gastronomic experience that goes beyond a meal. Limited to 12 people per night."], cta: { label: "Discover La Cena Clandestina", href: "/cena-clandestina" } },
  { id: "xavier-pellicer", name: "RESTAURANT XAVIER PELLICER: eco tasting menu", body: ["Located in the Gòtic district, this restaurant specialises in **organic, locally-sourced vegetables and wild-caught fish**. Recognised as one of the World's Best Vegetable Restaurants.","Don't miss the wild-caught fish and the matcha tea coulant. Imperative to book ahead — it fills quickly."] },
  { id: "taberna-noroeste", name: "TABERNA NOROESTE: tasting menu a la carte", body: ["**Exquisite products and impeccable execution** with Galician and Castilian-León influences. The menu is short; the staff recommends sharing **7-8 dishes** for €70-80 per person.","Waiting list of weeks. Reservation mandatory."] },
  { id: "slow-and-low", name: "SLOW AND LOW: tasting menu with spicy flavors", body: ["A cultural fusion restaurant offering an **€80 tasting menu** featuring international products and signature cocktails.","Unique proposal in Barcelona combining international techniques with local product."] },
  { id: "cruix", name: "CRUIX: restaurant with tasting menu in Barcelona", body: ["**Author-style tapas and original rice dishes** with dynamic service. **Bib Gourmand** of the Michelin Guide.","Tasting menu at €50 — one of the best value-for-money options in Barcelona for Michelin-recognised cuisine."] },
  { id: "la-tartareria", name: "LA TARTARERÍA: tartar tasting menu", body: ["Specialises in **tartare dishes** with a €60 tasting menu including oysters, seafood and dessert tartare options.","A unique proposal in the city for tartare lovers."] },
];

export default function BestTastingMenuENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Best tasting menu Barcelona", url: "https://gastroshows.es/the-best-restaurants-with-tasting-menu-in-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "The best restaurants with tasting menu in Barcelona", description: "Top tasting menu restaurants.", publishedAt: "2022-04-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "the-best-restaurants-with-tasting-menu-in-barcelona",
          image: "https://gastroshows.es/images/the-best-restaurants-with-tasting-menu-in-barcelona/hero-tasting-menu-restaurants-barcelona.jpeg", })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Best tasting menu Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">The best restaurants with tasting menu Barcelona</h1>
          <figure className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img src="/images/the-best-restaurants-with-tasting-menu-in-barcelona/hero-tasting-menu-restaurants-barcelona.jpeg"
              alt="The best restaurants with tasting menu in Barcelona — guide to top gastronomic experiences" title="The best restaurants with tasting menu in Barcelona — guide to top gastronomic experiences"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">The best restaurants with tasting menu in Barcelona — guide to top gastronomic experiences</figcaption>
          </figure>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">It's no secret that gastronomy is in fashion. In recent years, cooking has experienced a surge in popularity thanks to social media.</p>
        </header>

        {restaurants.map((r) => (
          <section key={r.id} id={r.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{r.name}</h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              {r.body.map((p, i) => (<p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />))}
              {r.cta && (<Link href={r.cta.href} className="inline-block bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">{r.cta.label}</Link>)}
            </div>
          </section>
        ))}

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Related posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ 6 Michelin restaurants under 50€</p>
              <p className="text-sm text-muted-foreground">Affordable starred dining.</p>
            </Link>
            <Link href="/clandestine-dinner-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Clandestine dinner Barcelona</p>
              <p className="text-sm text-muted-foreground">The secret tasting experience.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
