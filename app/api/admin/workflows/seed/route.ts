import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAIN_STEPS = JSON.parse(JSON.stringify([
  { type: "email",             templateKey: "BIENVENIDA_RESERVA",      label: "Bienvenida y próximos pasos" },
  { type: "waitUntilRelative", daysBeforeEvent: 14,                    label: "Esperar hasta 2 semanas antes" },
  { type: "email",             templateKey: "RECORDATORIO_2_SEMANAS",  label: "Recordatorio 2 semanas antes" },
  { type: "waitUntilRelative", daysBeforeEvent: 3,                     label: "Esperar hasta D-3" },
  { type: "venueEmail",        bertrandKey: "D3_BERTRAND", urgellKey: "D3_URGELL", label: "Email D-3 (según local)" },
  { type: "wait",              delayDays: 1,                           label: "Esperar 1 día" },
  { type: "venueEmail",        bertrandKey: "D2_BERTRAND", urgellKey: "D2_URGELL", label: "Email D-2 (según local)" },
  { type: "wait",              delayDays: 1,                           label: "Esperar 1 día" },
  { type: "venueEmail",        bertrandKey: "D1_BERTRAND", urgellKey: "D1_URGELL", label: "Email D-1 (según local)" },
  { type: "wait",              delayDays: 1,                           label: "Esperar 1 día" },
  { type: "venueEmail",        bertrandKey: "D0_BERTRAND", urgellKey: "D0_URGELL", label: "Email día del evento" },
]));

export async function POST() {
  try {
    const existing = await prisma.workflow.findFirst({
      where: { trigger: "RESERVATION_CONFIRMED" },
    });

    if (existing) {
      return NextResponse.json({
        ok: true,
        created: false,
        message: "El flujo ya existe",
        id: existing.id,
      });
    }

    const workflow = await prisma.workflow.create({
      data: {
        name: "Flujo Principal de Reservas",
        trigger: "RESERVATION_CONFIRMED",
        description: "Bienvenida inmediata + recordatorio D-14 + secuencia diaria D-3 a D-0 segun local",
        active: true,
        steps: MAIN_STEPS,
      },
    });

    return NextResponse.json({ ok: true, created: true, id: workflow.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[workflows/seed] Error:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
