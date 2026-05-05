/**
 * POST /api/admin/import/contacts
 *
 * Bulk import of contacts from a parsed XLSX file.
 * Body: { rows: ContactImportRow[] }
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export type ContactImportRow = {
  name: string;
  email?: string;
  phone?: string;
  allergies?: string;
  comments?: string;
  previousVisit?: boolean;
  newsletter?: boolean;
  source?: string;
};

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  let body: { rows: ContactImportRow[] };
  try {
    body = await req.json() as { rows: ContactImportRow[] };
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const { rows } = body;
  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ ok: false, error: "Sin filas" }, { status: 400 });
  }

  let created = 0;
  let updated = 0;
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowLabel = `Fila ${i + 2}`;

    try {
      if (!row.name?.trim()) { errors.push(`${rowLabel}: falta el nombre`); continue; }

      if (row.email?.trim()) {
        const existing = await prisma.customer.findFirst({
          where: { email: row.email.trim().toLowerCase() },
          select: { id: true },
        });
        if (existing) {
          await prisma.customer.update({
            where: { id: existing.id },
            data: {
              name: row.name.trim(),
              ...(row.phone && { phone: row.phone.trim() }),
              ...(row.allergies !== undefined && { allergies: row.allergies.trim() || null }),
              ...(row.comments !== undefined && { comments: row.comments.trim() || null }),
              ...(row.previousVisit !== undefined && { previousVisit: row.previousVisit }),
              ...(row.newsletter !== undefined && { newsletter: row.newsletter }),
              ...(row.source && { source: row.source.trim() }),
            },
          });
          updated++;
          continue;
        }
      }

      await prisma.customer.create({
        data: {
          name: row.name.trim(),
          email: row.email?.trim().toLowerCase() ?? `import_${Date.now()}_${i}@placeholder.local`,
          phone: row.phone?.trim() ?? "",
          allergies: row.allergies?.trim() || null,
          comments: row.comments?.trim() || null,
          previousVisit: row.previousVisit ?? false,
          newsletter: row.newsletter ?? false,
          source: row.source?.trim() || null,
        },
      });
      created++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${rowLabel}: ${msg}`);
    }
  }

  console.info(`[import/contacts] created=${created} updated=${updated} errors=${errors.length}`);
  return NextResponse.json({ ok: true, created, updated, errors });
}
