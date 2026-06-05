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
  title: "Los Mejores Restaurantes de Cocina Tradicional Catalana en Barcelona",
  description:
    "Descubre los mejores restaurantes con cocina tradicional catalana en Barcelona. Desde Can Culleretes (1786) hasta Fonda Pepa. Sabores auténticos, recetas de abuela, escalivada, esqueixada, fideuà.",
  keywords:
    "restaurantes cocina tradicional catalana barcelona, mejores restaurantes catalana, cocina de abuela barcelona, escalivada, esqueixada, fideuà, can culleretes, fonda pepa, can paixano",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/mejores-restaurantes-cocina-tradicional-catalana-barcelona/" },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/mejores-restaurantes-cocina-tradicional-catalana-barcelona/",
    siteName: "GastroShows",
    title: "Los Mejores Restaurantes de Cocina Tradicional Catalana en Barcelona",
    description: "Gastronomía tradicional catalana: desde Can Culleretes (1786) hasta Semproniana. Autenticidad culinaria en Barcelona.",
  },
};

export default function MejoresRestaurantesCatalanasPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Restaurantes Cocina Tradicional Catalana", url: "https://gastroshows.es/mejores-restaurantes-cocina-tradicional-catalana-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({
        title: "Los Mejores Restaurantes de Cocina Tradicional Catalana en Barcelona",
        description: "Guía completa de los mejores restaurantes con cocina catalana auténtica en Barcelona.",
        publishedAt: "2022-03-10T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "mejores-restaurantes-cocina-tradicional-catalana-barcelona",
        image: "https://gastroshows.es/images/restaurantes-cocina-tradicional-catalana/can-culleretes-barcelona.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Restaurantes Cocina Tradicional Catalana</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Los Mejores Restaurantes de Cocina Tradicional Catalana en Barcelona
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            La gastronomía es tendencia, y la <strong>cocina tradicional catalana</strong> lo es cada vez más. Descubre los sabores auténticos de la abuela en estos templos del paladar.
          </p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Qué es la cocina catalana tradicional</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            La <strong>cocina tradicional catalana</strong> es el reflejo de siglos de historia, territorio y producto de calidad. No es simplemente comida: es la herencia gastronómica de una región que ama profundamente el buen comer.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Platos como la escalivada, esqueixada, fideuà o crema catalana son mucho más que recetas: son identidad culinaria. Cada bocado cuenta la historia de las montañas, las costas y las huertas catalanas.
          </p>
        </section>

        <section id="can-culleretes" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Can Culleretes — desde 1786</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <img src="/images/restaurantes-cocina-tradicional-catalana/can-culleretes-barcelona.webp"
                  alt="Can Culleretes Barcelona — el restaurante más antiguo de Barcelona, cocina catalana tradicional desde 1786"
                  title="Can Culleretes: restaurante histórico con cocina catalana auténtica"
                  className="w-full h-full object-cover" width={600} height={400} loading="eager" fetchPriority="high" />
              </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Can Culleretes (1786) — El restaurante más antiguo de Barcelona en continuo funcionamiento</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Situado en el corazón del Barrio Gótico, <strong>Can Culleretes</strong> es mucho más que un restaurante: es un monumento vivo de la cocina catalana. Abierto desde 1786, es el restaurante más antiguo de Barcelona que sigue funcionando sin interrupciones.
              </p>
              <p>
                Sus platos insignia —<strong>escalivada, esqueixada, fideuà</strong>— son interpretaciones auténticas de clásicos catalanes. El ambiente histórico, con mosaicos antiguos y decoración tradicional, transporta directamente a la Barcelona de otro siglo.
              </p>
              <p className="text-sm">
                <strong>Ubicación:</strong> Calle Quintana, 5 - Barrio Gótico
                <br /><strong>Especialidad:</strong> Escalivada, esqueixada, fideuà, trinxat
                <br /><strong>Bodega:</strong> Excelente selección de vinos catalanes
              </p>
            </div>
          </div>
        </section>

        <section id="fonda-pepa" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Fonda Pepa — tradición con técnica moderna</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <img src="/images/restaurantes-cocina-tradicional-catalana/fonda-pepa-gracia.webp"
                  alt="Fonda Pepa en Gràcia — jardín interior y cocina catalana contemporánea, cocineros Paco y Pedro"
                  title="Fonda Pepa: cocina tradicional catalana con técnica moderna"
                  className="w-full h-full object-cover" width={600} height={400} loading="lazy" />
              </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Fonda Pepa — Jardín interior en Gràcia</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                <strong>Fonda Pepa</strong>, dirigida por los cocineros <strong>Paco y Pedro</strong>, es la versión moderna de la cocina tradicional catalana. Ubicada en el barrio de Gràcia, combina recetas clásicas con técnicas contemporáneas de alta cocina, sin perder la autenticidad.
              </p>
              <p>
                Su <strong>jardín interior</strong> ofrece un espacio único para disfrutar de platos catalanes con una presentación premium. La carta de vinos a copas permite degustar variedades catalanas de primera categoría, perfectas para acompañar cada plato.
              </p>
              <p className="text-sm">
                <strong>Ubicación:</strong> Barrio de Gràcia
                <br /><strong>Cocineros:</strong> Paco y Pedro
                <br /><strong>Especialidad:</strong> Alta cocina catalana de proximidad, vinos a copas
              </p>
            </div>
          </div>
        </section>

        <section id="can-paixano" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Can Paixano — La Xampanyeria</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Can Paixano</strong>, conocido como "La Xampanyeria", es un clásico de Barceloneta. Este pequeño local de puertas estrechas es famoso por su <strong>cava de producción propia a precios asequibles</strong> y sus tapas tradicionales catalanas.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Su plato estrella es la <strong>"bomba"</strong> —un bocadillo relleno de carne y patatas con salsa picante—, acompañado de un buen cava frío. Es el lugar perfecto para entender la gastronomía de Barceloneta en toda su autenticidad. Popular antes o después de visitar la playa o el Mercado de La Boquería.
          </p>
          <p className="text-sm text-foreground/90 mb-4">
            <strong>Ubicación:</strong> Calle de la Reina Cristina, 7 - Barceloneta
            <br /><strong>Especialidad:</strong> Cava de producción propia, tapas, bocadillos, embutidos y quesos
          </p>
          <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
            <p className="text-sm text-foreground/90"><strong>Consejo:</strong> Llega pronto o prepárate para esperar. Es tan popular que siempre hay cola, especialmente los fines de semana. Un lugar perfecto para una parada rápida entre actividades.</p>
          </div>
        </section>

        <section id="semproniana" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Semproniana — creatividad y tradición</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            En el Eixample, <strong>Semproniana</strong> representa la evolución de la cocina catalana contemporánea. Utiliza <strong>ingredientes de temporada y productos frescos de proximidad</strong> para crear platos que respetan la tradición pero apuestan por la innovación culinaria.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Ofrecen <strong>opciones vegetarianas y veganas</strong> sin sacrificar el sabor auténtico. Múltiples formatos de menú (degustación, menú del día, carta) hacen que sea accesible para cualquier tipo de comensal. La selección de vinos españoles e internacionales complementa perfectamente los platos.
          </p>
          <p className="text-sm text-foreground/90">
            <strong>Ubicación:</strong> Calle del Rosselló, 148 - Eixample
            <br /><strong>Especialidad:</strong> Cocina creativa contemporánea, opciones vegetarianas y veganas, vinos españoles
            <br /><strong>Recomendación:</strong> Reservar con anticipación
          </p>
        </section>

        <section id="versalles" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Versalles — un clásico de un siglo</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Versalles</strong>, ubicado en Sant Andreu, es un <strong>clásico barcelonés con más de un siglo de funcionamiento</strong> sirviendo cocina catalana auténtica. Su decoración tradicional —suelos de mosaico, techos altos con molduras— es parte integral de su encanto histórico.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Especialidades de la casa: <strong>espinacas a la catalana, bacalao con sanfaina, canelones gratinados, butifarra</strong>. La bodega ofrece una excelente selección de vinos españoles y catalanes que complementan perfectamente los platos tradicionales.
          </p>
          <p className="text-sm text-foreground/90">
            <strong>Ubicación:</strong> Sant Andreu
            <br /><strong>Especialidad:</strong> Espinacas a la catalana, bacalao con sanfaina, canelones gratinados
            <br /><strong>Ambiente:</strong> Decoración histórica tradicional
            <br /><strong>Recomendación:</strong> Reservar con anticipación
          </p>
        </section>

        <section id="experencia-privada" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Si prefieres una experiencia más exclusiva</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            ¿Quieres vivir la cocina catalana de una forma única? Nuestro <Link href="/cena-clandestina" className="text-gold hover:underline">concepto de cena clandestina</Link> te ofrece una experiencia gastronómica privada donde la cocina tradicional catalana basada en productos de proximidad es la protagonista absoluta.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Menú de degustación de 11 elaboraciones</strong> con <strong>maridaje de 4 variedades de vino y cava catalán</strong>, en una <strong>ubicación secreta</strong> descubierta mediante pistas y enigmas, con sorpresas incluidas durante la cena. Termina con gintonics premium.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Una forma diferente y experiencial de descubrir los sabores auténticos de la región catalana, sin necesidad de visitar restaurantes tradicionales. Perfecta para quienes buscan algo verdaderamente único.
          </p>
        </section>

        <section id="consejos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Consejos para disfrutar la cocina catalana</h2>
          <ul className="space-y-3 text-foreground/90">
            <li>• <strong>Prueba la escalivada:</strong> verduras asadas con aceite de oliva. Es simple pero sublime.</li>
            <li>• <strong>Pide esqueixada:</strong> bacalao desmenuzado con cebolla, tomate y aceituna negra. Plato refrescante y tradicional.</li>
            <li>• <strong>Acompaña con cava:</strong> Los vinos espumosos catalanes son perfectos para la cocina tradicional.</li>
            <li>• <strong>No te pierdas la butifarra:</strong> embutido típico catalán, a menudo servido con pan con tomate.</li>
            <li>• <strong>Termina con crema catalana:</strong> el postre más emblemático de la región.</li>
          </ul>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Vive la cocina catalana con nosotros</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Descubre estos restaurantes por tu cuenta, o déjate sorprender por nuestra experiencia de cena clandestina donde la cocina tradicional catalana es protagonista.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Contactar</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Más guías gastronómicas de Barcelona</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/restaurantes-michelin" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Restaurantes Michelin por menos de 50€</p>
              <p className="text-sm text-muted-foreground">Estrellas gastronómicas de Barcelona a precio asequible.</p>
            </Link>
            <Link href="/menu-degustacion" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Los Mejores Menús de Degustación</p>
              <p className="text-sm text-muted-foreground">Experiencias culinarias completas para regalar.</p>
            </Link>
            <Link href="/los-mejores-menus-degustacion-para-regalar" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Menús de Degustación para Regalar</p>
              <p className="text-sm text-muted-foreground">Regala experiencias gastronómicas inolvidables.</p>
            </Link>
            <Link href="/los-mejores-menus-del-dia-de-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Los Mejores Menús del Día</p>
              <p className="text-sm text-muted-foreground">Cocina de calidad a precios de mediodía.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
