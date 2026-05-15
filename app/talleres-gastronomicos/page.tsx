import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Talleres gastronómicos en Barcelona | GastroShows",
  description: "Los mejores talleres gastronómicos en Barcelona: coctelería, cocina catalana, sushi, vinos. Actividades de team building y para grupos privados.",
  keywords: "talleres gastronómicos barcelona, cocktail factory, taller cocina barcelona, team building cocina, talleres empresas",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/talleres-gastronomicos/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/talleres-gastronomicos/", siteName: "GastroShows", title: "Talleres gastronómicos en Barcelona", description: "Los mejores talleres gastronómicos para grupos y empresas." },
};

export default function TalleresGastronomicosPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Talleres gastronómicos", url: "https://gastroshows.es/talleres-gastronomicos/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Talleres gastronómicos en Barcelona", description: "Catálogo de talleres gastronómicos.", publishedAt: "2022-08-10T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "talleres-gastronomicos" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Talleres gastronómicos</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">talleres gastronómicos</h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img src="/images/talleres-gastronomicos/hero-talleres-gastronomicos-barcelona.jpg"
              alt="Los mejores talleres gastronómicos en Barcelona — coctelería, cocina catalana, sushi y vinos"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Los <strong>mejores talleres gastronómicos en Barcelona</strong>: experiencias formativas y divertidas para descubrir secretos de la cocina y la coctelería.</p>
        </header>

        <section id="no-perder" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">talleres gastronómicos que no te puedes perder</h2>
          <p className="text-foreground/90 leading-relaxed">En GastroShows hemos diseñado <strong>talleres únicos en Barcelona</strong> donde aprenderás, te divertirás y degustarás. Ideales para hacer en grupo, en pareja o con compañeros de trabajo.</p>
        </section>

        <section id="populares" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">los talleres gastronómicos más populares</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/taller-cocteles-barcelona" className="p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Taller de Cócteles</p>
              <p className="text-sm text-muted-foreground">Mixología profesional para grupos.</p>
            </Link>
            <Link href="/taller-de-sushi-barcelona" className="p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Taller de Sushi</p>
              <p className="text-sm text-muted-foreground">Cocina japonesa fresca.</p>
            </Link>
            <Link href="/team-building-masterchef" className="p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Team Building Masterchef</p>
              <p className="text-sm text-muted-foreground">Competición culinaria en equipo.</p>
            </Link>
            <Link href="/team-building-cocina-barcelona" className="p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ GastroChallenge & catas</p>
              <p className="text-sm text-muted-foreground">Actividades para empresa.</p>
            </Link>
          </div>
        </section>

        <section id="cocktail-factory" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">El taller de coctelería: Cocktail Factory</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/talleres-gastronomicos/taller-cocina-grupos-empresa.jpg"
                alt="Cocktail Factory taller de coctelería para grupos — mixólogos profesionales en Barcelona"
                className="w-full h-full object-cover" width={600} height={400} loading="lazy" />
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>Los participantes se convierten en bartenders preparando cócteles <strong>como auténticos mixólogos profesionales</strong>. Una experiencia original de gastronomía en Barcelona.</p>
              <p>Aprende técnicas, recetas clásicas y de autor en un ambiente desenfadado. Ideal para grupos privados.</p>
            </div>
          </div>
        </section>

        <section id="por-que" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">porque debes hacer alguno de nuestros telleres</h2>
          <p className="text-foreground/90 leading-relaxed">GastroShows ofrece <strong>actividades gastronómicas de teambuilding perfectas para reforzar los lazos</strong> entre compañeros, con instalaciones únicas en Barcelona para conferencias y eventos privados.</p>
        </section>

        <section id="empresas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Actividades team building para empresas y grupos</h2>
          <p className="text-foreground/90 leading-relaxed">Cursos de cocina, catas de vino, talleres de coctelería y <strong>cena clandestina para empresas</strong> con menús degustación. Todo lo necesario para crear momentos de equipo memorables.</p>
        </section>

        <section id="divertidas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Actividades divertidas para grupos</h2>
          <p className="text-foreground/90 leading-relaxed">Despedidas, cumpleaños, eventos familiares… <strong>todos los grupos encuentran su taller</strong>. Adaptamos formato, duración y temática a tu evento.</p>
        </section>

        <section id="medida" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">También puedes pedirnos tu actividad</h2>
          <p className="text-foreground/90 leading-relaxed">¿Tienes una idea concreta? Te ayudamos a hacerla realidad. <strong>Eventos a medida</strong> para hacer de tu actividad algo único.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Pide información del taller que te interesa</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Te enviamos propuesta personalizada con disponibilidad y precio en menos de 24h.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Contáctanos</Link>
        </section>
      </article>
    </PageLayout>
  );
}
