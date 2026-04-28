import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formatInTimeZone } from "date-fns-tz";

const BARCELONA_TZ = "Europe/Madrid";

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    if (!pin || pin.length !== 4) {
      return NextResponse.json({ ok: false, error: "PIN inválido" }, { status: 400 });
    }

    const employee = await prisma.employee.findUnique({
      where: { pin },
    });

    if (!employee || !employee.active) {
      return NextResponse.json({ ok: false, error: "Empleado no encontrado o inactivo" }, { status: 404 });
    }

    // Get current time
    const now = new Date();
    const formattedTime = formatInTimeZone(now, BARCELONA_TZ, "HH:mm");

    // Check for open time log
    const openLog = await prisma.timeLog.findFirst({
      where: {
        employeeId: employee.id,
        clockOut: null,
      },
      orderBy: { clockIn: "desc" },
    });

    if (openLog) {
      // Clock out
      await prisma.timeLog.update({
        where: { id: openLog.id },
        data: { clockOut: now },
      });
      return NextResponse.json({ 
        ok: true, 
        action: "OUT", 
        employeeName: employee.name,
        time: formattedTime 
      });
    } else {
      // Clock in
      await prisma.timeLog.create({
        data: {
          employeeId: employee.id,
          clockIn: now,
        },
      });
      return NextResponse.json({ 
        ok: true, 
        action: "IN", 
        employeeName: employee.name,
        time: formattedTime 
      });
    }

  } catch (error) {
    console.error("Fichaje error:", error);
    return NextResponse.json({ ok: false, error: "Error interno del servidor" }, { status: 500 });
  }
}
