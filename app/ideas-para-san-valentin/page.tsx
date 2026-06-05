import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Ideas para San Valentín | Las 5 Mejores Ideas para Sorprender",
  description: "5 ideas para San Valentín: desayunos románticos, regalos personalizados, cena clandestina. Sorprende a tu pareja sin gastar mucho.",
  keywords: "ideas san valentin, regalos san valentin pareja, cena san valentin barcelona, sorpresas san valentin",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/ideas-para-san-valentin/" },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/ideas-para-san-valentin/",
    siteName: "GastroShows",
    title: "Ideas para San Valentín - 5 Mejores Ideas",
    description: "Sorprende a tu pareja con estas 5 ideas de San Valentín únicas y significativas.",
  },
};

export default function IdeasSanValentinPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Ideas para San Valentín", url: "https://gastroshows.es/ideas-para-san-valentin/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({
        title: "Ideas para San Valentín - 5 Mejores Ideas para Sorprender",
        description: "Descubre 5 ideas únicas para celebrar San Valentín con tu pareja.",
        publishedAt: "2021-01-15T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "ideas-para-san-valentin",
        image: "https://gastroshows.es/images/san-valentin/hero-san-valentin.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Ideas para San Valentín</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Ideas para San Valentín — 5 Mejores Ideas para Sorprender
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Experiencias sobre regalos materiales. Sorprende a tu pareja de formas significativas y memorables este 14 de febrero.
          </p>
        </header>

        <section id="idea-1" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">1. Desayunos Románticos</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Comienza el día sorprendiendo a tu pareja con un <strong>desayuno en cama</strong>. Croissants frescos, zumo natural, frutas de temporada, flores frescas y una nota romántica escrita a mano.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            No es necesario que sea elaborado: la intención y el detalle son lo que cuenta. Comparte el desayuno juntos, sin prisa, en un ambiente relajado.
          </p>
        </section>

        <section id="idea-2" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">2. Pequeños Detalles</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Los pequeños detalles pueden ser ideas para San Valentín.</strong> Recuerda algo que tu pareja mencionó necesitar o desear, y obsequialo envuelto con una nota de amor.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Estos gestos demuestran que escuchas y prestas atención a lo que le importa. A menudo son más significativos que regalos costosos.
          </p>
        </section>

        <section id="idea-3" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">3. Regalos Personalizados</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Joyas grabadas, USB personalizados, llaveros con iniciales, camisetas con mensajes especiales. Los regalos personalizados requieren planificación, pero muestran dedicación.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Considera encargarlo con anticipación para asegurar entrega a tiempo.
          </p>
        </section>

        <section id="idea-4" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">4. Regalos Originales Económicos</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Desde <strong>experiencias aventureras hasta opciones más accesibles y divertidas</strong>, adaptadas a los gustos particulares de tu pareja. No necesitas gastar mucho para sorprender.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Lo importante es que la experiencia sea pensada y que demuestre que conoces bien a tu pareja.
          </p>
        </section>

        <section id="idea-5" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">5. Cena Clandestina — Experiencia Gastronómica Privada</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Experiencia gastronómica secreta en Barcelona</strong> con menú degustación, maridaje de vinos y degustación de gins premium. Ubicación descubierta mediante pistas y enigmas.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Perfecta para San Valentín: sorpresa completa, ambiente romántico, chef privado y atención exclusiva.
          </p>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded">
            <p className="text-foreground/90 mb-2"><strong>Por qué es la mejor idea:</strong></p>
            <p className="text-sm text-foreground/80">Combina misterio, gastronomía de calidad, privacidad y un recuerdo que durará para siempre.</p>
          </div>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Sorprende con una Cena Clandestina</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">La experiencia gastronómica más romántica de Barcelona para San Valentín.</p>
          <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Reservar Ahora</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Más Ideas para Parejas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/cosas-que-hacer-con-tu-pareja-en-casa" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cosas que Hacer en Casa</p>
              <p className="text-sm text-muted-foreground">5 planes divertidos en pareja.</p>
            </Link>
            <Link href="/regalo" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Tarjetas Regalo</p>
              <p className="text-sm text-muted-foreground">Regala experiencias gastronómicas.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
