import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Team Building Cocina Barcelona | GastroShows",
  description: "Los team buildings de cocina en Barcelona más divertidos para empresa: talleres de tapas, sushi, cócteles, GastroChallenge y catas. Eventos a medida.",
  keywords: "team building cocina barcelona, taller cocina empresa barcelona, team building empresas, gastrochallenge, taller tapas empresa",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/team-building-cocina-barcelona/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/team-building-cocina-barcelona/", siteName: "GastroShows", title: "Team Building Cocina Barcelona", description: "Team buildings de cocina más divertidos para empresa." },
};

const actividades = [
  { id: "taller-tapas", name: "Taller de tapas", body: "Las tapas mejor compartirlas en este **taller de creación y diversión** para todo el equipo. Aprende a hacer las tapas más icónicas de Barcelona y disfrutadlas juntos." },
  { id: "taller-sushi", name: "TALLER DE Sushi", body: "El curso de **cocina japonesa más fresco de Barcelona** en el que todo el equipo competirá por descubrir los secretos de esta cocina milenaria." },
  { id: "gastrochallenge", name: "GastroChallenge", body: "Concursantes, tenéis **50 minutos** para elaborar todo el menú, ¿estáis listos? **3, 2, 1, ¡a cocinar!** La actividad más adrenalínica de team building." },
  { id: "vino", name: "¿vino a descubrirlo?", body: "¡Una **cata de vino jamás fue tan divertida**! Descubre sus secretos con la ayuda de tu equipo. Una experiencia formativa y desenfadada." },
  { id: "cocteleria", name: "El mejor taller de COCTELERÍA para tu team building", body: "Te convertirás en **bartender por un día**, preparando cócteles clásicos y de autor con la guía de un mixólogo profesional. Una actividad original y muy participativa." },
];

export default function TeamBuildingCocinaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Team Building Cocina Barcelona", url: "https://gastroshows.es/team-building-cocina-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Team Building Cocina Barcelona", description: "Los team buildings de cocina más divertidos para empresa.", publishedAt: "2022-07-15T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "team-building-cocina-barcelona" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Team Building Cocina</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">Team building cocina barcelona</h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img src="/images/team-building-cocina-barcelona/hero-team-building-cocina-barcelona.jpg"
              alt="Team building cocina Barcelona — talleres de tapas, sushi, GastroChallenge y coctelería para empresas"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Los <strong>Team buildings de cocina en Barcelona más divertidos para empresa</strong>.</p>
        </header>

        <section id="novedades" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">nuestras novedades</h2>
          <p className="text-foreground/90 leading-relaxed">Descubre <strong>los teambuildings cocina top</strong> que ofrecemos en GastroShows. Eventos divertidos, originales y adaptados a la cultura de cada empresa.</p>
        </section>

        {actividades.map((a) => (
          <section key={a.id} id={a.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{a.name}</h2>
            <p className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: a.body.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
          </section>
        ))}

        <section id="grupos-empresas" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Taller de cócteles para grupos</h2>
          <p className="text-foreground/90 leading-relaxed">Un <strong>taller práctico y dinámico</strong> ideal para empresas, despedidas y celebraciones. Aprende mixología guiado por profesionales.</p>
        </section>

        <section id="empresas" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Actividades team building para empresas y grupos</h2>
          <p className="text-foreground/90 leading-relaxed">Combinamos <strong>actividad gastronómica + espacio privado + servicio integral</strong>. Cocina abierta, salón privado y todo lo necesario para hacer de tu evento un éxito.</p>
        </section>

        <section id="divertidas" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Actividades divertidas para grupos</h2>
          <p className="text-foreground/90 leading-relaxed">No solo team building corporativo. También organizamos actividades para <strong>despedidas de soltero/a, cumpleaños y celebraciones privadas</strong>. La gastronomía como excusa para pasarlo bien.</p>
        </section>

        <section id="medida" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">También puedes pedirnos tu actividad</h2>
          <p className="text-foreground/90 leading-relaxed">Si tienes una idea concreta o necesitas algo a medida, <strong>cuéntanos lo que buscas</strong> y diseñamos la actividad perfecta para tu grupo.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Quiero más información</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Cuéntanos tu evento, fecha y número de personas. Te enviamos propuesta a medida sin compromiso.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Tu evento a medida</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/team-building-masterchef" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Team Building Masterchef</p>
              <p className="text-sm text-muted-foreground">Cocina en equipo, formato competición.</p>
            </Link>
            <Link href="/talleres-gastronomicos" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Talleres gastronómicos</p>
              <p className="text-sm text-muted-foreground">Catálogo completo de talleres.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
