import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Team Building Masterchef Barcelona | GastroShows",
  description: "El team building Masterchef es una actividad gastronómica ideal para compartir con tus compañeros de trabajo. Cocina en equipo, competición y diversión desde 75€.",
  keywords: "team building masterchef, team building barcelona, actividad empresa barcelona, cocina equipo barcelona, masterchef empresas",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/team-building-masterchef/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/team-building-masterchef/", siteName: "GastroShows", title: "Team Building Masterchef Barcelona", description: "Cocina en equipo: la actividad gastronómica para empresas." },
};

export default function TeamBuildingMasterchefPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Team Building Masterchef", url: "https://gastroshows.es/team-building-masterchef/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Team Building Masterchef Barcelona", description: "Actividad gastronómica para empresas: cocina en equipo.", publishedAt: "2022-06-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "team-building-masterchef",
          image: "https://gastroshows.es/images/team-building-masterchef/hero-team-building-masterchef-barcelona.jpg", })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Team Building Masterchef</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">Team Building Masterchef</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">El <strong>team building Masterchef</strong> es una <strong>actividad gastronómica</strong> ideal para compartir con tus compañeros de trabajo.</p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Qué es</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/team-building-masterchef/hero-team-building-masterchef-barcelona.jpg"
                alt="Team Building Masterchef Barcelona — actividad gastronómica de cocina en equipo para empresas" title="Team Building Masterchef Barcelona — actividad gastronómica de cocina en equipo para empresas"
                className="w-full h-full object-cover" width={600} height={400} loading="eager" fetchPriority="high" />
            </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Team Building Masterchef Barcelona — actividad gastronómica de cocina en equipo para empresas</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>Los equipos preparan un <strong>menú completo siguiendo recetas guiadas por un chef</strong> dentro de un tiempo limitado, fomentando comunicación y colaboración.</p>
              <p>Una actividad divertida y formativa que une al equipo en torno a la cocina.</p>
            </div>
          </div>
        </section>

        <section id="que-incluye" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">qué incluye</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Recepción de bienvenida con bebidas","Taller de cocina con división en subgrupos y jurado","Degustación de los platos elaborados","Maridaje de vinos y refrescos","Anuncio de equipo ganador","Chef profesional como master"].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border">
                <span className="text-gold text-xl shrink-0">✓</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="donde" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">dónde irás</h2>
          <p className="text-foreground/90 leading-relaxed">El team building se realiza en un <strong>espacio gastronómico privado de Barcelona</strong> adaptado para eventos, con cocina profesional y zona de degustación.</p>
        </section>

        <section id="mas-info" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Más información</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Duración:</strong> 2-3 horas</p>
            <p><strong>Precio:</strong> desde 75€ por persona</p>
            <p><strong>Fechas:</strong> a concertar</p>
          </div>
        </section>

        <section id="notas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Cosas que debes tener en cuenta</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• Política de cancelación informada al hacer la reserva.</li>
            <li>• Avisar de alergias e intolerancias con <strong>24h de antelación</strong>.</li>
            <li>• Mínimo de participantes y servicios extra a consultar.</li>
          </ul>
        </section>

        <section id="todo-sobre" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Todo sobre team building masterchef</h2>
          <p className="text-foreground/90 leading-relaxed">Una <strong>experiencia inmersiva</strong> que combina aprendizaje culinario, competición sana y networking. Los grupos viven una jornada que recordarán mucho tiempo, lejos de las dinámicas habituales de oficina.</p>
        </section>

        <section id="por-que" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">¿Por qué hacer un team building?</h2>
          <p className="text-foreground/90 leading-relaxed">El team building <strong>refuerza la cohesión, mejora la comunicación y motiva al equipo</strong>. Una inversión que se traduce en mejor rendimiento, ambiente laboral más sano y mayor sentido de pertenencia.</p>
        </section>

        <section id="empresas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Masterchef para empresas</h2>
          <p className="text-foreground/90 leading-relaxed">Adaptamos la experiencia al tamaño y objetivos de cada empresa. Servicios extra disponibles: <strong>fotografía, música en vivo, magia</strong> y maridajes exclusivos.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Reserva tu team building Masterchef</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Cuéntanos las características de tu grupo y te enviamos una propuesta personalizada sin compromiso.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">¡Me interesa!</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/taller-cocteles-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Taller de Cócteles Barcelona</p>
              <p className="text-sm text-muted-foreground">Mixología profesional para grupos.</p>
            </Link>
            <Link href="/grupos" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cenas privadas y grupos</p>
              <p className="text-sm text-muted-foreground">Más opciones para empresas.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
