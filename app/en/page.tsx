import { LandingPage } from "@/components/home/LandingPage";
import { getLandingContent } from "@/lib/landing-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secret Dinner Barcelona · Tasting Menu · GastroShows",
  description:
    "Barcelona's most famous secret dinner. Secret location, 7-act tasting menu and full wine pairing. Receive 4 mysterious messages before discovering where you're going.",
  alternates: {
    canonical: "https://gastroshows.es/en",
    languages: {
      "es": "https://gastroshows.es",
      "ca": "https://gastroshows.es/ca",
      "en": "https://gastroshows.es/en",
    },
  },
};

export default async function EnHome() {
  const content = await getLandingContent();
  return <LandingPage content={content} />;
}
