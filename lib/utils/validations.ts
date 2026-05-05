import { z } from "zod";

/**
 * Regex estricta para validar emails:
 * - Debe tener texto antes del @
 * - Debe tener un dominio después del @
 * - Debe tener un punto seguido de un TLD de al menos 2 letras
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

export const emailValidation = z.string()
  .email("Formato de email inválido")
  .regex(EMAIL_REGEX, "El email debe tener el formato usuario@dominio.com");
