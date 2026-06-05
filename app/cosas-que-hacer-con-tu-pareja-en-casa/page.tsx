import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cosas que Hacer con tu Pareja en Casa | 5 Planes Geniales",
  description: "5 ideas divertidas para hacer con tu pareja en casa: Netflix, pintar, menú degustación, yoga y álbumes de fotos. Planes para conectar.",
  keywords: "cosas hacer pareja en casa, actividades pareja, planes en casa pareja, ideas divertidas pareja",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/cosas-que-hacer-con-tu-pareja-en-casa/" },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/cosas-que-hacer-con-tu-pareja-en-casa/",
    siteName: "GastroShows",
    title: "Cosas que Hacer con tu Pareja en Casa - 5 Planes Geniales",
    description: "Ideas divertidas y creativas para disfrutar en pareja desde casa.",
  },
};

export default function CosasHacerParejaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Cosas que Hacer en Pareja en Casa", url: "https://gastroshows.es/cosas-que-hacer-con-tu-pareja-en-casa/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({
        title: "Cosas que Hacer con tu Pareja en Casa - 5 Planes Geniales",
        description: "Ideas divertidas para disfrutar tiempo de calidad en pareja desde casa.",
        publishedAt: "2021-09-10T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "cosas-que-hacer-con-tu-pareja-en-casa",
        image: "https://gastroshows.es/images/pareja-en-casa/hero-pareja.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Cosas que Hacer en Pareja en Casa</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Cosas que Hacer con tu Pareja en Casa — 5 Planes Geniales
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            <strong>Tiempo de calidad en pareja</strong> sin salir de casa. Desde películas hasta experiencias gastronómicas privadas, descubre 5 planes divertidos y significativos.
          </p>
        </header>

        <section id="plan-1" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">1. Netflix en Pareja: Top 5 de Maratón de Series</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Acurrucarse en el sofá es una de las actividades más cómodas y comunicativas. Mientras ves una serie, comentan los giros de la trama, crean teorías juntos y se conocen mejor.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Series recomendadas para ver en pareja:</strong>
          </p>
          <ul className="space-y-2 text-foreground/90 ml-6">
            <li>• <strong>Unorthodox</strong> — Drama intenso y cautivador</li>
            <li>• <strong>Sex Education</strong> — Humor, romance y temas importantes</li>
            <li>• <strong>Atípico</strong> — Historia tocante y divertida</li>
            <li>• <strong>Cómo Defender a un Asesino</strong> — Thriller que engancha</li>
            <li>• <strong>Outlander</strong> — Épica, romance e historia</li>
          </ul>
        </section>

        <section id="plan-2" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">2. Pintar un Cuadro en Pareja</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Cambiar la decoración de tu casa de forma económica y divertida.</strong> Colaborar en un cuadro es una actividad creativa que deja un recuerdo permanente en vuestra casa.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Pueden pintar diseños geométricos modernos, recrear clásicos con vuestro toque personal, o crear arte abstracto. El resultado es una pieza única que refuerza vuestro vínculo cada vez que la ves.
          </p>
        </section>

        <section id="plan-3" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">3. Menú Degustación para Dos en Casa</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>#gastroshowsencasa</strong> — Cajas sorpresa con ingredientes gourmet y un menú degustación secreto que podéis preparar juntos en la cocina.
          </p>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-3 mb-4">
            <p><strong>Contenido:</strong> Menú de 7 elaboraciones secretas (3 entrantes, 2 platos principales, 2 postres)</p>
            <p><strong>Incluye:</strong> Maridaje de vino (2 botellas) si lo deseáis</p>
            <p><strong>Adaptación:</strong> Acomodamos alergias, intolerancias y preferencias dietéticas</p>
            <p><strong>Reserva:</strong> Jueves, viernes o sábado</p>
          </div>
          <p className="text-foreground/90 leading-relaxed">
            Contacta para personalizar vuestra experiencia: <strong>esther@gastroshows.es</strong>
          </p>
        </section>

        <section id="plan-4" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">4. Yoga en Pareja</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            El yoga es una actividad perfecta para parejas que buscan <strong>reducir estrés, combatir el sedentarismo, mejorar flexibilidad y aliviar dolores de espalda.</strong>
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Podéis practicar en cualquier momento del día: por la mañana para empezar el día juntos, o por la noche para relajaros. Hay muchos recursos en redes sociales con posturas específicas para parejas.
          </p>
        </section>

        <section id="plan-5" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">5. Álbumes de Fotos: Organizar Recuerdos Juntos</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Revisar, organizar, imprimir y enmarcar fotos juntos es una forma hermosa de <strong>reconectar con vuestros recuerdos compartidos</strong> mientras creas decoración para casa.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Además, es una oportunidad para hacer decluttering digital y crear regalos personalizados para amigos y familia.
          </p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Vive una Experiencia Gastronómica en Pareja</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Menú degustación sorpresa para dos, en casa o en una ubicación secreta. Perfecta para conectar.</p>
          <Link href="/regalo" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Descubre Nuestras Experiencias</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Más Planes para Parejas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/ideas-para-san-valentin" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Ideas para San Valentín</p>
              <p className="text-sm text-muted-foreground">5 ideas para sorprender a tu pareja.</p>
            </Link>
            <Link href="/cena-clandestina" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cena Clandestina para Parejas</p>
              <p className="text-sm text-muted-foreground">Experiencia secreta en Barcelona.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
