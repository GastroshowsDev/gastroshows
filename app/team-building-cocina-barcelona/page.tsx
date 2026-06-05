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
      <JsonLd data={articleSchema({ title: "Team Building Cocina Barcelona", description: "Los team buildings de cocina más divertidos para empresa.", publishedAt: "2022-07-15T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "team-building-cocina-barcelona",
          image: "https://gastroshows.es/images/team-building-cocina-barcelona/hero-team-building-cocina-barcelona.jpg", })} />

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
          <figure className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img src="/images/team-building-cocina-barcelona/hero-team-building-cocina-barcelona.jpg"
              alt="Team building cocina Barcelona — talleres de tapas, sushi, GastroChallenge y coctelería para empresas" title="Team building cocina Barcelona — talleres de tapas, sushi, GastroChallenge y coctelería para empresas"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Team building cocina Barcelona — talleres de tapas, sushi, GastroChallenge y coctelería para empresas</figcaption>
          </figure>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Los <strong>Team buildings de cocina en Barcelona más divertidos para empresa</strong>.</p>
        </header>

        <section id="novedades" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">nuestras novedades</h2>
          <p className="text-foreground/90 leading-relaxed">Descubre <strong>los teambuildings cocina top</strong> que ofrecemos en GastroShows. Eventos divertidos, originales y adaptados a la cultura de cada empresa.</p>
        </section>

        {actividades.map((a) => {
          if (a.id === "gastrochallenge") {
            return (
              <section key={a.id} id={a.id} className="mb-16 scroll-mt-20">
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">La experiencia más adrenalínica</p>
                    <h2 className="font-cormorant text-5xl font-light mb-4">GastroChallenge</h2>
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto">50 minutos, 4 actos gastronómicos, equipos en competición. El formato Masterchef de los team buildings de cocina.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gold/5 border border-gold/20 rounded-lg p-8">
                      <h3 className="font-cormorant text-2xl font-light mb-4 text-gold">La Dinámica</h3>
                      <ul className="space-y-3">
                        <li className="flex gap-3"><span className="text-gold">•</span><span className="text-foreground/80"><strong>Equipos de 4-5 personas</strong> compiten por la victoria</span></li>
                        <li className="flex gap-3"><span className="text-gold">•</span><span className="text-foreground/80"><strong>50 minutos en directo</strong> para elaborar 4 actos</span></li>
                        <li className="flex gap-3"><span className="text-gold">•</span><span className="text-foreground/80"><strong>Chef instructor</strong> arbitraje y orienta sin resolver</span></li>
                        <li className="flex gap-3"><span className="text-gold">•</span><span className="text-foreground/80"><strong>Presentación final</strong> estilo Masterchef ante el jurado</span></li>
                        <li className="flex gap-3"><span className="text-gold">•</span><span className="text-foreground/80"><strong>Ganador(es)</strong> del GastroChallenge con premio sorpresa</span></li>
                      </ul>
                    </div>

                    <div className="bg-gold/5 border border-gold/20 rounded-lg p-8">
                      <h3 className="font-cormorant text-2xl font-light mb-4 text-gold">Qué Se Prepara</h3>
                      <p className="text-foreground/80 mb-4">Cada equipo elabora <strong>4 actos gastronómicos</strong> con ingredientes premium:</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2"><span className="text-gold">✓</span><span className="text-foreground/80">Entrada elegante (5-7 min)</span></li>
                        <li className="flex gap-2"><span className="text-gold">✓</span><span className="text-foreground/80">Primer plato técnico (8-10 min)</span></li>
                        <li className="flex gap-2"><span className="text-gold">✓</span><span className="text-foreground/80">Segundo plato proteína (15-18 min)</span></li>
                        <li className="flex gap-2"><span className="text-gold">✓</span><span className="text-foreground/80">Postre creativo (8-10 min)</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-8">
                    <h3 className="font-cormorant text-2xl font-light mb-6 text-center">El Flujo del Evento</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="bg-gold/10 border-2 border-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          <span className="font-semibold text-gold text-lg">1</span>
                        </div>
                        <h4 className="font-semibold mb-2">Briefing</h4>
                        <p className="text-xs text-foreground/70">Explicación de ingredientes y retos (5 min)</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gold/10 border-2 border-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          <span className="font-semibold text-gold text-lg">2</span>
                        </div>
                        <h4 className="font-semibold mb-2">¡A Cocinar!</h4>
                        <p className="text-xs text-foreground/70">Competición en vivo 50 minutos (Main)</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gold/10 border-2 border-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          <span className="font-semibold text-gold text-lg">3</span>
                        </div>
                        <h4 className="font-semibold mb-2">Presentación</h4>
                        <p className="text-xs text-foreground/70">Cada equipo presenta su menú (3 min c/u)</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gold/10 border-2 border-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          <span className="font-semibold text-gold text-lg">4</span>
                        </div>
                        <h4 className="font-semibold mb-2">Degustación</h4>
                        <p className="text-xs text-foreground/70">Jurado prueba, vota y celebra ganadores</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="border-l-4 border-gold pl-6">
                      <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Capacidad</p>
                      <p className="text-lg font-light">10-60 personas</p>
                      <p className="text-sm text-foreground/60 mt-1">2-3 equipos en competencia directa</p>
                    </div>
                    <div className="border-l-4 border-gold pl-6">
                      <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Duración</p>
                      <p className="text-lg font-light">2.5 - 3 horas</p>
                      <p className="text-sm text-foreground/60 mt-1">Incluye setup, competición y degustación</p>
                    </div>
                    <div className="border-l-4 border-gold pl-6">
                      <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Nivel de Energía</p>
                      <p className="text-lg font-light">⚡⚡⚡⚡⚡</p>
                      <p className="text-sm text-foreground/60 mt-1">Alta adrenalina y diversión garantizadas</p>
                    </div>
                  </div>

                  <div className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 text-center">
                    <h3 className="font-cormorant text-2xl font-light mb-4">¿Por qué GastroChallenge?</h3>
                    <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">Combina gastronomía, competición sana y adrenalina. Tu equipo trabaja bajo presión, se comunica intensamente y crea un recuerdo duradero. Perfecto para equipos que quieren conectar de verdad.</p>
                    <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-3 rounded font-semibold hover:bg-gold/90 transition">Reservar GastroChallenge</Link>
                  </div>
                </div>
              </section>
            );
          }
          return (
            <section key={a.id} id={a.id} className="mb-12 scroll-mt-20">
              <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{a.name}</h2>
              <p className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: a.body.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            </section>
          );
        })}

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
