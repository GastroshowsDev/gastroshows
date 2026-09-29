import { prisma } from "@/lib/prisma";
import { TpvClient } from "@/components/admin/TpvClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "TPV | GastroShows",
};

async function getVenues() {
  const venues = await prisma.venue.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, capacity: true },
  });
  return venues;
}

export default async function TpvPage() {
  const venues = await getVenues();
  return <TpvClient venues={venues} />;
}
