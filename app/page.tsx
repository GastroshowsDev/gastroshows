import { LandingPage } from "@/components/home/LandingPage";
import { getLandingContent } from "@/lib/landing-content";

export default async function Page() {
  const content = await getLandingContent();
  return <LandingPage content={content} />;
}
