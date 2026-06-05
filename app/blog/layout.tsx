import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Gastronómico · GastroShows Barcelona",
  description:
    "Blog de gastronomía de GastroShows. Recetas catalanas, guías de restaurantes Barcelona, maridajes, experiencias gastronómicas y todo sobre la cena clandestina más famosa de la ciudad.",
  keywords:
    "blog gastronomia barcelona, recetas catalanas, guia restaurantes barcelona, menu degustacion, cena clandestina barcelona",
  alternates: {
    canonical: "https://gastroshows.es/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
