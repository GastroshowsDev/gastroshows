import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TABLE_LABELS: Record<string, string> = {
  Customer: "Clientes",
  Reservation: "Reservas",
  Event: "Eventos",
  Venue: "Locales",
  GiftVoucher: "Bonos regalo",
  PaymentSplit: "Pagos",
  EmailQueue: "Cola de emails",
  EmailTemplate: "Plantillas email",
  User: "Usuarios",
  Campaign: "Promociones",
  Backup: "Backups",
  PasswordResetToken: "Tokens reset",
};

export async function GET() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") return NextResponse.json({ ok: false }, { status: 403 });

  const [dbSizeRows, tableRows, cacheRows, connRows] = await Promise.all([
    prisma.$queryRaw<[{ size: string }]>`
      SELECT pg_size_pretty(pg_database_size(current_database())) AS size
    `,
    prisma.$queryRaw<Array<{
      table_name: string;
      total_size: string;
      row_count: bigint;
      dead_rows: bigint;
      last_autovacuum: Date | null;
      last_autoanalyze: Date | null;
    }>>`
      SELECT
        relname                                            AS table_name,
        pg_size_pretty(pg_total_relation_size(relid))      AS total_size,
        n_live_tup                                         AS row_count,
        n_dead_tup                                         AS dead_rows,
        last_autovacuum,
        last_autoanalyze
      FROM pg_stat_user_tables
      ORDER BY pg_total_relation_size(relid) DESC
    `,
    prisma.$queryRaw<[{ ratio: number | null }]>`
      SELECT round(
        100.0 * sum(heap_blks_hit) /
        NULLIF(sum(heap_blks_hit) + sum(heap_blks_read), 0)
      , 1) AS ratio
      FROM pg_statio_user_tables
    `,
    prisma.$queryRaw<[{ count: bigint }]>`
      SELECT count(*) AS count
      FROM pg_stat_activity
      WHERE datname = current_database()
    `,
  ]);

  return NextResponse.json({
    ok: true,
    data: {
      dbSize: dbSizeRows[0]?.size ?? "—",
      cacheHitRatio: cacheRows[0]?.ratio ?? null,
      activeConnections: Number(connRows[0]?.count ?? 0),
      tables: tableRows.map((t) => ({
        name: t.table_name,
        label: TABLE_LABELS[t.table_name] ?? t.table_name,
        size: t.total_size,
        rowCount: Number(t.row_count),
        deadRows: Number(t.dead_rows),
        lastAutovacuum: t.last_autovacuum?.toISOString() ?? null,
        lastAutoanalyze: t.last_autoanalyze?.toISOString() ?? null,
      })),
    },
  });
}
