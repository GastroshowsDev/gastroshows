/**
 * Client-safe exports for the landing page CMS.
 * This file must NOT import anything from lib/prisma or lib/landing-content.
 * The server calls getLandingContent() and passes the result as a plain prop;
 * client components only need the type and the c() accessor.
 */

export type LandingContentMap = Record<string, string>;

/**
 * Safe accessor — returns the value from the content map.
 * Defaults are guaranteed by the server-side getLandingContent(), so this
 * simply returns an empty string as ultimate fallback.
 */
export function c(content: LandingContentMap, key: string): string {
  return content[key] ?? "";
}
