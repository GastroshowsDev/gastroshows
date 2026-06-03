import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Actividades gastronómicas para grupos | GastroShows",
  description: "Las mejores actividades gastronómicas ideales para empresas y grupos: degustación con chef privado, cena clandestina, talleres de cocina, GastroChallenge y coctelería.",
  keywords: "actividades gastronómicas, actividades para grupos barcelona, team building gastronómico, chef privado barcelona, cena clandestina grupos",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/actividades-gastronomicas/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/actividades-gastronomicas/", siteName: "GastroShows", title: "Actividades gastronómicas para grupos", description: "Las mejores actividades gastronómicas para empresas y grupos." },
};

const actividades = [
  { id: "degustacion-chef", name: "degustación con chef privado", body: "**Siéntate en la mesa del chef** y déjate sorprender por nuestro equipo de cocina y sus propuestas gastronómicas de temporada.", href: "/cenas-privadas-barcelona" },
  { id: "cena-clandestina-grupos", name: "Cena clandestina para grupos", body: "Una de las mejores maneras de disfrutar de la gastronomía es **compartiendo momentos juntos**. Cena clandestina con ubicación secreta adaptable a grupos.", href: "/cena-clandestina" },
  { id: "talleres-cocina", name: "Las mejores actividades gastronómicas: Talleres de cocina", body: "Catálogo de **talleres de cocina** para descubrir nuevas técnicas y disfrutar en grupo.", href: "/talleres-gastronomicos" },
  { id: "gastrochallenge", name: "GastroChallenge", body: "Concursantes, tenéis **50 minutos para elaborar todo el menú**, ¿estáis listos? 3, 2, 1, ¡a cocinar!" },
  { id: "taller-tapas", name: "Taller de tapas", body: "Las tapas mejor compartirlas en este **taller de creación y diversión** para todo el equipo." },
  { id: "cocteleria", name: "La mejor actividad: COCTELERÍA para todos", body: "Los participantes se convierten en bartenders preparando cócteles **como auténticos mixólogos profesionales**.", href: "/taller-cocteles-barcelona" },
  { id: "cocteleria-online", name: "Taller de coctelería presencial y online para grupos", body: "Disponible en **formato presencial** en Barcelona o **online** para equipos remotos. La mixología llega a todos." },
];

export default function ActividadesGastronomicasPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Actividades gastronómicas", url: "https://gastroshows.es/actividades-gastronomicas/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Actividades gastronómicas para grupos", description: "Catálogo de actividades.", publishedAt: "2022-07-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "actividades-gastronomicas",
          image: "https://gastroshows.es/images/actividades-gastronomicas/hero-actividades-gastronomicas-grupos.jpg", })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Actividades gastronómicas</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">actividades gastronómicas</h1>
          <figure className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img src="/images/actividades-gastronomicas/hero-actividades-gastronomicas-grupos.jpg"
              alt="Las mejores actividades gastronómicas para empresas y grupos en Barcelona — talleres, GastroChallenge y cenas clandestinas" title="Las mejores actividades gastronómicas para empresas y grupos en Barcelona — talleres, GastroChallenge y cenas clandestinas"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Las mejores actividades gastronómicas para empresas y grupos en Barcelona — talleres, GastroChallenge y cenas clandestinas</figcaption>
          </figure>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Las mejores <strong>actividades gastronómicas ideales para empresas y grupos</strong> en Barcelona.</p>
        </header>

        <section id="para-grupos" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">actividades gastronómicas para grupos</h2>
          <p className="text-foreground/90 leading-relaxed">Catálogo completo de actividades pensadas para vivir la gastronomía en equipo.</p>
        </section>

        {actividades.map((a) => (
          <section key={a.id} id={a.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{a.name}</h2>
            <p className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: a.body.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            {a.href && (<Link href={a.href} className="inline-block mt-4 bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">Más información</Link>)}
          </section>
        ))}

        <section id="por-que" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Poque elegir estas actividades gastronómicas</h2>
          <p className="text-foreground/90 leading-relaxed">GastroShows ofrece <strong>actividades gastronómicas de team building</strong> perfectas para reforzar lazos en equipo, con espacios exclusivos en Barcelona y servicio integral.</p>
        </section>

        <section id="empresas" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Actividades team building para empresas y grupos</h2>
          <p className="text-foreground/90 leading-relaxed">Talleres, catas, cenas privadas y experiencias secretas. Adaptamos cada propuesta al perfil del grupo.</p>
        </section>

        <section id="divertidas" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Actividades divertidas para grupos</h2>
          <p className="text-foreground/90 leading-relaxed">Despedidas, cumpleaños y celebraciones privadas. La gastronomía une, divierte y crea recuerdos.</p>
        </section>

        <section id="medida" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">También puedes pedirnos tu actividad</h2>
          <p className="text-foreground/90 leading-relaxed">Si quieres algo a medida, <strong>cuéntanos tu idea</strong> y la creamos juntos.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Pide presupuesto</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Te enviamos propuesta personalizada para tu grupo en menos de 24h.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Contáctanos</Link>
        </section>
      </article>
    </PageLayout>
  );
}
