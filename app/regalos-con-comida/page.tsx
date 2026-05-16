import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Regalos con comida | Productos gourmet para regalar",
  description: "Regalos con comida deliciosos y originales para cocinillas y amantes de la gastronomía: aceite Ed'o, chocolate Claudio Corallo, salsas XO de Dabiz Muñoz, kit gastronómico.",
  keywords: "regalos con comida, regalo gourmet, aceite premium regalo, chocolate gourmet, salsas xo dabiz muñoz, kit gastronómico regalo",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/regalos-con-comida/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/regalos-con-comida/", siteName: "GastroShows", title: "Regalos con comida", description: "Productos gourmet para regalar." },
};

const productos = [
  { id: "aceite", name: "REGALA ORO LÍQUIDO: Aceite Ed'o Ultra Premium", body: "Aceites de oliva premium elaborados con **100% Arbequina** con **Denominación de Origen Protegida Siurana**. Se produce solo una semana al año en el momento álgido de la maduración para conseguir mínima acidez y máximas propiedades organolépticas." },
  { id: "chocolate", name: "DÍSELO CON CHOCOLATE COMO CLAUDIO", body: "Chocolates de **Claudio Corallo**, productor con **más de 40 años de experiencia**, elaboración 100% artesanal y embalaje sostenible desde **Santo Tomé, África**. Una experiencia única para los amantes del chocolate." },
  { id: "salseo", name: "LA VIDA ES MEJOR CON SALSEO", body: "La colección del chef **Dabiz Muñoz** incluye **10 salsas basadas en el universo creativo de XO**, reinventando condimentos clásicos con combinaciones creativas como **ponzu de trufa** o **salsa yuzu de maracuyá**." },
  { id: "kit", name: "EL KIT GASTRONÓMICO PARA DARSE UN HOMENAJE EN CASA", body: "Un **kit gastronómico** dispuesto en cajas con todos los ingredientes para preparar un **menú degustación de 7 platos**: tres entrantes, dos principales y dos postres. Una experiencia gastronómica completa en casa.", cta: { label: "Ver Cena en Casa", href: "/cena-creativa-en-casa" } },
  { id: "cesta", name: "LA CESTA PANADERA: regalos con comida panarra", body: "Una cesta de regalo que incluye **varios tipos de harinas seleccionadas y frutos secos**, además de la colección de poesía **Litevadura** y recetas de panadería artesanal. Para los amantes del pan casero." },
];

export default function RegalosComidaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Regalos con comida", url: "https://gastroshows.es/regalos-con-comida/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({ title: "Regalos con comida", description: "Productos gourmet para regalar.", publishedAt: "2023-03-20T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "regalos-con-comida",
          image: "https://gastroshows.es/images/regalos-con-comida/hero-regalos-con-comida-gourmet.jpg", })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Regalos con comida</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">Regalos con Comida</h1>
          <figure className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img src="/images/regalos-con-comida/hero-regalos-con-comida-gourmet.jpg"
              alt="Regalos con comida gourmet — aceite premium, chocolate artesanal, salsas XO de Dabiz Muñoz y más" title="Regalos con comida gourmet — aceite premium, chocolate artesanal, salsas XO de Dabiz Muñoz y más"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Regalos con comida gourmet — aceite premium, chocolate artesanal, salsas XO de Dabiz Muñoz y más</figcaption>
          </figure>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Regalos con comida deliciosos y originales <strong>para cocinillas y amantes de la gastronomía</strong>. Productos gourmet seleccionados para regalar y sorprender.</p>
        </header>

        {productos.map((p, idx) => (
          <section key={p.id} id={p.id} className="mb-12 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">{idx + 1}. {p.name}</h2>
            <p className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.body.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            {p.cta && (
              <Link href={p.cta.href} className="inline-block mt-4 bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">
                {p.cta.label}
              </Link>
            )}
          </section>
        ))}

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">El regalo gastronómico definitivo</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Una experiencia secreta con menú degustación y maridaje en ubicación oculta de Barcelona.</p>
          <Link href="/regalo" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Tarjeta Regalo Cena Clandestina</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/los-mejores-menus-degustacion-para-regalar/" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Mejores menús degustación para regalar</p>
              <p className="text-sm text-muted-foreground">Experiencias gastronómicas.</p>
            </Link>
            <Link href="/regalos-originales-barcelona-experiencias" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Regalos originales Barcelona</p>
              <p className="text-sm text-muted-foreground">Experiencias que dejan huella.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
