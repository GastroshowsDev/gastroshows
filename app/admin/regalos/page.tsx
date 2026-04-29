import { GiftVouchersBoard } from "@/components/admin/GiftVouchersBoard";

export default function AdminGiftsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">Gestión de Regalos</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Seguimiento de cheques regalo vendidos, estadísticas y canjeos.
          </p>
        </header>

        <GiftVouchersBoard />
      </div>
    </div>
  );
}
