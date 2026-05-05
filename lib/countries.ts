/**
 * Country data: code, flag emoji, phone format, regex
 * Used by CountrySelector and phone validation
 */

export interface Country {
  code: string;        // ISO 3166-1 alpha-2 (ES, FR, DE)
  dialCode: string;    // International dialing code (+34, +33, +49)
  name: string;        // Country name (España, Francia)
  flag: string;        // Flag emoji
  format: string;      // Phone format pattern (e.g., "+34 XXX XX XX XX")
  regex: RegExp;       // Validation regex
  minLength: number;   // Min digits after dial code
  maxLength: number;   // Max digits after dial code
}

export const COUNTRIES: Country[] = [
  // Europa
  { code: "ES", dialCode: "+34", name: "España", flag: "🇪🇸", format: "+34 XXX XX XX XX", regex: /^(?:\+34|0034|34)?[\s.-]?([6789]\d{1})\s?(\d{3})\s?(\d{2})\s?(\d{2})$/, minLength: 9, maxLength: 9 },
  { code: "FR", dialCode: "+33", name: "Francia", flag: "🇫🇷", format: "+33 X XX XX XX XX", regex: /^(?:\+33|0033|33)?[\s.-]?([1-9])(\d{1})\s?(\d{2})\s?(\d{2})\s?(\d{2})$/, minLength: 9, maxLength: 9 },
  { code: "DE", dialCode: "+49", name: "Alemania", flag: "🇩🇪", format: "+49 XXX XXXXXXXX", regex: /^(?:\+49|0049|49)?[\s.-]?([1-9]{1,5})[\s.-]?(\d{3,11})$/, minLength: 5, maxLength: 15 },
  { code: "IT", dialCode: "+39", name: "Italia", flag: "🇮🇹", format: "+39 XXX XXX XXXX", regex: /^(?:\+39|0039|39)?[\s.-]?([0-9]{3})\s?([0-9]{3})\s?([0-9]{4})$/, minLength: 10, maxLength: 10 },
  { code: "PT", dialCode: "+351", name: "Portugal", flag: "🇵🇹", format: "+351 XXX XXX XXX", regex: /^(?:\+351|00351|351)?[\s.-]?([1-9]\d{1})\s?(\d{3})\s?(\d{3})$/, minLength: 9, maxLength: 9 },
  { code: "GB", dialCode: "+44", name: "Reino Unido", flag: "🇬🇧", format: "+44 XXXX XXXXXX", regex: /^(?:\+44|0044|44)?[\s.-]?([0-9]{2,5})[\s.-]?([0-9]{3,5})[\s.-]?([0-9]{3,4})$/, minLength: 10, maxLength: 15 },
  { code: "IE", dialCode: "+353", name: "Irlanda", flag: "🇮🇪", format: "+353 XXX XXX XXX", regex: /^(?:\+353|00353|353)?[\s.-]?([0-9]{2,3})\s?([0-9]{3,4})\s?([0-9]{3,4})$/, minLength: 9, maxLength: 10 },
  { code: "NL", dialCode: "+31", name: "Países Bajos", flag: "🇳🇱", format: "+31 XX XXXXXXX", regex: /^(?:\+31|0031|31)?[\s.-]?([1-9])[\s.-]?(\d{8,9})$/, minLength: 9, maxLength: 10 },
  { code: "BE", dialCode: "+32", name: "Bélgica", flag: "🇧🇪", format: "+32 XXX XX XX XX", regex: /^(?:\+32|0032|32)?[\s.-]?([1-9])[\s.-]?(\d{8})$/, minLength: 9, maxLength: 9 },
  { code: "CH", dialCode: "+41", name: "Suiza", flag: "🇨🇭", format: "+41 XX XXXX XXXX", regex: /^(?:\+41|0041|41)?[\s.-]?([0-9]{2})\s?([0-9]{3,4})\s?([0-9]{4})$/, minLength: 9, maxLength: 10 },
  { code: "AT", dialCode: "+43", name: "Austria", flag: "🇦🇹", format: "+43 XXX XXXXXXX", regex: /^(?:\+43|0043|43)?[\s.-]?([1-9])[\s.-]?(\d{8,10})$/, minLength: 9, maxLength: 11 },
  { code: "PL", dialCode: "+48", name: "Polonia", flag: "🇵🇱", format: "+48 XX XXX XX XX", regex: /^(?:\+48|0048|48)?[\s.-]?([1-9]\d)\s?(\d{3})\s?(\d{2})\s?(\d{2})$/, minLength: 10, maxLength: 10 },
  { code: "CZ", dialCode: "+420", name: "República Checa", flag: "🇨🇿", format: "+420 XXX XXX XXX", regex: /^(?:\+420|00420|420)?[\s.-]?([0-9]{3})\s?([0-9]{3})\s?([0-9]{3})$/, minLength: 9, maxLength: 9 },
  { code: "GR", dialCode: "+30", name: "Grecia", flag: "🇬🇷", format: "+30 XXX XXXXXXX", regex: /^(?:\+30|0030|30)?[\s.-]?([2-9]\d)\s?(\d{3,4})\s?(\d{4,5})$/, minLength: 10, maxLength: 10 },
  { code: "SE", dialCode: "+46", name: "Suecia", flag: "🇸🇪", format: "+46 XX XXX XXXX", regex: /^(?:\+46|0046|46)?[\s.-]?([1-9])[\s.-]?(\d{2,3})\s?(\d{4,7})$/, minLength: 9, maxLength: 11 },
  { code: "NO", dialCode: "+47", name: "Noruega", flag: "🇳🇴", format: "+47 XXXX XXXX", regex: /^(?:\+47|0047|47)?[\s.-]?([4-9]\d{3}\s?\d{4})$/, minLength: 8, maxLength: 8 },
  { code: "DK", dialCode: "+45", name: "Dinamarca", flag: "🇩🇰", format: "+45 XXXX XXXX", regex: /^(?:\+45|0045|45)?[\s.-]?([0-9]{4})\s?([0-9]{4})$/, minLength: 8, maxLength: 8 },
  { code: "FI", dialCode: "+358", name: "Finlandia", flag: "🇫🇮", format: "+358 XX XXX XXXX", regex: /^(?:\+358|00358|358)?[\s.-]?([0-9]{1,3})\s?([0-9]{4,7})$/, minLength: 8, maxLength: 10 },
  { code: "RU", dialCode: "+7", name: "Rusia", flag: "🇷🇺", format: "+7 XXX XXX XXXX", regex: /^(?:\+7|007|7)?[\s.-]?([0-9]{3})\s?([0-9]{3})\s?([0-9]{4})$/, minLength: 10, maxLength: 11 },
  { code: "TR", dialCode: "+90", name: "Turquía", flag: "🇹🇷", format: "+90 XXX XXX XXXX", regex: /^(?:\+90|0090|90)?[\s.-]?([1-9]\d{2})\s?([0-9]{3})\s?([0-9]{4})$/, minLength: 10, maxLength: 10 },

  // América del Norte
  { code: "US", dialCode: "+1", name: "Estados Unidos", flag: "🇺🇸", format: "+1 (XXX) XXX-XXXX", regex: /^(?:\+1|001|1)?[\s.-]?(\d{3})[\s.-]?(\d{3})[\s.-]?(\d{4})$/, minLength: 10, maxLength: 10 },
  { code: "CA", dialCode: "+1", name: "Canadá", flag: "🇨🇦", format: "+1 (XXX) XXX-XXXX", regex: /^(?:\+1|001|1)?[\s.-]?(\d{3})[\s.-]?(\d{3})[\s.-]?(\d{4})$/, minLength: 10, maxLength: 10 },
  { code: "MX", dialCode: "+52", name: "México", flag: "🇲🇽", format: "+52 XXX XXX XXXX", regex: /^(?:\+52|0052|52)?[\s.-]?([0-9]{2,3})\s?([0-9]{3,4})\s?([0-9]{4})$/, minLength: 10, maxLength: 10 },

  // América Central y del Sur
  { code: "BR", dialCode: "+55", name: "Brasil", flag: "🇧🇷", format: "+55 XX XXXXX-XXXX", regex: /^(?:\+55|0055|55)?[\s.-]?([1-9]{2})[\s.-]?(9?\d{3})[\s.-]?(\d{4})$/, minLength: 10, maxLength: 11 },
  { code: "AR", dialCode: "+54", name: "Argentina", flag: "🇦🇷", format: "+54 XXX XXXX-XXXX", regex: /^(?:\+54|0054|54)?[\s.-]?(9)?[\s.-]?([0-9]{2,4})[\s.-]?(\d{4})[\s.-]?(\d{4})$/, minLength: 10, maxLength: 11 },
  { code: "CL", dialCode: "+56", name: "Chile", flag: "🇨🇱", format: "+56 XX XXXX XXXX", regex: /^(?:\+56|0056|56)?[\s.-]?([2-9])\s?(\d{4})\s?(\d{4})$/, minLength: 9, maxLength: 9 },
  { code: "CO", dialCode: "+57", name: "Colombia", flag: "🇨🇴", format: "+57 XXX XXXXXXX", regex: /^(?:\+57|0057|57)?[\s.-]?([0-9]{3})\s?([0-9]{7})$/, minLength: 10, maxLength: 10 },
  { code: "PE", dialCode: "+51", name: "Perú", flag: "🇵🇪", format: "+51 XXX XXX XXX", regex: /^(?:\+51|0051|51)?[\s.-]?([0-9]{3})\s?([0-9]{3})\s?([0-9]{3})$/, minLength: 9, maxLength: 9 },
  { code: "VE", dialCode: "+58", name: "Venezuela", flag: "🇻🇪", format: "+58 XXX XXXXXXX", regex: /^(?:\+58|0058|58)?[\s.-]?([0-9]{3})\s?([0-9]{7})$/, minLength: 10, maxLength: 10 },
  { code: "EC", dialCode: "+593", name: "Ecuador", flag: "🇪🇨", format: "+593 XXX XXXXXX", regex: /^(?:\+593|00593|593)?[\s.-]?([0-9]{3})\s?([0-9]{6})$/, minLength: 9, maxLength: 9 },
  { code: "BO", dialCode: "+591", name: "Bolivia", flag: "🇧🇴", format: "+591 XXX XXXXX", regex: /^(?:\+591|00591|591)?[\s.-]?([0-9]{3})\s?([0-9]{5})$/, minLength: 8, maxLength: 8 },
  { code: "PY", dialCode: "+595", name: "Paraguay", flag: "🇵🇾", format: "+595 XXX XXXXXX", regex: /^(?:\+595|00595|595)?[\s.-]?([0-9]{3})\s?([0-9]{6})$/, minLength: 9, maxLength: 9 },
  { code: "UY", dialCode: "+598", name: "Uruguay", flag: "🇺🇾", format: "+598 X XXXX XXXX", regex: /^(?:\+598|00598|598)?[\s.-]?([0-9])\s?([0-9]{4})\s?([0-9]{4})$/, minLength: 9, maxLength: 9 },

  // Asia
  { code: "JP", dialCode: "+81", name: "Japón", flag: "🇯🇵", format: "+81 XX XXXX XXXX", regex: /^(?:\+81|0081|81)?[\s.-]?(0)?[\s.-]?(\d{1,4})[\s.-]?(\d{1,4})[\s.-]?(\d{4})$/, minLength: 10, maxLength: 11 },
  { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳", format: "+86 XXX XXXX XXXX", regex: /^(?:\+86|0086|86)?[\s.-]?([0-9]{2,3})[\s.-]?([0-9]{3,4})[\s.-]?([0-9]{4})$/, minLength: 11, maxLength: 11 },
  { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳", format: "+91 XXXXX XXXXX", regex: /^(?:\+91|0091|91)?[\s.-]?([6-9]\d{9})$/, minLength: 10, maxLength: 10 },
  { code: "TH", dialCode: "+66", name: "Tailandia", flag: "🇹🇭", format: "+66 XX XXX XXXX", regex: /^(?:\+66|0066|66)?[\s.-]?([0-9]{2})\s?([0-9]{3})\s?([0-9]{4})$/, minLength: 9, maxLength: 10 },
  { code: "MY", dialCode: "+60", name: "Malasia", flag: "🇲🇾", format: "+60 XX XXXX XXXX", regex: /^(?:\+60|0060|60)?[\s.-]?([0-9]{2})\s?([0-9]{4})\s?([0-9]{4})$/, minLength: 10, maxLength: 10 },
  { code: "SG", dialCode: "+65", name: "Singapur", flag: "🇸🇬", format: "+65 XXXX XXXX", regex: /^(?:\+65|0065|65)?[\s.-]?([0-9]{4})\s?([0-9]{4})$/, minLength: 8, maxLength: 8 },
  { code: "ID", dialCode: "+62", name: "Indonesia", flag: "🇮🇩", format: "+62 XXX XXXXXXX", regex: /^(?:\+62|0062|62)?[\s.-]?([0-9]{2,3})\s?([0-9]{3,4})\s?([0-9]{4})$/, minLength: 10, maxLength: 11 },
  { code: "PH", dialCode: "+63", name: "Filipinas", flag: "🇵🇭", format: "+63 XXX XXXXXXX", regex: /^(?:\+63|0063|63)?[\s.-]?([0-9]{2,4})\s?([0-9]{3,4})\s?([0-9]{4})$/, minLength: 10, maxLength: 11 },
  { code: "VN", dialCode: "+84", name: "Vietnam", flag: "🇻🇳", format: "+84 XX XXXX XXXX", regex: /^(?:\+84|0084|84)?[\s.-]?([0-9]{2})\s?([0-9]{4})\s?([0-9]{4})$/, minLength: 9, maxLength: 10 },
  { code: "TW", dialCode: "+886", name: "Taiwan", flag: "🇹🇼", format: "+886 XX XXXX XXXX", regex: /^(?:\+886|00886|886)?[\s.-]?([0-9]{2})\s?([0-9]{4})\s?([0-9]{4})$/, minLength: 9, maxLength: 10 },
  { code: "KR", dialCode: "+82", name: "Corea del Sur", flag: "🇰🇷", format: "+82 XX XXXX XXXX", regex: /^(?:\+82|0082|82)?[\s.-]?([0-9]{2})\s?([0-9]{3,4})\s?([0-9]{4})$/, minLength: 10, maxLength: 10 },
  { code: "KP", dialCode: "+850", name: "Corea del Norte", flag: "🇰🇵", format: "+850 XXX XXXXXX", regex: /^(?:\+850|00850|850)?[\s.-]?([0-9]{3})\s?([0-9]{6})$/, minLength: 9, maxLength: 9 },
  { code: "PK", dialCode: "+92", name: "Pakistán", flag: "🇵🇰", format: "+92 XXX XXXXXXX", regex: /^(?:\+92|0092|92)?[\s.-]?([0-9]{3})\s?([0-9]{7})$/, minLength: 10, maxLength: 10 },
  { code: "BD", dialCode: "+880", name: "Bangladesh", flag: "🇧🇩", format: "+880 XXX XXXXXXX", regex: /^(?:\+880|00880|880)?[\s.-]?([0-9]{3})\s?([0-9]{7})$/, minLength: 10, maxLength: 10 },
  { code: "LK", dialCode: "+94", name: "Sri Lanka", flag: "🇱🇰", format: "+94 XX XXXX XXXX", regex: /^(?:\+94|0094|94)?[\s.-]?([0-9]{2})\s?([0-9]{4})\s?([0-9]{4})$/, minLength: 9, maxLength: 10 },

  // Oriente Medio y Africa del Norte
  { code: "SA", dialCode: "+966", name: "Arabia Saudí", flag: "🇸🇦", format: "+966 XX XXXX XXXX", regex: /^(?:\+966|00966|966)?[\s.-]?([0-9]{2})\s?([0-9]{4})\s?([0-9]{4})$/, minLength: 9, maxLength: 10 },
  { code: "AE", dialCode: "+971", name: "Emiratos Árabes", flag: "🇦🇪", format: "+971 XX XXX XXXX", regex: /^(?:\+971|00971|971)?[\s.-]?([0-9]{2})\s?([0-9]{3})\s?([0-9]{4})$/, minLength: 9, maxLength: 9 },
  { code: "IL", dialCode: "+972", name: "Israel", flag: "🇮🇱", format: "+972 XX XXX XXXX", regex: /^(?:\+972|00972|972)?[\s.-]?([0-9]{2})\s?([0-9]{3})\s?([0-9]{4})$/, minLength: 9, maxLength: 9 },
  { code: "EG", dialCode: "+20", name: "Egipto", flag: "🇪🇬", format: "+20 XXX XXX XXXX", regex: /^(?:\+20|0020|20)?[\s.-]?([0-9]{3})\s?([0-9]{3})\s?([0-9]{4})$/, minLength: 10, maxLength: 10 },
  { code: "MA", dialCode: "+212", name: "Marruecos", flag: "🇲🇦", format: "+212 XXX XXXXXX", regex: /^(?:\+212|00212|212)?[\s.-]?([0-9]{3})\s?([0-9]{6})$/, minLength: 9, maxLength: 9 },
  { code: "NG", dialCode: "+234", name: "Nigeria", flag: "🇳🇬", format: "+234 XXX XXXXXXX", regex: /^(?:\+234|00234|234)?[\s.-]?([0-9]{3})\s?([0-9]{7})$/, minLength: 10, maxLength: 10 },
  { code: "ZA", dialCode: "+27", name: "Sudáfrica", flag: "🇿🇦", format: "+27 XX XXXX XXXX", regex: /^(?:\+27|0027|27)?[\s.-]?([0-9]{2})\s?([0-9]{4})\s?([0-9]{4})$/, minLength: 9, maxLength: 10 },

  // Oceanía
  { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺", format: "+61 XX XXXX XXXX", regex: /^(?:\+61|0061|61)?[\s.-]?([0-9]{1,4})[\s.-]?([0-9]{3,4})[\s.-]?([0-9]{3,4})$/, minLength: 9, maxLength: 12 },
  { code: "NZ", dialCode: "+64", name: "Nueva Zelanda", flag: "🇳🇿", format: "+64 XX XXXX XXXX", regex: /^(?:\+64|0064|64)?[\s.-]?([0-9]{2})\s?([0-9]{4})\s?([0-9]{4})$/, minLength: 9, maxLength: 10 },
  { code: "FJ", dialCode: "+679", name: "Fiji", flag: "🇫🇯", format: "+679 XXXX XXXX", regex: /^(?:\+679|00679|679)?[\s.-]?([0-9]{4})\s?([0-9]{4})$/, minLength: 8, maxLength: 8 },
];

/**
 * Get country by dial code (e.g., "+34" -> Spain)
 */
export function getCountryByDialCode(dialCode: string): Country | undefined {
  return COUNTRIES.find((c) => c.dialCode === dialCode);
}

/**
 * Get country by code (e.g., "ES" -> Spain)
 */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

/**
 * Get default country (Spain)
 */
export function getDefaultCountry(): Country {
  return getCountryByCode("ES")!;
}

/**
 * Validate phone number against country rules
 * Returns { valid: boolean, error?: string }
 */
export function validatePhoneNumber(
  phone: string,
  country: Country
): { valid: boolean; error?: string } {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length < country.minLength) {
    return {
      valid: false,
      error: `Número muy corto para ${country.name} (mín ${country.minLength} dígitos)`,
    };
  }

  if (cleaned.length > country.maxLength) {
    return {
      valid: false,
      error: `Número muy largo para ${country.name} (máx ${country.maxLength} dígitos)`,
    };
  }

  if (!country.regex.test(phone)) {
    return {
      valid: false,
      error: `Formato inválido para ${country.name}`,
    };
  }

  return { valid: true };
}

/**
 * Format phone number with country dial code
 * Input: "612345678", country: ES
 * Output: "+34 612 34 56 78"
 */
export function formatPhoneNumber(phone: string, country: Country): string {
  const cleaned = phone.replace(/\D/g, "");
  // Return with dial code
  return `${country.dialCode} ${cleaned}`;
}
