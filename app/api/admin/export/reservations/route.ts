import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

/**
 * Export all reservations as CSV with ID for re-import/update
 * Each row has a unique reservation ID for idempotent updates
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    // Get query params for filtering
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50000"), 50000);

    // Fetch reservations with relations
    const reservations = await prisma.reservation.findMany({
      where: {
        ...(status && { status }),
      },
      include: {
        customer: true,
        event: true,
        venue: true,
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Convert to CSV format
    const headers = [
      "id",
      "name",
      "email",
      "phone",
      "guests",
      "date",
      "shift",
      "totalAmount",
      "paidAmount",
      "status",
      "type",
      "venue",
      "allergies",
      "comments",
      "createdAt",
    ];

    const rows = reservations.map((r) => [
      r.id, // Unique ID for updates
      r.customer.name,
      r.customer.email,
      r.customer.phone,
      r.guests.toString(),
      r.event?.date ? r.event.date.toISOString().split("T")[0] : "",
      r.event?.shift || "",
      r.totalAmount.toString(),
      r.paidAmount.toString(),
      r.status,
      r.type,
      r.venue?.name || "",
      r.customer.allergies || "",
      r.comments || "",
      r.createdAt.toISOString(),
    ]);

    // Build CSV
    const csv =
      headers.join(",") +
      "\n" +
      rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    // Return as downloadable file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="reservations-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (err: unknown) {
    console.error("[export/reservations]", err);
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", error: "Failed to export reservations" },
      { status: 500 }
    );
  }
}
