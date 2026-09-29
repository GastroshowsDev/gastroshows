import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-helpers";

// POST /api/admin/pos/products { categoryId, name, price, description? }
export async function POST(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;
  if (auth.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      categoryId?: string; name?: string; price?: number; description?: string;
    };
    const name = body.name?.trim();
    const price = Number(body.price);
    if (!body.categoryId || !name || !Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ ok: false, error: "Categoría, nombre y precio válido requeridos" }, { status: 400 });
    }
    const max = await prisma.product.aggregate({
      where: { categoryId: body.categoryId },
      _max: { order: true },
    });
    const product = await prisma.product.create({
      data: {
        categoryId: body.categoryId,
        name,
        price: price.toFixed(2),
        description: body.description?.trim() || null,
        order: (max._max.order ?? -1) + 1,
      },
    });
    return NextResponse.json({ ok: true, data: product }, { status: 201 });
  } catch (err) {
    console.error("[pos/products] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// PUT /api/admin/pos/products { id, name?, price?, description?, active?, order?, categoryId? }
export async function PUT(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;
  if (auth.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      id?: string; name?: string; price?: number; description?: string | null;
      active?: boolean; order?: number; categoryId?: string;
    };
    if (!body.id) {
      return NextResponse.json({ ok: false, error: "ID requerido" }, { status: 400 });
    }
    const data: Record<string, unknown> = {};
    if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim();
    if (typeof body.price === "number" && Number.isFinite(body.price) && body.price > 0) {
      data.price = body.price.toFixed(2);
    }
    if (body.description !== undefined) data.description = body.description?.trim() || null;
    if (typeof body.active === "boolean") data.active = body.active;
    if (typeof body.order === "number") data.order = body.order;
    if (typeof body.categoryId === "string" && body.categoryId) data.categoryId = body.categoryId;
    const product = await prisma.product.update({ where: { id: body.id }, data });
    return NextResponse.json({ ok: true, data: product });
  } catch (err) {
    console.error("[pos/products] PUT error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// DELETE /api/admin/pos/products?id= → borrado real (el historial conserva snapshot)
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
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
