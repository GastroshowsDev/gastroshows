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
  title: "Tarjeta Regalo Cena Barcelona | Cena Clandestina GastroShows",
  description:
    "Tarjeta regalo cena en Barcelona: regala una cena clandestina con menú degustación de 10-12 actos, maridaje de vinos, gin premium y showcooking en vivo. 85€.",
  keywords:
    "tarjeta regalo cena barcelona, regalo cena, bono regalo cena barcelona, pack regalo cena barcelona, regalo experiencia gastronómica",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/tarjeta-regalo-cena-barcelona/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/tarjeta-regalo-cena-barcelona/",
    siteName: "GastroShows",
    title: "Tarjeta Regalo Cena Barcelona",
    description:
      "Regala una auténtica experiencia gastronómica: la cena clandestina de GastroShows.",
  },
};

export default function TarjetaRegaloCenaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Tarjeta Regalo Cena Barcelona",
      url: "https://gastroshows.es/tarjeta-regalo-cena-barcelona/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd
        data={articleSchema({
          title: "Tarjeta Regalo Cena Barcelona",
          description:
            "Tarjeta regalo cena en Barcelona: una auténtica experiencia gastronómica.",
          publishedAt: "2022-04-20T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "tarjeta-regalo-cena-barcelona",
          image: "https://gastroshows.es/images/tarjeta-regalo-cena-barcelona/hero-tarjeta-regalo-cena-clandestina-barcelona.jpg",
        })}
      />
      <JsonLd
        data={productSchema({
          name: "Tarjeta Regalo Cena Barcelona - GastroShows",
          description:
            "Tarjeta regalo para vivir la Cena Clandestina de GastroShows: menú degustación de 10-12 actos en ubicación secreta.",
          price: 85,
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
            <li className="text-foreground/80">Tarjeta Regalo Cena Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Tarjeta Regalo Cena Barcelona
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Regala una <strong>auténtica experiencia gastronómica</strong> en Barcelona: la cena clandestina de
            GastroShows. Una velada secreta que combina alta cocina y sorpresas.
          </p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Qué es
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/tarjeta-regalo-cena-barcelona/hero-tarjeta-regalo-cena-clandestina-barcelona.jpg"
                alt="Tarjeta regalo cena Barcelona — Cena Clandestina GastroShows con menú degustación de 10-12 actos" title="Tarjeta regalo cena Barcelona — Cena Clandestina GastroShows con menú degustación de 10-12 actos"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="eager"
                fetchPriority="high"
              />
            </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Tarjeta regalo cena Barcelona — Cena Clandestina GastroShows con menú degustación de 10-12 actos</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                La tarjeta regalo cena Barcelona de GastroShows es el acceso a una <strong>cena secreta combinada con
                gastronomía y sorpresas</strong>. No es una cena cualquiera: es una experiencia diseñada para crear un
                recuerdo imborrable.
              </p>
              <p>
                Quien recibe la tarjeta vivirá <strong>3,5 horas de experiencia</strong> con showcooking en vivo, menú
                de 10-12 actos y maridaje cuidado. Válida para jueves, viernes y sábados.
              </p>
            </div>
          </div>
        </section>

        <section id="que-incluye" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            qué incluye
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Cóctel de bienvenida",
              "Menú degustación de 10-12 actos",
              "Maridaje de vinos seleccionados",
              "Cata de gin premium",
              "Showcooking del chef en vivo",
              "Ambiente y sorpresas durante la cena",
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
            dónde irás
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            La <strong>ubicación es secreta</strong>. Quien recibe la tarjeta recibirá pistas <strong>5 días antes</strong>
            de la fecha elegida que le ayudarán a descubrir el lugar de Barcelona donde se celebra la cena. La cena
            arranca a las <strong>20:00h</strong> con una recepción de bienvenida donde se revela el menú de la noche.
          </p>
        </section>

        <section id="fechas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Fechas
          </h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Disponibilidad:</strong> jueves, viernes y sábados
              <br />
              <strong>Hora de inicio:</strong> 20:00h
              <br />
              <strong>Duración:</strong> 3,5 horas
              <br />
              <strong>Restricciones alimentarias:</strong> se pueden adaptar con 24h de antelación
            </p>
          </div>
        </section>

        <section id="mas-info" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Más información
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Para dudas sobre logística, personalización del regalo o restricciones alimentarias, contacta con{" "}
            <a
              href="mailto:esther@gastroshows.es"
              className="text-gold hover:underline"
            >
              esther@gastroshows.es
            </a>
            .
          </p>
        </section>

        <section id="todo-sobre" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            todo sobre tarjeta regalo cena barcelona
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            La tarjeta regalo cena Barcelona es perfecta para celebrar <strong>cumpleaños, aniversarios, San Valentín,
            Navidad</strong> o simplemente sorprender a alguien especial. Un regalo experiencial que no se olvida.
          </p>
        </section>

        <section id="para-dos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Tarjeta regalo cena Barcelona para dos personas
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            ¿Quieres regalar una velada en pareja? Tenemos también la opción{" "}
            <Link
              href="/tarjeta-regalo-cena-para-dos"
              className="text-gold hover:underline"
            >
              Tarjeta Regalo Cena para Dos
            </Link>
            , perfecta para parejas o para acompañar a alguien especial en una experiencia compartida.
          </p>
        </section>

        <section id="bono-regalo" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Algo especial, el bono regalo cena Barcelona
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Para grupos de empresa o regalos colectivos, ofrecemos <strong>bonos regalo personalizables</strong>. Ideal
            para premios a empleados, agradecimientos a clientes o regalos para socios.
          </p>
        </section>

        <section id="pack-regalo" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Regala una experiencia gastronómica con el pack regalo cena Barcelona
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Combinamos la tarjeta regalo con <strong>elementos físicos</strong> (caja personalizada, dedicatoria,
            fecha de envío programada) para que el regalo tenga ese punto extra de detalle.
          </p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">
            Regala una experiencia gastronómica
          </h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            La tarjeta regalo cena Barcelona es <strong>el regalo del que todos hablarán</strong>. Un menú degustación
            de 10-12 actos, maridaje y showcooking en ubicación secreta.
          </p>
          <Link
            href="/regalo"
            className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg"
          >
            Comprar Tarjeta Regalo
          </Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">
            Posts relacionados
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/tarjeta-regalo-cena-para-dos"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Tarjeta Regalo Cena para Dos
              </p>
              <p className="text-sm text-muted-foreground">
                Una velada perfecta para parejas.
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
                Más opciones de regalo gastronómico.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
