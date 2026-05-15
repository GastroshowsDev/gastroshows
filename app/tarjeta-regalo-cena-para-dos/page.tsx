import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import {
  JsonLd,
  breadcrumbSchema,
  articleSchema,
  productSchema,
  restaurantSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Tarjeta Regalo Cena Para Dos | GastroShows Barcelona",
  description:
    "Tarjeta regalo cena para dos en Barcelona: experiencia gastronómica para parejas con menú degustación de 10-12 actos, maridaje de vinos y showcooking del chef en vivo.",
  keywords:
    "tarjeta regalo cena para dos, regalo pareja barcelona, cena para dos barcelona, regalo aniversario barcelona, regalo san valentin barcelona",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/tarjeta-regalo-cena-para-dos/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/tarjeta-regalo-cena-para-dos/",
    siteName: "GastroShows",
    title: "Tarjeta Regalo Cena Para Dos",
    description:
      "Una experiencia gastronómica única para parejas en Barcelona.",
  },
};

export default function TarjetaRegaloDosPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Tarjeta Regalo Cena Para Dos",
      url: "https://gastroshows.es/tarjeta-regalo-cena-para-dos/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title: "Tarjeta Regalo Cena Para Dos",
          description:
            "Tarjeta regalo cena para dos: una experiencia gastronómica única en Barcelona.",
          publishedAt: "2022-04-25T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "tarjeta-regalo-cena-para-dos",
        })}
      />
      <JsonLd
        data={productSchema({
          name: "Tarjeta Regalo Cena Para Dos - GastroShows",
          description:
            "Tarjeta regalo para vivir la Cena Clandestina de GastroShows en pareja: menú degustación de 10-12 actos con maridaje en ubicación secreta.",
          price: 170,
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
            <li className="text-foreground/80">Tarjeta Regalo Cena Para Dos</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Tarjeta Regalo Cena Para Dos
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Una <strong>cena que combina gastronomía y sorpresas</strong> diseñada para parejas que buscan una
            experiencia inolvidable en Barcelona.
          </p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Qué es
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/tarjeta-regalo-cena-para-dos/hero-tarjeta-regalo-cena-para-dos.jpg"
                alt="Tarjeta regalo cena para dos Barcelona — experiencia gastronómica para parejas con menú degustación"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Esta tarjeta regalo ofrece una <strong>experiencia original de cena que combina alta cocina con
                sorpresas inesperadas</strong>. Un menú degustación con maridaje de vinos en un local secreto de
                Barcelona.
              </p>
              <p>
                Ideal para <strong>aniversarios, San Valentín, cumpleaños</strong> o simplemente para sorprender a esa
                persona especial con un plan diferente.
              </p>
            </div>
          </div>
        </section>

        <section id="que-incluye" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Qué incluye
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Cóctel de bienvenida a la llegada",
              "Menú degustación de 10-12 actos (varía por temporada)",
              "Chef privado con demostraciones de cocina en vivo",
              "Maridaje de vinos seleccionados para acompañar el menú",
              "Cata de gin premium Teichenné",
              "Sorpresas durante la velada",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-4 rounded border border-border"
              >
                <span className="text-gold text-xl shrink-0">✓</span>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="donde" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Dónde irás
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>La ubicación es secreta inicialmente</strong>. Se envían pistas por email <strong>5 días antes</strong>
            de la experiencia, revelando un local secreto de Barcelona. La cena comienza a las <strong>20:00h</strong>.
          </p>
        </section>

        <section id="precio" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Precio y disponibilidad
          </h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p className="text-foreground/90">
              <strong>Duración:</strong> 3,5 horas
            </p>
            <p className="text-foreground/90">
              <strong>Precio:</strong> entre 80€ y 100€ por persona
            </p>
            <p className="text-foreground/90">
              <strong>Disponibilidad:</strong> jueves, viernes y sábados
            </p>
            <p className="text-foreground/90">
              <strong>Descuento:</strong> 15% disponible
            </p>
          </div>
        </section>

        <section id="notas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Notas importantes
          </h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Los invitados deben <strong>indicar restricciones alimentarias y alergias</strong> en el momento de la
              reserva.
            </p>
            <p>
              Las <strong>cancelaciones pueden modificarse hasta 5 días antes</strong> sin coste. Los cambios dentro de
              las 24 horas se acomodan según disponibilidad.
            </p>
          </div>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">
            Regala una velada inolvidable en pareja
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            La tarjeta regalo cena para dos es el regalo perfecto para celebrar momentos especiales. Una experiencia
            secreta que combina alta cocina, maridaje y sorpresas.
          </p>
          <Link
            href="/regalo"
            className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg"
          >
            Comprar Tarjeta Regalo Pareja
          </Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">
            Posts relacionados
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/tarjeta-regalo-cena-barcelona"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Tarjeta Regalo Cena Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Versión individual de la tarjeta regalo.
              </p>
            </Link>
            <Link
              href="/los-mejores-menus-degustacion-para-regalar/"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Los mejores menús degustación para regalar
              </p>
              <p className="text-sm text-muted-foreground">
                Más ideas de regalo gastronómico.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
