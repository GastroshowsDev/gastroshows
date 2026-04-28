import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { date, guests, name, phone, email, comments } = payload;

    if (!date || !name || !email) {
      return NextResponse.json({ ok: false, error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const formattedDate = new Date(date).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const htmlContent = `
      <h2>Nueva solicitud de Cena Privada</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Fecha solicitada:</strong> ${formattedDate}</p>
      <p><strong>Número de personas:</strong> ${guests}</p>
      <p><strong>Comentarios/Idea:</strong> ${comments || "Ninguno"}</p>
      <hr />
      <p>Por favor, contacta con el cliente para confirmar la disponibilidad y elaborar un presupuesto.</p>
    `;

    // Send email to admin
    await sendMail({
      to: "reservas@gastroshows.com", // Adjust as necessary
      subject: `[CENA PRIVADA] Solicitud de ${name} para el ${formattedDate}`,
      html: htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to process private dinner request:", error);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
