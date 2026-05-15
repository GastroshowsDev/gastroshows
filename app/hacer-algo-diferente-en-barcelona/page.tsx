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
  title: "Hacer algo diferente en Barcelona | 6 planes originales",
  description:
    "Si te apetece hacer algo diferente en Barcelona estás en el lugar adecuado. Planes originales para parejas y grupos: cena clandestina, taller cócteles, spa, coches de lujo y más.",
  keywords:
    "hacer algo diferente barcelona, planes originales barcelona, actividades parejas barcelona, planes diferentes barcelona, cena clandestina barcelona",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/hacer-algo-diferente-en-barcelona/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/hacer-algo-diferente-en-barcelona/",
    siteName: "GastroShows",
    title: "Hacer algo diferente en Barcelona",
    description:
      "Planes originales para parejas y grupos en Barcelona.",
  },
};

const planes = [
  {
    id: "coche-lujo",
    name: "Conducir un coche de lujo",
    image:
      "/images/hacer-algo-diferente-en-barcelona/coche-lujo-rentalcars-barcelona.jpg",
    paragraphs: [
      "Alquila un vehículo premium a través de plataformas como Rentalcars y vive la experiencia de conducir un coche de alta gama por las carreteras de Barcelona y su entorno.",
      "Encuentras coches de lujo a partir de **25€/día**, y un Mercedes Clase C está disponible alrededor de **53€**. Un plan diferente para sorprender a alguien especial.",
    ],
  },
  {
    id: "paraiso",
    name: "Una visita al paraíso",
    image:
      "/images/hacer-algo-diferente-en-barcelona/jardin-alma-cocteles-barcelona.jpg",
    paragraphs: [
      "**El Jardín del Hotel Alma**, ubicado en la zona alta de Paseo de Gracia, es un oasis verde escondido en pleno centro. Un rincón ideal para una copa o cóctel.",
      "Los vinos y cócteles cuestan en torno a **5€**, con tapas para acompañar entre **3€ y 5€** más. Plan ideal para tardes tranquilas o cenas informales.",
    ],
  },
  {
    id: "michelin",
    name: "Restaurantes con estrella Michelín por menos de 50€",
    image:
      "/images/hacer-algo-diferente-en-barcelona/michelin-cocina-japonesa-arroces.jpg",
    paragraphs: [
      "Disfrutar de la alta cocina en Barcelona <strong>no tiene por qué ser caro</strong>. Restaurantes con estrella Michelin como Caelis, Hisop, ORIA o xerta ofrecen menú mediodía por menos de 50€.",
      "Cocina catalana, japonesa, postres y arroces a un nivel excepcional. Una experiencia que no te puedes perder.",
    ],
    cta: {
      label: "Ver los 6 restaurantes Michelin",
      href: "/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/",
    },
  },
  {
    id: "taller-cocteles",
    name: "Taller de cócteles",
    image:
      "/images/hacer-algo-diferente-en-barcelona/taller-cocteles-bebidas-creativas.jpg",
    paragraphs: [
      "Aprende a preparar cócteles clásicos y de autor en un **taller mensual** guiado por mixólogos profesionales en Barcelona.",
      "Por **36€** incluye la formación, materiales y un maridaje de tapas. Plan perfecto para parejas, despedidas o cumpleaños diferentes.",
    ],
  },
  {
    id: "spa",
    name: "Spa relajante en la ciudad",
    image:
      "/images/hacer-algo-diferente-en-barcelona/spa-relajante-barcelona-masaje.jpg",
    paragraphs: [
      "El **Metropolitan Gymnasium** ofrece instalaciones de spa con vistas a Plaza España. Un oasis de tranquilidad en plena ciudad.",
      "Por **35€** disfruta del **circuito de aguas + masaje de 30 minutos**. Ideal para desconectar tras una semana intensa o como regalo relajante.",
    ],
  },
  {
    id: "cena-secreta",
    name: "Cena secreta en Barcelona",
    image: "/images/hacer-algo-diferente-en-barcelona/hero-hacer-algo-diferente-barcelona.jpg",
    paragraphs: [
      "La **Cena Clandestina de GastroShows** es la experiencia gastronómica más original de Barcelona. Una velada secreta con menú degustación, maridaje de vinos y catas de gin premium.",
      "La ubicación se descubre con pistas días antes. No es solo una cena: es una historia que se vive. **El plan más diferente** que puedes hacer en Barcelona.",
    ],
    cta: { label: "Reservar Cena Clandestina", href: "/cena-clandestina" },
  },
];

export default function HacerAlgoDiferentePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Hacer algo diferente en Barcelona",
      url: "https://gastroshows.es/hacer-algo-diferente-en-barcelona/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title: "Hacer algo diferente en Barcelona",
          description:
            "6 planes originales en Barcelona para parejas y grupos.",
          publishedAt: "2022-08-12T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "hacer-algo-diferente-en-barcelona",
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
              Hacer algo diferente en Barcelona
            </li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">
            Hacer algo diferente en Barcelona
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Si te apetece <strong>hacer algo diferente en Barcelona</strong> estás en el lugar adecuado. Una ciudad con
            infinitas posibilidades y con muchas actividades para parejas o planes originales para grupos.
          </p>
        </header>

        {planes.map((p, idx) => (
          <section key={p.id} id={p.id} className="mb-16 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 lowercase first-letter:uppercase">
              {p.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
              <div
                className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${
                  idx % 2 === 1 ? "order-2 md:order-1" : ""
                }`}
              >
                <img
                  src={p.image}
                  alt={`${p.name} - Plan diferente Barcelona`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className={`space-y-4 text-foreground/90 leading-relaxed ${
                  idx % 2 === 1 ? "order-1 md:order-2" : ""
                }`}
              >
                {p.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: para.replace(
                        /\*\*(.+?)\*\*/g,
                        "<strong>$1</strong>"
                      ),
                    }}
                  />
                ))}
                {p.cta && (
                  <Link
                    href={p.cta.href}
                    className="inline-block bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition"
                  >
                    {p.cta.label}
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">
            El plan más diferente de Barcelona
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            La Cena Clandestina de GastroShows combina alta cocina, sorpresas y una ubicación secreta. Una experiencia
            que nadie olvida.
          </p>
          <Link
            href="/cena-clandestina"
            className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg"
          >
            Reservar La Cena Clandestina
          </Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">
            Posts relacionados
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → 6 restaurantes Michelín por menos de 50€
              </p>
              <p className="text-sm text-muted-foreground">
                Alta cocina con menú mediodía asequible.
              </p>
            </Link>
            <Link
              href="/cenas-espectaculo-barcelona-secreta/"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Cenas con espectáculo en Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Las 6 mejores cenas con espectáculo.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
