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
  title: "Los mejores menús degustación para regalar | GastroShows",
  description:
    "Los mejores menús degustación de Barcelona para regalar y disfrutar dentro o fuera de casa: la cena clandestina de Gastroshows, Osmosis, Asagumo, El GoXO y La Mundana.",
  keywords:
    "menús degustación para regalar, regalo gastronómico barcelona, menú degustación delivery barcelona, gastronomía a domicilio barcelona",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical:
      "https://gastroshows.es/los-mejores-menus-degustacion-para-regalar/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/los-mejores-menus-degustacion-para-regalar/",
    siteName: "GastroShows",
    title: "Los mejores menús degustación para regalar",
    description:
      "Los mejores menús degustación de Barcelona para regalar y disfrutar dentro o fuera de casa.",
  },
};

const faqs = [
  {
    question: "¿Qué menús degustación se pueden regalar en Barcelona?",
    answer:
      "Puedes regalar experiencias como La Cena Clandestina de GastroShows, o menús degustación a domicilio de restaurantes como Osmosis, Asagumo (sushi), El GoXO (fusión de Dabiz Muñoz) o La Mundana (cocina de mercado).",
  },
  {
    question: "¿Cómo funciona regalar un menú degustación a domicilio?",
    answer:
      "Compras el menú degustación en formato delivery, llega a tu casa preparado para una pequeña terminación según las indicaciones del restaurante, y se sirve manteniendo la calidad original. Muchos restaurantes ofrecen también tarjeta regalo canjeable por un menú.",
  },
  {
    question: "¿Cuál es la experiencia de menú degustación más original para regalar?",
    answer:
      "La Cena Clandestina de GastroShows es la propuesta más original: un menú degustación de 12 elaboraciones en un espacio secreto al que se accede a través de pistas y enigmas. Incluye maridaje de 3 vinos, cava y gin-tonics premium.",
  },
  {
    question: "¿Qué tipo de cocina ofrecen los menús degustación para regalar?",
    answer:
      "Encontrarás opciones muy variadas: tradicional e innovadora (Osmosis), japonesa de autor (Asagumo), fusión rockera de Dabiz Muñoz (El GoXO), cocina de mercado mundana (La Mundana) o la experiencia inmersiva clandestina de GastroShows.",
  },
  {
    question: "¿Es buena idea regalar gastronomía?",
    answer:
      "Sí. La gastronomía es uno de los regalos más valorados porque crea recuerdos compartidos. Cuando compartes gastronomía todo es infinitamente mejor: une a personas, sorprende y se disfruta en compañía. Es un regalo experiencial, no material.",
  },
];

export default function MenusRegalarPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Menús degustación para regalar",
      url: "https://gastroshows.es/los-mejores-menus-degustacion-para-regalar/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title: "Los mejores menús degustación para regalar",
          description:
            "Los mejores menús degustación de Barcelona para regalar y disfrutar dentro o fuera de casa.",
          publishedAt: "2021-09-15T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "los-mejores-menus-degustacion-para-regalar",
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
              Menús degustación para regalar
            </li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">
            LOS MEJORES MENÚS DEGUSTACIÓN PARA REGALAR
          </h1>
        </header>

        {/* INTRO */}
        <section className="mb-12 space-y-4 text-foreground/90 leading-relaxed text-lg">
          <p>
            En Barcelona, los restaurantes siguen proponiendo y mejorando cada día menús degustación para disfrutar
            dentro o fuera de casa. Han conseguido que puedas probar platos en tu salón que mantienen una calidad brutal
            y que se preparan siguiendo unos pequeños pasos. Es increíble esta evolución tan rápida en el delivery que
            hace que podamos hablar de <strong>los mejores menús degustación para regalar</strong>. Porque, ¿qué pasa
            cuando compartes gastronomía? que todo es infinitamente mejor.
          </p>
          <p>
            Incluso en GastroShows vamos más allá y os proponemos una auténtica experiencia con menú degustación en un
            espacio secreto,{" "}
            <Link href="/cena-clandestina" className="text-gold hover:underline">
              La Cena Clandestina
            </Link>
            . Tampoco te puedes perder nuestra propuesta de{" "}
            <Link
              href="/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/"
              className="text-gold hover:underline"
            >
              restaurantes de estrella Michelín de Barcelona por menos de 50€
            </Link>{" "}
            o los mejores arroces de Barcelona.
          </p>
        </section>

        {/* SECTION 1: CENA CLANDESTINA */}
        <section id="cena-clandestina" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 uppercase">
            La Cena Clandestina: regala una auténtica experiencia
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/experiencia/mesa-cena-clandestina.jpg"
                alt="La Cena Clandestina de GastroShows - Regala una experiencia gastronómica"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">La Cena Clandestina · Espacio secreto</p>
              </div>
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                GastroShows, <strong>creadores y desarrolladores de nuevas experiencias gastronómicas y con sorpresas</strong>.
                La comida, si está buena, y además la degustas en el mejor ambiente y en la mejor compañía se convierte
                en un recuerdo imborrable.
              </p>
              <p>
                La Cena Clandestina es una experiencia gastronómica que tiene lugar en nuestro espacio secreto. Se
                descubre a través de pistas y enigmas que te llegan al mail la semana antes. En la cena se sirve un
                <strong> menú degustación de 12 elaboraciones con un maridaje de 3 variedades de vino y cava</strong>.
                Se acaba la cena con unos gin-tonics premium. Durante la cena hay sorpresas también, que no nos podemos contar.
              </p>
              <p>
                Si lo que te apetece es un menú degustación y vivir una noche diferente y original, este es tu plan.
                ¡Te esperamos!
              </p>
              <Link
                href="/regalo"
                className="inline-block bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition"
              >
                Regalar
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: OSMOSIS */}
        <section id="osmosis" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Osmosis: menú degustación con tradición e innovación
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop"
                alt="Osmosis Barcelona - Menú degustación delivery con tradición e innovación"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">Osmosis · Cocina tradicional e innovadora</p>
              </div>
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed order-1 md:order-2">
              <p>
                <strong>Unos 20 platos componen la oferta que Osmosis te propone para degustar en casa</strong>. Solo
                tienes que escoger los que más te apetezcan, aunque puede ser que se te haga difícil quedarte con solo
                unos cuantos.
              </p>
              <p>
                Entre los aperitivos tenemos <strong>buñuelos de bacalao, croquetas, verduras</strong>… y en los
                principales podemos encontrar <strong>suquet de rape, jarrete, espalda de cordero</strong> y todo
                realizado con las mejores técnicas. Buenísimo.
              </p>
              <p>
                Si te apetece comida gourmet a domicilio que no pierde ni un ápice de su sabor, aquí tienes una opción
                triunfante. Y si te apetece, puedes ir a visitarlos a su restaurante en Barcelona, no te arrepentirás.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: ASAGUMO */}
        <section id="asagumo" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 uppercase">
            Asagumo: menú degustación para regalar calidad-precio inmejorable
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop"
                alt="Asagumo Barcelona - Menú degustación de sushi del chef Ben"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">Asagumo · Sushi del chef Ben</p>
              </div>
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                <strong>El sushi de Asagumo es de esos que te los comes y te trasladas a otros lugares</strong>.
                Perfectamente elaborado y presentado en su formato a domicilio, te das cuenta que es una buenísima opción
                por la calidad de sus productos.
              </p>
              <p>
                Puedes probar desde unas <strong>gyozas de pollo de llorar</strong> hasta un <strong>tartar de atún que
                viene con una salsa exquisita</strong>. Y, a partir de aquí, pasar a una mezcla de sashimi: salmón, atún
                y vieira.
              </p>
              <p>
                Si os gusta el sushi, no os podéis perder el que nos proponen en su menú. Y una parada en su restaurante
                para conocer al <strong>chef Ben</strong> es un planazo asegurado.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: EL GOXO */}
        <section id="el-goxo" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 uppercase">
            El GoXO: regala un menú degustación fusión
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop"
                alt="El GoXO Barcelona - Menú degustación de Dabiz Muñoz"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">El GoXO · Fusión rockera de Dabiz Muñoz</p>
              </div>
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed order-1 md:order-2">
              <p>
                Todos sabemos que <strong>el ideólogo de El GoXO es el chef Dabiz Muñoz</strong>. En este caso, aparca
                sus extremadas y precisas técnicas de alta cocina y ofrece comida casera que va más allá. Son
                elaboraciones en las que se usa el ingenio y los productos frescos de proximidad, pero que tienen un
                toque muy rockero o punki.
              </p>
              <p>
                Aunque se trate de comida más sencilla a la que este cocinero nos tiene acostumbrados, todos los platos
                mantienen su esencia XO. <strong>El costillar para prepararte tus propios tacos es un must</strong>.
                Aunque encontrarás un sinfín de platos que te gustarán. No apto para aquellos que no quieran probar
                cosas nuevas o fuera de la tradición.
              </p>
              <p>
                Y ahora puedes ir a visitarlos a su local en <strong>calle Déu i Mata</strong>, muy cerca de l&apos;Illa
                Diagonal.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: LA MUNDANA */}
        <section id="la-mundana" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 uppercase">
            La Mundana: menú degustación de mercado
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
                alt="La Mundana Barcelona - Menú degustación de mercado"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">La Mundana · Cocina de mercado en Sants</p>
              </div>
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Si es que ellos mismos lo dicen: <strong>son mundanos</strong>. Y no les falta razón, porque cuando
                entras a La Mundana entras a un mundo nuevo. En el que puedes dejarte llevar sin preocupaciones porque
                acabarás bien seguro.
              </p>
              <p>
                Te acercan hasta casa un menú con <strong>platos de calidad con toques de diferentes cocinas</strong>.
                De fácil preparación e impecable presentación. Sabor inmejorable. Mundana es sinónimo de triunfada.
              </p>
              <p>
                Y si puedes, tienes que pasar por su pequeña, pero entrañable <strong>vermutería de calle Vallespir
                (Sants)</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">
            Regala una experiencia gastronómica inolvidable
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            La Cena Clandestina de GastroShows: 12 elaboraciones, maridaje de 3 vinos y cava, gin-tonics premium y
            sorpresas en un espacio secreto. El regalo del que todos hablarán.
          </p>
          <Link
            href="/regalo"
            className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg"
          >
            Regalar La Cena Clandestina
          </Link>
        </section>

        {/* FAQ */}
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

        {/* RELATED POSTS */}
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
                Estos restaurantes de Barcelona con estrella Michelín cuentan con un menú de mediodía a un precio más
                asequible, ¡no te pierdas esta cita tan especial!
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
                En este post encontrarás los mejores restaurantes con menú degustación de Barcelona que no te puedes
                perder.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
