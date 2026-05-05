import { prisma } from "./prisma";
import { ReservationStatus, PaymentStatus, ReservationType, Shift } from "@prisma/client";

export interface TuritopRow {
  name: string;
  email?: string;
  phone?: string;
  guests: number;
  date: string; // YYYY-MM-DD
  shift: string; // "Almuerzo", "Cena", "NOON", "NIGHT", etc.
  totalAmount: number;
  paidAmount: number;
  comments?: string;
  allergies?: string;
  isGift?: boolean;
  venueName?: string; // "BERTRAND" | "URGELL"
  purchaseDate?: string; // Fecha real de compra
}

/**
 * Palabras clave para detectar alergias en el campo de comentarios
 */
const ALLERGY_KEYWORDS = [
  "celiaco", "celíaco", "gluten", "alergia", "alérgico", "alérgica", 
  "intolerancia", "intolerante", "lactosa", "futos secos", "marisco", 
  "vegano", "vegetariano", "no come"
];

export async function migrateTuritopData(rows: TuritopRow[]) {
  const results = {
    total: rows.length,
    created: 0,
    updated: 0,
    errors: [] as string[],
  };

  for (const row of rows) {
    try {
      // 1. Limpieza y Normalización de datos
      const rowName = row.name ? String(row.name).trim() : "Sin nombre";
      const cleanComments = row.comments ? String(row.comments).trim() : "";
      const cleanAllergies = row.allergies ? String(row.allergies).trim() : "";
      
      let finalAllergies = cleanAllergies;

      // Buscamos qué palabras clave de alergia aparecen en el comentario
      const foundKeywords = ALLERGY_KEYWORDS.filter(k => cleanComments.toLowerCase().includes(k.toLowerCase()));
      
      if (foundKeywords.length > 0) {
        // Solo añadimos las palabras clave detectadas, no la frase entera
        const detectedInfo = foundKeywords.join(", ");
        if (!cleanAllergies.toLowerCase().includes(detectedInfo.toLowerCase())) {
          finalAllergies = cleanAllergies 
            ? `${cleanAllergies}, ${detectedInfo}`
            : detectedInfo;
        }
      }

      // 2. Gestión de Cliente (Contacto)
      const rawEmail = row.email ? String(row.email).trim().toLowerCase() : "";
      const email = rawEmail || `migrated_${Date.now()}_${Math.random().toString(36).substring(7)}@turitop.local`;
      
      const customer = await prisma.customer.upsert({
        where: { email },
        update: {
          name: rowName,
          phone: row.phone ? String(row.phone).trim() : "",
          allergies: finalAllergies || null,
        },
        create: {
          name: rowName,
          email,
          phone: row.phone ? String(row.phone).trim() : "",
          allergies: finalAllergies || null,
          source: "TURITOP_IMPORT",
        }
      });

      // 3. Gestión de Evento
      const eventDateStr = String(row.date);
      const eventDate = new Date(`${eventDateStr}T12:00:00Z`);
      const shift: Shift = String(row.shift).toUpperCase().includes("CENA") || String(row.shift).toUpperCase().includes("NIGHT") 
        ? "NIGHT" 
        : "NOON";

      const event = await prisma.event.upsert({
        where: { date_shift: { date: eventDate, shift } },
        update: {},
        create: {
          date: eventDate,
          shift,
          status: "OPEN",
        }
      });

      // 4. Mapeo Económico y Estados
      const isGift = row.isGift || cleanComments.toLowerCase().includes("regalo") || cleanComments.toLowerCase().includes("voucher");
      const type: ReservationType = isGift ? "GIFT" : "NORMAL";
      
      let paymentStatus: PaymentStatus = "PARTIAL";
      const totalAmount = parseFloat(String(row.totalAmount || 0));
      const paidAmount = parseFloat(String(row.paidAmount || 0));

      if (isGift) {
        paymentStatus = "GIFT";
      } else if (paidAmount >= totalAmount && totalAmount > 0) {
        paymentStatus = "COMPLETED";
      }

      // 5. Creación de la Reserva
      const reservation = await prisma.reservation.create({
        data: {
          customerId: customer.id,
          eventId: event.id,
          guests: parseInt(String(row.guests || 1)),
          totalAmount,
          paidAmount,
          paymentStatus,
          type,
          status: "CONFIRMED",
          source: "TURITOP",
          comments: cleanComments || null,
          createdAt: row.purchaseDate ? new Date(row.purchaseDate) : new Date(),
        }
      });

      // 6. ACTUALIZACIÓN CRÍTICA: Incrementar totalGuests en el evento
      await prisma.event.update({
        where: { id: event.id },
        data: {
          totalGuests: {
            increment: reservation.guests
          }
        }
      });

      results.created++;
    } catch (err: any) {
      results.errors.push(`Error en fila ${row.name} (${row.date}): ${err.message}`);
    }
  }

  return results;
}
