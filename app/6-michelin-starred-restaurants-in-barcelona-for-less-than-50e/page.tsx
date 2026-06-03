import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "6 Michelin-starred restaurants in Barcelona for less than 50€!",
  description: "Discover 6 Michelin-starred restaurants in Barcelona with lunch menus under 50€: Caelis, Hisop, ORIA, hofmann, xerta and Two Sticks. Affordable haute cuisine.",
  keywords: "michelin restaurants barcelona, michelin lunch menu barcelona, caelis, hisop, oria, hofmann, xerta, dos palillos",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e/", languages: { es: "/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e/", siteName: "GastroShows", title: "6 Michelin-starred restaurants in Barcelona for less than 50€", description: "Affordable Michelin dining in Barcelona." },
};

const restaurants = [
  { id: "caelis", name: "CAELIS", body: ["**Catalan cuisine with Gallic roots**, based on seasonal products. Located in Hotel Ohla Barcelona, led by French chef **Romain Fornell**.","**Menú Caelis** at **€42** (Wed-Sat 13:30-15:30): starter, main, cheese or dessert, coffee and a wine pairing. Not valid for groups over 12 people."] },
  { id: "hisop", name: "Hisop", body: ["Features **Catalan culinary tradition with unique and avant-garde touches**, using local seasonal products. Intimate, professional kitchen.","**Menú Àpat** at **€35** (drinks separate). One of the best Michelin value-for-money offers in Barcelona."] },
  { id: "oria", name: "ORIA", body: ["Provides **traditional Mediterranean cuisine** (with Basque influences) taken to a modern design format. Led by chef **Martín Berasategui** at the Monument Hotel on Passeig de Gràcia.","**Executive Menu** at **€45**: starter, main, dessert, coffee, wine or water, and bread service."] },
  { id: "hofmann", name: "hofmann", body: ["Presents **modern cuisine without forgetting traditional recipes**, in a classic atmosphere with open kitchen views. Pure dedication to gastronomy.","**Lunch menu** at **€39** with three options per course plus wine or water."] },
  { id: "xerta", name: "xerta", body: ["Showcases **cuisine close to Terres de l'Ebre** by chef **Fran López**, trained under Alain Ducasse. Delta Ebro products creatively presented.","**Executive Menu** at **€38** Tuesday-Friday lunches, drinks included."] },
  { id: "two-sticks", name: "TWO STICKS", body: ["**Dos Palillos** offers a **fusion between oriental cuisine (especially Japanese) and Iberian products**, in an elevated tapas format. Heir to the ElBulli philosophy.","**Lunch menu** at **€45** (drinks separate). Located near MACBA in El Raval."] },
];

export default function Michelin50ENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "6 Michelin under 50€", url: "https://gastroshows.es/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "6 Michelin-starred restaurants in Barcelona for less than 50€", description: "Affordable Michelin restaurants in Barcelona.", publishedAt: "2022-05-12T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "6-michelin-starred-restaurants-in-barcelona-for-less-than-50e",
          image: "https://gastroshows.es/images/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e/hero-michelin-restaurants-under-50e-barcelona.jpg", })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">6 Michelin under 50€</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">6 Michelin-starred restaurants in Barcelona for less than 50€!</h1>
          <figure className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img src="/images/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e/hero-michelin-restaurants-under-50e-barcelona.jpg"
              alt="6 Michelin-starred restaurants in Barcelona with lunch menus under 50€ — Caelis, Hisop, ORIA, hofmann, xerta, Dos Palillos" title="6 Michelin-starred restaurants in Barcelona with lunch menus under 50€ — Caelis, Hisop, ORIA, hofmann, xerta, Dos Palillos"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">6 Michelin-starred restaurants in Barcelona with lunch menus under 50€ — Caelis, Hisop, ORIA, hofmann, xerta, Dos Palillos</figcaption>
          </figure>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Haven't you heard yet that <strong>it is possible to enjoy the haute cuisine</strong> of Barcelona's great restaurants and still make ends meet?</p>
        </header>

        {restaurants.map((r) => (
          <section key={r.id} id={r.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{r.name}</h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              {r.body.map((p, i) => (<p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />))}
            </div>
          </section>
        ))}

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Related posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/the-best-restaurants-with-tasting-menu-in-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Best tasting menu restaurants</p>
              <p className="text-sm text-muted-foreground">Top tasting menus in Barcelona.</p>
            </Link>
            <Link href="/clandestine-dinner-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Clandestine dinner Barcelona</p>
              <p className="text-sm text-muted-foreground">Secret tasting experience.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
