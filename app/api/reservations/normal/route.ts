import { NextRequest, NextResponse } from "next/server";

import {
  amountDueNow30Pct,
  calculateTotalAmountWithDiscounts,
  normalReservationSchema,
  validateServiceDate,
} from "@/lib/booking";
import { prisma } from "@/lib/prisma";
import { buildRedsysFormData, reservationToOrderId } from "@/lib/redsys";
import { rateLimit } from "@/lib/rate-limit";
import { ApiError, apiErrorResponse } from "@/lib/api-errors";

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per 60 seconds per IP
  const { success } = await rateLimit(request, { limit: 10, window: 60 });
  if (!success) {
    return NextResponse.json(
      { ok: false, code: "RATE_LIMITED", error: "Too many booking requests. Please wait a moment." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_INPUT", error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = normalReservationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: "INVALID_INPUT", error: "Invalid request data" },
      { status: 400 }
    );
  }

  const serviceDate = new Date(parsed.data.date);
  const dateError = validateServiceDate(serviceDate, parsed.data.shift);
  if (dateError) {
    return NextResponse.json({ ok: false, error: dateError }, { status: 400 });
  }

  const now = new Date();
  const [activeCampaign, promoConfig] = await Promise.all([
    prisma.campaign.findFirst({
      where: {
        active: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.promotionConfig.findUnique({ where: { id: "default" } }),
  ]);

  const campaignPct = activeCampaign ? Number(activeCampaign.discountPct) : 0;
  const wedThuActive = promoConfig?.wedThuActive ?? false;
  const totalAmount = calculateTotalAmountWithDiscounts(
    parsed.data.guests,
    serviceDate,
    campaignPct,
    wedThuActive,
  );

  const payFull = parsed.data.payFull ?? false;
  const amountDue = payFull ? totalAmount : amountDueNow30Pct(totalAmount);

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Availability check
      const eventRecord = await tx.event.findUnique({
        where: { date_shift: { date: serviceDate, shift: parsed.data.shift } },
      });

      const currentTotal = eventRecord?.totalGuests ?? 0;
      const remaining = 40 - currentTotal;
      const requested = parsed.data.guests;

      let canBook = requested <= remaining;
      // Flexibility rule: allow +1 over remaining when only 1-3 spots left
      if (!canBook && remaining >= 1 && remaining <= 3 && requested === remaining + 1) {
        canBook = true;
      }
      if (!canBook) throw new Error("EVENT_FULL");

      // Create/update event — guest count held until payment confirmed or intent expires
      const event = await tx.event.upsert({
        where: { date_shift: { date: serviceDate, shift: parsed.data.shift } },
        create: { date: serviceDate, shift: parsed.data.shift, totalGuests: requested },
        update: { totalGuests: { increment: requested } },
      });

      // Generate Redsys-compatible orderId (independent of intent id — stored on intent)
      const seed = `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
      const orderId = reservationToOrderId(seed);

      const intent = await tx.bookingIntent.create({
        data: {
          name:          parsed.data.name,
          phone:         parsed.data.phone,
          email:         parsed.data.email,
          allergies:     parsed.data.allergies,
          previousVisit: parsed.data.previousVisit,
          newsletter:    parsed.data.newsletter ?? false,
          comments:      parsed.data.comments?.trim() || undefined,
          groupRef:      parsed.data.groupRef,
          isFirstVisit:  !parsed.data.previousVisit,
          date:          serviceDate,
          shift:         parsed.data.shift,
          guests:        parsed.data.guests,
          eventId:       event.id,
          totalAmount,
          amountDue,
          payFull,
          orderId,
          expiresAt:     new Date(now.getTime() + 15 * 60 * 1000),
        },
      });

      return { intent, orderId };
    });

    const redsysData = buildRedsysFormData(amountDue, result.orderId);

    return NextResponse.json(
      { ok: true, bookingIntentId: result.intent.id, totalAmount, amountDue, redsysData },
      { status: 201 },
    );
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      const [data, status] = apiErrorResponse(err);
      return NextResponse.json(data, { status });
    }

    if (err instanceof Error && err.message === "EVENT_FULL") {
      return NextResponse.json(
        { ok: false, code: "CONFLICT", error: "Lo sentimos, el aforo para este turno está completo." },
        { status: 400 }
      );
    }

    const [data, status] = apiErrorResponse(err, "Error processing booking");
    return NextResponse.json(data, { status });
  }
}
