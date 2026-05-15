import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import {
  JsonLd,
  restaurantSchema,
  breadcrumbSchema,
  articleSchema,
  faqSchema,
  eventSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Las 6 mejores cenas con espectáculo en Barcelona (y una es secreta)",
  description:
    "Descubre las 6 mejores cenas con espectáculo en Barcelona: Ocaña, GastroShows (la única secreta), Tablao Flamenco Cordobés, GASTBY, Tablao de Carmen y Somnia Dinner Show.",
  keywords:
    "cenas con espectáculo barcelona, cena flamenco barcelona, dinner show barcelona, cena espectáculo secreta, ocaña barcelona, tablao flamenco cordobés, gastby barcelona, somnia dinner show",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/cenas-espectaculo-barcelona-secreta/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/cenas-espectaculo-barcelona-secreta/",
    siteName: "GastroShows",
    title:
      "Las 6 mejores cenas con espectáculo en Barcelona (y una es secreta)",
    description:
      "Las mejores cenas con espectáculo de Barcelona: flamenco tradicional, cabaret contemporáneo y una experiencia gastronómica secreta.",
  },
};

const venues = [
  {
    id: "ocana",
    name: "Ocaña: cena y arte en el corazón del Gótico",
    image:
      "https://images.unsplash.com/photo-1574391884720-bbc049ec09ad?w=800&h=600&fit=crop",
    paragraphs: [
      "Es un espacio lleno de **historia, color y performance**. Ubicado en la **Plaza Real**, este lugar ofrece cenas ambientadas con shows de drag queens, música en vivo y espectáculos de cabaret.",
      "Su cocina fusiona sabores mediterráneos con un aire cosmopolita, siendo el **arroz del Tibidabo** y el **pulpo con parmentier** algunas de sus especialidades. Una propuesta vibrante donde el ambiente y la gastronomía van de la mano.",
    ],
  },
  {
    id: "gastroshows",
    name: "GastroShows: una cena secreta… con sabor gastronómico catalán",
    image: "/images/cenas-espectaculo-secreta/gastroshows-cena-clandestina-secreta.jpg",
    paragraphs: [
      "Una **cena clandestina en un espacio oculto de Barcelona**. Cada noche es única, con un menú gastronómico creativo inspirado en la alta cocina catalana.",
      "**No hay carta. No hay dirección pública. Solo pistas.** Aquí no vienes solo a cenar, vienes a formar parte de una historia que se desarrolla a tu alrededor. La única cena clandestina con experiencia inmersiva de Barcelona.",
    ],
    cta: { label: "Reservar Cena Clandestina", href: "/cena-clandestina" },
  },
  {
    id: "tablao-cordobes",
    name: "Tablao Flamenco Cordobés: la tradición del duende",
    image:
      "https://images.unsplash.com/photo-1551806235-e3b2da4e44b1?w=800&h=600&fit=crop",
    paragraphs: [
      "Histórico tablao que ofrece una de las **experiencias flamencas más auténticas de la ciudad**. Fundado en los años 70, reúne a artistas de primer nivel en un formato íntimo.",
      "El espectáculo se acompaña de una **cena tipo buffet con sabores españoles clásicos**. Una opción imprescindible para quien quiere vivir el flamenco auténtico en Las Ramblas de Barcelona.",
    ],
  },
  {
    id: "gastby",
    name: "GASTBY: GLAMOUR, COCINA Y ESPECTÁCULO",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
    paragraphs: [
      "Una de las **propuestas más sofisticadas de la ciudad**. Cena con menú de cocina internacional y show que mezcla cabaret, acrobacias, música en directo y performance visual.",
      "Plan ideal para **celebrar ocasiones especiales**: aniversarios, despedidas o cenas de empresa que buscan algo diferente. Ambientación inspirada en los años 20 con todo el glamour del Gatsby original.",
    ],
  },
  {
    id: "tablao-carmen",
    name: "Tablao de Carmen: magia flamenca en el Poble Espanyol",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
    paragraphs: [
      "Rinde **homenaje a la mítica bailaora Carmen Amaya**. Podrás disfrutar de cena con tapas mientras asistes a espectáculo flamenco de hasta **60 minutos**, rodeado de historia y tradición andaluza.",
      "Ubicado dentro del **Poble Espanyol**, ofrece una experiencia completa donde el arte arquitectónico se une al arte flamenco. Una opción cultural perfecta para una velada inolvidable.",
    ],
  },
  {
    id: "somnia",
    name: "Somnia Dinner Show: teatro, magia y cena gourmet",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
    paragraphs: [
      "Propuesta **inmersiva que mezcla gastronomía con show teatral**. Menú de autor mientras se desarrolla un espectáculo que combina **comedia, magia y cabaret moderno**.",
      "Experiencia pensada para quienes desean una **noche multisensorial**, donde la cocina, el arte y el entretenimiento se entrelazan para crear un recuerdo único.",
    ],
  },
];

const faqs = [
  {
    question: "¿Cuál es la cena con espectáculo más original de Barcelona?",
    answer:
      "La Cena Clandestina de GastroShows es la propuesta más original: una cena clandestina en un espacio oculto de Barcelona con un menú gastronómico creativo inspirado en la alta cocina catalana. No hay carta, no hay dirección pública, solo pistas.",
  },
  {
    question: "¿Qué tipos de espectáculos hay en las cenas con espectáculo?",
    answer:
      "Encontrarás flamenco tradicional (Tablao Flamenco Cordobés, Tablao de Carmen), drag queens y cabaret (Ocaña), cabaret sofisticado con acrobacias (GASTBY), teatro inmersivo con magia (Somnia Dinner Show) y experiencia gastronómica secreta (GastroShows).",
  },
  {
    question: "¿Dónde están ubicadas estas cenas con espectáculo?",
    answer:
      "Ocaña en Plaza Real, Tablao Flamenco Cordobés en Las Ramblas, Tablao de Carmen en el Poble Espanyol y GastroShows en ubicación secreta de Barcelona. GASTBY y Somnia Dinner Show en zonas céntricas.",
  },
  {
    question: "¿Hay que reservar las cenas con espectáculo?",
    answer:
      "Sí, todas requieren reserva previa. Especialmente la Cena Clandestina de GastroShows, que tiene plazas muy limitadas. Los tablaos flamencos se llenan rápido en temporada alta. Reserva con al menos 1-2 semanas de antelación.",
  },
  {
    question: "¿Son aptas para grupos o despedidas?",
    answer:
      "La mayoría sí. Ocaña con sus drag queens y GASTBY con su ambiente glamouroso son ideales para despedidas. Los tablaos flamencos funcionan bien para grupos turísticos. La Cena Clandestina admite hasta 12 personas (o privatización completa).",
  },
];

export default function CenasEspectaculoPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Cenas con espectáculo Barcelona",
      url: "https://gastroshows.es/cenas-espectaculo-barcelona-secreta/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title:
            "Las 6 mejores cenas con espectáculo en Barcelona (y una es secreta)",
          description:
            "Las mejores cenas con espectáculo de Barcelona: flamenco, cabaret y una experiencia secreta.",
          publishedAt: "2022-02-20T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "cenas-espectaculo-barcelona-secreta",
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={eventSchema({
          name: "La Cena Clandestina - Cena espectáculo secreta Barcelona",
          description:
            "Cena clandestina en un espacio oculto de Barcelona con menú gastronómico creativo inspirado en la alta cocina catalana.",
          price: 145,
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
              Cenas con espectáculo Barcelona
            </li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">
            Las 6 mejores cenas con espectáculo en Barcelona (y una es secreta)
          </h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img
              src="/images/cenas-espectaculo-secreta/hero-cenas-espectaculo-barcelona.jpg"
              alt="Las 6 mejores cenas con espectáculo en Barcelona — flamenco, cabaret y la cena clandestina secreta"
              className="w-full h-full object-cover"
              width={1200}
              height={500}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </header>

        <section className="mb-12 space-y-4 text-foreground/90 leading-relaxed text-lg">
          <p>
            Barcelona es una ciudad vibrante y creativa, donde la gastronomía y el arte se dan la mano en cada rincón.
            Si estás buscando una experiencia que combine una buena cena con un espectáculo inolvidable, estás en el
            lugar adecuado.
          </p>
          <p>
            En este artículo te compartimos <strong>6 propuestas únicas</strong> para disfrutar de una noche diferente,
            desde flamenco tradicional hasta cabaret contemporáneo… y{" "}
            <strong>una experiencia gastronómica secreta que solo unos pocos conocen</strong>.
          </p>
        </section>

        {venues.map((v, idx) => (
          <section key={v.id} id={v.id} className="mb-16 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
              {v.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
              <div
                className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${
                  idx % 2 === 1 ? "order-2 md:order-1" : ""
                }`}
              >
                <img
                  src={v.image}
                  alt={`${v.name} - Cena espectáculo Barcelona`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className={`space-y-4 text-foreground/90 leading-relaxed ${
                  idx % 2 === 1 ? "order-1 md:order-2" : ""
                }`}
              >
                {v.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: p.replace(
                        /\*\*(.+?)\*\*/g,
                        "<strong>$1</strong>"
                      ),
                    }}
                  />
                ))}
                {v.cta && (
                  <Link
                    href={v.cta.href}
                    className="inline-block bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition"
                  >
                    {v.cta.label}
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">
            La única cena clandestina de Barcelona
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Una cena que empieza días antes con pistas y enigmas. Llegas a una ubicación secreta donde te espera un menú
            gastronómico creativo inspirado en la alta cocina catalana.
          </p>
          <Link
            href="/cena-clandestina"
            className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg"
          >
            Reservar La Cena Clandestina
          </Link>
        </section>

        <section id="faq" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-8">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="border border-border rounded-lg p-5 group open:bg-muted/30 transition"
              >
                <summary className="cursor-pointer font-semibold text-foreground/90 list-none flex justify-between items-start gap-4">
                  <span>{faq.question}</span>
                  <span className="text-gold text-xl shrink-0 group-open:rotate-45 transition">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-foreground/80 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">
            Posts relacionados
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/mejores-restaurantes-menu-degustacion-barcelona/"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Los mejores restaurantes con menú degustación Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Los mejores menús degustación de Barcelona que no te puedes perder.
              </p>
            </Link>
            <Link
              href="/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → 6 restaurantes Michelín por menos de 50€
              </p>
              <p className="text-sm text-muted-foreground">
                Alta cocina Michelin con menú mediodía asequible.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
