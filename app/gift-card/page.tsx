import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, productSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Gastronomic Experience Gift Card | GastroShows Barcelona",
  description: "Gastronomic experience in Barcelona as a gift. Clandestine dinner gift card: tasting menu and wine pairing, valid 6 months. From 90-110€.",
  keywords: "gift card barcelona, gastronomic gift card, clandestine dinner gift, experience gift barcelona",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/gift-card/", languages: { es: "/regalo" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/gift-card/", siteName: "GastroShows", title: "Gastronomic Experience Gift Card", description: "Clandestine dinner gift card." },
};

export default function GiftCardENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Gift Card", url: "https://gastroshows.es/gift-card/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Gastronomic Experience Gift", description: "Gift card for gastronomic experience in Barcelona.", publishedAt: "2022-11-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "gift-card" })} />
      <JsonLd data={productSchema({ name: "GastroShows Clandestine Dinner Gift Card", description: "Gift voucher for the GastroShows clandestine dinner. Valid 6 months.", price: 100 })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Gift Card</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">Gastronomic Experience Gift</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Gastronomic experience in Barcelona as a gift, <strong>live it in Gastroshows®</strong>. Curated dinner experiences designed as gift vouchers.</p>
        </header>

        <section id="clandestine-gift" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Clandestine dinner gift card</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/experiencia/mesa-cena-clandestina.jpg" alt="Clandestine dinner gift card" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>The best gift for food lovers: a <strong>clandestine dinner experience</strong> in a secret Barcelona venue.</p>
              <p><strong>Price:</strong> 90-110€ · <strong>Valid:</strong> 6 months · <strong>Available:</strong> Tuesday to Saturday</p>
            </div>
          </div>
        </section>

        <section id="for-two" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">secret dinner gift card for two</h2>
          <p className="text-foreground/90 leading-relaxed">A perfect <strong>couples' gift</strong>: clandestine dinner for two with full experience — secret location, tasting menu, wine pairings, premium gin.</p>
        </section>

        <section id="advantages" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Advantages of the gift voucher</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• <strong>Flexible</strong>: the recipient chooses their date.</li>
            <li>• <strong>6 months validity</strong>.</li>
            <li>• <strong>Personalisable message</strong>.</li>
            <li>• <strong>Digital delivery</strong>: instant via email.</li>
          </ul>
        </section>

        <section id="delivery" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">How the gift is delivered</h2>
          <p className="text-foreground/90 leading-relaxed">Recipients receive <strong>digital vouchers via email</strong>, redeemable within six months. The booking process takes under five minutes and allows personalised messaging.</p>
        </section>

        <section id="enjoy" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">The experience can be enjoyed alone, as a couple, with family or friends</h2>
          <p className="text-foreground/90 leading-relaxed">Adaptable to <strong>any group size</strong>. Buy multiple vouchers or one for a couple, family or group of friends.</p>
        </section>

        <section id="book" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Book your gift voucher in just one click and from home</h2>
          <p className="text-foreground/90 leading-relaxed">Online purchase in <strong>under 5 minutes</strong>. Receive the voucher by email immediately.</p>
        </section>

        <section id="things-tell" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Give the gift of things to tell</h2>
          <p className="text-foreground/90 leading-relaxed">Experiences are <strong>memories</strong>. They leave stories to tell, unlike physical gifts.</p>
        </section>

        <section id="customised" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Your fully customized gift voucher</h2>
          <p className="text-foreground/90 leading-relaxed">Add a <strong>personal message, dedication or scheduled send date</strong>. We deliver exactly when you want.</p>
        </section>

        <section id="want-give" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">I want to give a gastronomic experience in Barcelona as a gift</h2>
          <p className="text-foreground/90 leading-relaxed">Click the button below and complete the order. The voucher is sent instantly to the email you specify.</p>
        </section>

        <section id="original" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">An original gastronomic gift experience in Barcelona</h2>
          <p className="text-foreground/90 leading-relaxed">There's nothing like it in Barcelona: <strong>secret location, clues, tasting menu and surprises</strong>. The most original gastronomic gift.</p>
        </section>

        <section id="also-give" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">You can also give a clandestine dinner as a gift</h2>
          <p className="text-foreground/90 leading-relaxed">The classic format: <strong>clandestine dinner gift voucher</strong>. Tasting menu + experience in a hidden venue.</p>
        </section>

        <section id="what-find" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">What will you find at a clandestine dinner?</h2>
          <p className="text-foreground/90 leading-relaxed"><strong>Neurogastronomy techniques</strong> emphasising mystery, surprises and sensory engagement. A complete tasting menu with wine pairing in a secret Barcelona location.</p>
        </section>

        <section id="valentines" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Original gift for Valentine's Day</h2>
          <p className="text-foreground/90 leading-relaxed">An <strong>unforgettable Valentine's Day gift</strong>: clandestine dinner for two. Secret location, gastronomy and romance.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Get the gift card now</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Sent instantly to the email you specify. Valid for 6 months.</p>
          <Link href="/regalo" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Buy gift card</Link>
        </section>
      </article>
    </PageLayout>
  );
}
