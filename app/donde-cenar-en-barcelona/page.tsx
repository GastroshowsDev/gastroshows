import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dónde Cenar en Barcelona | Los Sitios Más Secretos de la Ciudad",
  description: "Descubre dónde cenar en Barcelona: sitios secretos con excelente cocina. El Cercle, Adagio Tapas, El Mirador, Bar Centro Gallego, Cena Clandestina.",
  keywords: "donde cenar barcelona, restaurantes secretos barcelona, donde comer barcelona, mejores restaurantes barcelona",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/donde-cenar-en-barcelona/" },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/donde-cenar-en-barcelona/",
    siteName: "GastroShows",
    title: "Dónde Cenar en Barcelona - Sitios Secretos",
    description: "Los mejores lugares para cenar en Barcelona con excelente cocina.",
  },
};

export default function DondeCenarBarcelonaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Dónde Cenar en Barcelona", url: "https://gastroshows.es/donde-cenar-en-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({
        title: "Dónde Cenar en Barcelona - Sitios Secretos",
        description: "Guía de los mejores sitios para cenar en Barcelona con excelente cocina.",
        publishedAt: "2021-08-20T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "donde-cenar-en-barcelona",
        image: "https://gastroshows.es/images/donde-cenar/hero-donde-cenar.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Dónde Cenar en Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Dónde Cenar en Barcelona — Los Sitios Más Secretos de la Ciudad
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Cinco lugares de <strong>excelente cocina con atmósferas únicas</strong> que van más allá de una típica cena de restaurante.
          </p>
        </header>

        <section id="el-cercle" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">El Cercle — Cocina Dual Catalana-Japonesa</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Ubicado en el Real Círculo Artístico de Barcelona, en Portal de Àngel, en el centro de la ciudad. <strong>El Cercle ofrece dos cartas: cocina catalana y japonesa.</strong>
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Con <strong>precios de menú ejecutivo al mediodía</strong>, es una opción de calidad para cenas especiales en un ambiente histórico y elegante.
          </p>
        </section>

        <section id="adagio" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Adagio Tapas — Cocinero con Estrella</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            En el Hotel Adagio, Calle Ferran, centro ciudad. Chef <strong>Jordi Herrera</strong> presenta <strong>sofisticadas tapas con raíces tradicionales y toques modernos.</strong>
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Especialidades:</strong> Croquetas de conejo, calamar a la romana con huevo frito, fideuá de pulpo.
          </p>
          <div className="bg-gold/10 border-l-4 border-gold p-4 rounded text-sm">
            <p><strong>Característica:</strong> Cocinero con estrella y precios populares.</p>
          </div>
        </section>

        <section id="mirador-palau" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">El Mirador de Palau — Cocina de Autor</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Ubicado en la entrada del Palau de la Música Catalana. Chef <strong>Dídac Moltó</strong> ofrece <strong>cocina de autor con productos locales y de proximidad.</strong>
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Menú completo o opciones express para quien asiste a conciertos. Ideal para disfrutar antes o después de una representación musical.
          </p>
        </section>

        <section id="centro-gallego" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Bar Centro Gallego — Especialidades Gallegas</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            En La Rambla (primer piso, entrada de mármol). <strong>Especialidades gallegas: lamprea, lacón, pulpo.</strong>
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Valor excepcional: menús de mediodía completos por 10€.</strong> Un clásico de Barcelona con tradición y autenticidad.
          </p>
        </section>

        <section id="cena-clandestina" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">La Cena Clandestina — Experiencia Secreta</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>No sabes dónde vas a cenar, qué cenarás, ni con quién.</strong> Recibirás pistas mediante enigmas en tu móvil que revelarán una ubicación secreta días antes.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Menú degustación sorpresa con chef privado, maridaje de vinos y experiencia completa. Perfecta para quienes buscan algo verdaderamente diferente en Barcelona.
          </p>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded">
            <p className="text-foreground/90"><strong>Qué hace que sea especial:</strong> Misterio, sorpresa total, chef privado, y una experiencia que recordarás para siempre.</p>
          </div>
        </section>

        <section id="consejos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Consejos para Cenar en Barcelona</h2>
          <ul className="space-y-3 text-foreground/90">
            <li>• <strong>Reserva con anticipación:</strong> Especialmente los fines de semana.</li>
            <li>• <strong>Explora barrios:</strong> Cada zona tiene sus propias joyas culinarias.</li>
            <li>• <strong>Prueba especialidades locales:</strong> No tengas miedo de pedir platos típicos catalanes o gallegos.</li>
            <li>• <strong>Valida el menú del día:</strong> Excelente relación calidad-precio al mediodía.</li>
            <li>• <strong>Entiende horarios:</strong> La cena en Barcelona comienza después de las 20:00.</li>
          </ul>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">¿Buscas Algo Completamente Diferente?</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Vive la experiencia de La Cena Clandestina: ubicación secreta, menú sorpresa, chef privado.</p>
          <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Descubre la Cena Clandestina</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Más Guías de Gastronomía en Barcelona</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/restaurantes-michelin" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Restaurantes Michelin por menos de 50€</p>
              <p className="text-sm text-muted-foreground">Estrellas gastronómicas asequibles.</p>
            </Link>
            <Link href="/menu-degustacion" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Menús de Degustación</p>
              <p className="text-sm text-muted-foreground">Experiencias culinarias completas.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
