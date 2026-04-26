import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PendingReservationsPanel } from "@/components/admin/PendingReservationsPanel";
import { RecentActivityFeed } from "@/components/admin/RecentActivityFeed";
import { TablesLiveBoard } from "@/components/admin/TablesLiveBoard";
import { SalaBoard } from "@/components/admin/SalaBoard";
import {
  getRecentReservationsForLive,
  getReservationsForServiceDay,
  getCheckedInReservations,
  toLiveReservationRows,
} from "@/lib/admin/live-data";

export const dynamic = "force-dynamic";

function todayYmd(): string {
  return new Date().toISOString().slice(0, 10);
}

export default async function AdminLivePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; defaultVenue?: string | null } | undefined;
  const role = user?.role ?? "LIVE";
  const defaultVenue = (user?.defaultVenue ?? null) as "BERTRAND" | "URGELL" | null;

  const date = todayYmd();
  const shift = "NIGHT" as const;

  const [recentRaw, eventRaw, checkedInRaw] = await Promise.all([
    getRecentReservationsForLive(40),
    getReservationsForServiceDay(date, shift),
    getCheckedInReservations(),
  ]);

  const recent = toLiveReservationRows(recentRaw);
  const eventRows = eventRaw === null ? [] : toLiveReservationRows(eventRaw);
  const checkedIn = toLiveReservationRows(checkedInRaw);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">Panel en vivo</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Confirma reservas entrantes, asigna local y gestiona el servicio del día.
          </p>
        </header>

        {/* Pending reservations — admin only */}
        {role === "ADMIN" && <PendingReservationsPanel />}

        {/* Recepción + Actividad reciente (swapped) */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-base font-medium">Recepción</h2>
            <TablesLiveBoard
              initialShift={shift}
              initialItems={eventRows}
              defaultVenue={defaultVenue}
            />
          </section>
          <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-base font-medium">Actividad reciente</h2>
            <RecentActivityFeed initialItems={recent} />
          </section>
        </div>

        {/* Sala — full width */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium">Sala</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Reservas con check-in activo — {checkedIn.length} {checkedIn.length === 1 ? "mesa" : "mesas"}
              </p>
            </div>
          </div>
          <SalaBoard initialItems={checkedIn} />
        </section>
      </div>
    </div>
  );
}
