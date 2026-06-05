import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Mellow Rice with Mushrooms Recipe | Easy Creamy Risotto",
  description: "Creamy mushroom risotto recipe by Chef Marc Grivé. Step-by-step instructions for perfect risotto. Serves 4, 30-60 minutes, medium difficulty.",
  keywords: "risotto recipe, creamy mushroom rice, mushroom risotto, easy risotto, how to make risotto",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/mellow-rice-with-mushrooms-recipe/" },
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://gastroshows.es/mellow-rice-with-mushrooms-recipe/",
    siteName: "GastroShows",
    title: "Mellow Rice with Mushrooms Recipe",
    description: "Creamy risotto recipe with professional techniques.",
  },
};

export default function MellowRiceRecipePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Mellow Rice with Mushrooms", url: "https://gastroshows.es/mellow-rice-with-mushrooms-recipe/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({
        title: "Mellow Rice with Mushrooms Recipe - Creamy Risotto",
        description: "Easy risotto recipe with professional techniques by Chef Marc Grivé.",
        publishedAt: "2021-10-05T10:00:00+01:00",
        modifiedAt: "2026-06-05T10:00:00+01:00",
        slug: "mellow-rice-with-mushrooms-recipe",
        image: "https://gastroshows.es/images/recipes/mellow-rice-mushrooms.webp",
      })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Mellow Rice Recipe</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight uppercase">
            Mellow Rice with Mushrooms
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A creamy risotto featuring mushrooms with professional techniques for achieving the ideal texture. By <strong>Chef Marc Grivé.</strong>
          </p>
        </header>

        <section id="info" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Recipe Information</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gold/10 border border-gold/30 p-4 rounded text-center">
              <p className="text-sm text-muted-foreground mb-1">Servings</p>
              <p className="text-lg font-semibold">4 people</p>
            </div>
            <div className="bg-gold/10 border border-gold/30 p-4 rounded text-center">
              <p className="text-sm text-muted-foreground mb-1">Time</p>
              <p className="text-lg font-semibold">30-60 min</p>
            </div>
            <div className="bg-gold/10 border border-gold/30 p-4 rounded text-center">
              <p className="text-sm text-muted-foreground mb-1">Difficulty</p>
              <p className="text-lg font-semibold">Medium</p>
            </div>
            <div className="bg-gold/10 border border-gold/30 p-4 rounded text-center">
              <p className="text-sm text-muted-foreground mb-1">Season</p>
              <p className="text-lg font-semibold">Year-round</p>
            </div>
          </div>
        </section>

        <section id="ingredients" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Ingredients</h2>
          <ul className="space-y-2 text-foreground/90">
            <li>• 200g mushrooms</li>
            <li>• 200g portobello mushrooms</li>
            <li>• 50g dried black trumpets</li>
            <li>• 2 large pre-fried onions</li>
            <li>• 280g rice (Arborio, Carnaroli, or Bomba)</li>
            <li>• 60g butter</li>
            <li>• 1.5 liters chicken broth</li>
            <li>• Extra virgin olive oil</li>
            <li>• Salt to taste</li>
          </ul>
        </section>

        <section id="preparation" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Step-by-Step Preparation</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-semibold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Sauté the Mushrooms</h3>
                <p className="text-foreground/90">Heat olive oil in a large pan. Add mushrooms and portobellos, sauté for ~10 minutes until reduced. Add trumpet mushrooms and cook slightly more.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Add Onion and Rice</h3>
                <p className="text-foreground/90">Incorporate fried onion and rice. Begin soaking rice with room-temperature broth while stirring continuously.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Cook with Broth</h3>
                <p className="text-foreground/90">Gradually add cooking broth, stirring frequently. Cooking time: approximately 18 minutes (15-25 depending on rice type).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-semibold">4</div>
              <div>
                <h3 className="font-semibold mb-2">Finish with Butter</h3>
                <p className="text-foreground/90">Correct seasoning, finish with cold butter. Rest 4-5 minutes before serving. The butter creates the characteristic creaminess.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="tips" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Professional Tips & Tricks</h2>
          <ul className="space-y-3 text-foreground/90">
            <li>• <strong>Use a wooden spoon</strong> to stir and extract starch, which creates creaminess</li>
            <li>• <strong>Add broth gradually</strong> to prevent grains from breaking</li>
            <li>• <strong>Lightly toast rice</strong> before adding liquid to preserve grain integrity</li>
            <li>• <strong>Achieve "al dente" texture:</strong> Firm and slightly hard at grain center</li>
            <li>• <strong>Serve immediately</strong> while hot for best results</li>
            <li>• <strong>Rice varieties:</strong> Arborio, Carnaroli, or Bomba work best</li>
          </ul>
        </section>

        <section id="variations" className="mb-16 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Recipe Variations</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            This risotto is versatile. Try these variations:
          </p>
          <ul className="space-y-2 text-foreground/90 ml-6">
            <li>• <strong>Add fresh herbs:</strong> Parsley, thyme, or truffle oil</li>
            <li>• <strong>Include proteins:</strong> Pan-seared scallops or prosciutto</li>
            <li>• <strong>Change vegetables:</strong> Asparagus, peas, or leeks</li>
            <li>• <strong>Use wine:</strong> Add white wine in step 3 for acidity</li>
          </ul>
        </section>

        <section className="bg-gold/8 border-2 border-gold/30 rounded-lg p-8 md:p-12 my-16 text-center">
          <h2 className="font-cormorant text-3xl font-light mb-4">Want Professional Preparation?</h2>
          <p className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">Enjoy this risotto prepared by professional chefs in our tasting menus and gastronomic experiences.</p>
          <Link href="/menu-degustacion" className="inline-block bg-gold text-black px-10 py-4 rounded font-cormorant text-lg font-semibold hover:bg-gold/90 transition shadow-lg">Discover Our Menus</Link>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">More Recipes & Culinary Content</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/receta-de-fricando-de-ternera" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Veal Fricandó Recipe</p>
              <p className="text-sm text-muted-foreground">Traditional Catalan meat dish.</p>
            </Link>
            <Link href="/menu-degustacion" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Tasting Menus</p>
              <p className="text-sm text-muted-foreground">Professional culinary experiences.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
