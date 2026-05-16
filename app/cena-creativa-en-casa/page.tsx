import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, productSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cena Degustación en Casa | GastroShows",
  description: "Cena degustación en casa con 7 platos: 3 entrantes, 2 principales y postres con petit fours. Caja sorpresa con instrucciones, entrega 48h en toda la península.",
  keywords: "cena degustación en casa, cena delivery barcelona, menú degustación domicilio, cena gourmet casa, gastroshows casa",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/cena-creativa-en-casa/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/cena-creativa-en-casa/", siteName: "GastroShows", title: "Cena Degustación en Casa", description: "Una experiencia gastronómica completa desde tu salón." },
};

export default function CenaCasaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Cena Degustación en Casa", url: "https://gastroshows.es/cena-creativa-en-casa/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({ title: "Cena Degustación en Casa", description: "7 platos a domicilio en toda la península.", publishedAt: "2023-02-15T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "cena-creativa-en-casa",
          image: "https://gastroshows.es/images/cena-creativa-en-casa/hero-cena-degustacion-en-casa.jpg", })} />
      <JsonLd data={productSchema({ name: "Cena Degustación en Casa - GastroShows", description: "Caja sorpresa con menú degustación de 7 platos para disfrutar en casa.", price: 89 })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Cena Degustación en Casa</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">Cena Degustación en Casa</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">¿Quieres <strong>crear una experiencia inolvidable</strong>? Descubre cómo. <strong>Nosotros ponemos la gastronomía, tú pones el show.</strong></p>
        </header>

        <section id="oferta" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">cena degustación en casa y ahora con descuento!</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/cena-creativa-en-casa/hero-cena-degustacion-en-casa.jpg"
                alt="Cena degustación en casa GastroShows — 7 platos gourmet a domicilio en toda la península" title="Cena degustación en casa GastroShows — 7 platos gourmet a domicilio en toda la península"
                className="w-full h-full object-cover" width={600} height={400} loading="eager" fetchPriority="high" />
            </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Cena degustación en casa GastroShows — 7 platos gourmet a domicilio en toda la península</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p><strong>7 platos</strong> de alta cocina llegan a tu casa en una <strong>caja sorpresa con instrucciones de montaje</strong>. Lo único que necesitas hacer es emplatar y disfrutar.</p>
              <ul className="space-y-2">
                <li>⭐ <strong>Valoración:</strong> 9.8/10</li>
                <li>🚚 <strong>Entrega:</strong> toda la península</li>
                <li>❄️ <strong>Conservación:</strong> 48 horas</li>
                <li>📦 <strong>Envío gratuito</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="entrantes" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">3 entrantes</h2>
          <p className="text-foreground/90 leading-relaxed">El menú comienza con tres aperitivos de autor diseñados para abrir el apetito y mostrar la calidad del producto. Sabores intensos y técnicas modernas.</p>
        </section>

        <section id="principales" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">2 Principales</h2>
          <p className="text-foreground/90 leading-relaxed">Dos platos principales con <strong>sabores intensos</strong> que demuestran la cocina creativa de GastroShows. Producto de temporada y elaboraciones cuidadas.</p>
        </section>

        <section id="postres" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Postres y petit fours</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <img src="/images/cena-creativa-en-casa/tartaleta-yogur-fresa-petit-fours.jpg"
                  alt="Tartaleta de yogur con fresas y frutos secos — postre de la cena degustación en casa GastroShows"
                  title="Tartaleta de yogur con fresas — Cena Degustación en Casa GastroShows"
                  className="w-full h-full object-cover" width={600} height={400} loading="lazy" />
              </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Tartaleta de yogur con fresas y frutos secos, uno de los petit fours emplatado en casa.</figcaption>
            </figure>
            <p className="text-foreground/90 leading-relaxed">El final de la cena: <strong>postre principal + petit fours</strong>. El cierre dulce perfecto a una experiencia gastronómica completa.</p>
          </div>
        </section>

        <section id="homenaje" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Te mereces un homenaje</h2>
          <p className="text-foreground/90 leading-relaxed">Una cena <strong>diseñada para celebrarte</strong>. Ideal para aniversarios, cumpleaños, San Valentín o simplemente porque sí. La excusa perfecta para disfrutar en pareja o con quien quieras.</p>
        </section>

        <section id="como-funciona" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">¿Cómo funciona?</h2>
          <ol className="space-y-4 text-foreground/90 leading-relaxed list-decimal list-inside marker:text-gold marker:font-semibold">
            <li className="pl-2">Reserva tu cena online con la fecha de envío.</li>
            <li className="pl-2">Recibes una <strong>caja sorpresa</strong> con los 7 platos en casa.</li>
            <li className="pl-2">Sigues las instrucciones de emplatado.</li>
            <li className="pl-2">Disfrutas de una <strong>experiencia gastronómica completa</strong> sin moverte de casa.</li>
          </ol>
        </section>

        <section id="por-que" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">porque elegir la cena degustación en casa</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>✓ Sin esfuerzo: ya viene todo preparado.</li>
            <li>✓ Sin desplazamientos: cena de alto nivel en tu salón.</li>
            <li>✓ Sin reserva: tú eliges fecha y hora.</li>
            <li>✓ Envío gratuito a toda la península.</li>
            <li>✓ Valoración 9.8/10 entre quienes ya la han probado.</li>
          </ul>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Quiero la experiencia en casa</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Reserva ahora tu Cena Degustación en Casa. Envío gratuito en toda la península.</p>
          <Link href="/regalo" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Reservar</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/los-mejores-menus-degustacion-para-regalar/" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Mejores menús degustación para regalar</p>
              <p className="text-sm text-muted-foreground">Más opciones a domicilio.</p>
            </Link>
            <Link href="/cena-clandestina" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ La Cena Clandestina</p>
              <p className="text-sm text-muted-foreground">La experiencia completa en nuestro espacio.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
