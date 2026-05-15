import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Los mejores planes para Halloween y Castanyada en Barcelona",
  description: "Halloween y la Castanyada en Barcelona: terror inmersivo, cine, fiestas, tradición catalana, Día de Muertos y exploración urbana. Toda la programación.",
  keywords: "halloween barcelona, castanyada barcelona, planes halloween 2025, terror barcelona, panellets, castañas",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/planes-para-halloween-castanyada-en-barcelona/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/planes-para-halloween-castanyada-en-barcelona/", siteName: "GastroShows", title: "Halloween y Castanyada en Barcelona", description: "Los mejores planes." },
};

const planes = [
  { id: "terror", name: "Terror inmersivo", body: "Poble Espanyol ofrece **experiencias familiares e intensas**. Tibidabo cuenta con un pasaje del terror en hotel; Hotel Drácula incluye aventuras VR; y experiencias en bosque como **La Última Acampada** combinan caminatas con misterio." },
  { id: "cultura", name: "Cultura, cine y música", body: "Conciertos temáticos a la luz de velas, **rutas de cine por las localizaciones de terror** de Barcelona y acompañamiento de órgano para clásicos del cine mudo." },
  { id: "fiesta", name: "Fiesta y noche", body: "Salas como **Razzmatazz y Sala Apolo** organizan eventos temáticos con concursos de disfraces y sesiones de DJ. La opción nocturna para los amantes del baile." },
  { id: "castanyada", name: "Tradición catalana: Castañada", body: "**Castañas asadas, panellets de almendra** y visitas a los cementerios monumentales (Poblenou, Montjuïc) son las tradiciones más auténticas de la castanyada catalana." },
  { id: "muertos", name: "Día de Muertos en clave local", body: "Algunas comunidades latinoamericanas en Barcelona celebran el **Día de Muertos con ofrendas, gastronomía mexicana y actividades culturales**." },
  { id: "urbana", name: "Exploración urbana y misterio", body: "Pueblos fantasma, **rutas por edificios abandonados** y pasajes pop-up de terror en barrios concretos. Alternativas económicas y diferentes." },
  { id: "gastroshows", name: "GastroShows: un plan gastronómico secreto para halloween y la castanyada 2025", body: "Una cena clandestina **con ambientación especial** para Halloween y la Castanyada. Plan gastronómico secreto en ubicación oculta de Barcelona.", cta: { label: "Reservar Cena Clandestina", href: "/cena-clandestina" } },
];

export default function HalloweenPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Halloween Castanyada Barcelona", url: "https://gastroshows.es/planes-para-halloween-castanyada-en-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Los mejores planes para Halloween y Castanyada en Barcelona", description: "Halloween y Castanyada en Barcelona.", publishedAt: "2024-10-15T10:00:00+02:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "planes-para-halloween-castanyada-en-barcelona" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Halloween & Castanyada</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">Los mejores planes para halloween y la castanyada en Barcelona</h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img src="/images/planes-para-halloween-castanyada-en-barcelona/hero-halloween-castanyada-barcelona.jpg"
              alt="Planes para Halloween y la Castanyada en Barcelona — terror inmersivo, panellets y tradición catalana"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"><strong>Barcelona vive octubre entre el susto y la tradición</strong>. Te organizamos los planes por categoría: terror inmersivo, cultura, fiesta nocturna, tradición catalana, Día de Muertos y exploración urbana.</p>
        </header>

        {planes.map((p) => (
          <section key={p.id} id={p.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4 uppercase">{p.name}</h2>
            <p className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.body.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            {p.cta && (
              <Link href={p.cta.href} className="inline-block mt-4 bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">
                {p.cta.label}
              </Link>
            )}
          </section>
        ))}

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/hacer-algo-diferente-en-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Hacer algo diferente en Barcelona</p>
              <p className="text-sm text-muted-foreground">Planes originales todo el año.</p>
            </Link>
            <Link href="/cenas-espectaculo-barcelona-secreta/" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cenas con espectáculo en Barcelona</p>
              <p className="text-sm text-muted-foreground">Para una noche temática.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
