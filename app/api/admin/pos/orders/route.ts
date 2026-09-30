import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePosOperator } from "@/lib/tpv-auth";

function todayRange(now: Date): { start: Date; end: Date } {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

type IncomingLine = { productId?: string; productName?: string; unitPrice?: number; qty?: number };

// GET /api/admin/pos/orders?venueId=&reservationId= → comandas del día
export async function GET(request: Request) {
  const auth = await requirePosOperator(request);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const venueId = searchParams.get("venueId");
  const reservationId = searchParams.get("reservationId");
  if (!venueId) {
    return NextResponse.json({ ok: false, error: "venueId requerido" }, { status: 400 });
  }

  try {
    const { start, end } = todayRange(new Date());
    const orders = await prisma.posOrder.findMany({
      where: {
        venueId,
        status: { not: "CANCELLED" },
        createdAt: { gte: start, lt: end },
        ...(reservationId ? { reservationId } : {}),
      },
      orderBy: { createdAt: "asc" },
      include: {
        lines: { orderBy: { createdAt: "asc" } },
        openedBy: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json({ ok: true, data: orders });
  } catch (err) {
    console.error("[pos/orders] GET error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// POST /api/admin/pos/orders → crear comanda
export async function POST(request: Request) {
  const auth = await requirePosOperator(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as {
      venueId?: string; reservationId?: string; dinerName?: string;
      eventId?: string; openedById?: string; lines?: IncomingLine[];
    };

    const venueId = body.venueId?.trim();
    const dinerName = body.dinerName?.trim();
    const lines = (body.lines ?? []).filter(
      (l) => l && typeof l.qty === "number" && l.qty >= 1 && typeof l.productId === "string",
    );
    if (!venueId || !dinerName || lines.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Sala, comensal y al menos una línea requeridos" },
        { status: 400 },
      );
    }

    const venue = await prisma.venue.findUnique({ where: { id: venueId }, select: { id: true } });
    if (!venue) {
      return NextResponse.json({ ok: false, error: "Sala no válida" }, { status: 400 });
    }

    const productIds = [...new Set(lines.map((l) => l.productId as string))];
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, active: true },
    });
    const byId = new Map(products.map((p) => [p.id, p]));
    const missing = productIds.filter((id) => !byId.has(id));
    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, error: "Algún producto ya no está disponible en carta" },
        { status: 409 },
      );
    }

    const order = await prisma.posOrder.create({
      data: {
        venueId,
        reservationId: body.reservationId || null,
        eventId: body.eventId || null,
        dinerName,
        openedById: body.openedById || null,
        lines: {
          create: lines.map((l) => {
            const p = byId.get(l.productId as string);
            if (!p) throw new Error("Producto no encontrado");
            return {
              productId: p.id,
              productName: p.name,
              unitPrice: p.price,
              qty: Math.min(Math.floor(l.qty as number), 99),
            };
          }),
        },
      },
      include: { lines: true },
    });

    return NextResponse.json({ ok: true, data: order }, { status: 201 });
  } catch (err) {
    console.error("[pos/orders] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// PATCH /api/admin/pos/orders → añadir líneas o cambiar estado
export async function PATCH(request: Request) {
  const auth = await requirePosOperator(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as {
      orderId?: string; addLines?: IncomingLine[]; status?: "OPEN" | "CLOSED" | "CANCELLED";
    };
    if (!body.orderId) {
      return NextResponse.json({ ok: false, error: "orderId requerido" }, { status: 400 });
    }

    const order = await prisma.posOrder.findUnique({ where: { id: body.orderId } });
    if (!order) {
      return NextResponse.json({ ok: false, error: "Comanda no encontrada" }, { status: 404 });
    }
    if (order.status !== "OPEN") {
      return NextResponse.json({ ok: false, error: "La comanda ya está cerrada" }, { status: 409 });
    }

    const addLines = (body.addLines ?? []).filter(
      (l) => l && typeof l.qty === "number" && l.qty >= 1 && typeof l.productId === "string",
    );
    if (addLines.length > 0) {
      const productIds = [...new Set(addLines.map((l) => l.productId as string))];
      const products = await prisma.product.findMany({
        where: { id: { in: productIds }, active: true },
      });
      const byId = new Map(products.map((p) => [p.id, p]));
      await prisma.posOrderLine.createMany({
        data: addLines.map((l) => {
          const p = byId.get(l.productId as string);
          if (!p) throw new Error("Producto no encontrado");
          return {
            orderId: body.orderId as string,
            productId: p.id,
            productName: p.name,
            unitPrice: p.price,
            qty: Math.min(Math.floor(l.qty as number), 99),
          };
        }),
      });
    }

    const updated = await prisma.posOrder.update({
      where: { id: body.orderId },
      data: body.status ? { status: body.status } : {},
      include: { lines: { orderBy: { createdAt: "asc" } } },
    });
    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    console.error("[pos/orders] PATCH error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
