import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, restaurantSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Regalos originales en Barcelona: experiencias que no se pueden envolver",
  description: "Regalos originales en Barcelona: experiencias que dejan huella. Cena secreta, baños termales, talleres de cocina, paseos en velero, catas y mucho más.",
  keywords: "regalos originales barcelona, regalos experiencia barcelona, regalo pareja, regalo amigas, regalo madre, regalo gastronómico barcelona",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/regalos-originales-barcelona-experiencias/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/regalos-originales-barcelona-experiencias/", siteName: "GastroShows", title: "Regalos originales en Barcelona: experiencias que no se pueden envolver", description: "Regalos experiencia que dejan huella y no ocupan espacio." },
};

const groups = [
  { id: "parejas", name: "Para parejas que buscan sorprender", image: "/images/regalos-originales-barcelona-experiencias/regalo-cena-pareja-barcelona.jpg", gifts: ["Baños termales + cena", "Taller de cocina a dúo", "Paseo en velero al atardecer", "Cena clandestina para dos"] },
  { id: "amigas", name: "Para amigas que se lo merecen todo", image: "/images/regalos-originales-barcelona-experiencias/regalo-experiencia-amigas-barcelona.jpg", gifts: ["Ruta gastronómica de mercados", "Cata de vinos naturales", "Clase de cerámica o coctelería", "Cena teatralizada secreta"] },
  { id: "madres", name: "Para madres (y personas) inolvidables", image: "/images/regalos-originales-barcelona-experiencias/regalo-cena-secreta-grupos.jpg", gifts: ["Experiencia gastronómica local", "Ritual de spa", "Taller de cocina catalana", "Comida en restaurante con encanto"] },
  { id: "todo", name: "Para los que lo tienen todo", image: "/images/regalos-originales-barcelona-experiencias/hero-regalos-originales-experiencias-barcelona.jpg", gifts: ["Cena secreta multisensorial", "Experiencia gastronómica de autor", "Eventos exclusivos", "Cenas con showcooking en directo"] },
];

export default function RegalosOriginalesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Regalos originales Barcelona", url: "https://gastroshows.es/regalos-originales-barcelona-experiencias/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={restaurantSchema()} />
      <JsonLd data={articleSchema({ title: "Regalos originales en Barcelona: experiencias que no se pueden envolver", description: "Regalos experienciales en Barcelona.", publishedAt: "2023-04-10T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "regalos-originales-barcelona-experiencias" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Regalos originales Barcelona</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">Regalos originales en Barcelona: experiencias que no se pueden envolver</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Hay regalos que se usan, se guardan o se olvidan. Y hay otros que se viven. Si estás buscando un <strong>regalo original en Barcelona —uno que deje huella y no ocupe espacio—</strong>, has llegado al lugar correcto.</p>
        </header>

        <section id="intro" className="mb-12 space-y-4 text-foreground/90 leading-relaxed text-lg">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Regalos originales en Barcelona</h2>
          <p>En GastroShows creemos en los <strong>regalos experienciales</strong>: aquellos que crean recuerdos, no objetos. Desde una <strong>cena secreta multisensorial</strong> hasta un paseo en velero al atardecer, cada propuesta está pensada para sorprender de verdad.</p>
        </section>

        {groups.map((g, idx) => (
          <section key={g.id} id={g.id} className="mb-16 scroll-mt-20">
            <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">{g.name}</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${idx % 2 === 1 ? "order-2 md:order-1" : ""}`}>
                <img src={g.image} alt={g.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <ul className={`space-y-3 text-foreground/90 leading-relaxed ${idx % 2 === 1 ? "order-1 md:order-2" : ""}`}>
                {g.gifts.map((gift) => (
                  <li key={gift} className="flex items-start gap-3 p-3 rounded border border-border">
                    <span className="text-gold text-xl shrink-0">🎁</span>
                    <span>{gift}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section id="vivir" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">El regalo que no se puede contar, solo vivir.</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-3 text-foreground/90 leading-relaxed">
            <p>Nuestra propuesta estrella: <strong>La Cena Clandestina</strong>. Un menú degustación en ubicación secreta de Barcelona, con maridaje, gin premium y un componente experiencial que se descubre a través de pistas la semana antes.</p>
            <p>Quien lo recibe no sabe a dónde irá. Solo sabe que va a vivir algo distinto.</p>
          </div>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Regala instantes. NO cosas</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Las experiencias se recuerdan toda la vida. Las cosas, no. Regala una Cena Clandestina y deja huella.</p>
          <Link href="/regalo" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Comprar Tarjeta Regalo</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/los-mejores-menus-degustacion-para-regalar/" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Los mejores menús degustación para regalar</p>
              <p className="text-sm text-muted-foreground">Regalos gastronómicos en Barcelona.</p>
            </Link>
            <Link href="/tarjeta-regalo-cena-para-dos" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Tarjeta Regalo Cena Para Dos</p>
              <p className="text-sm text-muted-foreground">Especial para parejas.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
