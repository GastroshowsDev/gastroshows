import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Sushi workshop Barcelona | Fresh Japanese cuisine activity",
  description: "SUSHI FRESH! The freshest sushi workshop in Barcelona. Team-building Japanese cooking activity from 80€ per person, 2h, minimum 8 people.",
  keywords: "sushi workshop barcelona, sushi class barcelona, team building japanese, cooking workshop barcelona",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/sushi-workshop-barcelona/", languages: { es: "/taller-de-sushi-barcelona" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/sushi-workshop-barcelona/", siteName: "GastroShows", title: "Sushi workshop Barcelona", description: "Fresh Japanese cuisine team-building experience." },
};

export default function SushiWorkshopENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Sushi workshop Barcelona", url: "https://gastroshows.es/sushi-workshop-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Sushi workshop barcelona", description: "Fresh sushi workshop in Barcelona.", publishedAt: "2022-06-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "sushi-workshop-barcelona" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Sushi workshop</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">sushi workshop barcelona</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"><strong>SUSHI FRESH!</strong> Japanese cuisine in the <strong>freshest and most original sushi workshop</strong> in Barcelona.</p>
        </header>

        <section id="what-is" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Qué es</h2>
          <p className="text-foreground/90 leading-relaxed">A hands-on workshop where teams compete to <strong>create the most original sushi roll</strong>. Learn the traditional Japanese techniques for makis, nigiris and uramakis.</p>
        </section>

        <section id="includes" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">qué incluye</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Welcome cocktail","Cooking workshop with professional sushi master","Tasting of prepared dishes","Wine, water and beverages","Awards for winning team"].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border"><span className="text-gold text-xl shrink-0">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <section id="where" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">dónde irás</h2>
          <p className="text-foreground/90 leading-relaxed">The workshop is held at our <strong>private gastronomic space in Barcelona</strong>, equipped with professional kitchen and all the materials needed.</p>
        </section>

        <section id="more-info" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Más información</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Duration:</strong> 2 hours</p>
            <p><strong>Minimum:</strong> 8 people</p>
            <p><strong>Price:</strong> from 80€ per person</p>
            <p><strong>Dates:</strong> to be agreed upon</p>
          </div>
        </section>

        <section id="notes" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Cosas que debes tener en cuenta</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• Notify allergies and intolerances 24h in advance.</li>
            <li>• Fresh produce: confirm final attendees at least 48h before.</li>
          </ul>
        </section>

        <section id="workshop-bcn" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Sushi workshop in barcelona</h2>
          <p className="text-foreground/90 leading-relaxed">An <strong>original gastronomic activity</strong> guided by a professional sushi master who teaches preparation techniques: rice, cutting ingredients, rolling and slicing methods.</p>
        </section>

        <section id="what-find" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">What can you find in the sushi barcelona workshop?</h2>
          <p className="text-foreground/90 leading-relaxed">You'll learn to make <strong>makis, nigiris and temakis</strong> with fresh produce. Traditional techniques explained step by step in an interactive format.</p>
        </section>

        <section id="routine" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Get out of the routine with a sushi workshop in Barcelona.</h2>
          <p className="text-foreground/90 leading-relaxed">A <strong>different and participatory activity</strong> that helps you disconnect from work routine while learning a millenary cuisine.</p>
        </section>

        <section id="groups" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">A sushi workshop barcelona for groups</h2>
          <p className="text-foreground/90 leading-relaxed">Perfect for <strong>team-building, hen/stag parties, birthdays and corporate events</strong>. The format helps <strong>consolidate relationships outside of work</strong>.</p>
        </section>

        <section id="custom" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">A tailor-made gastronomic activity</h2>
          <p className="text-foreground/90 leading-relaxed">We adapt the experience to your group size, dietary restrictions and event goals. Extra services available: <strong>premium pairings, photography or entertainment</strong>.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Ready to roll?</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Get in touch and we'll send you a tailor-made proposal for your group.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">I'm interested!</Link>
        </section>
      </article>
    </PageLayout>
  );
}
