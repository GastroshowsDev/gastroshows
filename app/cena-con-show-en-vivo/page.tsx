import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cena con show en vivo en Barcelona | GastroShows",
  description: "Una cena de alta cocina con el mejor show en vivo de música, baile o magia, ¡tú eliges! Cena espectáculo a medida en Barcelona desde 60€.",
  keywords: "cena show en vivo, cena espectáculo barcelona, cena con musica en vivo, cena con magia, cena con baile",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/cena-con-show-en-vivo/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/cena-con-show-en-vivo/", siteName: "GastroShows", title: "Cena con show en vivo Barcelona", description: "Cena espectáculo a medida con música, baile o magia." },
};

export default function CenaShowEnVivoPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Cena con show en vivo", url: "https://gastroshows.es/cena-con-show-en-vivo/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Cena con show en vivo", description: "Cena con espectáculo en Barcelona.", publishedAt: "2022-08-25T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "cena-con-show-en-vivo" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Cena con show en vivo</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">Cena con show en vivo</h1>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-8">
            <img src="/images/cena-con-show-en-vivo/hero-cena-con-show-en-vivo-barcelona.jpg"
              alt="Cena con show en vivo en Barcelona — alta cocina con música, baile o magia a medida desde 60€"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Una cena de <strong>alta cocina que disfrutarás con el mejor show en vivo</strong> de música, baile o magia, ¡tú eliges!</p>
        </header>

        <section id="que-es" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Qué es</h2>
          <p className="text-foreground/90 leading-relaxed">Una experiencia gastronómica privada que combina **menú degustación de alta cocina** con un **espectáculo en vivo a medida**: música, baile, magia o lo que prefieras.</p>
        </section>

        <section id="que-incluye" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">qué incluye</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Cóctel de bienvenida","Menú degustación de 8-12 actos","Maridaje de vinos seleccionados","Cata de gin premium","Show en vivo (música, baile o magia)","Servicio profesional"].map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded border border-border"><span className="text-gold text-xl shrink-0">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <section id="donde" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">dónde irás</h2>
          <p className="text-foreground/90 leading-relaxed">En nuestro <strong>espacio gastronómico privado de Barcelona</strong>, adaptado para acoger el show elegido con la iluminación y sonido adecuados.</p>
        </section>

        <section id="mas-info" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Más información</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-2">
            <p><strong>Duración:</strong> 2-3 horas</p>
            <p><strong>Precio:</strong> desde 60€ por persona</p>
            <p><strong>Fechas:</strong> a concertar</p>
          </div>
        </section>

        <section id="notas" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Cosas que debes tener en cuenta</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• Comunicar tipo de show preferido con antelación.</li>
            <li>• Notificar alergias e intolerancias 24h antes.</li>
            <li>• Servicios extra disponibles a consultar.</li>
          </ul>
        </section>

        <section id="cena-show" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Cena show en vivo</h2>
          <p className="text-foreground/90 leading-relaxed">Una propuesta exclusiva que <strong>combina alta cocina con espectáculo</strong>. Personalizamos el show según el perfil del grupo y la ocasión.</p>
        </section>

        <section id="cena-original" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Cena original con show y espectáculo en Barcelona</h2>
          <p className="text-foreground/90 leading-relaxed">Para los que buscan <strong>más que una cena tradicional</strong>: vive una velada completa con música, baile o magia mientras degustas un menú diseñado por nuestros chefs.</p>
        </section>

        <section id="dinos" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Dinos qué show en vivo necesitas y nos encargamos</h2>
          <p className="text-foreground/90 leading-relaxed">Trabajamos con <strong>músicos, bailarines, magos y performers profesionales</strong>. Tú nos cuentas qué estilo buscas y nosotros lo organizamos todo.</p>
        </section>

        <section id="medida" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Cena especial en Barcelona con música en vivo, DJ o actuaciones a medida</h2>
          <p className="text-foreground/90 leading-relaxed">Jazz, flamenco, pop acústico, magia de cerca, drag show, swing… <strong>todas las opciones posibles</strong>.</p>
        </section>

        <section id="gastronomica" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Una experiencia gastronómica</h2>
          <p className="text-foreground/90 leading-relaxed">La cena no es un mero acompañamiento del show: es <strong>el eje central</strong>. Menú degustación de alta cocina con maridaje cuidado.</p>
        </section>

        <section id="detalles" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-4">Nos encanta cuidar cada detalle</h2>
          <p className="text-foreground/90 leading-relaxed">Desde el cóctel de bienvenida hasta el ritmo del show: <strong>cada momento está pensado</strong> para crear una experiencia integral memorable.</p>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Te esperamos en la cena show en vivo</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Pide presupuesto y diseñamos la experiencia perfecta para tu evento.</p>
          <Link href="/contacto" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">¡Me interesa!</Link>
        </section>
      </article>
    </PageLayout>
  );
}
