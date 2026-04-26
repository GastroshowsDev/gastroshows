import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body inválido" }, { status: 400 });
  }

  const { capacity, rules } = body as {
    capacity?: number;
    rules?: Record<string, unknown>;
  };

  if (capacity !== undefined && (typeof capacity !== "number" || capacity < 1)) {
    return NextResponse.json(
      { ok: false, error: "La capacidad debe ser un número positivo" },
      { status: 400 },
    );
  }

  try {
    const existing = await prisma.venue.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ ok: false, error: "Local no encontrado" }, { status: 404 });
    }

    const updated = await prisma.venue.update({
      where: { id },
      data: {
        ...(capacity !== undefined ? { capacity } : {}),
        ...(rules !== undefined
          ? { rules: { ...(existing.rules as Record<string, unknown>), ...rules } as Prisma.InputJsonValue }
          : {}),
      },
    });

    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    console.error("[api] PATCH /admin/venues/[id] failed:", err);
    return NextResponse.json({ ok: false, error: "Error al actualizar el local" }, { status: 500 });
  }
}
