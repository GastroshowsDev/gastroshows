import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, eventSchema, productSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "The clandestine dinner of Barcelona | GastroShows",
  description: "The clandestine dinner Barcelona: secret location revealed through clues, 10-12 course tasting menu, wine pairings and premium gin. €90-120. Tue-Sat, 20:00-23:00.",
  keywords: "clandestine dinner barcelona, secret dinner barcelona, tasting menu barcelona, gastroshows, mystery dinner",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/clandestine-dinner-barcelona/", languages: { es: "/cena-clandestina" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/clandestine-dinner-barcelona/", siteName: "GastroShows", title: "The clandestine dinner of Barcelona", description: "Secret location, tasting menu and surprise experience." },
};

export default function ClandestineDinnerENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Clandestine dinner Barcelona", url: "https://gastroshows.es/clandestine-dinner-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({ title: "The clandestine dinner of Barcelona", description: "Secret dining experience in Barcelona.", publishedAt: "2022-09-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "clandestine-dinner-barcelona" })} />
      <JsonLd data={eventSchema({ name: "The Clandestine Dinner Barcelona - GastroShows", description: "Secret location dinner with 10-12 course tasting menu and wine pairings.", price: 105 })} />
      <JsonLd data={productSchema({ name: "Clandestine Dinner Gift Voucher", description: "Gift voucher for the GastroShows clandestine dinner experience. Valid 6 months.", price: 105 })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">The clandestine dinner</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">The clandestine dinner</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">This is the <strong>clandestine dinner of Barcelona</strong> you may have heard about. The one where you don't know where you are going to have dinner until the day of the event — you have to discover it yourself through clues and riddles that you receive on your cell phone.</p>
        </header>

        <section id="what-is" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">What is</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/clandestine-dinner-barcelona/hero-clandestine-dinner-barcelona.jpeg"
                alt="The clandestine dinner Barcelona — secret venue with 10-12 course tasting menu and wine pairings"
                className="w-full h-full object-cover" width={600} height={400} loading="eager" fetchPriority="high" />
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>The clandestine dinner is a unique <strong>gastronomic experience</strong> taking place in a secret venue in Barcelona. The location is revealed through email clues, days before the event.</p>
              <p>Each evening is different, with a <strong>10-12 course tasting menu</strong> depending on the season.</p>
            </div>
          </div>
        </section>

        <section id="what-included" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">what is included</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Welcome cocktail","10-12 course tasting menu","Wine pairings","Premium gin tasting","Live chef showcooking","Surprises throughout the evening"].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border"><span className="text-gold text-xl shrink-0">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <section id="where" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">where you will go</h2>
          <p className="text-foreground/90 leading-relaxed">The location is <strong>secret</strong>. You'll receive clues via email a few days before the event, leading you to a hidden venue in Barcelona. The experience begins at <strong>20:00</strong>.</p>
        </section>

        <section id="dates" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Dates</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Schedule:</strong> Tuesday to Saturday, 20:00-23:00</p>
            <p><strong>Price:</strong> €90-120 per person</p>
            <p><strong>Group size:</strong> up to 6 people (or full venue privatisation)</p>
          </div>
        </section>

        <section id="notes" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Things to keep in mind</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• Notify any allergies or dietary restrictions 24h in advance.</li>
            <li>• Cancellation policy provided at booking.</li>
            <li>• Gift voucher option available, valid 6 months.</li>
          </ul>
        </section>

        <section id="give" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Give a clandestine dinner as a gift to your loved ones</h2>
          <p className="text-foreground/90 leading-relaxed">The clandestine dinner makes a unique gift. Buy a <strong>gift voucher</strong> and let your loved ones discover Barcelona's most original dining experience whenever they choose.</p>
        </section>

        <section id="sharing" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">The best part of an experience is sharing it</h2>
          <p className="text-foreground/90 leading-relaxed">Gastronomy connects people. The clandestine dinner is the perfect excuse to <strong>share memorable moments</strong> with the people who matter.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">We look forward to seeing you at the clandestine dinner</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Book your spot now and discover the most original dining experience in Barcelona.</p>
          <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Book now</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Related posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/the-best-restaurants-with-tasting-menu-in-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Best tasting menus Barcelona</p>
              <p className="text-sm text-muted-foreground">Top tasting menu restaurants.</p>
            </Link>
            <Link href="/6-michelin-starred-restaurants-in-barcelona-for-less-than-50e" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ 6 Michelin under 50€</p>
              <p className="text-sm text-muted-foreground">Affordable starred dining.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
