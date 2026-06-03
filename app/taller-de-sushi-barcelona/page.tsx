import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Taller de Sushi en Barcelona | GastroShows",
  description: "Sushi fresh! Cocina japonesa en el taller de sushi Barcelona más fresco y original de la ciudad. Actividad gastronómica para grupos desde 90€.",
  keywords: "taller sushi barcelona, sushi workshop barcelona, taller cocina japonesa barcelona, actividad gastronómica empresa, taller sushi grupos",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/taller-de-sushi-barcelona/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/taller-de-sushi-barcelona/", siteName: "GastroShows", title: "Taller de Sushi en Barcelona", description: "Aprende a hacer sushi fresco y original." },
};

export default function TallerSushiPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Taller de Sushi Barcelona", url: "https://gastroshows.es/taller-de-sushi-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Taller de Sushi en Barcelona", description: "Taller de sushi fresco y original.", publishedAt: "2022-05-25T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "taller-de-sushi-barcelona",
          image: "https://gastroshows.es/images/taller-de-sushi-barcelona/hero-taller-sushi-barcelona-makis.jpg", })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Taller de Sushi Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">taller de sushi barcelona</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"><strong>SUSHI FRESH!</strong> Cocina japonesa en el taller de sushi Barcelona <strong>más fresco y original de la ciudad</strong>.</p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Qué es</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/taller-de-sushi-barcelona/hero-taller-sushi-barcelona-makis.jpg"
                alt="Taller de sushi en Barcelona — cocina japonesa fresca y original, makis y nigiris en grupo" title="Taller de sushi en Barcelona — cocina japonesa fresca y original, makis y nigiris en grupo"
                className="w-full h-full object-cover" width={600} height={400} loading="eager" fetchPriority="high" />
            </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Taller de sushi en Barcelona — cocina japonesa fresca y original, makis y nigiris en grupo</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>Un <strong>taller práctico de sushi</strong> donde aprenderás las técnicas tradicionales de la cocina japonesa: preparación del arroz, corte de ingredientes, técnicas de enrollado y emplatado.</p>
              <p>Una actividad que fomenta el <strong>trabajo en equipo y la creatividad</strong>. Mínimo 12 personas.</p>
            </div>
          </div>
        </section>

        <section id="que-incluye" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">qué incluye</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Cóctel de bienvenida","Taller con competición por el roll más original","Degustación de los platos elaborados","Maridaje de vino, agua y bebidas","Premiación del equipo ganador","Sushi master profesional"].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border">
                <span className="text-gold text-xl shrink-0">✓</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="donde" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">dónde irás</h2>
          <p className="text-foreground/90 leading-relaxed">El taller se imparte en nuestro <strong>espacio gastronómico privado de Barcelona</strong>, equipado con cocina profesional, materiales y todo lo necesario.</p>
        </section>

        <section id="mas-info" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Más información</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Duración:</strong> 2-3 horas</p>
            <p><strong>Precio:</strong> desde 90€ por persona</p>
            <p><strong>Mínimo:</strong> 12 personas</p>
            <p><strong>Fechas:</strong> a concertar</p>
          </div>
        </section>

        <section id="notas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Cosas que debes tener en cuenta</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• Avisar alergias e intolerancias con 24h de antelación.</li>
            <li>• Producto fresco: confirma número definitivo de asistentes con al menos 48h de antelación.</li>
          </ul>
        </section>

        <section id="que-encontrar" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">¿Qué puedes encontrar en el taller de sushi barcelona?</h2>
          <p className="text-foreground/90 leading-relaxed">Aprenderás a preparar <strong>makis, nigiris y temakis</strong> con producto fresco. Técnicas tradicionales explicadas paso a paso por un sushi master profesional. Además, descubrirás los secretos del <strong>arroz para sushi</strong> y el corte correcto del pescado.</p>
        </section>

        <section id="sal-rutina" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Sal de la rutina con un taller de sushi barcelona</h2>
          <p className="text-foreground/90 leading-relaxed">Una actividad <strong>diferente y participativa</strong> ideal para romper la rutina, sorprender a un grupo o vivir una experiencia gastronómica fuera de lo común.</p>
        </section>

        <section id="grupos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Un taller de sushi barcelona para grupos</h2>
          <p className="text-foreground/90 leading-relaxed">Perfecto para <strong>despedidas, cumpleaños, eventos de empresa y team building</strong>. El formato participativo une al grupo en torno a la creación de un plato compartido.</p>
        </section>

        <section id="medida" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Una actividad gastronómica a medida</h2>
          <p className="text-foreground/90 leading-relaxed">Personalizamos la experiencia según número de participantes, restricciones dietéticas y objetivos del evento. Servicios extra como <strong>maridajes premium, fotografía o entretenimiento</strong> disponibles.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">¿Quieres reservar el taller de sushi?</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Cuéntanos qué tipo de grupo eres y te enviamos una propuesta a medida.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">¡Me interesa!</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/taller-cocteles-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Taller de Cócteles Barcelona</p>
              <p className="text-sm text-muted-foreground">Mixología en grupo.</p>
            </Link>
            <Link href="/team-building-masterchef" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Team Building Masterchef</p>
              <p className="text-sm text-muted-foreground">Cocina en equipo.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
