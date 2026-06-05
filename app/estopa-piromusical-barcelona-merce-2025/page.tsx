import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Estopa Piromusical Barcelona Mercè 2025 | Espectáculo de Fuegos y Música",
  description: "Estopa toca la Piromusical de La Mercè 2025 en Barcelona. 28 de septiembre, Avinguda Maria Cristina. Espectáculo de fuegos artificiales sincronizados con música.",
  keywords: "estopa piromusical barcelona 2025, merce 2025, fuegos artificiales barcelona, mercè barcelona eventos",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/estopa-piromusical-barcelona-merce-2025/" },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/estopa-piromusical-barcelona-merce-2025/",
    siteName: "GastroShows",
    title: "Estopa Piromusical Barcelona Mercè 2025",
    description: "Espectáculo de fuegos artificiales con Estopa en el cierre de La Mercè.",
  },
};

export default function EstopaPiromusicalPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Estopa Piromusical Mercè 2025", url: "https://gastroshows.es/estopa-piromusical-barcelona-merce-2025/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({
        title: "Estopa Piromusical Barcelona Mercè 2025 - Espectáculo de Fuegos y Música",
        description: "Guía del espectáculo Estopa Piromusical en La Mercè 2025.",
        publishedAt: "2024-06-01T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "estopa-piromusical-barcelona-merce-2025",
        image: "https://gastroshows.es/images/estopa-piromusical/hero-estopa.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Estopa Piromusical Mercè 2025</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Estopa Piromusical Barcelona — Mercè 2025
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            La banda española <strong>Estopa</strong> proporciona la banda sonora del espectáculo piromusical más emblemático de Barcelona. <strong>28 de septiembre de 2025.</strong>
          </p>
        </header>

        <section id="el-evento" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">La Piromusical: Luz, Fuego y Melodías</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Luz, fuego y melodías se entrelazan en un ritual colectivo.</strong> Miles de personas se reúnen en la Avinguda Maria Cristina, frente a la Font Màgica de Montjuïc, para presenciar un espectáculo donde los fuegos artificiales se coreografían sincronizadamente con la música en directo.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Es el <strong>acto de cierre de La Mercè 2025</strong>, uno de los festivales culturales más importantes de Barcelona, que celebra la identidad catalana a través de música, tradiciones y espectáculos gratuitos.
          </p>
        </section>

        <section id="estopa" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Estopa: 25 Años de Carrera</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Una banda icónica española que marcó un hito en la música popular.</strong> Estopa celebra <strong>25 años de carrera artística,</strong> desde sus inicios en Cornellà hasta convertirse en referentes nacionales.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Tocar en la Piromusical de La Mercè es un honor que reconoce su impacto en la cultura musical española y su conexión emocional con el público.
          </p>
        </section>

        <section id="detalles" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Detalles del Evento</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-3">
            <p><strong>Fecha:</strong> Domingo, 28 de septiembre de 2025</p>
            <p><strong>Ubicación:</strong> Avinguda Maria Cristina, frente a Font Màgica de Montjuïc, Barcelona</p>
            <p><strong>Artista Principal:</strong> Estopa (banda en directo)</p>
            <p><strong>Tipo de Evento:</strong> Espectáculo pirotécnico sincronizado con música</p>
            <p><strong>Entrada:</strong> Gratuita (libre acceso)</p>
          </div>
        </section>

        <section id="merce-2025" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">La Mercè 2025: Festival de Barcelona</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            La Mercè representa la <strong>identidad cultural catalana</strong> a través de celebraciones libres y accesibles durante todo septiembre. El festival incluye:
          </p>
          <ul className="space-y-2 text-foreground/90 ml-6">
            <li>• <strong>Castellers:</strong> Torres humanas, tradición catalana centenaria</li>
            <li>• <strong>Correfocs:</strong> Carreras de fuego, desfiles pirotécnicos</li>
            <li>• <strong>Conciertos y actuaciones:</strong> Música de artistas nacionales e internacionales</li>
            <li>• <strong>Actividades tradicionales:</strong> Sardanas, desfiles, exposiciones</li>
            <li>• <strong>Piromusical:</strong> Espectáculo de clausura con fuegos y música en directo</li>
          </ul>
        </section>

        <section id="como-llegar" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Cómo Disfrutar el Evento</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Llega con tiempo:</strong> El evento atrae a miles de personas. Llega con 1-2 horas de anticipación para conseguir buen sitio.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Transporte:</strong> Accesible por Metro, autobús y a pie desde muchos puntos de Barcelona. La zona de Montjuïc tiene buenas conexiones.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Ambiente:</strong> Es un evento familiar y multicultural. Traete amigos, familia, o únete a la energía colectiva del evento.
          </p>
        </section>

        <section id="cena-previa" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Una Cena Antes del Espectáculo</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Si quieres hacer la noche más especial, considera comenzar con una <strong>experiencia gastronómica privada.</strong> Una cena con chef privado y menú degustación te permitirá disfrutar gastronomía de calidad antes de dirigirte al espectáculo.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>La Cena Clandestina</strong> ofrece exactamente esto: ubicación secreta, menú sorpresa, y la posibilidad de terminar la noche en el Piromusical de La Mercè.
          </p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Combina Gastronomía con Cultura</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Una cena privada con chef antes del Piromusical. Experiencia gastronómica + espectáculo cultural = noche inolvidable.</p>
          <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Reservar Cena</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Más sobre Barcelona y La Mercè</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/donde-cenar-en-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Dónde Cenar en Barcelona</p>
              <p className="text-sm text-muted-foreground">Sitios secretos con excelente cocina.</p>
            </Link>
            <Link href="/cena-clandestina" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cena Clandestina</p>
              <p className="text-sm text-muted-foreground">Experiencia gastronómica privada.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
