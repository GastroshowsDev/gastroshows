import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Gastronomic space for rent in Barcelona | GastroShows",
  description: "The best gastronomic space rental in Barcelona: 100m² in Sarrià with TPB kitchen, living rooms and cocktail area. From 95€/hour. Perfect for private events.",
  keywords: "gastronomic space rent barcelona, event venue barcelona, private kitchen rent, sarria event space",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/3-gastronomic-space-for-rent-in-barcelona/", languages: { es: "/alquiler-espacio-gastronomico-en-barcelona/" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/3-gastronomic-space-for-rent-in-barcelona/", siteName: "GastroShows", title: "Gastronomic space for rent in Barcelona", description: "100m² private event venue in Sarrià." },
};

export default function GastronomicSpaceENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Gastronomic space for rent", url: "https://gastroshows.es/3-gastronomic-space-for-rent-in-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Gastronomic space for rent in Barcelona", description: "Private event venue in Sarrià.", publishedAt: "2022-03-15T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "3-gastronomic-space-for-rent-in-barcelona" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Gastronomic space for rent</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">Gastronomic space for rent in Barcelona</h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img src="/images/3-gastronomic-space-for-rent-in-barcelona/hero-gastronomic-space-rent-barcelona.jpeg"
              alt="Gastronomic space for rent in Barcelona — 100m² private venue with TPB kitchen in Sarrià, from 95€/hour"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">The best <strong>gastronomic space rental in Barcelona</strong>: private, multipurpose venue with fully equipped TPB kitchen and two living rooms. <strong>From 95€/hour</strong>.</p>
        </header>

        <section id="how-to-rent" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">How to rent the gastronomic space</h2>
          <p className="text-foreground/90 leading-relaxed">Contact us via WhatsApp or our online form. We'll check availability and prepare a tailor-made proposal for your event.</p>
        </section>

        <section id="includes" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">qué incluye</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• <strong>TPB kitchen</strong> with 5 stoves, intelligent oven, dishwashers, Thermomix and professional knife sets.</li>
            <li>• <strong>Main hall</strong> for 22 seated guests with audiovisual equipment.</li>
            <li>• <strong>Cocktail room</strong> with beverage bar, wine cooler and Nespresso maker.</li>
            <li>• <strong>WiFi, soundproofing</strong> and full bathroom facilities.</li>
          </ul>
        </section>

        <section id="where" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">dónde irás</h2>
          <p className="text-foreground/90 leading-relaxed">The venue is in <strong>Sarrià-Sant Gervasi</strong>, the upper district of Barcelona. Easy access by public transport and parking nearby.</p>
        </section>

        <section id="more-info" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Más información</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Pricing:</strong> from 95€/hour</p>
            <p><strong>Surface:</strong> 100m²</p>
            <p><strong>Hours:</strong> 8am - 11pm</p>
            <p><strong>Capacity:</strong> 22 seated · 40 cocktail</p>
          </div>
        </section>

        <section id="why" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Why rent gastronomic space in Barcelona</h2>
          <p className="text-foreground/90 leading-relaxed">Versatile and fully equipped: cooking classes, product demos, private dinners, conferences and team-building activities all fit in this space.</p>
        </section>

        <section id="ideal" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Your ideal gastronomic space in Barcelona</h2>
          <p className="text-foreground/90 leading-relaxed">We adapt to the specific needs of each event: lighting, sound, layout, catering and entertainment. <strong>Everything in one location</strong>.</p>
        </section>

        <section id="all-services" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">All services in a single gastronomic location</h2>
          <p className="text-foreground/90 leading-relaxed">Beyond the space: <strong>photography, catering, music and entertainment</strong> available as add-ons.</p>
        </section>

        <section id="celebrations" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Gastronomic venue rental for your celebrations</h2>
          <p className="text-foreground/90 leading-relaxed">Birthdays, anniversaries, weddings, hen/stag parties, corporate dinners… <strong>any celebration</strong> finds its perfect setting here.</p>
        </section>

        <section id="activities" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">We create gastronomic activities for groups and companies designed to be enjoyed as a team</h2>
          <p className="text-foreground/90 leading-relaxed"><strong>Team-building masterchef, cocktail workshops, sushi classes</strong> and more. Build memorable team moments around gastronomy.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Book your event</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Contact us via WhatsApp or our online form to check availability.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Contact us</Link>
        </section>
      </article>
    </PageLayout>
  );
}
