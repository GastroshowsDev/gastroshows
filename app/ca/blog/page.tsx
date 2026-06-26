import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog Gastronòmic Barcelona · Receptes, Guies i Experiències | GastroShows",
  description:
    "Receptes tradicionals catalanes, guies de menús de degustació, restaurants Michelin i experiències gastronòmiques a Barcelona. El blog de GastroShows.",
  keywords: [
    "blog gastronòmic barcelona",
    "receptes catalanes",
    "menú degustació barcelona",
    "restaurants michelin barcelona",
    "sopar clandestí barcelona",
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/ca/blog",
    languages: {
      es: "https://gastroshows.es/blog",
      ca: "https://gastroshows.es/ca/blog",
      en: "https://gastroshows.es/en/blog",
      "x-default": "https://gastroshows.es/blog",
    },
  },
  openGraph: {
    title: "Blog Gastronòmic Barcelona | GastroShows",
    description:
      "Receptes, guies de menús de degustació, restaurants Michelin i experiències gastronòmiques a Barcelona.",
    url: "https://gastroshows.es/ca/blog",
    type: "website",
    locale: "ca_ES",
  },
};

export default function CaBlogPage() {
  return <BlogIndex locale="ca" />;
}
