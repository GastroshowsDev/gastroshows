import type { Metadata } from "next";
import { RegaloClient } from "./RegaloClient";

export const metadata: Metadata = {
  title: "Regala un Sopar Clandestí Barcelona · Bo Regal Experiència Gastronòmica | GastroShows",
  description:
    "Regala l'experiència més exclusiva de Barcelona: sopar clandestí amb ubicació secreta, menú de degustació de 7 actes i maridatge premium. Bo regal digital amb validesa de 12 mesos.",
  keywords:
    "regalar sopar barcelona, bo regal experiència gastronòmica, targeta regal restaurant barcelona, regal sopar per a dos, regalar menú degustació barcelona",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://gastroshows.es/ca/regalo",
    languages: {
      es: "https://gastroshows.es/regalo",
      ca: "https://gastroshows.es/ca/regalo",
      "x-default": "https://gastroshows.es/regalo",
    },
  },
  openGraph: {
    title: "Regala una Experiència Gastronòmica Única a Barcelona | GastroShows",
    description:
      "Sopar clandestí, ubicació secreta, menú de 7 actes, maridatge premium. El regal que ningú oblida.",
    url: "https://gastroshows.es/ca/regalo",
    type: "website",
    locale: "ca_ES",
  },
};

export default function CaRegaloPage() {
  return <RegaloClient />;
}
