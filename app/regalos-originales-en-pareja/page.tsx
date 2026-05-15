import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Regalos Originales en Pareja | GastroShows",
  description: "Regalos originales en pareja para compartir más momentos inolvidables juntos: cuadernos reutilizables, mini cafetera, enigmas, kit gastronómico y Morphée.",
  keywords: "regalos originales en pareja, regalos san valentín, regalo aniversario pareja, kit gastronómico pareja, regalos parejas",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/regalos-originales-en-pareja/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/regalos-originales-en-pareja/", siteName: "GastroShows", title: "Regalos Originales en Pareja", description: "Regalos para compartir momentos inolvidables." },
};

const regalos = [
  { id: "cuaderno", name: "Cuaderno digital reutilizable: regalos originales y sostenibles", body: "Un cuaderno digital reutilizable que se **sincroniza con una app** para guardar lo escrito en la nube. Ecológico, práctico y muy actual. Ideal para parejas que aman la tecnología y el respeto al planeta." },
  { id: "cafetera", name: "MINI CAFETERA PORTÁTIL: regalo original para parejas cafeteras", body: "**Mini cafetera portátil con materiales ecológicos**. Perfecta para parejas que disfrutan el café en cualquier sitio: oficina, camping, viajes. Regalo útil y diferente." },
  { id: "enigmas", name: "Enigmas divertidos E INSTATÁNEOS", body: "Libro de puzzles con **135 enigmas diseñados para parejas**. Una forma divertida y participativa de pasar tiempo juntos, retándoos mutuamente." },
  { id: "kit-gastronomico", name: "EL KIT GASTRONÓMICO PARA DARSE UN HOMENAJE EN CASA: regala gastronomía", body: "Un **menú degustación gourmet** que llega a casa en una caja sorpresa. Lo emplatas tú con instrucciones detalladas. Una velada gastronómica perfecta sin moverte del salón.", cta: { label: "Ver cena en casa", href: "/cena-creativa-en-casa" } },
  { id: "morphee", name: "Morphée: regala noches de ensueño", body: "Dispositivo de sueño con **210 sesiones de relajación guiadas en español**. Sin pantallas ni radiación. Ideal para parejas que valoran el bienestar y el descanso." },
];

export default function RegalosParejaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Regalos Originales en Pareja", url: "https://gastroshows.es/regalos-originales-en-pareja/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({ title: "Regalos Originales en Pareja", description: "Regalos para parejas.", publishedAt: "2023-02-05T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "regalos-originales-en-pareja" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Regalos Originales en Pareja</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">Regalos Originales en Pareja</h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img src="/images/regalos-originales-en-pareja/hero-regalos-originales-en-pareja.jpg"
              alt="Regalos originales en pareja para compartir momentos inolvidables juntos en Barcelona"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Regalos originales en pareja para compartir más momentos inolvidables juntos. <strong>Compartir es vivir</strong> y las mejores experiencias son las que se viven en compañía.</p>
        </header>

        {regalos.map((r, idx) => (
          <section key={r.id} id={r.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{idx + 1}. {r.name}</h2>
            <p className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: r.body.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            {r.cta && (
              <Link href={r.cta.href} className="inline-block mt-4 bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">
                {r.cta.label}
              </Link>
            )}
          </section>
        ))}

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">El regalo definitivo para parejas</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Una velada secreta para dos: ubicación oculta, menú degustación y una experiencia para recordar siempre.</p>
          <Link href="/tarjeta-regalo-cena-para-dos" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Tarjeta Regalo Cena Para Dos</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/regalos-originales-barcelona-experiencias" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Regalos originales Barcelona</p>
              <p className="text-sm text-muted-foreground">Experiencias que dejan huella.</p>
            </Link>
            <Link href="/regalos-con-comida" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Regalos con comida</p>
              <p className="text-sm text-muted-foreground">Productos gourmet para regalar.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
