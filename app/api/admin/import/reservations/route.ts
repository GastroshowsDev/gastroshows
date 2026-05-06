/**
 * POST /api/admin/import/reservations
 *
 * Bulk import of reservations from a parsed XLSX file.
 * Body: { rows: ImportRow[] }
 *
 * Each ImportRow has normalised field names after client-side column mapping.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { apiErrorResponse } from "@/lib/api-errors";

export type ImportRow = {
  id?: string;        // Optional: reservation ID for UPSERT (update if exists)
  name: string;
  email?: string;
  phone?: string;
  allergies?: string;
  comments?: string;
  date: string;      // YYYY-MM-DD
  shift: "NOON" | "NIGHT";
  guests: number;
  totalAmount?: number;
  paidAmount?: number;
  status?: "PENDING" | "CONFIRMED" | "CANCELLED";
  type?: "NORMAL" | "GIFT";
  venueName?: string | null;
};

type Result = { ok: true; created: number; updated: number; skipped: number; errors: string[] };

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  let body: { rows: ImportRow[] };
  try {
    body = await req.json() as { rows: ImportRow[] };
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_INPUT", error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { rows } = body;
  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json(
      { ok: false, code: "INVALID_INPUT", error: "No rows provided" },
      { status: 400 }
    );
  }

  // Validate size limits
  if (rows.length > 1000) {
    return NextResponse.json(
      { ok: false, code: "TOO_LARGE", error: "Maximum 1000 rows per import" },
      { status: 400 }
    );
  }

  // Check for duplicate emails within the batch
  const emails = rows
    .map((r) => r.email?.toLowerCase().trim())
    .filter(Boolean) as string[];
  const dupes = emails.filter((e, i) => emails.indexOf(e) !== i);
  if (dupes.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        code: "CONFLICT",
        error: `Duplicate emails in batch: ${dupes.slice(0, 5).join(", ")}${dupes.length > 5 ? "..." : ""}`,
      },
      { status: 400 }
    );
  }

  // Pre-fetch venues
  const venues = await prisma.venue.findMany({ select: { id: true, name: true } });
  const venueMap = new Map(venues.map((v) => [v.name as string, v.id]));

  let created = 0;
  let updated = 0;
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowLabel = `Fila ${i + 2}`; // +2 for 1-based + header

    try {
      if (!row.name?.trim()) { errors.push(`${rowLabel}: falta el nombre`); continue; }
      if (!row.date) { errors.push(`${rowLabel}: falta la fecha`); continue; }
      if (!row.shift) { errors.push(`${rowLabel}: falta el turno`); continue; }
      if (!row.guests || row.guests < 1) { errors.push(`${rowLabel}: personas inválidas`); continue; }

      // If row has ID, this is an update (from exported file)
      if (row.id) {
        const existingRes = await prisma.reservation.findUnique({ where: { id: row.id } });
        if (!existingRes) {
          errors.push(`${rowLabel}: Reservation ID ${row.id} not found`);
          continue;
        }

        // Update existing reservation
        const eventDate = new Date(`${row.date}T12:00:00Z`);
        const event = await prisma.event.upsert({
          where: { date_shift: { date: eventDate, shift: row.shift } },
          update: {},
          create: { date: eventDate, shift: row.shift, totalGuests: 0 },
        });

        const venueId = row.venueName ? (venueMap.get(row.venueName) ?? null) : existingRes.venueId;

        await prisma.reservation.update({
          where: { id: row.id },
          data: {
            guests: row.guests,
            totalAmount: row.totalAmount ?? existingRes.totalAmount,
            paidAmount: row.paidAmount ?? existingRes.paidAmount,
            status: row.status ?? existingRes.status,
            type: row.type ?? existingRes.type,
            venueId,
            eventId: event.id,
          },
        });

        // Also update customer info if provided
        if (existingRes.customerId) {
          await prisma.customer.update({
            where: { id: existingRes.customerId },
            data: {
              name: row.name.trim(),
              ...(row.phone && { phone: row.phone.trim() }),
              ...(row.allergies && { allergies: row.allergies.trim() }),
              ...(row.comments && { comments: row.comments.trim() }),
            },
          });
        }

        updated++;
        continue;
      }

      const eventDate = new Date(`${row.date}T12:00:00Z`);
      if (isNaN(eventDate.getTime())) { errors.push(`${rowLabel}: fecha inválida (${row.date})`); continue; }

      // Find existing customer by email, or create new
      let customer;
      const email = row.email?.trim().toLowerCase();
      if (email) {
        const existing = await prisma.customer.findFirst({ where: { email } });
        if (existing) {
          customer = await prisma.customer.update({
            where: { id: existing.id },
            data: {
              name: row.name.trim(),
              ...(row.phone && { phone: row.phone.trim() }),
              ...(row.allergies && { allergies: row.allergies.trim() }),
              ...(row.comments && { comments: row.comments.trim() }),
            },
          });
        } else {
          customer = await prisma.customer.create({
            data: {
              name: row.name.trim(),
              email,
              phone: row.phone?.trim() ?? "",
              allergies: row.allergies?.trim() || null,
              comments: row.comments?.trim() || null,
            },
          });
        }
      } else {
        customer = await prisma.customer.create({
          data: {
            name: row.name.trim(),
            email: `import_${Date.now()}_${i}@placeholder.local`,
            phone: row.phone?.trim() ?? "",
            allergies: row.allergies?.trim() || null,
            comments: row.comments?.trim() || null,
          },
        });
      }

      // Find or create event
      const event = await prisma.event.upsert({
        where: { date_shift: { date: eventDate, shift: row.shift } },
        update: {},
        create: { date: eventDate, shift: row.shift, totalGuests: 0 },
      });

      // Resolve venue
      const venueId = row.venueName ? (venueMap.get(row.venueName) ?? null) : null;

      const totalAmount = row.totalAmount ?? 0;
      const paidAmount = row.paidAmount ?? (row.type === "GIFT" ? totalAmount : 0);

      await prisma.reservation.create({
        data: {
          customerId: customer.id,
          eventId: event.id,
          venueId,
          guests: row.guests,
          type: row.type ?? "NORMAL",
          totalAmount,
          paidAmount,
          status: row.status ?? (paidAmount >= totalAmount && totalAmount > 0 ? "CONFIRMED" : "PENDING"),
        },
      });

      created++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${rowLabel}: ${msg}`);
    }
  }

  console.info(`[import/reservations] created=${created} updated=${updated} errors=${errors.length} total=${rows.length}`);
  const result: Result = { ok: true, created, updated, skipped: rows.length - created - updated - errors.length, errors };
  return NextResponse.json(result);
}
