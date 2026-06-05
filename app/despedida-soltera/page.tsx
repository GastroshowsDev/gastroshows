import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Despedida de Soltera en Barcelona | Cena Privada Exclusiva",
  description: "La mejor despedida de soltera en Barcelona. Chef privado, menú degustación, espacio exclusivo. La novia es la protagonista en una experiencia gastronómica única.",
  keywords: "despedida soltera barcelona, cena despedida soltera, despedida soltera eventos, experiencia gastronómica grupo",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/despedida-soltera/" },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/despedida-soltera/",
    siteName: "GastroShows",
    title: "Despedida de Soltera en Barcelona",
    description: "Experiencia gastronómica privada para despedida de soltera con chef exclusivo.",
  },
};

export default function DespedidaSolteraPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Despedida de Soltera", url: "https://gastroshows.es/despedida-soltera/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({
        title: "La Mejor Cena Despedida de Soltera con Gastroshows",
        description: "Experiencia gastronómica exclusiva para despedida de soltera.",
        publishedAt: "2021-03-05T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "despedida-soltera",
        image: "https://gastroshows.es/images/despedida-soltera/hero-despedida.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Despedida de Soltera</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            La Mejor Despedida de Soltera en Barcelona
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            <strong>Un espacio exclusivo para vosotras</strong> donde la novia es la protagonista absoluta. Chef privado, menú degustación y servicio personalizado.
          </p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Una Experiencia Gastronómica Única</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Un chef privado elaborará un menú degustación de alta cocina</strong> en un ambiente elegante y privado, diseñado especialmente para la novia y sus amigas. Toda la atención está en hacer de este momento algo inolvidable.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            No es una cena típica: es una experiencia culinaria completa donde la gastronomía es la protagonista, pero la celebración y el ambiente exclusivo es lo que realmente importa.
          </p>
        </section>

        <section id="que-incluye" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Qué Incluye la Experiencia</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Cóctel de bienvenida con servicio exclusivo",
              "Menú degustación de 8-12 platos con productos de temporada",
              "Chef privado que cocina en directo",
              "Maridaje con vinos locales premium",
              "Línea de ginebras premium Teichenné",
              "Servicio privado de anfitrión y sala",
              "Espacio gastronómico completamente privado",
              "Adaptaciones por alergias e intolerancias",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border">
                <span className="text-gold text-xl shrink-0">✓</span>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="detalles" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Detalles de la Experiencia</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-3">
            <p><strong>Duración:</strong> 2-3 horas</p>
            <p><strong>Precio:</strong> Desde 60€ por persona</p>
            <p><strong>Disponibilidad:</strong> Fechas a convenir</p>
            <p><strong>Ubicación:</strong> Espacio gastronómico privado en Barcelona</p>
          </div>
        </section>

        <section id="servicios-adicionales" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Servicios Adicionales Disponibles</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Para personalizar aún más vuestra celebración, ofrecemos:
          </p>
          <ul className="space-y-2 text-foreground/90 ml-6">
            <li>• <strong>Fotografía profesional</strong> con photocall temático</li>
            <li>• <strong>Música en directo</strong> o DJ para ambiente personalizado</li>
            <li>• <strong>Decoración temática</strong> según vuestros gustos</li>
            <li>• <strong>Servicios de magia</strong> o entretenimiento adicional</li>
          </ul>
        </section>

        <section id="recomendaciones" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Recomendaciones Importantes</h2>
          <div className="space-y-4">
            <p className="text-foreground/90">
              <strong>Alergias e intolerancias:</strong> Especificadas al reservar para que el chef adapte el menú.
            </p>
            <p className="text-foreground/90">
              <strong>Servicios extras:</strong> Solicita con anticipación para que organicemos todo personalizado.
            </p>
            <p className="text-foreground/90">
              <strong>Confirmación:</strong> Confirma asistencia 48 horas antes para ajustar cantidades.
            </p>
          </div>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">¡Me Interesa!</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Contacta para personalizar tu despedida de soltera. Chef privado, menú exclusivo, experiencia inolvidable.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Contactar</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Otras Celebraciones Gastronómicas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/cena-clandestina-de-barcelona-grupos" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cena Clandestina para Grupos</p>
              <p className="text-sm text-muted-foreground">Experiencia secreta con amigos.</p>
            </Link>
            <Link href="/cena-clandestina" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cena Clandestina para Parejas</p>
              <p className="text-sm text-muted-foreground">Experiencia romántica y exclusiva.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
