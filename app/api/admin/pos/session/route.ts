import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-helpers";

// POST /api/admin/pos/session { pin } → identifica al operario del TPV.
// Reutiliza el PIN de empleado (decisión feature #13). Requiere sesión (ADMIN o LIVE).
export async function POST(request: Request) {
  const auth = await requireStaff();
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as { pin?: string };
    const pin = (body.pin ?? "").replace(/\D/g, "");
    if (pin.length !== 4) {
      return NextResponse.json({ ok: false, error: "PIN inválido" }, { status: 400 });
    }

    const employee = await prisma.employee.findUnique({
      where: { pin },
      select: {
        id: true,
        name: true,
        active: true,
        user: { select: { id: true, name: true, role: true } },
      },
    });

    if (!employee || !employee.active) {
      return NextResponse.json({ ok: false, error: "PIN no válido o empleado inactivo" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: employee });
  } catch (err) {
    console.error("[pos/session] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
