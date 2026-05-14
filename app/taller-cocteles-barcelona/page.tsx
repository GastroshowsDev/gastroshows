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
  title: "Taller de Cócteles en Barcelona | GastroShows",
  description:
    "Los secretos de la mixología quedarán al descubierto en nuestro taller de cócteles en Barcelona. Actividad gastronómica de 2h ideal para grupos y empresas.",
  keywords:
    "taller cocteles barcelona, mixologia barcelona, taller de cócteles barcelona, actividad gastronómica barcelona, taller para empresas",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/taller-cocteles-barcelona/" },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/taller-cocteles-barcelona/",
    siteName: "GastroShows",
    title: "Taller de Cócteles en Barcelona",
    description: "Aprende mixología en una experiencia gastronómica de 2 horas.",
  },
};

export default function TallerCoctelesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Taller de Cócteles Barcelona", url: "https://gastroshows.es/taller-cocteles-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({
        title: "Taller de Cócteles en Barcelona",
        description: "Taller de mixología en Barcelona para grupos y empresas.",
        publishedAt: "2022-05-15T10:00:00+01:00",
        modifiedAt: "2026-05-14T10:00:00+01:00",
        slug: "taller-cocteles-barcelona",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Taller de Cócteles Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Taller de Cócteles en Barcelona
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Los secretos de la mixología quedarán al descubierto en nuestro <strong>taller de cócteles en Barcelona</strong>.
          </p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Qué es</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop"
                alt="Taller de cócteles en Barcelona" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>Un <strong>taller práctico de mixología</strong> guiado por un coctelero profesional donde aprenderás las técnicas básicas para preparar cócteles clásicos y de autor.</p>
              <p>Una actividad perfecta para grupos, empresas, despedidas o cumpleaños diferentes. <strong>Duración: 2 horas</strong>.</p>
            </div>
          </div>
        </section>

        <section id="que-incluye" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">qué incluye</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Formación guiada por mixólogo profesional","Materiales y bebidas para preparar los cócteles","Degustación de los cócteles elaborados","Maridaje de tapas","Espacio profesional equipado","Diploma o foto recuerdo (consultar)"].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border">
                <span className="text-gold text-xl shrink-0">✓</span>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="donde" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">dónde irás</h2>
          <p className="text-foreground/90 leading-relaxed">El taller se imparte en un <strong>espacio gastronómico privado en Barcelona</strong>, equipado con barra profesional, herramientas de coctelería y todo lo necesario para la actividad.</p>
        </section>

        <section id="mas-info" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Más información</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Duración:</strong> 2 horas</p>
            <p><strong>Fechas:</strong> a concertar</p>
            <p><strong>Precio:</strong> consultar según modalidad</p>
            <p><strong>Reservas:</strong> WhatsApp o formulario de contacto</p>
          </div>
        </section>

        <section id="el-mejor" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">El mejor del taller de cócteles en Barcelona</h2>
          <p className="text-foreground/90 leading-relaxed">Nuestro taller destaca por la <strong>calidad del producto</strong>, la dinámica participativa y la posibilidad de personalizar cada experiencia según las preferencias del grupo. Una propuesta diferenciada para quienes buscan algo más que un curso teórico.</p>
        </section>

        <section id="otras-actividades" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Si prefieres otras actividades gastronómicas en Barcelona</h2>
          <p className="text-foreground/90 leading-relaxed">Si la mixología no es lo tuyo, también ofrecemos <Link href="/taller-de-sushi-barcelona" className="text-gold hover:underline">talleres de sushi</Link>, <Link href="/team-building-masterchef" className="text-gold hover:underline">team building masterchef</Link>, catas de vinos y experiencias gastronómicas privadas adaptadas a empresas.</p>
        </section>

        <section id="compartir" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Lo mejor de una experiencia es compartirla en el taller de cócteles</h2>
          <p className="text-foreground/90 leading-relaxed">El taller está pensado para <strong>vivirlo en grupo</strong>: amigos, parejas o compañeros de trabajo. La parte práctica fomenta la interacción y el ambiente relajado.</p>
        </section>

        <section id="empresas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Una actividad gastronómica para empresas pensada para disfrutar en equipo</h2>
          <p className="text-foreground/90 leading-relaxed">Ideal para <strong>team building</strong>: rompe la rutina laboral, refuerza la comunicación y crea recuerdos compartidos. Adaptamos el taller según el tamaño del grupo y los objetivos del evento.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Te esperamos en el taller de cócteles</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Pide presupuesto sin compromiso y diseñamos una experiencia a medida para tu grupo.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Pedir presupuesto</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/team-building-masterchef" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Team Building Masterchef</p>
              <p className="text-sm text-muted-foreground">Cocina en equipo, ideal para empresas.</p>
            </Link>
            <Link href="/taller-de-sushi-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Taller de Sushi Barcelona</p>
              <p className="text-sm text-muted-foreground">Aprende a hacer sushi fresco.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
