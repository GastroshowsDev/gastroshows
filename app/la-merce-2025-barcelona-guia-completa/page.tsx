import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, eventSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "La Mercè 2025 Barcelona: guía completa de la fiesta mayor",
  description: "La Fiesta de la Mercè 2025 en Barcelona del 23 al 28 de septiembre: castellers, cabalgata, piromusical y eventos imprescindibles. Toda la información actualizada.",
  keywords: "la merce 2025, fiesta merce barcelona, piromusical merce, castellers barcelona, eventos barcelona septiembre 2025",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/la-merce-2025-barcelona-guia-completa/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/la-merce-2025-barcelona-guia-completa/", siteName: "GastroShows", title: "La Mercè 2025 Barcelona: guía completa", description: "Todo lo que tienes que saber sobre La Mercè 2025." },
};

export default function MercePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "La Mercè 2025 Barcelona", url: "https://gastroshows.es/la-merce-2025-barcelona-guia-completa/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({ title: "La Mercè 2025 en Barcelona: guía completa", description: "Guía de la fiesta mayor de Barcelona.", publishedAt: "2025-09-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "la-merce-2025-barcelona-guia-completa" })} />
      <JsonLd data={eventSchema({ name: "La Mercè 2025 Barcelona", description: "Fiesta mayor de Barcelona del 23 al 28 de septiembre de 2025.", startDate: "2025-09-23T18:00:00+02:00", endDate: "2025-09-28T23:00:00+02:00", price: 0 })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">La Mercè 2025</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">La Mercè 2025 en Barcelona: guía completa de la fiesta mayor</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">La <strong>Fiesta de la Mercè 2025</strong> es el gran evento cultural de Barcelona y uno de los más esperados del año. <strong>Del 23 al 28 de septiembre</strong>, la ciudad se llena de música, tradiciones, espectáculos visuales y actividades gratuitas para todos los públicos.</p>
        </header>

        <section id="que-es" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">¿Qué es la Fiesta de la Mercè?</h2>
          <p className="text-foreground/90 leading-relaxed">La Mercè es la <strong>fiesta mayor de Barcelona</strong>, dedicada a la patrona de la ciudad (la Virgen de la Mercè) que se celebra cada <strong>24 de septiembre</strong>. La festividad reúne <strong>tradiciones populares catalanas</strong> (castellers, gegants, correfocs), eventos culturales, conciertos y un piromusical de cierre espectacular.</p>
        </section>

        <section id="eventos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 uppercase">Los eventos más destacados</h2>
          <ul className="space-y-3 text-foreground/90">
            <li className="p-4 rounded border border-border"><strong>23 sept · 18h</strong> — Pregón y desfile inaugural en Plaza Sant Jaume</li>
            <li className="p-4 rounded border border-border"><strong>23-28 sept</strong> — Castellers (torres humanas) en Plaza Sant Jaume</li>
            <li className="p-4 rounded border border-border"><strong>24 sept</strong> — Galejades de Trabucaires y Cabalgata</li>
            <li className="p-4 rounded border border-border"><strong>24 sept</strong> — Día festivo oficial: Virgen de la Mercè</li>
            <li className="p-4 rounded border border-border"><strong>28 sept · 22h</strong> — <strong>Piromusical final</strong> en Avenida María Cristina (Montjuïc). Banda sonora a cargo de Estopa.</li>
          </ul>
        </section>

        <section id="arte" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Arte, literatura y ciudad invitada</h2>
          <p className="text-foreground/90 leading-relaxed">Cada edición tiene una <strong>ciudad invitada</strong> que aporta su cultura y tradiciones a la fiesta. Además, hay exposiciones, ferias del libro, instalaciones artísticas en plazas y proyecciones nocturnas en edificios emblemáticos.</p>
        </section>

        <section id="familiares" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 uppercase">Actividades culturales y familiares</h2>
          <p className="text-foreground/90 leading-relaxed">Talleres infantiles, conciertos al aire libre, cinema en las playas, pasacalles y la <strong>Mercè Arts de Carrer</strong>: el mayor festival de arte urbano gratuito. Diversión para todas las edades.</p>
        </section>

        <section id="consejos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 uppercase">Consejos para disfrutar de La Mercè 2025</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• <strong>Llega temprano</strong> al piromusical: las mejores ubicaciones se ocupan horas antes.</li>
            <li>• <strong>Calzado cómodo</strong>: vas a caminar mucho entre Sant Jaume, La Rambla, Passeig de Colom y Montjuïc.</li>
            <li>• <strong>Lleva agua</strong>: en septiembre Barcelona puede tener temperaturas altas.</li>
            <li>• <strong>Programa con antelación</strong>: la web del Ayuntamiento publica el programa completo.</li>
          </ul>
        </section>

        <section id="gastroshows" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6 uppercase">GastroShows: un plan gastronómico secreto para la Mercè 2025</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/experiencia/mesa-cena-clandestina.jpg" alt="La Cena Clandestina durante La Mercè 2025" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>Si después de un día de fiesta quieres <strong>vivir una experiencia gastronómica única</strong>, La Cena Clandestina de GastroShows es la opción perfecta. Una ubicación secreta, menú degustación y un final de noche inolvidable.</p>
              <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">Reservar Cena Clandestina</Link>
            </div>
          </div>
        </section>

        <section id="por-que" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Por qué no puedes perderte La Mercè 2025</h2>
          <p className="text-foreground/90 leading-relaxed">La Mercè es <strong>la Barcelona más auténtica</strong>: tradiciones centenarias, cultura popular y el espíritu festivo de la ciudad concentrado en seis días. Una experiencia única para vecinos y visitantes.</p>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/las-mejores-terrazas-de-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Las mejores terrazas de Barcelona</p>
              <p className="text-sm text-muted-foreground">Para relajarse entre eventos.</p>
            </Link>
            <Link href="/hacer-algo-diferente-en-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Hacer algo diferente en Barcelona</p>
              <p className="text-sm text-muted-foreground">Planes originales.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
