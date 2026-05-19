import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, eventSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "La clandestina | Cena clandestina Barcelona para grupos",
  description: "La cena clandestina de Barcelona para grupos: descubre la ubicación a través de pistas, menú degustación de 10-12 actos con showcooking y maridaje. Desde 100€.",
  keywords: "cena clandestina barcelona grupos, cena clandestina, evento clandestino barcelona, cena secreta grupos",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/cena-clandestina-de-barcelona-grupos/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/cena-clandestina-de-barcelona-grupos/", siteName: "GastroShows", title: "La clandestina - Cena para grupos", description: "Cena clandestina de Barcelona para grupos." },
};

export default function CenaClandestinaGruposPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "La clandestina (grupos)", url: "https://gastroshows.es/cena-clandestina-de-barcelona-grupos/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "La clandestina", description: "Cena clandestina para grupos.", publishedAt: "2022-10-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "cena-clandestina-de-barcelona-grupos",
          image: "https://gastroshows.es/images/cena-clandestina-de-barcelona-grupos/hero-cena-clandestina-grupos-barcelona.jpg", })} />
      <JsonLd data={eventSchema({ name: "La Cena Clandestina - Cena para grupos Barcelona", description: "Cena clandestina con menú degustación de 10-12 actos y showcooking. Ubicación secreta.", price: 100 })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">La clandestina</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">La clandestina</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"><strong>Experiencia gastronómica</strong>, debes descubrir la ubicación a través de pistas y enigmas que recibes en tu móvil.</p>
        </header>

        <section id="que-es" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Qué es</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/cena-clandestina-de-barcelona-grupos/hero-cena-clandestina-grupos-barcelona.jpg"
                alt="La Cena Clandestina de Barcelona para grupos — menú degustación de 10-12 actos con maridaje en espacio secreto" title="La Cena Clandestina de Barcelona para grupos — menú degustación de 10-12 actos con maridaje en espacio secreto"
                className="w-full h-full object-cover" width={600} height={400} loading="eager" fetchPriority="high" />
            </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">La Cena Clandestina de Barcelona para grupos — menú degustación de 10-12 actos con maridaje en espacio secreto</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>Una <strong>cena clandestina con ubicación secreta</strong> que se descubre a través de pistas y enigmas. Una vez allí, **menú degustación de alta cocina con showcooking y maridaje**.</p>
              <p>Adaptable a grupos cerrados con privatización del espacio.</p>
            </div>
          </div>
        </section>

        <section id="que-incluye" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">qué incluye</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Cóctel de bienvenida","Menú degustación de 10-12 actos","Showcooking del chef en vivo","Maridaje de vinos seleccionados","Cata de gin premium Teichenné","Pistas y enigmas previos"].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border"><span className="text-gold text-xl shrink-0">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <section id="donde" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">dónde irás</h2>
          <p className="text-foreground/90 leading-relaxed">La <strong>ubicación es secreta</strong>. Las pistas llegan por email <strong>4 días antes</strong>. La cena se desarrolla de <strong>20:00h a 23:00h</strong>.</p>
        </section>

        <section id="imagenes" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">imÁgenes de la cena clandestina</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/images/cena-clandestina-de-barcelona-grupos/comedor-mesa-larga-candelabros-velas-cena-grupos-clandestina.jpg", alt: "Comedor con mesa larga y candelabros dorados — Cena Clandestina para grupos en Barcelona" },
              { src: "/images/cena-clandestina-de-barcelona-grupos/mesa-larga-cristaleria-candelabro-grupos-perspectiva.jpg", alt: "Perspectiva de la mesa larga con cristalería y candelabro dorado en la Cena Clandestina" },
              { src: "/images/cena-clandestina-de-barcelona-grupos/mesa-larga-grupos-cristaleria-ambiente-pre-cena.jpg", alt: "Ambiente pre-cena con grupos llegando a la Cena Clandestina" },
              { src: "/images/cena-clandestina-de-barcelona-grupos/copas-vino-cristal-tallado-mesa-cena-grupos-detalle.jpg", alt: "Detalle de copas de vino de cristal tallado en la Cena Clandestina" },
              { src: "/images/cena-clandestina-de-barcelona-grupos/candelabro-dorado-vela-ambiente-cena-clandestina.jpg", alt: "Candelabro dorado con vela — ambiente Cena Clandestina Barcelona" },
              { src: "/images/cena-clandestina-de-barcelona-grupos/mesa-cristaleria-servilleta-verde-cena-grupos.jpg", alt: "Mesa con cristalería y servilleta verde de la Cena Clandestina" },
              { src: "/images/cena-clandestina-de-barcelona-grupos/bunuelo-trufa-piedra-volcanica-postre-cena-grupos.jpg", alt: "Buñuelo con trufa sobre piedra volcánica — postre Cena Clandestina" },
              { src: "/images/cena-clandestina-de-barcelona-grupos/candelabro-blanco-vela-detalle-ambiente-cena-grupo.jpg", alt: "Candelabro blanco con vela — detalle ambiente Cena Clandestina" },
              { src: "/images/experiencia/plato-humo.jpg", alt: "Plato con humo en la Cena Clandestina" },
            ].map((img) => (
              <figure key={img.src} className="m-0">
                <div className="relative h-40 rounded-lg overflow-hidden shadow-md">
                  <img src={img.src} alt={img.alt} title={img.alt} className="w-full h-full object-cover" width={400} height={240} loading="lazy" />
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section id="notas" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Cosas que debes tener en cuenta</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Grupos:</strong> hasta 6 personas (o privatización completa)</p>
            <p><strong>Duración:</strong> 3 horas</p>
            <p><strong>Precio:</strong> desde 100€</p>
            <p><strong>Cancelación:</strong> hasta 7 días antes con reembolso completo</p>
          </div>
        </section>

        <section id="contactanos" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">CONTÁCTANOS</h2>
          <p className="text-foreground/90 leading-relaxed">Para grupos de empresa, despedidas o celebraciones privadas, <strong>te diseñamos una propuesta a medida</strong>.</p>
        </section>

        <section id="la-clandestina" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">La cena clandestina</h2>
          <p className="text-foreground/90 leading-relaxed">No es una cena cualquiera. Es <strong>una historia que se vive antes, durante y después</strong>: las pistas previas, la búsqueda del lugar, el menú, las sorpresas. Una experiencia inmersiva única.</p>
        </section>

        <section id="regala" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Regala la cena clandestina a los más queridos</h2>
          <p className="text-foreground/90 leading-relaxed">Disponible como <strong>tarjeta regalo</strong> para sorprender a alguien especial. Validez de 6 meses.</p>
          <Link href="/regalo" className="inline-block mt-4 bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">Tarjeta regalo</Link>
        </section>

        <section id="compartir" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Lo mejor de una experiencia es compartirla</h2>
          <p className="text-foreground/90 leading-relaxed">La gastronomía une. La cena clandestina es la <strong>excusa perfecta</strong> para reunir a las personas que importan en torno a una mesa secreta.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Te esperamos en la cena clandestina</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Reserva ahora para grupos o vive la experiencia individual.</p>
          <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Reservar</Link>
        </section>
      </article>
    </PageLayout>
  );
}
