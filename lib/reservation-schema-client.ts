import { emailValidation } from "@/lib/utils/validations";

// Client-safe schema — no @prisma/client imports
export const reservationFormSchema = z.object({
  date: z.string().min(1, "Selecciona una fecha"),
  shift: z.enum(["NOON", "NIGHT"], { message: "Selecciona un turno" }),
  guests: z.number().int().min(1, "Mínimo 1 persona").max(12, "Máximo 12 personas"),
  name: z.string().min(2, "Mínimo 2 caracteres").max(120),
  phone: z.string().min(6, "Teléfono demasiado corto").max(30),
  email: emailValidation,
  allergies: z.string().max(1000).optional(),
  previousVisit: z.boolean(),
  comments: z.string().max(1000).optional(),
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;
