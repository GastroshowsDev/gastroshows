import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, restaurantSchema, breadcrumbSchema } from "@/components/seo/JsonLd";


export const metadata: Metadata = {
  title: "Menú Degustació Barcelona · 7 Actes · GastroShows",
  description: "El millor menú degustació de Barcelona. 7 actes: còctel, taula del xef, 3 plats, 2 postres i gintònic amb petit fours. Maridatge inclòs.",
  keywords: "menu degustacio barcelona, menú degustació barcelona, tasting menu barcelona",
  alternates: {
    canonical: "https://gastroshows.es/ca/menu-degustacion",
    languages: { es: "https://gastroshows.es/menu-degustacion", ca: "https://gastroshows.es/ca/menu-degustacion", en: "https://gastroshows.es/en/tasting-menu", "x-default": "https://gastroshows.es/menu-degustacion" },
  },
};

const actes = [
  { num: "I",   title: "Còctel de Benvinguda",  desc: "L'experiència comença amb un còctel d'autor dissenyat per despertar els sentits. Tastets de benvinguda que marquen el to de la nit." },
  { num: "II",  title: "Taula del Xef",          desc: "Entre 6 i 9 tastets elaborats al moment. Una conversa directa amb la cuina, on cada mossegada explica una història." },
  { num: "III", title: "Primer Plat",            desc: "Producte de temporada i proximitat. Ingredients de quilòmetre zero amb tècnica d'alta cuina." },
  { num: "IV",  title: "Plat Principal",         desc: "El cor del menú. Un plat que combina tradició catalana amb tècniques contemporànies." },
  { num: "V",   title: "Tercer Plat",            desc: "Transició elegant cap als postres. Sabors que evolucionen cap a la dolçor." },
  { num: "VI",  title: "Dos Postres",            desc: "Un preludi i el tancament perfecte. Des del pré-dessert fins al postre principal." },
  { num: "VII", title: "Gintònic & Petit Fours", desc: "4 o 5 petit fours artesanals acompanyats d'un gintònic premium per tancar l'experiència amb elegància." },
];

export default function CaMenuDegustacio() {
  return (
    <PageLayout>
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: "Inici", url: "https://gastroshows.es/ca" },
        { name: "Menú Degustació", url: "https://gastroshows.es/ca/menu-degustacion" },
      ])} />

      <section style={{ background: "linear-gradient(180deg,#050505 0%,var(--gs-bg) 100%)", padding: "8rem 2rem 6rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1.5rem" }}>GastroShows · Barcelona</p>
          <h1 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300, color: "var(--gs-text)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Menú Degustació<br /><em style={{ color: "var(--gs-gold)" }}>Barcelona</em>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--gs-muted)", maxWidth: "580px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Set actes culinaris en una ubicació secreta. Una experiència gastronòmica que comença dies abans que et seguis a taula.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/ca" style={{ background: "var(--gs-gold)", color: "#0A0A0A", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Reservar Ara</Link>
            <Link href="/ca/regalo" style={{ border: "1px solid var(--gs-gold)", color: "var(--gs-gold)", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Regalar Experiència</Link>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--gs-bg2)", borderTop: "1px solid var(--gs-border)", borderBottom: "1px solid var(--gs-border)", padding: "2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1.5rem", textAlign: "center" }}>
          {[["7", "Actes"], ["3 hores", "Durada"], ["13–16h · 20–23h", "Horaris"], ["Inclòs", "Maridatge"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "2rem", fontWeight: 300, color: "var(--gs-gold)" }}>{v}</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gs-muted)", marginTop: "0.25rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, color: "var(--gs-text)", textAlign: "center", marginBottom: "4rem" }}>Els Set Actes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {actes.map((a, i) => (
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
        <p style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "2rem", fontWeight: 300, color: "var(--gs-text)", marginBottom: "0.75rem" }}>15% de descompte els dimecres i dijous</p>
        <p style={{ color: "var(--gs-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>La mateixa experiència completa. El mateix menú. El mateix misteri.</p>
        <Link href="/ca" style={{ background: "var(--gs-gold)", color: "#0A0A0A", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>Reservar amb descompte</Link>
      </section>


    </PageLayout>
  );
}
