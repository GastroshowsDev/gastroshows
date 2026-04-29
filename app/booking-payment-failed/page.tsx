import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { orderIdToReservationSuffix } from "@/lib/redsys";
import { RetryIntentButton } from "@/components/reservation/RetryIntentButton";

export const dynamic = "force-dynamic";

async function getBooking(orderId: string) {
  // Try BookingIntent first (normal reservation flow)
  const intent = await prisma.bookingIntent.findUnique({
    where: { orderId },
  });
  if (intent && (intent.status === "PAYMENT_FAILED" || intent.status === "AWAITING_PAYMENT")) {
    return { type: "RESERVATION" as const, data: intent };
  }

  // Try GiftVoucher (suffix-matching on voucher ID)
  const suffix = orderIdToReservationSuffix(orderId);
  const gifts = await prisma.giftVoucher.findMany({
    include: { purchaser: true },
  });
  const gift = gifts.find(
    (g) => g.id.replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase() === suffix,
  );
  if (gift) return { type: "GIFT" as const, data: gift };

  return null;
}

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  if (!order) return notFound();

  const booking = await getBooking(order);
  if (!booking) return notFound();

  const isGift = booking.type === "GIFT";
  const amount = isGift
    ? Number(booking.data.totalAmount)
    : Number((booking.data as any).amountDue);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: "600px", width: "100%", background: "#141414", border: "1px solid rgba(255,0,0,0.2)", borderRadius: "4px", padding: "4rem 3rem", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", border: "1px solid #ff4d4d", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "1.5rem", color: "#ff4d4d" }}>
          ✕
        </div>

        <h1 style={{ fontSize: "2.5rem", fontWeight: 300, marginBottom: "0.5rem" }}>
          Pago no completado
        </h1>
        <p style={{ color: "#888", marginBottom: "3rem", fontSize: "1.1rem" }}>
          Hubo un problema con la transacción. Tu reserva aún no está confirmada.
        </p>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "2px", padding: "2rem", textAlign: "left", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "1rem" }}>
            Tus datos han sido guardados temporalmente. No es necesario volver a rellenar el formulario.
            Puedes reintentar el pago ahora para asegurar tu plaza.
          </p>
          <DetailRow label="Referencia" value={booking.data.id.slice(0, 8).toUpperCase()} />
          <DetailRow label="Importe Pendiente" value={`${amount.toFixed(2)} €`} bold />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {!isGift ? (
            <RetryIntentButton intentId={booking.data.id} amount={amount} />
          ) : (
            <p style={{ fontSize: "0.85rem", color: "#888" }}>
              Para reintentar el pago de un vale regalo, por favor contacta con nosotros.
            </p>
          )}

          <Link
            href="/"
            style={{ color: "#888", textDecoration: "none", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "1rem" }}
          >
            Cancelar y volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#666" }}>{label}</span>
      <span style={{ fontSize: "0.9rem", color: bold ? "#daa520" : "#F5F0E8", fontWeight: bold ? 600 : 400 }}>{value}</span>
    </div>
  );
}
