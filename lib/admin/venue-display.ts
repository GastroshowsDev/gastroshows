export const VENUE_DISPLAY: Record<string, { bg: string; color: string; label: string; letter: string }> = {
  BERTRAND: { bg: "#CFFAFE", color: "#0891B2", label: "Bertrand", letter: "B" },
  URGELL:   { bg: "#EDE9FE", color: "#7C3AED", label: "Urgell",   letter: "U" },
};

export function getVenueDisplay(name: string | null | undefined) {
  if (!name) return { bg: "transparent", color: "var(--color-admin-muted)", label: "Sin local", letter: "?" };
  return VENUE_DISPLAY[name] ?? { bg: "#F3F4F6", color: "#6B7280", label: name, letter: name[0] ?? "?" };
}
