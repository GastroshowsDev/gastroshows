import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cheap tapas bars in Barcelona | Top 10 must-visit",
  description: "In these 10 tapas bars in Barcelona you will enjoy good tapas for less than 20€: Quimet & Quimet, Xampanyet, Gata Mala, Cañete, La Plata and more.",
  keywords: "cheap tapas barcelona, tapas bars barcelona, best tapas bars barcelona, tapas barcelona, bars tapas barcelona",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/cheap-tapas-bars-in-barcelona/", languages: { es: "/bares-tapas-barcelona-baratos/" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/cheap-tapas-bars-in-barcelona/", siteName: "GastroShows", title: "Cheap tapas bars in Barcelona", description: "Top 10 cheap tapas bars in Barcelona." },
};

const bars = [
  { id: "quimet-quimet", name: "QUIMET & QUIMET", subtitle: "classic tapas in Poble-Sec", body: ["Talking about delicious and economical tapas in Barcelona means talking about **Quimet & Quimet**. A tapas bar in Barcelona **since 1914** with a welcoming traditional atmosphere. But don't let the staging fool you — their menu is full of updated, avant-garde tapas.","Highlights are **their conserves**: anchovies, mussels, razor clams. Plus an out-of-this-world vermouth and their own beer."] },
  { id: "xampanyet", name: "XAMPANYET", subtitle: "xampanyet and iberian tapas in el Born", body: ["An emblematic local in the heart of **El Born**, open **since 1929**. Traditional and welcoming aesthetics with a great variety of tapas: Iberian cured meats, anchovies, and an exquisite selection of wine, vermouth or their classic **xampanyet (it's addictive!)**."] },
  { id: "gata-mala", name: "GATA MALA", subtitle: "cheap and tasty tapas bars Barcelona", body: ["A small spot in **Gràcia** that stands out for the greatness of its tapas. **Tapas are free with each drink** and they are generous, high-quality. Also try the escalivada with goat cheese or the homemade raviolo."] },
  { id: "canete", name: "CAÑETE BAR", subtitle: "cheap tapas bars in barcelona and fish bars in Raval", body: ["If you love fresh fish, **Bar Cañete** in **El Raval** is your choice. Try their breaded fish, which will make you cry with emotion. A 'gourmet' but affordable experience, specialising in seafood and fish tapas."] },
  { id: "la-plata", name: "LA PLATA", subtitle: "authentic fishermen's tavern tapas", body: ["Another classic tapas bar of Barcelona, going strong **since 1945**. Walking in is like entering an **authentic fishermen's tavern**. The four must-have tapas: fried blue fish; tomato, onion and olive salad; blood-sausage skewer; and anchovy skewer. Excellent DO wine selection."] },
  { id: "el-58", name: "THE 58", subtitle: "varied and creative tapas in Poblenou", body: ["A modern and welcoming establishment in **Poblenou** with creative dishes: prawn brochette with sweet chilli, grilled prawns, and outstanding patatas bravas. Their weekday lunch menu in the inner patio is a great deal."] },
  { id: "cova-fumada", name: "THE SMOKED COVE", subtitle: "the Barceloneta bomb", body: ["**La Cova Fumada** in **Barceloneta**, where the famous **bomba** tapa was created. Traditional, seafaring style. You'll also find chickpeas with squid, capipota and sardines. Great atmosphere, product and price."] },
  { id: "vaso-oro", name: "EL VASO DE ORO", subtitle: "tapas and tradition", body: ["A classic of classics with over **half a century of history**. Uniformed waiters and one of the best places in Barcelona for a perfectly poured beer. Classic tapas: bravas, Padrón peppers, Russian salad and the star dish: **fillet with foie**."] },
  { id: "balius", name: "BALIUS", subtitle: "andalusian tapas in Poblenou", body: ["Ideal for any occasion: an after-work beer, a weekend vermouth or a Saturday night cocktail. Andalusian and Castilian tapas: orza loin and atascaburras. **Slow Food** philosophy with local, organic produce."] },
  { id: "la-monroe", name: "La Monroe", subtitle: "tapas at any time in the Raval", body: ["A laid-back, modern venue at the Filmoteca square, in **El Raval**. Breakfasts, tapas or a budget-friendly menu. Highlights: Russian salad and Ponts cured meats. Large terrace and bright space."] },
];

export default function CheapTapasENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Cheap tapas bars Barcelona", url: "https://gastroshows.es/cheap-tapas-bars-in-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Cheap tapas bars in Barcelona", description: "Top 10 cheap tapas bars in Barcelona.", publishedAt: "2022-06-15T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "cheap-tapas-bars-in-barcelona",
          image: "https://gastroshows.es/images/cheap-tapas-bars-in-barcelona/hero-cheap-tapas-bars-barcelona.jpg", })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Cheap tapas bars Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">Bars tapas barcelona cheap</h1>
          <figure className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img src="/images/cheap-tapas-bars-in-barcelona/hero-cheap-tapas-bars-barcelona.jpg"
              alt="The 10 best cheap tapas bars in Barcelona — vermouth, montaditos and authentic local cuisine under 20€" title="The 10 best cheap tapas bars in Barcelona — vermouth, montaditos and authentic local cuisine under 20€"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">The 10 best cheap tapas bars in Barcelona — vermouth, montaditos and authentic local cuisine under 20€</figcaption>
          </figure>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">In these <strong>10 tapas bars in Barcelona</strong> you will enjoy good tapas for less than 20€.</p>
        </header>

        {bars.map((b, idx) => (
          <section key={b.id} id={b.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{b.name} <span className="text-muted-foreground text-2xl">– {b.subtitle}</span></h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              {b.body.map((p, i) => (<p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />))}
            </div>
          </section>
        ))}

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Related posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ 6 Michelin-starred restaurants under 50€</p>
              <p className="text-sm text-muted-foreground">High cuisine on a budget.</p>
            </Link>
            <Link href="/the-best-restaurants-with-tasting-menu-in-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ The best tasting menus in Barcelona</p>
              <p className="text-sm text-muted-foreground">Top tasting menu restaurants.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
