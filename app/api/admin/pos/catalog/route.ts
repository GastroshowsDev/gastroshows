import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-helpers";

// GET /api/admin/pos/catalog?activeOnly=1 → categorías con productos
export async function GET(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get("activeOnly") === "1";

  const categories = await prisma.productCategory.findMany({
    where: activeOnly ? { active: true } : undefined,
    orderBy: { order: "asc" },
    include: {
      products: {
        where: activeOnly ? { active: true } : undefined,
        orderBy: { order: "asc" },
      },
    },
  });
  return NextResponse.json({ ok: true, data: categories });
}

// POST /api/admin/pos/catalog { name } → crear categoría
export async function POST(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;
  if (auth.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { name?: string };
    const name = body.name?.trim();
    if (!name) {
      return NextResponse.json({ ok: false, error: "Nombre requerido" }, { status: 400 });
    }
    const max = await prisma.productCategory.aggregate({ _max: { order: true } });
    const category = await prisma.productCategory.create({
      data: { name, order: (max._max.order ?? -1) + 1 },
    });
    return NextResponse.json({ ok: true, data: category }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Unique constraint")) {
      return NextResponse.json({ ok: false, error: "Ya existe una categoría con ese nombre" }, { status: 409 });
    }
    console.error("[pos/catalog] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// PATCH /api/admin/pos/catalog { id, name?, active?, order? }
export async function PATCH(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;
  if (auth.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { id?: string; name?: string; active?: boolean; order?: number };
    if (!body.id) {
      return NextResponse.json({ ok: false, error: "ID requerido" }, { status: 400 });
    }
    const data: { name?: string; active?: boolean; order?: number } = {};
    if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim();
    if (typeof body.active === "boolean") data.active = body.active;
    if (typeof body.order === "number") data.order = body.order;
    const category = await prisma.productCategory.update({ where: { id: body.id }, data });
    return NextResponse.json({ ok: true, data: category });
  } catch (err) {
    console.error("[pos/catalog] PATCH error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// DELETE /api/admin/pos/catalog?id= → solo si no tiene productos
export async function DELETE(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;
  if (auth.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "ID requerido" }, { status: 400 });
  }
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) {
    return NextResponse.json(
      { ok: false, error: `No se puede eliminar: tiene ${count} producto(s). Desactívalos o muévelos primero.` },
      { status: 400 },
    );
  }
  await prisma.productCategory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
