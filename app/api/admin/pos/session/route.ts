import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signOperatorToken } from "@/lib/tpv-token";

// POST /api/admin/pos/session { pin } → identifica al operario del TPV.
export async function POST(request: Request) {
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
      },
    });

    if (!employee || !employee.active) {
      return NextResponse.json({ ok: false, error: "PIN no válido o empleado inactivo" }, { status: 401 });
    }

    const token = signOperatorToken({ id: employee.id, name: employee.name });
    return NextResponse.json({ ok: true, data: { id: employee.id, name: employee.name, token } });
  } catch (err) {
    console.error("[pos/session] POST error:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
