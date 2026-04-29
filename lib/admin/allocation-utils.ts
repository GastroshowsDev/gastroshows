/**
 * Lógica de asignación automática de locales (Sarrià/Bertrand vs Urgell)
 * Basada en la tabla proporcionada por el usuario.
 */

export interface VenueSplit {
  bertrand: number; // Sarrià (Bertrand i Serra)
  urgell: number;
}

/**
 * Calcula la distribución óptima de personas entre los dos locales.
 * 
 * Reglas:
 * 1. Si total <= 26: Todo a Urgell, Bertrand 0.
 * 2. Si total >= 27: Bertrand recibe el número par (12, 14, 16) más cercano al 50%.
 * 3. Urgell absorbe el resto, intentando mantenerse en el rango 15-17 si es posible.
 * 4. Capacidad máxima Bertrand: 16 (siempre par).
 */
export function calculateVenueSplit(totalGuests: number): VenueSplit {
  // Caso base: Urgell absorbe todo hasta 26 personas
  if (totalGuests <= 26) {
    return { bertrand: 0, urgell: totalGuests };
  }

  // Iniciamos con el mínimo para Bertrand cuando se abren ambos locales
  let bertrand = 12;
  let urgell = totalGuests - bertrand;

  // Lógica de "zona de confort" para Urgell (máximo ideal 17 antes de saltar Bertrand)
  // Iteramos para ajustar Bertrand en pasos de 2 (paridad)
  while (urgell > 17 && bertrand < 16) {
    bertrand += 2;
    urgell = totalGuests - bertrand;
  }

  // Si después de llegar al tope de Bertrand (16), Urgell sigue creciendo, 
  // Urgell absorbe todo el excedente (Urgell no tiene techo fijo web)
  return { bertrand, urgell };
}

/**
 * Ejemplo de resultados (basado en la tabla del usuario):
 * 26 -> { bertrand: 0,  urgell: 26 }
 * 27 -> { bertrand: 12, urgell: 15 }
 * 28 -> { bertrand: 12, urgell: 16 }
 * 29 -> { bertrand: 12, urgell: 17 }
 * 30 -> { bertrand: 14, urgell: 16 }
 * 31 -> { bertrand: 14, urgell: 17 }
 * 32 -> { bertrand: 16, urgell: 16 }
 * 33 -> { bertrand: 16, urgell: 17 }
 * 34 -> { bertrand: 16, urgell: 18 }
 */
