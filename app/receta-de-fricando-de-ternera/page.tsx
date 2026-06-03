import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import {
  JsonLd,
  breadcrumbSchema,
  articleSchema,
  recipeSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Receta de fricandó de ternera | La auténtica receta catalana",
  description:
    "La mejor receta de fricandó de ternera con todos los trucos y consejos para que te salga perfecta: cómo comprar la carne, qué setas usar y cómo cocinarla paso a paso.",
  keywords:
    "fricandó, receta fricandó, fricandó de ternera, llata ternera, solomillo del carnicero, moixernons, receta catalana",
  authors: [{ name: "GastroShows" }],
  creator: "GastroShows",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/receta-de-fricando-de-ternera/",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://gastroshows.es/receta-de-fricando-de-ternera/",
    siteName: "GastroShows",
    title: "Receta de fricandó de ternera",
    description:
      "La auténtica receta catalana de fricandó de ternera con todos los trucos.",
  },
};

const ingredients = [
  "500g de llata o solomillo de pobre",
  "2 cebollas grandes",
  "1 vaso de vino rancio",
  "1 cabeza de ajos",
  "1 hoja de laurel",
  "80g de moixernons (perrechicos) deshidratados",
  "Aceite de oliva virgen extra",
  "Sal",
  "Harina para enharinar",
  "1 cucharada sopera de almendras en polvo",
  "2 vasos de agua",
];

const instructions = [
  "Calentar el aceite de oliva, enharinar ligeramente la carne y dorarla en la sartén. Reservar.",
  "En el mismo aceite, tostar la cebolla rallada hasta confitarla. Añadir el vino rancio y reducir para crear una base confitada.",
  "Añadir la carne reservada, el vino, la cabeza de ajos y la hoja de laurel. Dejar reducir el alcohol, cubrir con agua, añadir los moixernons y sal. Cocinar 45 minutos a fuego medio-bajo.",
  "Retirar la cabeza de ajos, extraer los dientes y volver a echarlos al guiso. Añadir las almendras en polvo. Cocinar tapado otros 45 minutos hasta que la carne esté tierna.",
];

export default function FricandoRecetaPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://gastroshows.es" },
    {
      name: "Receta de fricandó de ternera",
      url: "https://gastroshows.es/receta-de-fricando-de-ternera/",
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={articleSchema({
          title: "Receta de fricandó de ternera",
          description:
            "La mejor receta de fricandó de ternera con todos los trucos y consejos.",
          publishedAt: "2022-11-15T10:00:00+01:00",
          modifiedAt: "2026-05-14T10:00:00+01:00",
          slug: "receta-de-fricando-de-ternera",
          image: "https://gastroshows.es/images/receta-de-fricando-de-ternera/fricando-ternera-llata-cocinado.jpg",
        })}
      />
      <JsonLd
        data={recipeSchema({
          name: "Auténtico fricandó de ternera",
          description:
            "Receta tradicional catalana de fricandó de ternera con llata y moixernons.",
          prepTime: "PT15M",
          cookTime: "PT1H30M",
          recipeYield: "4 personas",
          ingredients,
          instructions,
          category: "Plato principal",
          cuisine: "Catalana",
        })}
      />

      <article className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-muted-foreground mb-6"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li>›</li>
            <li className="text-foreground/80">Receta fricandó de ternera</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light mb-6 text-center leading-tight">
            Receta de fricandó de ternera
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            La mejor receta de fricandó de ternera con todos los trucos y consejos para que te salga perfecta, es decir,
            desde cómo comprar la carne, hasta qué tipo de setas que puedes utilizar.
          </p>
        </header>

        <section id="receta" className="mb-16">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            AUTÉNTICO fricandó de ternera
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-6 items-start">
            <figure className="m-0">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/receta-de-fricando-de-ternera/fricando-ternera-llata-cocinado.jpg"
                alt="Auténtico fricandó de ternera con llata y moixernons — receta tradicional catalana" title="Auténtico fricandó de ternera con llata y moixernons — receta tradicional catalana"
                className="w-full h-full object-cover"
                width={600}
                height={400}
                loading="eager"
                fetchPriority="high"
              />
            </div>
              <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">Auténtico fricandó de ternera con llata y moixernons — receta tradicional catalana</figcaption>
            </figure>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                El fricandó es uno de los platos más emblemáticos de la cocina catalana. Una receta tradicional que
                combina ternera tierna con moixernons (perrechicos) y un sofrito de cebolla rancio que aporta una
                profundidad de sabor inigualable.
              </p>
              <p>
                <strong>Tiempo de preparación:</strong> 15 minutos
                <br />
                <strong>Tiempo de cocción:</strong> 1h 30min
                <br />
                <strong>Raciones:</strong> 4 personas
              </p>
            </div>
          </div>
        </section>

        <section id="ingredientes" className="mb-16">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Ingredientes
          </h2>
          <ul className="grid md:grid-cols-2 gap-3 list-none">
            {ingredients.map((ing) => (
              <li key={ing} className="flex items-start gap-2 text-foreground/90">
                <span className="text-gold shrink-0">•</span> {ing}
              </li>
            ))}
          </ul>
        </section>

        <section id="partes-ternera" className="mb-16">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Las mejores partes de la ternera para el fricandó
          </h2>

          <h3 className="font-cormorant text-2xl font-light mt-6 mb-4">
            La llata o el solomillo del carnicero
          </h3>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <h4 className="font-semibold text-lg">
              ¿Qué es la llata o el solomillo del carnicero?
            </h4>
            <p>
              La <strong>llata</strong>, también conocida como «solomillo del carnicero» o «solomillo de pobre», es una
              pieza poco conocida pero muy apreciada. Se encuentra en la parte superior de la espalda de la ternera y se
              caracteriza por su forma alargada y su veta de grasa central.
            </p>

            <h4 className="font-semibold text-lg">
              ¿Qué particularidad tiene la llata para el fricandó?
            </h4>
            <p>
              Su jugosidad y veteado natural hacen que sea <strong>la pieza ideal para guisos largos como el fricandó</strong>.
              La grasa se funde durante la cocción, aportando sabor y manteniendo la carne tierna.
            </p>

            <h4 className="font-semibold text-lg">¿Cómo cocinar la llata para el fricandó?</h4>
            <p>
              Corta la llata en filetes de aproximadamente 1 cm de grosor. Enharínalos ligeramente antes de dorarlos en
              la sartén. Esta capa de harina ayudará a espesar la salsa durante la cocción larga.
            </p>
          </div>
        </section>

        <section id="instrucciones" className="mb-16">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Pasos para preparar el fricandó
          </h2>
          <ol className="space-y-4 list-decimal list-inside marker:text-gold marker:font-semibold">
            {instructions.map((step, i) => (
              <li key={i} className="text-foreground/90 leading-relaxed pl-2">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section id="consejo" className="mb-16">
          <h2 className="font-cormorant text-3xl font-light mt-8 mb-6">
            Consejo sobre el fricandó de ternera tradicional
          </h2>
          <div className="bg-gold/10 border-l-4 border-gold p-6 rounded space-y-3 text-foreground/90 leading-relaxed">
            <p>
              <strong>Prepáralo con antelación:</strong> el fricandó está aún más rico al día siguiente. Déjalo reposar
              24 horas en la nevera para que los sabores se asienten y la carne quede aún más jugosa.
            </p>
            <p>
              <strong>Producto de calidad:</strong> usa una carne con buen color y grasa entreverada. La diferencia se
              nota en el plato final.
            </p>
            <p>
              <strong>Acompañamiento:</strong> sirve con guarniciones neutras como arroz blanco o patatas. Dejan
              protagonismo al sabor del guiso.
            </p>
          </div>
        </section>

        <section className="bg-muted/40 rounded-lg p-8 my-12">
          <h2 className="font-cormorant text-2xl font-light mb-8">
            Posts relacionados
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/mejores-restaurantes-menu-degustacion-barcelona/"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → Los mejores restaurantes con menú degustación Barcelona
              </p>
              <p className="text-sm text-muted-foreground">
                Los mejores menús degustación de Barcelona.
              </p>
            </Link>
            <Link
              href="/cena-clandestina"
              className="block p-5 rounded border border-border hover:border-gold hover:bg-gold/5 transition"
            >
              <p className="font-semibold text-gold mb-2">
                → La Cena Clandestina
              </p>
              <p className="text-sm text-muted-foreground">
                Vive una experiencia gastronómica catalana única.
              </p>
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
