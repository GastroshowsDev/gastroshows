import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import {
  JsonLd,
  breadcrumbSchema,
  articleSchema,
  restaurantSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Alquiler espacio gastronómico en Barcelona | GastroShows",
  description:
    "Alquila el espacio gastronómico de GastroShows en Sarrià-Sant Gervasi: 100m² con cocina equipada, salón principal y sala cóctel. Para eventos privados, corporate y team building.",
  keywords:
    "alquiler espacio gastronómico barcelona, alquiler cocina barcelona, espacio eventos barcelona, sala cóctel barcelona, evento corporativo barcelona",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical:
      "https://gastroshows.es/alquiler-espacio-gastronomico-en-barcelona/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/alquiler-espacio-gastronomico-en-barcelona/",
    siteName: "GastroShows",
    title: "Alquiler espacio gastronómico en Barcelona",
    description:
      "100m² en Sarrià con cocina equipada, salón y sala cóctel para eventos privados.",
  },
};

export default function AlquilerEspacioPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Alquiler espacio gastronómico Barcelona",
      url: "https://gastroshows.es/alquiler-espacio-gastronomico-en-barcelona/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title: "Alquiler espacio gastronómico en Barcelona",
          description:
            "Alquila el espacio gastronómico de GastroShows en Sarrià-Sant Gervasi.",
          publishedAt: "2022-03-10T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "alquiler-espacio-gastronomico-en-barcelona",
        })}
      />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-muted-foreground mb-6"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li>›</li>
            <li className="text-foreground/80">
              Alquiler espacio gastronómico Barcelona
            </li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Alquiler espacio gastronómico en Barcelona
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            <strong>100m²</strong> en pleno Sarrià-Sant Gervasi con cocina profesional equipada, salón principal y sala
            cóctel. El espacio perfecto para tus eventos privados, corporativos o gastronómicos en Barcelona.
          </p>
        </header>

        <section id="ubicacion" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Ubicación y características
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/alquiler-espacio-gastronomico-en-barcelona/hero-espacio-gastronomico-alquiler-barcelona-sarria.jpeg"
                alt="Alquiler espacio gastronómico Barcelona Sarrià-Sant Gervasi — 100m² con cocina TPB equipada"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Nuestro espacio se ubica en el <strong>distrito Sarrià-Sant Gervasi</strong>, zona alta de Barcelona,
                en un edificio singular con todas las comodidades.
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>📐 Superficie:</strong> 100 m²
                </li>
                <li>
                  <strong>🏢 Tres áreas:</strong> salón principal, sala cóctel y cocina equipada
                </li>
                <li>
                  <strong>🕐 Horario:</strong> de 8h a 23h
                </li>
                <li>
                  <strong>👥 Capacidad:</strong> 20 comensales en formato banquete · 40 personas en cóctel
                </li>
                <li>
                  <strong>💰 Precios:</strong> desde 100€/hora
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="incluye" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Qué incluye el alquiler
          </h2>
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <div>
              <h3 className="font-cormorant text-2xl font-light mb-3">
                Cocina profesional TPB
              </h3>
              <p>
                Cocina <strong>totalmente equipada</strong> con electrodomésticos profesionales: cinco fuegos, horno
                inteligente, lavavajillas de alta capacidad, <strong>Thermomix</strong> y robots <strong>Kenwood</strong>.
                Lista para usar en demostraciones culinarias o eventos gastronómicos.
              </p>
            </div>
            <div>
              <h3 className="font-cormorant text-2xl font-light mb-3">Salón principal</h3>
              <p>
                Acomoda hasta <strong>20 personas en banquete</strong>. Vajilla completa, equipamiento audiovisual y
                sonido envolvente. Espacio versátil que se adapta a cenas privadas, presentaciones de producto o
                conferencias.
              </p>
            </div>
            <div>
              <h3 className="font-cormorant text-2xl font-light mb-3">Sala cóctel</h3>
              <p>
                Barra de bebidas y <strong>vinoteca con control de temperatura</strong>. Capacidad para 40 personas en
                formato cóctel, ideal para celebraciones, networking o aperitivos.
              </p>
            </div>
          </div>
        </section>

        <section id="eventos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Tipos de eventos
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Nuestro espacio es ideal para:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Clases de cocina",
              "Demostraciones de producto",
              "Cenas privadas",
              "Reuniones corporativas",
              "Conferencias",
              "Actividades de team building",
              "Catas y showcookings",
              "Eventos gastronómicos",
            ].map((evento) => (
              <div
                key={evento}
                className="flex items-center gap-3 p-3 rounded border border-border"
              >
                <span className="text-gold text-lg">✓</span>
                <span>{evento}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="servicios" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Servicios adicionales
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Además del espacio, ofrecemos servicios complementarios para que tu evento sea redondo:{" "}
            <strong>fotografía profesional, catering, música y entretenimiento</strong>. Consúltanos sin compromiso.
          </p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">
            Reserva tu evento en GastroShows
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Contáctanos por WhatsApp o a través del formulario para consultar disponibilidad y personalizar tu evento.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg"
          >
            Contactar
          </Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">
            Posts relacionados
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/grupos"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Cenas privadas y grupos
              </p>
              <p className="text-sm text-muted-foreground">
                Eventos corporativos, despedidas, celebraciones.
              </p>
            </Link>
            <Link
              href="/cena-clandestina"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → La Cena Clandestina
              </p>
              <p className="text-sm text-muted-foreground">
                Vive nuestra propuesta gastronómica más original.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
