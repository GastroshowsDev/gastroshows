import { getLandingContent } from "@/lib/landing-content";
import { EventosPage } from "@/components/home/EventosPage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getLandingContent();
  return <EventosPage content={content} />;
}
