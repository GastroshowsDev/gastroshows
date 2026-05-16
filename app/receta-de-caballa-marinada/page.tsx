import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, recipeSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Receta de caballa marinada con cítricos | GastroShows",
  description: "Receta de caballa marinada con cítricos: técnica antigua de conservación con sal y azúcar. Plato del menú de Gastroshows Barcelona explicado paso a paso.",
  keywords: "receta caballa marinada, caballa con cítricos, marinado pescado, receta pescado azul, gastronomía catalana",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/receta-de-caballa-marinada/" },
  openGraph: { type: "article", locale: "es_ES", url: "https://gastroshows.es/receta-de-caballa-marinada/", siteName: "GastroShows", title: "Receta de caballa marinada con cítricos", description: "Técnica de marinado ancestral con cítricos." },
};

const ingredients = ["2 lomos de caballa (600g cada uno)", "200g de azúcar blanco", "200g de sal", "1 mandarina", "1 limón", "Cebollino"];
const instructions = [
  "Limpiar y filetear la caballa, reservando los lomos sin espinas y guardando las huevas.",
  "Preparar el marinado mezclando partes iguales de sal y azúcar con la ralladura del limón y la mandarina.",
  "Cubrir la caballa completamente con el marinado durante aproximadamente 45 minutos (ajustar según el tamaño).",
  "Saltear los gajos de mandarina con las huevas y el zumo de limón en una sartén.",
  "Aclarar la caballa bajo el grifo para retirar el marinado, secar y cortar a tu gusto.",
  "Emplatar con base de mandarina salteada, caballa encima, dar un toque de soplete y decorar con cebollino.",
];

export default function CaballaMarinadaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Receta caballa marinada", url: "https://gastroshows.es/receta-de-caballa-marinada/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({ title: "Receta de caballa marinada con cítricos", description: "Técnica antigua de marinado.", publishedAt: "2023-03-10T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "receta-de-caballa-marinada",
          image: "https://gastroshows.es/images/receta-de-caballa-marinada/hero-caballa-marinada-citricos.jpg", })} />
      <JsonLd data={recipeSchema({ name: "Caballa marinada con cítricos", description: "Receta tradicional de caballa marinada con cítricos del menú de GastroShows.", prepTime: "PT15M", cookTime: "PT45M", recipeYield: "2 personas", ingredients, instructions, category: "Plato principal", cuisine: "Mediterránea" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Receta caballa marinada</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">Receta de caballa marinada con cítricos</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">La receta de caballa marinada con cítricos es <strong>una técnica muy antigua que ya se usaba para conservar el pescado</strong>. Esta versión, con sal y azúcar y un toque de cítricos, forma parte del menú de Gastroshows Barcelona.</p>
        </header>

        <section id="receta" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Receta de caballa</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/receta-de-caballa-marinada/hero-caballa-marinada-citricos.jpg"
                alt="Receta de caballa marinada con cítricos — técnica ancestral catalana paso a paso" title="Receta de caballa marinada con cítricos — técnica ancestral catalana paso a paso"
                className="w-full h-full object-cover" width={600} height={400} loading="eager" fetchPriority="high" />
            </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Receta de caballa marinada con cítricos — técnica ancestral catalana paso a paso</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>El marinado con <strong>sal y azúcar</strong> es una técnica ancestral que potencia los sabores del pescado azul. La caballa, al ser un pescado graso, queda especialmente sabrosa con este tratamiento.</p>
              <p><strong>Tiempo de preparación:</strong> 15 minutos · <strong>Marinado:</strong> 45 minutos · <strong>Raciones:</strong> 2 personas</p>
            </div>
          </div>
        </section>

        <section id="caballa-citricos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Caballa marinada con cítricos</h2>
          <p className="text-foreground/90 leading-relaxed">Los cítricos (mandarina y limón) aportan <strong>frescura y acidez</strong> que cortan la grasa natural de la caballa. El soplete al final del emplatado caramelizan ligeramente la superficie, creando un contraste de texturas y sabores excepcional.</p>
        </section>

        <section id="ingredientes" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Ingredientes</h2>
          <ul className="grid md:grid-cols-2 gap-3 list-none">
            {ingredients.map((ing) => (<li key={ing} className="flex items-start gap-2 text-foreground/90"><span className="text-gold shrink-0">•</span> {ing}</li>))}
          </ul>
        </section>

        <section id="pasos" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Elaboración paso a paso</h2>
          <ol className="space-y-4 list-decimal list-inside marker:text-gold marker:font-semibold">
            {instructions.map((step, i) => (<li key={i} className="text-foreground/90 leading-relaxed pl-2">{step}</li>))}
          </ol>
        </section>

        <section id="consejo" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">consejo sobre la Caballa marinada</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-3 text-foreground/90 leading-relaxed">
            <p><strong>Selecciona caballa fresca:</strong> ojos brillantes y no hundidos, agallas rojas y carne firme al tacto. Compra en temporada (marzo es buena época).</p>
            <p><strong>Ajusta el marinado al grosor:</strong> 45 minutos es la referencia para lomos medianos. Más tiempo si los lomos son gruesos, menos si son finos.</p>
          </div>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Posts relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/receta-de-fricando-de-ternera/" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Receta de fricandó de ternera</p>
              <p className="text-sm text-muted-foreground">La auténtica receta catalana.</p>
            </Link>
            <Link href="/cena-clandestina" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ La Cena Clandestina</p>
              <p className="text-sm text-muted-foreground">Prueba estos platos en vivo.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
