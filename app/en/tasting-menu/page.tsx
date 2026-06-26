import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, restaurantSchema, breadcrumbSchema } from "@/components/seo/JsonLd";


export const metadata: Metadata = {
  title: "Tasting Menu Barcelona · 7 Acts · GastroShows",
  description: "The best tasting menu in Barcelona. 7 acts: welcome cocktail, chef's table (6-9 bites), 3 courses, 2 desserts and gin & tonic with petit fours. Full wine pairing included.",
  keywords: "tasting menu barcelona, best tasting menu barcelona, barcelona tasting menu",
  alternates: {
    canonical: "https://gastroshows.es/en/tasting-menu",
    languages: { es: "https://gastroshows.es/menu-degustacion", ca: "https://gastroshows.es/ca/menu-degustacion", en: "https://gastroshows.es/en/tasting-menu", "x-default": "https://gastroshows.es/menu-degustacion" },
  },
};

const acts = [
  { num: "I",   title: "Welcome Cocktail",       desc: "The experience begins with a signature cocktail designed to awaken the senses. Welcome snacks that set the tone for the evening." },
  { num: "II",  title: "Chef's Table",            desc: "Between 6 and 9 bites prepared in the moment. A direct conversation with the kitchen where each bite tells a story." },
  { num: "III", title: "First Course",            desc: "Seasonal, local produce. Zero-kilometer ingredients with high cuisine technique." },
  { num: "IV",  title: "Main Course",             desc: "The heart of the menu. A dish that combines Catalan tradition with contemporary techniques." },
  { num: "V",   title: "Third Course",            desc: "An elegant transition towards desserts. Flavours that evolve towards sweetness." },
  { num: "VI",  title: "Two Desserts",            desc: "A prelude and the perfect ending. From the pré-dessert to the final dessert." },
  { num: "VII", title: "Gin & Tonic & Petit Fours", desc: "4 or 5 artisan petit fours accompanied by a premium gin & tonic to close the experience with elegance." },
];

export default function EnTastingMenu() {
  return (
    <PageLayout>
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://gastroshows.es/en" },
        { name: "Tasting Menu", url: "https://gastroshows.es/en/tasting-menu" },
      ])} />

      <section style={{ background: "linear-gradient(180deg,#050505 0%,var(--gs-bg) 100%)", padding: "8rem 2rem 6rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem" }}>GastroShows · Barcelona</p>
          <h1 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300, color: "var(--gs-text)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Tasting Menu<br /><em style={{ color: "var(--gs-gold)" }}>Barcelona</em>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--gs-muted)", maxWidth: "580px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Seven culinary acts in a secret location. A gastronomic experience that begins days before you sit at the table.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/en" style={{ background: "var(--gs-gold)", color: "#0A0A0A", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Book Now</Link>
            <Link href="/en/gift" style={{ border: "1px solid var(--gs-gold)", color: "var(--gs-gold)", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Gift the Experience</Link>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--gs-bg2)", borderTop: "1px solid var(--gs-border)", borderBottom: "1px solid var(--gs-border)", padding: "2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1.5rem", textAlign: "center" }}>
          {[["7", "Acts"], ["3 hours", "Duration"], ["1pm–4pm · 8pm–11pm", "Sessions"], ["Included", "Pairing"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "2rem", fontWeight: 300, color: "var(--gs-gold)" }}>{v}</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gs-muted)", marginTop: "0.25rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, color: "var(--gs-text)", textAlign: "center", marginBottom: "4rem" }}>The Seven Acts</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {acts.map((a, i) => (
            <div key={a.num} style={{ display: "flex", gap: "2rem", alignItems: "flex-start", padding: "2rem", border: "1px solid var(--gs-border)", background: i % 2 === 0 ? "transparent" : "rgba(218,165,32,.02)" }}>
              <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "3.5rem", fontWeight: 300, color: "var(--gs-gold)", opacity: 0.3, lineHeight: 1, minWidth: "3rem", textAlign: "center" }}>{a.num}</div>
              <div>
                <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--gs-text)", marginBottom: "0.75rem" }}>{a.title}</h3>
                <p style={{ color: "var(--gs-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--gs-bg2)", padding: "3.5rem 2rem", borderTop: "1px solid var(--gs-border)", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "2rem", fontWeight: 300, color: "var(--gs-text)", marginBottom: "0.75rem" }}>15% off on Wednesdays and Thursdays</p>
        <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>The same complete experience. The same menu. The same mystery.</p>
        <Link href="/en" style={{ background: "var(--gs-gold)", color: "#0A0A0A", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>Book with discount</Link>
      </section>


    </PageLayout>
  );
}
