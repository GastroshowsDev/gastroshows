import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Barcelona Gastronomy Blog · Recipes, Guides & Experiences | GastroShows",
  description:
    "Traditional Catalan recipes, tasting menu guides, Michelin restaurants and gastronomic experiences in Barcelona. The GastroShows blog.",
  keywords: [
    "barcelona gastronomy blog",
    "catalan recipes",
    "tasting menu barcelona",
    "michelin restaurants barcelona",
    "clandestine dinner barcelona",
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/en/blog",
    languages: {
      es: "https://gastroshows.es/blog",
      ca: "https://gastroshows.es/ca/blog",
      en: "https://gastroshows.es/en/blog",
      "x-default": "https://gastroshows.es/blog",
    },
  },
  openGraph: {
    title: "Barcelona Gastronomy Blog | GastroShows",
    description:
      "Recipes, tasting menu guides, Michelin restaurants and gastronomic experiences in Barcelona.",
    url: "https://gastroshows.es/en/blog",
    type: "website",
    locale: "en_GB",
  },
};

export default function EnBlogPage() {
  return <BlogIndex locale="en" />;
}
