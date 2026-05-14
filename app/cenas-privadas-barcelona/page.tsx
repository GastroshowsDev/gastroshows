import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cenas Privadas Barcelona | GastroShows",
  description: "Cenas privadas Barcelona: experiencias gastronómicas creadas a medida con chef privado y showcooking en vivo. Menú degustación de 8-12 actos desde 60€.",
  keywords: "cenas privadas barcelona, chef privado barcelona, cena medida barcelona, evento privado gastronómico barcelona",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/cenas-privadas-barcelona/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/cenas-privadas-barcelona/", siteName: "GastroShows", title: "Cenas Privadas Barcelona", description: "Cenas privadas a medida con chef profesional." },
};

export default function CenasPrivadasPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Cenas Privadas Barcelona", url: "https://gastroshows.es/cenas-privadas-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Cenas Privadas Barcelona", description: "Experiencias gastronómicas a medida.", publishedAt: "2022-06-10T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "cenas-privadas-barcelona" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Cenas Privadas Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">Cenas privadas Barcelona</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Las <strong>cenas privadas Barcelona</strong> son experiencias gastronómicas creadas a medida para disfrutar de la <strong>alta cocina en un ambiente exclusivo</strong>.</p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Qué es</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/experiencia/mesa-cena-clandestina.jpg" alt="Cena privada Barcelona" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>Una cena <strong>diseñada en exclusiva</strong> para tu grupo, con chef privado y demostraciones en vivo durante la velada.</p>
              <p>Ideal para celebraciones especiales, eventos de empresa, aniversarios o cualquier ocasión que merezca una experiencia única.</p>
            </div>
          </div>
        </section>

        <section id="que-incluye" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">qué incluye</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Cóctel de bienvenida","Menú degustación de 8-12 actos con producto de temporada","Chef privado con showcooking en vivo","Maridaje de vinos seleccionados","Cata de gin premium Teichenné","Explicación de cada plato durante la velada"].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border">
                <span className="text-gold text-xl shrink-0">✓</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="donde" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">dónde irás</h2>
          <p className="text-foreground/90 leading-relaxed">La cena se desarrolla en <strong>nuestro espacio gastronómico privado de Barcelona</strong>, totalmente preparado para acoger eventos exclusivos. Cocina abierta, salón y sala cóctel.</p>
        </section>

        <section id="mas-info" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Más información</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Duración:</strong> 2-3 horas</p>
            <p><strong>Precio:</strong> desde 60€ por persona</p>
            <p><strong>Fechas:</strong> a concertar</p>
          </div>
        </section>

        <section id="notas" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Cosas que debes tener en cuenta</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• Personalización completa del menú según restricciones dietéticas.</li>
            <li>• Servicios adicionales: fotografía profesional, música en vivo, magia.</li>
            <li>• Aforo y mínimos a consultar según fechas.</li>
          </ul>
        </section>

        <section id="experiencia-privada" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Una experiencia privada pensada para disfrutar</h2>
          <p className="text-foreground/90 leading-relaxed">Cada cena privada se diseña <strong>desde cero</strong>, teniendo en cuenta el perfil del grupo, sus gustos y la ocasión. Una velada donde cada detalle está pensado.</p>
        </section>

        <section id="compartir" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Lo mejor de una experiencia es compartirla</h2>
          <p className="text-foreground/90 leading-relaxed">La gastronomía une, conecta y crea memorias compartidas. Una cena privada de GastroShows es la <strong>excusa perfecta</strong> para reunir a las personas que importan en torno a una mesa.</p>
        </section>

        <section id="detalles" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Cada detalle cuenta</h2>
          <p className="text-foreground/90 leading-relaxed">Desde el cóctel de bienvenida hasta el último gin-tonic, <strong>cuidamos cada paso</strong> de la velada: la iluminación, el ritmo del servicio, la música ambiente, la presentación de los platos.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Te esperamos en la cena privada</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Pide presupuesto y diseñamos una experiencia única para tu grupo.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">¡Me interesa!</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/alquiler-espacio-gastronomico-en-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Alquiler espacio gastronómico</p>
              <p className="text-sm text-muted-foreground">100m² para eventos privados.</p>
            </Link>
            <Link href="/cena-clandestina" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ La Cena Clandestina</p>
              <p className="text-sm text-muted-foreground">Experiencia secreta para grupos pequeños.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
