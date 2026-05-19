import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Las mejores cenas clandestinas de Barcelona | GastroShows",
  description: "Las 6 mejores cenas clandestinas de Barcelona: GastroShows, Bobby's Free, Paradiso, Tuxedo Social Club, Dry Martini y Club 61. Experiencias secretas con cócteles y alta cocina.",
  keywords: "cenas clandestinas barcelona, bares secretos barcelona, speakeasy barcelona, paradiso barcelona, dry martini barcelona, bobby's free",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/las-mejores-cenas-clandestinas-de-barcelona/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/las-mejores-cenas-clandestinas-de-barcelona/", siteName: "GastroShows", title: "Las mejores cenas clandestinas de Barcelona", description: "6 experiencias secretas en Barcelona." },
};

const venues = [
  { id: "gastroshows", name: "Gastroshows: La cena clandestina de Barcelona", image: "/images/las-mejores-cenas-clandestinas-de-barcelona/interior-cena-clandestina-damasco-rojo-cuadros-barcelona.jpg", body: ["GastroShows ofrece una **cena clandestina de 11 actos con maridaje de vinos**. La ubicación es secreta y se descubre a través de pistas y enigmas que llegan al mail la semana antes.","No es una cena cualquiera: es una **experiencia inmersiva** que mezcla alta cocina, sorpresas y un componente narrativo único. Plazas limitadas a 12 personas por noche."], cta: { label: "Reservar Cena Clandestina", href: "/cena-clandestina" } },
  { id: "bobbys-free", name: "BOBBY'S FREE: cena clandestina y cita para ponerse guapos", image: "/images/las-mejores-cenas-clandestinas-de-barcelona/cena-clandestina-mesa-barcelona.jpg", body: ["Un **speakeasy escondido detrás de una barbería**. Para entrar tienes que pedir cita, descubrir la entrada secreta y vivir la noche en un local con estética vintage americana.","Cócteles de autor, ambiente clandestino y una propuesta gastronómica que acompaña la noche. Una experiencia para los amantes del estilo y el misterio."] },
  { id: "paradiso", name: "PARADISO: qué hay detrás de la nevera", image: "/images/las-mejores-cenas-clandestinas-de-barcelona/cena-clandestina-ambiente-secreto.jpg", body: ["**Paradiso** es uno de los bares más premiados del mundo. Se accede a través de una **nevera oculta en una pastrami** del Born. Una vez dentro, descubrirás una de las mejores coctelerías del planeta.","Carta de cócteles teatralizada con presentaciones espectaculares. **Reserva con semanas de antelación** porque está siempre lleno."] },
  { id: "tuxedo-social-club", name: "TUXEDO SOCIAL CLUB: god save the queen", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop", body: ["Un **club privado de inspiración británica** escondido en pleno centro de Barcelona. Acceso restringido, ambiente íntimo y estética de club inglés clásico.","Cócteles, snacks gourmet y música en directo. Una propuesta diferente para una noche pausada y sofisticada."] },
  { id: "dry-martini", name: "DRY MARTINI: un clásico clandestino en Barcelona", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop", body: ["Detrás del legendario **Dry Martini** se esconde **Speakeasy**, un restaurante secreto al que se accede a través de la cocina del bar. Una experiencia clandestina con tradición barcelonesa.","Cocina mediterránea con técnica francesa, **cócteles de autor** y un servicio impecable. Una de las cenas clandestinas más auténticas y consolidadas de la ciudad."] },
  { id: "club-61", name: "CLUB 61: cena clandestina detrás del espejo", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop", body: ["Un local **escondido detrás de un espejo** en el Gòtic. Para entrar necesitas conocer el secreto. Una vez dentro, ambiente íntimo y cuidado.","Cócteles, tapas elaboradas y un ambiente sonoro envolvente. **Aforo reducido** y necesidad de reserva. Un secreto bien guardado de la noche barcelonesa."] },
];

export default function CenasClandestinasPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Las mejores cenas clandestinas Barcelona", url: "https://gastroshows.es/las-mejores-cenas-clandestinas-de-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Las mejores cenas clandestinas de Barcelona", description: "6 cenas clandestinas en Barcelona.", publishedAt: "2022-09-15T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "las-mejores-cenas-clandestinas-de-barcelona",
          image: "https://gastroshows.es/images/las-mejores-cenas-clandestinas-de-barcelona/hero-cenas-clandestinas-barcelona.jpg", })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Las mejores cenas clandestinas Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">Las mejores cenas clandestinas Barcelona</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">No es ningún secreto que la <strong>gastronomía está de moda</strong>. En los últimos años, la cocina ha experimentado una subida de popularidad gracias a las redes sociales. Y con ella, el auge de las experiencias clandestinas.</p>
        </header>

        {venues.map((v, idx) => (
          <section key={v.id} id={v.id} className="mb-16 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">{v.name}</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
              <div className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${idx % 2 === 1 ? "order-2 md:order-1" : ""}`}>
                <img src={v.image} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className={`space-y-4 text-foreground/90 leading-relaxed ${idx % 2 === 1 ? "order-1 md:order-2" : ""}`}>
                {v.body.map((p, i) => (<p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />))}
                {v.cta && (<Link href={v.cta.href} className="inline-block bg-gold text-black px-6 py-3 rounded font-cormorant text-base font-semibold hover:bg-gold/90 transition">{v.cta.label}</Link>)}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">La cena clandestina por excelencia</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">11 actos, maridaje, pistas previas y ubicación secreta. La Cena Clandestina de GastroShows.</p>
          <Link href="/cena-clandestina" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Reservar</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/cenas-espectaculo-barcelona-secreta/" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Cenas con espectáculo Barcelona</p>
              <p className="text-sm text-muted-foreground">Las 6 mejores cenas con espectáculo.</p>
            </Link>
            <Link href="/restaurantes-de-barcelona-con-estrella-michelin-menu-mediodia/" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Michelin Barcelona menú mediodía</p>
              <p className="text-sm text-muted-foreground">Alta cocina por menos de 50€.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
