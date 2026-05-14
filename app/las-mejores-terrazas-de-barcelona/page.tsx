import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Las mejores terrazas de Barcelona | 6 imprescindibles",
  description: "Las 6 mejores terrazas de Barcelona: Café d'Estiu, Torre Rosa, El Jardín del Alma, La Caseta del Migdia, Terraza del Olivia y Terraza del Neri. Para citas y desconectar.",
  keywords: "terrazas barcelona, mejores terrazas barcelona, terrazas con vistas barcelona, terrazas románticas barcelona",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/las-mejores-terrazas-de-barcelona/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/las-mejores-terrazas-de-barcelona/", siteName: "GastroShows", title: "Las mejores terrazas de Barcelona", description: "6 terrazas imprescindibles." },
};

const terrazas = [
  { id: "cafe-destiu", name: "CAFÉ D'ESTIU – Barrio Gótico", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop", body: ["Ubicada dentro del **Museo Marès** del Barrio Gótico, esta tranquila y bonita terraza ofrece opciones saludables en un entorno único.","**Combina el arte y la belleza de la arquitectura gótica** con un ambiente relajado. Un secreto bien guardado en pleno centro de Barcelona."] },
  { id: "torre-rosa", name: "TORRE ROSA – Sant Andreu", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop", body: ["Un **bar de cócteles que opera desde 1987** en una magnífica **casa indiana de principios de siglo XX**.","Su jardín cuenta con **enormes palmeras y grandes pinos** que crean un oasis verde en plena ciudad. Coctelería clásica con un toque colonial."] },
  { id: "jardin-alma", name: "EL JARDÍN DEL ALMA – Eixample", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop", body: ["El Hotel Alma cuenta con un **enorme jardín ideal para tomar una copa** en el corazón del Eixample.","La sensación es como **estar en un cuento de ensueño**: rincones verdes, mobiliario cuidado y una propuesta gastronómica de nivel."] },
  { id: "caseta-migdia", name: "LA CASETA DEL MIGDIA – Montjuïc", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop", body: ["Encarna la filosofía **slow life** en lo alto de Montjuïc. Una de las **mejores vistas de la ciudad** desde una terraza al aire libre.","Ambiente bohemio, música chill y una opción ideal para ver el atardecer mientras tomas algo con amigos."] },
  { id: "terraza-olivia", name: "TERRAZA DEL OLIVIA – Ciutat Vella", image: "https://images.unsplash.com/photo-1551806235-e3b2da4e44b1?w=800&h=600&fit=crop", body: ["Ofrece **vistas del skyline de la ciudad** desde Ciutat Vella. Una escapada del movimiento urbano en plena zona céntrica.","Coctelería cuidada, pequeñas tapas gourmet y un ambiente sofisticado. Perfecta para una cita o tardes-noches especiales."] },
  { id: "terraza-neri", name: "TERRAZA DEL NERI – Ciutat Vella", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&h=600&fit=crop", body: ["Considerada **la más romántica de la ciudad**. Pequeña terraza escondida en el Hotel Neri, en pleno casco antiguo.","Sirve **cocina mediterránea de alto nivel** en un entorno íntimo y cuidado. La opción perfecta para impresionar en una primera cita o aniversario."] },
];

export default function TerrazasPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Las mejores terrazas Barcelona", url: "https://gastroshows.es/las-mejores-terrazas-de-barcelona/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Las mejores terrazas de Barcelona", description: "6 terrazas imprescindibles de Barcelona.", publishedAt: "2023-05-20T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "las-mejores-terrazas-de-barcelona" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Las mejores terrazas Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">Las mejores terrazas de Barcelona</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Las <strong>terrazas de Barcelona están de moda</strong> este año. Lugares con <strong>el ambiente perfecto para desconectar</strong> e ideales para tener una cita.</p>
        </header>

        {terrazas.map((t, idx) => (
          <section key={t.id} id={t.id} className="mb-16 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">{t.name}</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${idx % 2 === 1 ? "order-2 md:order-1" : ""}`}>
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className={`space-y-4 text-foreground/90 leading-relaxed ${idx % 2 === 1 ? "order-1 md:order-2" : ""}`}>
                {t.body.map((p, i) => (<p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />))}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/bares-tapas-barcelona-baratos/" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Bares tapas Barcelona baratos</p>
              <p className="text-sm text-muted-foreground">10 bares de tapas auténticos.</p>
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
