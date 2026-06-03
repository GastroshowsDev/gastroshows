import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { JsonLd, breadcrumbSchema, articleSchema, recipeSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Veal fricandó recipe | Authentic Catalan recipe",
  description: "The best veal fricandó recipe with all the tips and tricks: from how to buy the meat to the type of mushrooms. Authentic Catalan recipe step-by-step.",
  keywords: "veal fricando recipe, catalan recipe, fricando, llata recipe, perrechicos mushrooms",
  authors: [{ name: "GastroShows" }], creator: "GastroShows",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: { canonical: "https://gastroshows.es/veal-fricando-recipe/", languages: { es: "/receta-de-fricando-de-ternera/" } },
  openGraph: { type: "article", locale: "en_GB", url: "https://gastroshows.es/veal-fricando-recipe/", siteName: "GastroShows", title: "Veal fricandó recipe", description: "Authentic Catalan veal fricandó." },
};

const ingredients = ["500g sliced llata or sirloin of poor man's meat", "2 large onions", "1 glass of rancid wine", "1 head of garlic", "1 bay leaf", "80g dehydrated perrechicos (moixernons)", "Extra virgin olive oil", "Salt to taste", "Flour for breading", "1 tablespoon almond powder", "2 glasses of water"];
const instructions = [
  "Heat olive oil in a pan; lightly fry the floured fillets turning frequently; reserve the meat.",
  "Brown grated onion in the same oil over medium heat; add rancid wine, stirring to create a confit sofrito.",
  "Add the reserved meat, wine, garlic and bay leaf; allow alcohol to reduce; cover with water, add mushrooms and salt; cook 45 minutes on medium-low heat.",
  "Remove the confited garlic head; extract the cloves back into the pot; add almond powder; stir gently and cook covered 45 more minutes until tender.",
];

export default function VealFricandoENPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    { name: "Veal fricandó recipe", url: "https://gastroshows.es/veal-fricando-recipe/" },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema({ title: "Veal fricandó recipe", description: "Authentic Catalan veal fricandó recipe.", publishedAt: "2022-12-01T10:00:00+01:00", modifiedAt: "2026-05-14T10:00:00+01:00", slug: "veal-fricando-recipe",
          image: "https://gastroshows.es/images/veal-fricando-recipe/hero-veal-fricando-recipe-catalan.jpg", })} />
      <JsonLd data={recipeSchema({ name: "Authentic veal fricandó", description: "Traditional Catalan veal fricandó with llata and moixernons.", prepTime: "PT15M", cookTime: "PT1H30M", recipeYield: "4 servings", ingredients, instructions, category: "Main course", cuisine: "Catalan" })} />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li>›</li>
            <li className="text-foreground/80">Veal fricandó recipe</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">Veal fricandó recipe</h1>
          <figure className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img src="/images/veal-fricando-recipe/hero-veal-fricando-recipe-catalan.jpg"
              alt="Authentic veal fricandó recipe — traditional Catalan stew with llata and moixernons step by step" title="Authentic veal fricandó recipe — traditional Catalan stew with llata and moixernons step by step"
              className="w-full h-full object-cover" width={1200} height={500} loading="eager" fetchPriority="high" />
          </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Authentic veal fricandó recipe — traditional Catalan stew with llata and moixernons step by step</figcaption>
          </figure>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">The best veal fricandó recipe with all the tips and tricks to make it perfect, from how to buy the meat to the type of mushrooms you can use.</p>
        </header>

        <section id="recipe" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">AUTHENTIC veal fricandó</h2>
          <p className="text-foreground/90 leading-relaxed">A traditional Catalan dish combining tender veal with <strong>perrechicos (moixernons)</strong> in a deep onion and rancid-wine sofrito. Comfort food at its finest.</p>
        </section>

        <section id="ingredients" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Ingredients</h2>
          <ul className="grid md:grid-cols-2 gap-3 list-none">
            {ingredients.map((ing) => (<li key={ing} className="flex items-start gap-2 text-foreground/90"><span className="text-gold shrink-0">•</span> {ing}</li>))}
          </ul>
        </section>

        <section id="best-parts" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">The best parts of the veal for fricandó</h2>
          <h3 className="font-cormorant text-2xl font-light mt-6 mb-4">The butcher's can or sirloin steak</h3>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <h4 className="font-semibold text-lg">What is the butcher's can or sirloin?</h4>
            <p>The <strong>llata</strong>, also known as «butcher's sirloin» or «poor man's sirloin», is a little-known but highly appreciated cut. Found at the upper part of the veal's shoulder, with an elongated shape and central fat vein.</p>
            <h4 className="font-semibold text-lg">What is special about the can for fricassee?</h4>
            <p>Its juiciness and natural marbling make it the <strong>ideal piece for long stews like fricandó</strong>. The fat melts during cooking, adding flavour and keeping the meat tender.</p>
            <h4 className="font-semibold text-lg">How to cook the llata for fricandó?</h4>
            <p>Cut the llata into 1cm-thick fillets. Lightly flour them before browning. This flour layer helps thicken the sauce during the long cooking.</p>
          </div>
        </section>

        <section id="steps" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Step-by-step instructions</h2>
          <ol className="space-y-4 list-decimal list-inside marker:text-gold marker:font-semibold">
            {instructions.map((step, i) => (<li key={i} className="text-foreground/90 leading-relaxed pl-2">{step}</li>))}
          </ol>
        </section>

        <section id="tips" className="mb-12 scroll-mt-20">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">Tip on traditional veal fricandó</h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-3 text-foreground/90 leading-relaxed">
            <p><strong>Rest overnight</strong>: the fricandó is even better the next day. Let it rest 24 hours in the fridge for optimal flavour development through osmosis.</p>
            <p><strong>Quality matters</strong>: choose meat with good color and fat infiltration. Use perrechicos or trumpet mushrooms (ensure no sand).</p>
            <p><strong>Serving</strong>: pair with neutral garnishes like white rice or potatoes — they let the stew's flavour shine.</p>
          </div>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">Related posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/the-best-restaurants-with-tasting-menu-in-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Best tasting menus Barcelona</p>
              <p className="text-sm text-muted-foreground">Try Catalan cuisine in restaurants.</p>
            </Link>
            <Link href="/clandestine-dinner-barcelona" className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition">
              <p className="font-semibold text-gold mb-2">→ Clandestine dinner Barcelona</p>
              <p className="text-sm text-muted-foreground">Live a unique Catalan experience.</p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
