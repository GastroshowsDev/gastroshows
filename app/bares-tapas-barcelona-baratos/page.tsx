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
  title: "Bares tapas Barcelona baratos | Los 10 mejores",
  description:
    "Los 10 mejores bares de tapas baratos de Barcelona: Quimet & Quimet, El Xampanyet, Gata Mala, Bar Cañete, La Plata, El 58, La Cova Fumada, El Vaso de Oro, Balius y La Monroe.",
  keywords:
    "bares tapas barcelona baratos, tapas barcelona, quimet quimet, el xampanyet, gata mala, bar cañete, la plata, la cova fumada, el vaso de oro, balius, la monroe",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/bares-tapas-barcelona-baratos/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/bares-tapas-barcelona-baratos/",
    siteName: "GastroShows",
    title: "Bares tapas Barcelona baratos",
    description:
      "Los 10 mejores bares de tapas baratos de Barcelona con tapas de primerísima calidad a muy buen precio.",
  },
};

const bares = [
  {
    id: "quimet-quimet",
    name: "QUIMET & QUIMET",
    subtitle: "tapas clásicas en Poble-Sec",
    url: "https://www.quimetquimet.com/",
    image:
      "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=800&h=600&fit=crop",
    paragraphs: [
      "Hablar de tapas deliciosas y económicas en Barcelona es hablar de **Quimet & Quimet**. Un bar de tapas de Barcelona **desde el 1914** es un espacio acogedor con decoración tradicional. Pero que esta puesta en escena no os engañe, su carta está repleta de tapas actualizadas con toques vanguardistas y especiales.",
      "A destacar, **sus conservas**. Podrás probar tapas como boquerones, anchoas o navajas y disfrutar de un bocado alucinante y con una relación calidad precio exquisita. Además, tienen un **vermut de otro planeta y cerveza propia**, ¡corre a conocerlo!",
    ],
  },
  {
    id: "xampanyet",
    name: "XAMPANYET",
    subtitle: "xampany y tapas de ibéricos en el Born",
    url: "https://www.elxampanyet.es/",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    paragraphs: [
      "Si recorres el centro de la ciudad, este bar de tapas de Barcelona es un **local emblemático y parada obligatoria**. El Xampanyet es uno de esos lugares ideales para disfrutar de un buen tapeo en un ambiente agradable, de barrio y moderno. Y encima bien de precio. Uno de los mejores bares tapas Barcelona baratos, vaya.",
      "Este local lleva abierto **desde el año 1929** y se encuentra en el corazón del **barrio del Born**. Su estética es tradicional y hogareña. En su carta encontrarás una gran variedad de tapas como, por ejemplo, **embutidos ibéricos o anchoas**. Además, aquí podrás disfrutar de una selección de bebidas exquisitas, como vino, vermut o su **clásico xampanyet (engancha!)**.",
    ],
  },
  {
    id: "gata-mala",
    name: "GATA MALA",
    subtitle: "bares tapas Barcelona baratos y sabrosísimos",
    url: "https://www.facebook.com/pages/Gata-Mala/110002805737820",
    image:
      "https://images.unsplash.com/photo-1505253213348-cd54c92b37cb?w=800&h=600&fit=crop",
    paragraphs: [
      "Paseando por el **barrio de Gràcia** tienes que parar en el **Gata Mala**. Local pequeñito que destaca por la grandeza de sus tapas. Está considerado como uno de los mejores bares de tapas del barrio de Gracia.",
      "El motivo de ello no es un misterio: **las tapas son gratis con cada consumición**. Y ojo que ello no supone que sean justitas, todo lo contrario, son **tapas de calidad, generosas y a buen precio**. Además, las tapas que se piden fuera de caña son una delicia, como **escalivada con queso de cabra o un raviolón casero**. Alucinantes.",
    ],
  },
  {
    id: "bar-canete",
    name: "BAR CAÑETE",
    subtitle: "bares de tapas barcelona económicos y de pescadito en el Raval",
    url: "https://www.barcanete.com/",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&h=600&fit=crop",
    paragraphs: [
      "Si os va el pescado fresco vuestra elección es **Bar Cañete**. Situado en **El Raval**, podrás probar su **pescado rebozado que te hará llorar de la emoción** con cada crujiente mordisco. En este caso, podrás disfrutar de una experiencia más «gourmet» y deliciosa, aunque a un precio asequible y justo.",
      "Se trata de un bar de tapas de Barcelona **especializado en tapas de marisco y pescado**, aunque tienen opciones para todos los paladares. Todas ellas perfectas para acompañar con una buena copa de vino. Disfrutarás de un buen tapeo y de un ambiente y servicio sin igual. Si buscas bares tapas Barcelona baratos, ¡no puedes faltar!",
    ],
  },
  {
    id: "la-plata",
    name: "LA PLATA",
    subtitle: "tapas de auténtica taverna de pescadores",
    url: "https://barlaplata.com/",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    paragraphs: [
      "Otro clásico bar de tapas de Barcelona que llevamos disfrutando **desde 1945** es el **Bar La Plata**. Y se trata de un local sorprendente y único en el sector. Entrar ahí es entrar a una **auténtica taverna de pescadores**.",
      "Las **cuatro tapas imprescindibles** de este emblemático bar son: **el pez azul frito; la ensalada de tomate, cebolla y aceitunas; el pincho de morcilla y el pincho de anchoas**. Todo está de vicio.",
      "En resumen, buen trato, buena comida y buen vino. No podía faltar en nuestra lista de los 10 bares de tapas de Barcelona por menos de 20€. Además, ofrecen una deliciosa selección de **vinos DO** que serán el maridaje perfecto para tu comida.",
    ],
  },
  {
    id: "el-58",
    name: "EL 58",
    subtitle: "tapas variadas y creativas en el Poblenou",
    url: "https://www.facebook.com/el58poblenou",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    paragraphs: [
      "Ponemos rumbo a **Poblenou** para hablaros de otro bar de tapas de Barcelona imprescindible. Hablamos de **El 58**, un establecimiento moderno y muy acogedor que te ofrece una carta muy variada, con buen producto y platillos creativos.",
      "La **brocheta de langostino con chile dulce** o las **gambas a la plancha** (a buen precio) son un ejemplo. Y también tienes que probar sus **patatas bravas**, son fenomenales.",
      "Además, hacen un **menú de mediodía entre semana** de tapeo con sus grandes éxitos que puedes disfrutar sentado en su **patio interior**, que es espléndido. Y todo ello a precios económicos.",
    ],
  },
  {
    id: "la-cova-fumada",
    name: "LA COVA FUMADA",
    subtitle: "la bomba de la Barceloneta",
    url: "https://www.lacovafumada.com/",
    image:
      "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=800&h=600&fit=crop",
    paragraphs: [
      "Otro de los bares de tapas de Barcelona más conocidos y emblemáticos es **La Cova Fumada**. Se encuentra situado en la **plaza del mercado en la Barceloneta** y se trata de un local tradicional y con estilo marinero.",
      "Se dice que **fue aquí donde se creó la tapa conocida como «la bomba»**. La verdad que por las colas de gente que se han formado siempre para probarlas es fácil de creer.",
      "Y ojo que también encontraréis los **garbanzos con calamares, el capipota, las sardinas**. Buen ambiente, producto y precio. Uno de los mejores bares tapas Barcelona baratos, ¡tienes que ir!",
    ],
  },
  {
    id: "vaso-de-oro",
    name: "EL VASO DE ORO",
    subtitle: "tapas y tradición",
    url: "http://www.vasodeoro.com/",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop",
    paragraphs: [
      "**El Vaso de Oro** es un clásico de los clásicos, que lleva **más de medio siglo** ofreciendo una exquisita oferta de cañas y tapas. Tiene detalles tan auténticos como **camareros uniformados con la vestimenta clásica** y es uno de los lugares de referencia donde tiran bien la caña en Barcelona.",
      "Sus tapas son **clásicas y riquísimas: bravas, pimientos de Padrón, ensaladilla**, y otros más marineras como **gambas, almejas y chipirones**, como manda en un histórico barrio de pescadores.",
      "Aunque **el plato estrella es el filete con foie**. Si estás dispuesto a gastarte un poco más, ¡no te lo puedes perder!",
    ],
  },
  {
    id: "balius",
    name: "BALIUS",
    subtitle: "tapas andaluzas en Poblenou",
    url: "https://www.facebook.com/BaliusBar/",
    image:
      "/images/bares-tapas-baratos/bar-balius-poblenou-tapas-andaluzas.jpg",
    paragraphs: [
      "Un bar de tapas de Barcelona imprescindible es el **Balius**. Ideal para cualquier ocasión: una cerveza después del trabajo; un vermut de fin de semana o un cóctel de sábado por la noche.",
      "En la carta tienen tapas a precio económico de **estilo andaluz y castellanas**: **lomo de orza** (lomo escaldado y marinado con especias) y **atascaburras** (patata picada con bacalao, ajo, aceite y sal). Forman parte de su sello caracterizado por el **Slow Food** (producto de proximidad y ecológico garantizado) y unos precios económicos.",
      "La **coctelería también es un must**. Ahí lo dejo.",
    ],
  },
  {
    id: "la-monroe",
    name: "La Monroe",
    subtitle: "tapas a cualquier hora en el Raval",
    url: "http://www.lamonroe.es/",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
    paragraphs: [
      "Situado en la **plaza de la Filmoteca, en el Raval**, es un local desenfadado, moderno y actual con un ambiente y encanto muy singulares. En **La Monroe** puedes desayunar, picar algunas tapas o comerte un menú a buen precio.",
      "También puedes cenar si tienes algo más de presupuesto y quedarás bien. A destacar entre su carta la **ensaladilla rusa**, que está buenísima y que los **embutidos son de Ponts**. Ricos, ricos.",
      "Su **terraza grande y local diáfano** se suman a la calidad de sus tapas para dar un resultado muy positivo.",
    ],
  },
];

const faqs = [
  {
    question: "¿Dónde comer tapas baratas en Barcelona?",
    answer:
      "Los mejores bares de tapas baratos de Barcelona son: Quimet & Quimet (Poble-Sec), El Xampanyet (Born), Gata Mala (Gràcia), Bar Cañete (Raval), La Plata (centro), El 58 (Poblenou), La Cova Fumada (Barceloneta), El Vaso de Oro (Barceloneta), Balius (Poblenou) y La Monroe (Raval).",
  },
  {
    question: "¿Cuánto cuesta comer tapas en Barcelona?",
    answer:
      "En los bares de tapas baratos de Barcelona puedes comer por menos de 20€ por persona. Tapas individuales suelen costar entre 2€ y 6€. La calidad sigue siendo alta a pesar de los precios económicos.",
  },
  {
    question: "¿Cuál es el bar más antiguo de tapas en Barcelona?",
    answer:
      "Quimet & Quimet abrió en 1914 (Poble-Sec) y El Xampanyet en 1929 (Born). El Bar La Plata lleva desde 1945 y El Vaso de Oro lleva más de medio siglo. Son auténticas instituciones gastronómicas de la ciudad.",
  },
  {
    question: "¿Dónde se inventó la 'bomba' de Barcelona?",
    answer:
      "Se dice que la bomba (bola de patata rellena de carne picada, frita y servida con salsa brava y alioli) se creó en La Cova Fumada, ubicado en la plaza del mercado de la Barceloneta. Por las colas de gente que se forman para probarla, es fácil de creer.",
  },
  {
    question: "¿Hay bares de tapas con descuentos o tapas gratis en Barcelona?",
    answer:
      "Sí. Gata Mala, en el barrio de Gràcia, ofrece tapas gratis con cada consumición. Las tapas son generosas y de calidad, no «justitas». Es uno de los mejores bares para quien quiere comer barato sin renunciar a la calidad.",
  },
];

export default function BaresTapasPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Bares tapas baratos Barcelona",
      url: "https://gastroshows.es/bares-tapas-barcelona-baratos/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title: "Bares tapas Barcelona baratos",
          description:
            "Los 10 mejores bares de tapas baratos y auténticos de Barcelona.",
          publishedAt: "2022-06-10T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "bares-tapas-barcelona-baratos",
          image: "https://gastroshows.es/images/bares-tapas-baratos/hero-bares-tapas-barcelona-baratos.jpg",
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
            <li className="text-foreground/80">Bares tapas baratos Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">
            Bares tapas Barcelona baratos
          </h1>
          <figure className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/bares-tapas-baratos/hero-bares-tapas-barcelona-baratos.jpg"
              alt="Los 10 mejores bares de tapas baratos de Barcelona por menos de 20€" title="Los 10 mejores bares de tapas baratos de Barcelona por menos de 20€"
              className="w-full h-full object-cover"
              width={1200}
              height={500}
              loading="eager"
              fetchPriority="high"
            />
          </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Los 10 mejores bares de tapas baratos de Barcelona por menos de 20€</figcaption>
          </figure>
        </header>

        <section className="mb-12 space-y-4 text-foreground/90 leading-relaxed text-lg">
          <p>
            Las tapas, que <strong>nacieron como el mero acompañante de la bebida servida en vaso o recipiente que «tapaban»</strong>,
            ahora se han convertido en todo un arte. Existen tapas tradicionales y modernas, más sencillas o más
            elaboradas, tapas de premio o las tapas de toda la vida. ¿A quién no le entusiasman las tapas?
          </p>
          <p>
            Ahora bien, <strong>a veces no es fácil encontrar bares de tapas en Barcelona baratos</strong>, ya que, en
            los últimos años, toda esa fama ha comportado que algunos lugares hayan subido sus precios. No obstante,{" "}
            <strong>
              todavía existen bares de tapas de Barcelona baratos y auténticos en los que puedes degustar tapas de
              primerísima calidad a muy buen precio
            </strong>
            . Que se trata de bares con precios económicos no quiere decir que sean de poca calidad, todo lo contrario,{" "}
            <strong>lo que sorprende es la alta calidad de sus productos.</strong>
          </p>
          <p>
            Y si este blog te gusta, no dudes en consultar nuestra lista de los{" "}
            <Link
              href="/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/"
              className="text-gold hover:underline"
            >
              6 restaurantes con estrella Michelín de Barcelona por menos de 50€
            </Link>
            .
          </p>
        </section>

        {bares.map((b, idx) => (
          <section key={b.id} id={b.id} className="mb-16 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition"
              >
                {b.name}
              </a>{" "}
              <span className="text-muted-foreground text-2xl">
                – {b.subtitle}
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
              <div
                className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${
                  idx % 2 === 1 ? "order-2 md:order-1" : ""
                }`}
              >
                <img
                  src={b.image}
                  alt={`${b.name} Barcelona — ${b.subtitle}, tapas baratas por menos de 20€`}
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                  loading="lazy"
                />
              </div>
              <div
                className={`space-y-4 text-foreground/90 leading-relaxed ${
                  idx % 2 === 1 ? "order-1 md:order-2" : ""
                }`}
              >
                {b.paragraphs.map((p, i) => (
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
            ¿Algo más que tapas?
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Si te apasiona la gastronomía y buscas una experiencia diferente, descubre La Cena Clandestina de
            GastroShows: menú degustación en un espacio secreto de Barcelona.
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
              href="/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → ¡6 restaurantes de Barcelona con estrella Michelín por menos de 50€!
              </p>
              <p className="text-sm text-muted-foreground">
                Alta cocina con menú mediodía asequible.
              </p>
            </Link>
            <Link
              href="/mejores-restaurantes-menu-degustacion-barcelona/"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Los mejores restaurantes con menú degustación Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Los mejores menús degustación de Barcelona.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
