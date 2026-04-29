import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { orderIdToReservationSuffix } from "@/lib/redsys";

export const dynamic = "force-dynamic";

async function getBooking(orderId: string) {
  const suffix = orderIdToReservationSuffix(orderId);
  
  // Try finding in reservations
  const reservations = await prisma.reservation.findMany({
    where: { status: "CONFIRMED" },
    include: { customer: true, event: true, venue: true }
  });
  
  const res = reservations.find(r => r.id.replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase() === suffix);
  if (res) return { type: "RESERVATION", data: res };

  // Try finding in gifts
  const gifts = await prisma.giftVoucher.findMany({
    where: { paid: true },
    include: { purchaserCustomer: true }
  });
  const gift = gifts.find(g => g.id.replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase() === suffix);
  if (gift) return { type: "GIFT", data: gift };

  return null;
}

export default async function BookingConfirmationPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  if (!order) return notFound();

  const booking = await getBooking(order);
  if (!booking) {
    // If not confirmed yet, maybe it's still being processed.
    // In a real app, we might poll or show a "Processing" state.
    // For now, let's show a "Looking for your booking" or similar if needed.
    return (
        <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "Georgia, serif" }}>
            <div style={{ maxWidth: "500px", textAlign: "center" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "1rem" }}>Procesando Pago</h1>
                <p style={{ color: "#888", marginBottom: "2rem", lineHeight: 1.6 }}>Estamos confirmando tu transacción con el banco. Esto puede tardar unos segundos.</p>
                <button 
                  onClick={() => window.location.reload()}
                  style={{ background: "#daa520", color: "#0A0A0A", border: "none", padding: "1rem 2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "2px" }}
                >
                  Actualizar Estado
                </button>
            </div>
        </div>
    );
  }

  const isGift = booking.type === "GIFT";
  
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: "600px", width: "100%", background: "#141414", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "4px", padding: "4rem 3rem", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", border: "1px solid #daa520", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "1.5rem", color: "#daa520" }}>
          {isGift ? "◇" : "✓"}
        </div>
        
        <h1 style={{ fontSize: "2.5rem", fontWeight: 300, marginBottom: "0.5rem" }}>
          {isGift ? "Regalo Confirmado" : "¡Reserva Confirmada!"}
        </h1>
        <p style={{ color: "#888", marginBottom: "3rem", fontSize: "1.1rem" }}>
          {isGift ? "Tu vale regalo ya está activo." : "Te esperamos para una experiencia inolvidable."}
        </p>

        <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: "2px", padding: "2rem", textAlign: "left", marginBottom: "3rem" }}>
          {booking.type === "RESERVATION" ? (
            <>
              <DetailRow label="Referencia" value={booking.data.id.slice(0, 8).toUpperCase()} bold />
              <DetailRow label="Cliente" value={booking.data.customer.name} />
              <DetailRow label="Fecha" value={new Date(booking.data.event.date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })} />
              <DetailRow label="Turno" value={booking.data.event.shift === "NOON" ? "Mediodía" : "Noche"} />
              <DetailRow label="Personas" value={`${booking.data.guests} pax`} />
            </>
          ) : (
            <>
              <DetailRow label="Código" value={booking.data.token} bold />
              <DetailRow label="Comprador" value={booking.data.purchaserCustomer.name} />
              <DetailRow label="Personas" value={`${booking.data.guests} pax`} />
              <DetailRow label="Vence" value={new Date(booking.data.expiresAt).toLocaleDateString("es-ES")} />
            </>
          )}
        </div>

        <Link 
          href="/" 
          style={{ display: "inline-block", background: "#daa520", color: "#0A0A0A", textDecoration: "none", padding: "1rem 3rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", borderRadius: "2px", transition: "all 0.2s" }}
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

function DetailRow({ label, value, bold }: { label: string, value: string, bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid rgba(200,169,110,0.08)" }}>
      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#888" }}>{label}</span>
      <span style={{ fontSize: "0.95rem", color: bold ? "#daa520" : "#F5F0E8", fontWeight: bold ? 600 : 400 }}>{value}</span>
    </div>
  );
}
