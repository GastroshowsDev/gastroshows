/**
 * Safe logger that removes sensitive data before logging
 * Prevents leakage of PII to logs
 */

interface LogContext {
  timestamp: Date;
  level: "info" | "warn" | "error";
  [key: string]: unknown;
}

// Patterns for sensitive data
const SENSITIVE_PATTERNS = [
  // Email addresses
  { pattern: /([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, replacement: "[EMAIL]" },
  // Phone numbers (various formats)
  {
    pattern:
      /(\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+\d{1,3}\s?\d{6,14})/g,
    replacement: "[PHONE]",
  },
  // SSN-like patterns (XXX-XX-XXXX)
  { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, replacement: "[SSN]" },
  // Credit card patterns (simplified)
  { pattern: /\b(\d{4}[-\s]?){3}\d{4}\b/g, replacement: "[CC]" },
  // Password in logs (password=, pwd=, etc.)
  {
    pattern: /(password|passwd|pwd|secret|token|authorization|api[_-]key)\s*[:=]\s*"?[^\s"]+/gi,
    replacement: "$1=[REDACTED]",
  },
];

function sanitizeString(value: string): string {
  let sanitized = value;
  for (const { pattern, replacement } of SENSITIVE_PATTERNS) {
    sanitized = sanitized.replace(pattern, replacement);
  }
  return sanitized;
}

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return sanitizeString(value);
  }

  if (value && typeof value === "object") {
    if (Array.isArray(value)) {
      return value.map((item) => sanitizeValue(item));
    }

    const sanitized: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      // Skip obviously sensitive keys
      if (["password", "token", "secret", "apiKey", "creditCard", "ssn"].includes(key.toLowerCase())) {
        sanitized[key] = "[REDACTED]";
      } else {
        sanitized[key] = sanitizeValue(val);
      }
    }
    return sanitized;
  }

  return value;
}

export const safeLogger = {
  info(message: string, context?: unknown) {
    const sanitized = context ? sanitizeValue(context) : undefined;
    console.log(message, sanitized);
  },

  warn(message: string, context?: unknown) {
    const sanitized = context ? sanitizeValue(context) : undefined;
    console.warn(message, sanitized);
  },

  error(message: string, context?: unknown) {
    const sanitized = context ? sanitizeValue(context) : undefined;
    console.error(message, sanitized);
  },

  // Explicit sanitization for when needed
  sanitize(value: unknown): unknown {
    return sanitizeValue(value);
  },
};
