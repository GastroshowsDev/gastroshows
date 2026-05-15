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
  title: "Los mejores restaurantes con menú degustación de Barcelona",
  description:
    "En este post encontrarás los mejores restaurantes con menú degustación de Barcelona que no te puedes perder, ¡echa un vistazo!",
  keywords:
    "menú degustación barcelona, restaurantes barcelona, menú degustación, cena barcelona, restaurantes michelin barcelona, restaurantes con estrella michelin",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical:
      "https://gastroshows.es/mejores-restaurantes-menu-degustacion-barcelona/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/mejores-restaurantes-menu-degustacion-barcelona/",
    siteName: "GastroShows",
    title: "Los mejores restaurantes con menú degustación de Barcelona",
    description:
      "En este post encontrarás los mejores restaurantes con menú degustación de Barcelona que no te puedes perder",
    images: [
      {
        url: "https://gastroshows.es/wp-content/uploads/2021/03/restaurantes-menu-degustacion-Barcelona.jpeg",
        width: 1200,
        height: 630,
        alt: "Menú degustación Barcelona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Los mejores restaurantes con menú degustación de Barcelona",
    description:
      "Descubre los restaurantes más exclusivos con menú degustación en Barcelona.",
  },
};

const faqs = [
  {
    question: "¿Cuál es el mejor restaurante con menú degustación en Barcelona?",
    answer:
      "Depende de lo que busques. Para una experiencia gastronómica única e inolvidable con sorpresas, La Cena Clandestina de GastroShows es la mejor opción. Para alta cocina vegetariana, Xavier Pellicer. Para pescado fresco, Mineral. Para producto de calidad, Taberna Noroeste. Para mejor relación calidad-precio, CRUIX.",
  },
  {
    question: "¿Cuánto cuesta un menú degustación en Barcelona?",
    answer:
      "Los precios varían según el restaurante. CRUIX ofrece menú degustación desde 50€. Xavier Pellicer ronda los 65€. Taberna Noroeste sale alrededor de 70€ (compartiendo 7-8 platos). Mineral está sobre los 75€. GastroShows (Cena Clandestina) cuesta 145€ con experiencia completa de 3 horas.",
  },
  {
    question: "¿Hay que reservar con antelación los menús degustación?",
    answer:
      "Sí, todos los restaurantes recomendados requieren reserva previa. Algunos como Taberna Noroeste tienen lista de espera de semanas. La Cena Clandestina de GastroShows tiene plazas limitadas a 12 personas por noche.",
  },
  {
    question: "¿Hay opciones vegetarianas o veganas en estos restaurantes?",
    answer:
      "Sí. Xavier Pellicer es especialista en verduras ecológicas de proximidad con menús vegetarianos completos. CRUIX adapta su menú a preferencias dietéticas. GastroShows ofrece menú vegetariano bajo petición previa.",
  },
  {
    question: "¿Qué incluye un menú degustación?",
    answer:
      "Un menú degustación incluye varios platos pequeños diseñados por el chef para mostrar lo mejor de su cocina. Habitualmente entre 5 y 9 actos, incluyendo aperitivos, platos principales y postre. El maridaje (bebidas) suele ofrecerse aparte como opción.",
  },
  {
    question: "¿Cuál es el menú degustación más original de Barcelona?",
    answer:
      "La Cena Clandestina de GastroShows es la propuesta más original de Barcelona. Combina un menú degustación de 4 actos con una experiencia inmersiva: ubicación secreta, pistas y enigmas, y un ambiente único que convierte la cena en mucho más que una comida.",
  },
];

export default function MejoresRestaurantesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Blog", url: "https://gastroshows.es/blog" },
    {
      name: "Mejores restaurantes con menú degustación Barcelona",
      url: "https://gastroshows.es/mejores-restaurantes-menu-degustacion-barcelona/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title:
            "Los mejores restaurantes con menú degustación de Barcelona",
          description:
            "En este post encontrarás los mejores restaurantes con menú degustación de Barcelona que no te puedes perder.",
          publishedAt: "2021-03-15T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "mejores-restaurantes-menu-degustacion-barcelona",
          image:
            "https://gastroshows.es/wp-content/uploads/2021/03/restaurantes-menu-degustacion-Barcelona.jpeg",
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={eventSchema({
          name: "La Cena Clandestina - Menú degustación experiencial",
          description:
            "Menú degustación de 4 actos en una ubicación secreta de Barcelona. Experiencia gastronómica inmersiva con pistas y enigmas.",
          price: 145,
        })}
      />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        {/* BREADCRUMB */}
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
            <li>
              <Link href="/blog" className="hover:text-gold">
                Blog
              </Link>
            </li>
            <li>›</li>
            <li className="text-foreground/80">
              Mejores restaurantes menú degustación Barcelona
            </li>
          </ol>
        </nav>

        {/* HEADER */}
        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">
            Los mejores restaurantes con menú degustación Barcelona
          </h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img
              src="/images/mejores-restaurantes-menu-degustacion-barcelona/hero-menu-degustacion-barcelona.jpeg"
              alt="Los mejores restaurantes con menú degustación de Barcelona — guía 2026"
              className="w-full h-full object-cover"
              width={1200}
              height={500}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Descubre los <strong>5 mejores restaurantes con menú degustación de Barcelona</strong>: desde la experiencia
            clandestina más original hasta la alta cocina vegetariana o el pescado más fresco. Guía actualizada con precios,
            ubicaciones y reservas.
          </p>
        </header>

        {/* TABLE OF CONTENTS */}
        <aside className="bg-muted/30 border border-border rounded-lg p-6 mb-12">
          <h2 className="font-cormorant text-2xl font-light mb-4">
            En esta guía encontrarás
          </h2>
          <ol className="space-y-2 text-sm md:text-base list-decimal list-inside marker:text-gold marker:font-semibold">
            <li>
              <a href="#gastroshows" className="hover:text-gold transition">
                GastroShows: menú degustación en La Cena Clandestina
              </a>
            </li>
            <li>
              <a href="#xavier-pellicer" className="hover:text-gold transition">
                Xavier Pellicer: menú degustación eco
              </a>
            </li>
            <li>
              <a href="#taberna-noroeste" className="hover:text-gold transition">
                Taberna Noroeste: menú degustación a la carta
              </a>
            </li>
            <li>
              <a href="#cruix" className="hover:text-gold transition">
                CRUIX: relación calidad-precio inmejorable
              </a>
            </li>
            <li>
              <a href="#mineral" className="hover:text-gold transition">
                Mineral: menú degustación con pescado fresco
              </a>
            </li>
            <li>
              <a href="#comparativa" className="hover:text-gold transition">
                Tabla comparativa de precios y experiencias
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-gold transition">
                Preguntas frecuentes
              </a>
            </li>
          </ol>
        </aside>

        {/* SECTION 1: GASTROSHOWS */}
        <section id="gastroshows" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            1. GastroShows: menú degustación en La Cena Clandestina
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/mejores-restaurantes-menu-degustacion-barcelona/gastroshows-cena-clandestina.jpg"
                alt="GastroShows La Cena Clandestina Barcelona — menú degustación 4 actos en ubicación secreta"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">
                  La Cena Clandestina · Experiencia gastronómica inmersiva
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Como sabéis, en <strong>GastroShows somos creadores y desarrolladores de nuevas experiencias gastronómicas</strong>.
                Nos encanta la cocina, pero no la concebimos sin sorpresas. Creemos que la comida, si está buena, y
                <strong> la vives en un ambiente único y diferente, se convierte en una experiencia inolvidable</strong>.
              </p>
              <p>
                La Cena Clandestina es una experiencia gastronómica que tiene lugar en nuestro espacio secreto. Se
                descubre a través de pistas y enigmas que te llegan al mail la semana antes. En la cena se sirve un
                <strong> menú degustación de 4 actos especialmente diseñado</strong> para acompañar cada una de las
                sorpresas de la noche.
              </p>
              <p>
                Si lo que te apetece es un menú degustación y vivir una noche diferente y original, este es tu plan.
                Una propuesta única que combina alta cocina, misterio y un ambiente exclusivo para grupos reducidos.
              </p>
              <p>
                <Link
                  href="/cena-clandestina"
                  className="text-gold hover:underline font-semibold"
                >
                  → Descubre La Cena Clandestina ahora
                </Link>
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gold text-lg">★★★★★</span>
                <span className="font-semibold">4.9</span>
                <span className="text-muted-foreground">· 247 reseñas verificadas</span>
              </div>
              <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                <p className="font-semibold text-foreground">
                  💰 <span className="text-gold">145€</span> · 👥 Máx. 12 personas · ⏱️ 3h · 📍 Barcelona (ubicación secreta)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: XAVIER PELLICER */}
        <section id="xavier-pellicer" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            2. Restaurante Xavier Pellicer: menú degustación eco
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
              <img
                src="/images/mejores-restaurantes-menu-degustacion-barcelona/xavier-pellicer-barcelona-menu-degustacion-eco.jpg"
                alt="Restaurante Xavier Pellicer Barcelona — chef con verduras ecológicas de proximidad, menú degustación 65€"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">
                  Xavier Pellicer · Verduras ecológicas de proximidad
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground/90 leading-relaxed order-1 md:order-2">
              <p>
                El restaurante de Xavier Pellicer tiene una propuesta sensacional. Un <strong>menú degustación de primerísima
                calidad</strong>. Este gran cocinero, con un background estrellado, es un especialista en
                <strong> verduras ecológicas de proximidad</strong>. Reconocido como <em>World's Best Vegetable Restaurant</em>
                por <em>We're Smart Green Guide</em>.
              </p>
              <p>
                Seguro que descubriréis nuevos sabores y alimentos, y técnicas sorprendentes y originales.
                <strong> Imprescindible el pescado de lonja salvaje y el coulant de té matcha</strong> (¡otro level!).
                Situado en el Gòtic, Barcelona. Reserva con tiempo porque se llena rápidamente.
              </p>
              <p>
                Perfecta alternativa si buscas opciones vegetarianas de lujo. Si te apasiona la alta cocina, también
                puedes consultar nuestra guía de{" "}
                <Link
                  href="/restaurantes-michelin"
                  className="text-gold hover:underline"
                >
                  restaurantes con estrella Michelin en Barcelona
                </Link>{" "}
                o sorprender a alguien con un{" "}
                <Link href="/regalo" className="text-gold hover:underline">
                  menú degustación para regalar
                </Link>
                .
              </p>
              <div className="flex items-center gap-2 text-sm order-1 md:order-2">
                <span className="text-gold text-lg">★★★★★</span>
                <span className="font-semibold">4.6</span>
                <span className="text-muted-foreground">· 1.842 reseñas en Google</span>
              </div>
              <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                <p className="font-semibold text-foreground">
                  💰 <span className="text-gold">~65€</span> · 🌱 Eco · 📍 Gòtic, Barcelona · ⭐ Vegetariano
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TABERNA NOROESTE */}
        <section id="taberna-noroeste" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            3. Taberna Noroeste: menú degustación a la carta
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/mejores-restaurantes-menu-degustacion-barcelona/taberna-noroeste-barcelona-producto-gallego.jpg"
                alt="Taberna Noroeste Barcelona — productos gallegos y castellanos, menú degustación 7-8 platos por 70€"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">
                  Taberna Noroeste · Galicia y Castilla en Barcelona
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                En la Taberna Noroeste es imposible no acabar llorando de placer.
                <strong> Productos exquisitos y ejecución inmejorable</strong>. Los chefs, de Galicia y de Castilla y León,
                saben muy bien lo que hacen. ¡Ojo! hay lista de espera de semanas.
              </p>
              <p>
                No obstante, aunque no tienen un menú degustación cerrado, la carta es pequeña y el servicio (muy amable,
                por cierto) recomienda compartir una media de <strong>7-8 platos</strong>. Quedas bien y la comida te
                sale a 70€ por persona. Magnífico.
              </p>
              <p>
                Si lo tuyo es probar experiencias diferentes pero más tranquilas, esta es tu opción. También puedes leer
                nuestra guía sobre{" "}
                <Link
                  href="/blog/la-clandestina-barcelona"
                  className="text-gold hover:underline"
                >
                  las cenas clandestinas de Barcelona
                </Link>{" "}
                si buscas algo más atrevido.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gold text-lg">★★★★★</span>
                <span className="font-semibold">4.7</span>
                <span className="text-muted-foreground">· 568 reseñas en Google</span>
              </div>
              <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                <p className="font-semibold text-foreground">
                  💰 <span className="text-gold">~70€</span> (7-8 platos) · 📍 Eixample, Barcelona · 📋 Reserva obligatoria
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CRUIX */}
        <section id="cruix" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            4. CRUIX: relación calidad-precio inmejorable
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
              <img
                src="/images/mejores-restaurantes-menu-degustacion-barcelona/cruix-barcelona-bib-gourmand-michelin.jpg"
                alt="CRUIX Barcelona Chef Miquel Pardo — menú degustación 50€ Bib Gourmand Michelin Eixample"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">
                  CRUIX · Chef Miquel Pardo, Bib Gourmand Michelin
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground/90 leading-relaxed order-1 md:order-2">
              <p>
                Una apuesta segura. Eso es CRUIX. ¿Qué vas a encontrar allí?{" "}
                <strong>Tapas de autor, arroces exquisitos, socarrat del bueno</strong>. Sobre todo, mucha originalidad
                en las recetas. Uno de los puntos fuertes de este restaurante es cómo los cocineros se adaptan a las
                preferencias dietéticas sin que ello merme la calidad. Cuenta con la distinción{" "}
                <strong>Bib Gourmand de la Guía Michelin</strong>.
              </p>
              <p>
                Tienen un menú degustación de <strong>50€</strong>, completo y variado (bebidas aparte). En definitiva,
                una experiencia gastronómica desenfadada pero de gran calidad, a un precio muy asequible. Comparado con{" "}
                <Link
                  href="/blog/restaurantes-michelin-baratos-barcelona"
                  className="text-gold hover:underline"
                >
                  restaurantes Michelin más caros
                </Link>
                , es la mejor relación calidad-precio.
              </p>
              <div className="flex items-center gap-2 text-sm order-1 md:order-2">
                <span className="text-gold text-lg">★★★★★</span>
                <span className="font-semibold">4.7</span>
                <span className="text-muted-foreground">· 712 reseñas en Google</span>
              </div>
              <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                <p className="font-semibold text-foreground">
                  💰 <span className="text-gold">50€</span> · 📍 Eixample, Barcelona · 🎯 MEJOR PRECIO · ⭐ Bib Gourmand
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: MINERAL */}
        <section id="mineral" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            5. Mineral: menú degustación con pescado fresco
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/mejores-restaurantes-menu-degustacion-barcelona/mineral-barcelona-pescado-fresco-menu-degustacion.webp"
                alt="Restaurante Mineral Barcelona — pescado fresco de lonja diaria, menú degustación 75€ en Barceloneta"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">
                  Mineral · Pescado fresco de lonja diaria
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Mineral es el templo del pescado fresco en Barcelona. Con un menú degustación que cambia según la lonja
                del día, <strong>garantiza la máxima frescura y calidad</strong>. Los chefs trabajan directamente con
                proveedores de confianza en el puerto de Barcelona.
              </p>
              <p>
                El ambiente es sofisticado pero cercano, perfecto para disfrutar de texturas y sabores marinos en su
                máxima expresión. <strong>Imprescindible si eres amante del mar</strong>. Ubicado en el corazón gastronómico
                de la ciudad.
              </p>
              <p>
                Combina perfectamente con experiencias como la{" "}
                <Link
                  href="/cena-clandestina"
                  className="text-gold hover:underline"
                >
                  Cena Clandestina
                </Link>{" "}
                si prefieres algo menos misterioso pero igualmente memorable. También puedes explorar nuestra selección
                de{" "}
                <Link
                  href="/blog/cena-a-ciegas-barcelona"
                  className="text-gold hover:underline"
                >
                  cenas a ciegas en Barcelona
                </Link>
                .
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gold text-lg">★★★★★</span>
                <span className="font-semibold">4.8</span>
                <span className="text-muted-foreground">· 386 reseñas en Google</span>
              </div>
              <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                <p className="font-semibold text-foreground">
                  💰 <span className="text-gold">75€</span> · 🐟 Pescado fresco · 📍 Barceloneta, Barcelona · 👨‍🍳 Menú del día
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section id="comparativa" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Tabla comparativa: precios y experiencias
          </h2>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-gold/10">
                <tr>
                  <th className="text-left p-3 font-semibold">Restaurante</th>
                  <th className="text-left p-3 font-semibold">Precio</th>
                  <th className="text-left p-3 font-semibold">Valoración</th>
                  <th className="text-left p-3 font-semibold">Estilo</th>
                  <th className="text-left p-3 font-semibold">Ubicación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="bg-gold/5">
                  <td className="p-3 font-semibold">
                    <Link
                      href="/cena-clandestina"
                      className="text-gold hover:underline"
                    >
                      GastroShows
                    </Link>
                  </td>
                  <td className="p-3">145€</td>
                  <td className="p-3 whitespace-nowrap"><span className="text-gold">★</span> 4.9 (247)</td>
                  <td className="p-3">Experiencia + 4 actos</td>
                  <td className="p-3">Ubicación secreta</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Xavier Pellicer</td>
                  <td className="p-3">~65€</td>
                  <td className="p-3 whitespace-nowrap"><span className="text-gold">★</span> 4.6 (1.842)</td>
                  <td className="p-3">Vegetariano eco</td>
                  <td className="p-3">Gòtic</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Taberna Noroeste</td>
                  <td className="p-3">~70€</td>
                  <td className="p-3 whitespace-nowrap"><span className="text-gold">★</span> 4.7 (568)</td>
                  <td className="p-3">Producto gallego/castellano</td>
                  <td className="p-3">Eixample</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">CRUIX</td>
                  <td className="p-3">50€</td>
                  <td className="p-3 whitespace-nowrap"><span className="text-gold">★</span> 4.7 (712)</td>
                  <td className="p-3">Tapas de autor + arroces</td>
                  <td className="p-3">Eixample</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Mineral</td>
                  <td className="p-3">75€</td>
                  <td className="p-3 whitespace-nowrap"><span className="text-gold">★</span> 4.8 (386)</td>
                  <td className="p-3">Pescado fresco</td>
                  <td className="p-3">Barceloneta</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">
            ¿Buscas una experiencia gastronómica única?
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            La Cena Clandestina de Barcelona es mucho más que un menú degustación: es una experiencia que comienza con
            pistas y enigmas y culmina en un espacio secreto donde la gastronomía se convierte en arte y misterio.
          </p>
          <Link
            href="/cena-clandestina"
            className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg"
          >
            Descubre La Cena Clandestina
          </Link>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-8">
            Preguntas frecuentes sobre menús degustación en Barcelona
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

        {/* INTERLINKING SECTION */}
        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">
            Más opciones gastronómicas en Barcelona
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/restaurantes-michelin"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Restaurantes con estrella Michelin en Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Opciones de alta cocina con reconocimiento internacional
              </p>
            </Link>

            <Link
              href="/regalo"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Los mejores menús degustación para regalar
              </p>
              <p className="text-sm text-muted-foreground">
                Experiencias gastronómicas como regalos sorprendentes
              </p>
            </Link>

            <Link
              href="/blog/menu-degustacion-barcelona"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Menú degustación en Barcelona: guía completa
              </p>
              <p className="text-sm text-muted-foreground">
                Todo lo que necesitas saber sobre los menús degustación
              </p>
            </Link>

            <Link
              href="/blog/cena-a-ciegas-barcelona"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Cena a ciegas Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Experiencias gastronómicas sensoriales únicas
              </p>
            </Link>

            <Link
              href="/blog/restaurantes-michelin-baratos-barcelona"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Restaurantes Michelin baratos en Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Alta cocina asequible con reconocimiento Michelin
              </p>
            </Link>

            <Link
              href="/blog/la-clandestina-barcelona"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Las mejores cenas clandestinas de Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Explora todas las experiencias secretas de la ciudad
              </p>
            </Link>
          </div>
        </section>

        {/* SUMMARY SECTION */}
        <section className="border-t border-border pt-8 mt-12">
          <h2 className="font-cormorant text-2xl font-light mb-6">
            Conclusión: elige tu menú degustación perfecto
          </h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Barcelona ofrece una variedad excepcional de restaurantes donde disfrutar de menús degustación de alta
              calidad. Desde la <strong>experiencia clandestina y mística de GastroShows</strong> hasta la sostenibilidad
              de Xavier Pellicer, pasando por la innovación culinaria de CRUIX o la frescura marina de Mineral y Taberna
              Noroeste, cada opción promete sorpresas y sabores únicos.
            </p>
            <p>
              Ya sea que busques una experiencia lúdica y diferente, un menú tradicional de calidad, pescado fresco del
              puerto o arroces de autor, en esta guía encontrarás las opciones más recomendadas para que tu próxima cena
              sea <strong>inolvidable</strong>. Los mejores menús degustación de Barcelona están aquí, esperando a que
              los descubras.
            </p>
            <p className="pt-4">
              ¿Tu plan es un{" "}
              <Link href="/grupos" className="text-gold hover:underline">
                evento para empresa o grupo
              </Link>
              ? También adaptamos nuestra experiencia clandestina a grupos privados. Para cualquier duda, puedes{" "}
              <Link href="/contacto" className="text-gold hover:underline">
                contactarnos directamente
              </Link>
              .
            </p>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
