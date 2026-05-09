import { prisma } from "@/lib/prisma";
import { LandingPage } from "@/components/home/LandingPage";
import { getLandingContent } from "@/lib/landing-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sopar Clandestí Barcelona · Menú Degustació · GastroShows",
  description:
    "El sopar clandestí més famós de Barcelona. Ubicació secreta, menú degustació de 7 actes i maridatge complet. Rep 4 missatges misteriosos i descobreix on vas.",
  alternates: {
    canonical: "https://gastroshows.es/ca",
    languages: {
      "es": "https://gastroshows.es",
      "ca": "https://gastroshows.es/ca",
      "en": "https://gastroshows.es/en",
    },
  },
};

export default async function CaHome() {
  const content = await getLandingContent();
  return <LandingPage content={content} />;
}
