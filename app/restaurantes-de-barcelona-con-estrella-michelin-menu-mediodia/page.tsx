import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import {
  JsonLd,
  restaurantSchema,
  breadcrumbSchema,
  articleSchema,
  faqSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "¡6 restaurantes de Barcelona con estrella Michelín por menos de 50€!",
  description:
    "Estos restaurantes de Barcelona con estrella Michelín cuentan con un menú de mediodía a un precio más asequible, ¡no te pierdas esta cita tan especial!",
  keywords:
    "restaurantes michelin barcelona, menu mediodia michelin barcelona, michelin barcelona menos de 50 euros, caelis, hisop, oria, hofmann, xerta, dos palillos",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical:
      "https://gastroshows.es/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/",
    siteName: "GastroShows",
    title:
      "¡6 restaurantes de Barcelona con estrella Michelín por menos de 50€!",
    description:
      "Estos restaurantes de Barcelona con estrella Michelín cuentan con un menú de mediodía a un precio más asequible.",
  },
};

const restaurants = [
  {
    id: "caelis",
    name: "CAELIS",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
    paragraphs: [
      "Caelis es el restaurante del hotel Ohla Barcelona. Al frente el chef francés **Romain Fornell**, plantea una cocina catalana de raíces galas basada en productos de temporada que acompaña con distintos maridajes. Toda una experiencia culinaria para el comensal por, entre otros factores, sus sabores y su cocina abierta.",
      "**De miércoles a sábado de 13:30h a 15:30h**, ofrecen el «Menú Caelis» de **42 euros (IVA incluido)**. Consiste en: un entrante (a escoger entre dos), un principal (a elegir entre dos) seguidos de una seleccionada oferta de quesos o de un postre dulce, además de un café o infusión. El menú también incluye uno de los dos vinos (o bien uno blanco, o bien uno tinto) propuestos por el sommelier. No es válido para grupos de más de 12 personas.",
    ],
  },
  {
    id: "hisop",
    name: "Hisop",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    paragraphs: [
      "En **Hisop**, el chef **Oriol Ivern** presenta elaboraciones que se basan en la tradición culinaria catalana con toques singulares y de vanguardia. Utiliza producto local de temporada para crear una propuesta única, en un espacio íntimo y cuidado donde la cocina se vive con pasión.",
      "El **«Menú Àpat»** tiene un precio de **35€** (bebidas aparte). Una de las mejores oportunidades de Barcelona para disfrutar de la alta cocina con estrella Michelín a un precio realmente ajustado.",
    ],
  },
  {
    id: "oria",
    name: "ORIA",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    paragraphs: [
      "**ORIA**, el restaurante del Monument Hotel en Passeig de Gràcia, lleva la firma del prestigioso chef **Martín Berasategui**. La propuesta es una cocina tradicional mediterránea (con toques, como no podía ser de otro modo, de cocina vasca) llevada a un formato actual y de diseño.",
      "El **«Menú ejecutivo»** del mediodía cuesta **45€** e incluye un entrante, plato principal, postre, café, vino o agua y servicio de pan. Una experiencia Michelín en pleno corazón de Barcelona a un precio razonable.",
    ],
  },
  {
    id: "hofmann",
    name: "hofmann",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    paragraphs: [
      "**Hofmann** representa el amor más absoluto por la gastronomía. Cocina moderna con respeto absoluto por las recetas tradicionales, en un ambiente clásico con cocina vista que invita a vivir la experiencia.",
      "Su **menú de mediodía** cuesta **39€** y ofrece tres opciones por cada plato (entrante, principal y postre), incluyendo vino o agua. Una propuesta sólida con el sello de calidad que ha hecho de Hofmann una referencia en Barcelona.",
    ],
  },
  {
    id: "xerta",
    name: "xerta",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&h=600&fit=crop",
    paragraphs: [
      "**Xerta** es la propuesta del chef **Fran López**, formado con Alain Ducasse, que reivindica la cocina cercana a las **Terres de l&apos;Ebre**. Productos del Delta del Ebro presentados de manera creativa, en una propuesta única en Barcelona.",
      "El **«Menú Ejecutivo»** se ofrece de **martes a viernes al mediodía** por **38€**, con bebidas incluidas. Una oportunidad excelente para descubrir una cocina de territorio con estrella Michelín a un precio inmejorable.",
    ],
  },
  {
    id: "dos-palillos",
    name: "DOS PALILLOS",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
    paragraphs: [
      "**Dos Palillos**, heredero de la filosofía de **ElBulli**, fusiona la cocina oriental (sobre todo nipona) y los productos ibéricos en formato de tapas elevadas. Combinaciones de sabores novedosas e impecable ejecución.",
      "Su **«Menú de mediodía»** cuesta **45€** (bebidas aparte) y se sirve cerca del **MACBA**, en pleno Raval. Una experiencia gastronómica única que une dos culturas culinarias a un precio razonable para su nivel.",
    ],
  },
];

const faqs = [
  {
    question: "¿Cuánto cuesta el menú mediodía en un Michelin de Barcelona?",
    answer:
      "Los menús mediodía Michelín en Barcelona oscilan entre 35€ y 45€. El más asequible es Hisop (35€), seguido de xerta (38€), hofmann (39€), CAELIS (42€), ORIA y Dos Palillos (45€). Todos incluyen entrante, principal y postre o café.",
  },
  {
    question: "¿Es necesario reservar en estos restaurantes Michelin?",
    answer:
      "Sí, todos requieren reserva previa. La disponibilidad de menús mediodía es limitada (suelen estar de martes/miércoles a sábado), y muchas mesas se llenan con varias semanas de antelación. Reserva con tiempo, especialmente para fines de semana.",
  },
  {
    question: "¿El menú mediodía Michelín incluye bebidas?",
    answer:
      "Depende del restaurante. CAELIS, ORIA, hofmann y xerta incluyen vino o agua en el precio. Hisop y Dos Palillos sirven bebidas aparte. Lee siempre la descripción del menú antes de reservar para evitar sorpresas.",
  },
  {
    question: "¿Hay opciones vegetarianas en estos menús mediodía?",
    answer:
      "La mayoría adaptan opciones bajo petición previa, pero los menús cerrados están pensados con productos tradicionales (carne y pescado). Avisa al reservar si tienes restricciones dietéticas para que el restaurante pueda preparar alternativas.",
  },
  {
    question: "¿Cuál es el mejor menú Michelín calidad-precio de Barcelona?",
    answer:
      "Hisop (35€) y xerta (38€, bebidas incluidas) ofrecen la mejor relación calidad-precio. Para una experiencia más completa con vino incluido, hofmann (39€) y CAELIS (42€) son excelentes opciones.",
  },
];

export default function MichelinMediodiaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Restaurantes Michelin menú mediodía",
      url: "https://gastroshows.es/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title:
            "¡6 restaurantes de Barcelona con estrella Michelín por menos de 50€!",
          description:
            "Estos restaurantes de Barcelona con estrella Michelín cuentan con un menú de mediodía a un precio más asequible.",
          publishedAt: "2021-05-10T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia",
        })}
      />
      <JsonLd data={faqSchema(faqs)} />

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
              Restaurantes Michelin menú mediodía
            </li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">
            ¡6 restaurantes de Barcelona con estrella Michelín por menos de 50€!
          </h1>
        </header>

        <section className="mb-12 space-y-4 text-foreground/90 leading-relaxed text-lg">
          <p>
            Te proponemos <strong>6 restaurantes de Barcelona con estrella</strong>. ¿Todavía no te habías enterado de
            que es posible conocer la alta cocina de los grandes restaurantes de Barcelona y llegar a fin de mes?
          </p>
          <p>
            Probar las elaboraciones de los restaurantes con estrella Michelín suele ser un gran plan, pero también un
            plan muy caro. Por eso, te traemos esta selección de restaurantes que ofrecen{" "}
            <strong>menú degustación al mediodía por menos de 50€</strong>. Una forma asequible de descubrir la mejor
            cocina sin renunciar a la calidad. Si quieres también puedes consultar{" "}
            <Link
              href="/mejores-restaurantes-menu-degustacion-barcelona/"
              className="text-gold hover:underline"
            >
              los mejores restaurantes con menú degustación de Barcelona
            </Link>{" "}
            o nuestra{" "}
            <Link href="/cena-clandestina" className="text-gold hover:underline">
              Cena Clandestina
            </Link>
            .
          </p>
        </section>

        {restaurants.map((r, idx) => (
          <section key={r.id} id={r.id} className="mb-16 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
              {r.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
              <div
                className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${
                  idx % 2 === 1 ? "order-2 md:order-1" : ""
                }`}
              >
                <img
                  src={r.image}
                  alt={`${r.name} Barcelona - Restaurante Michelin menú mediodía`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className={`space-y-4 text-foreground/90 leading-relaxed ${
                  idx % 2 === 1 ? "order-1 md:order-2" : ""
                }`}
              >
                {r.paragraphs.map((p, i) => (
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
              </div>
            </div>
          </section>
        ))}

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">
            La experiencia gastronómica más original de Barcelona
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            La Cena Clandestina de GastroShows: menú degustación de 12 elaboraciones, maridaje de vinos y cava,
            gin-tonics premium y sorpresas en un espacio secreto.
          </p>
          <Link
            href="/cena-clandestina"
            className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg"
          >
            Descubre La Cena Clandestina
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
                En este post encontrarás los mejores restaurantes con menú degustación de Barcelona que no te puedes
                perder.
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
                Menús degustación para regalar y disfrutar dentro o fuera de casa.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
