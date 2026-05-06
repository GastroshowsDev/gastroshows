/**
 * Common validators for API inputs
 */

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

export function validatePassword(password: string): { valid: boolean; reason?: string } {
  if (!password || typeof password !== "string") {
    return { valid: false, reason: "Password required" };
  }

  if (password.length < 12) {
    return { valid: false, reason: "Password must be at least 12 characters" };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, reason: "Password must contain lowercase letters" };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: "Password must contain uppercase letters" };
  }

  if (!/\d/.test(password)) {
    return { valid: false, reason: "Password must contain numbers" };
  }

  if (!/[@$!%*?&]/.test(password)) {
    return { valid: false, reason: "Password must contain special chars (@$!%*?&)" };
  }

  return { valid: true };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Allow +X XXX XXX XXXX format (loose validation; specific countries in CountrySelector)
  const phoneRegex = /^[+\d\s\-()]{7,}$/;
  return phoneRegex.test(phone);
}

export function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max;
}

export function sanitizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().substring(0, 10000); // Max 10k chars
}
