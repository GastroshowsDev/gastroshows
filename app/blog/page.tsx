import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog Gastronómico Barcelona · Recetas, Guías y Experiencias | GastroShows",
  description:
    "Recetas tradicionales catalanas, guías de menús degustación, restaurantes Michelin y experiencias gastronómicas en Barcelona. El blog de GastroShows.",
  keywords: [
    "blog gastronómico barcelona",
    "recetas catalanas",
    "menú degustación barcelona",
    "restaurantes michelin barcelona",
    "cena clandestina barcelona",
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/blog",
    languages: {
      es: "https://gastroshows.es/blog",
      ca: "https://gastroshows.es/ca/blog",
      en: "https://gastroshows.es/en/blog",
      "x-default": "https://gastroshows.es/blog",
    },
  },
  openGraph: {
    title: "Blog Gastronómico Barcelona | GastroShows",
    description:
      "Recetas, guías de menús degustación, restaurantes Michelin y experiencias gastronómicas en Barcelona.",
    url: "https://gastroshows.es/blog",
    type: "website",
    locale: "es_ES",
  },
};

export default function BlogPage() {
  return <BlogIndex locale="es" />;
}
