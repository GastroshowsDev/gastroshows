import { z } from "zod";

import { emailValidation } from "@/lib/utils/validations";
import { validatePhoneNumber } from "@/lib/countries";

// Client-safe schema — no @prisma/client imports
export const reservationFormSchema = z.object({
  date: z.string().min(1, "Selecciona una fecha"),
  shift: z.enum(["NOON", "NIGHT"], { message: "Selecciona un turno" }),
  guests: z.number().int().min(1, "Mínimo 1 persona").max(12, "Máximo 12 personas"),
  name: z.string().min(2, "Mínimo 2 caracteres").max(120),
  countryCode: z.string().min(1, "Selecciona un país").max(5),
  phone: z.string().min(6, "Teléfono demasiado corto").max(20),
  email: emailValidation,
  allergies: z.string().max(1000).optional(),
  previousVisit: z.boolean(),
  comments: z.string().max(1000).optional(),
}).refine(
  (data) => {
    // Import here to avoid circular deps
    const { getCountryByDialCode } = require("@/lib/countries");
    const country = getCountryByDialCode(data.countryCode);
    if (!country) return false;

    const validation = validatePhoneNumber(data.phone, country);
    return validation.valid;
  },
  {
    message: "Número de teléfono inválido para el país seleccionado",
    path: ["phone"],
  }
);

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;
