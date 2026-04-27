/**
 * Block type definitions for the Page Builder.
 *
 * Each block stored in `PageBlock.content` (JSON) follows one of these shapes.
 */

// ── Block type identifiers ───────────────────────────────────────────────────

export const BLOCK_TYPES = [
  "HERO",
  "TEXT",
  "IMAGE",
  "GALLERY",
  "COLUMNS",
  "CTA",
  "SPACER",
  "AVAILABILITY",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

// ── Content shapes per block type ────────────────────────────────────────────

export type HeroContent = {
  bgImage: string;
  eyebrow?: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  overlayOpacity: number;
  animation?: "none" | "typewriter" | "fade" | "slide" | "zoom" | "bounce";
};

export type TextContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
  alignment: "left" | "center" | "right";
  fontSize?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  animation?: "none" | "typewriter" | "fade" | "slide" | "zoom" | "bounce";
  hoverEffect?: "none" | "grow" | "glow" | "lift";
};

export type ImageContent = {
  src: string;
  alt: string;
  caption: string;
  fullWidth: boolean;
};

export type GalleryImage = {
  src: string;
  alt: string;
  label: string;
};

export type GalleryContent = {
  images: GalleryImage[];
  columns: 2 | 3 | 4;
};

export type ColumnChild = {
  id: string;
  type: BlockType;
  content: BlockContent;
};

export type ColumnsContent = {
  columns: 2 | 3 | 4;
  children: ColumnChild[][];  // Array of columns, each containing an array of blocks
};

export type CtaContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
  buttonText: string;
  buttonLink: string;
  bgImage: string;
};

export type SpacerContent = {
  height: number; // pixels
  gradient: "none" | "dark-to-light" | "light-to-dark";
};

export type AvailabilityContent = {
  title: string;
  subtitle?: string;
};

// ── Union type ───────────────────────────────────────────────────────────────

export type BlockContent =
  | HeroContent
  | TextContent
  | ImageContent
  | GalleryContent
  | ColumnsContent
  | CtaContent
  | SpacerContent
  | AvailabilityContent;

// ── Block with metadata (as stored in DB) ────────────────────────────────────

export type BlockData = {
  id: string;
  type: BlockType;
  content: BlockContent;
  order: number;
};

// ── Default content per block type ───────────────────────────────────────────

export const BLOCK_DEFAULTS: Record<BlockType, BlockContent> = {
  HERO: {
    bgImage: "",
    title: "Tu título aquí",
    titleAccent: "con estilo.",
    subtitle: "Descripción del hero.",
    ctaPrimaryText: "Reservar",
    ctaPrimaryLink: "#reservar",
    ctaSecondaryText: "Regalar",
    ctaSecondaryLink: "#regalar",
    overlayOpacity: 70,
  } satisfies HeroContent,

  TEXT: {
    eyebrow: "Sección",
    title: "Título de la sección",
    titleAccent: "",
    body: "Escribe aquí el contenido de esta sección.",
    alignment: "center",
  } satisfies TextContent,

  IMAGE: {
    src: "",
    alt: "",
    caption: "",
    fullWidth: false,
  } satisfies ImageContent,

  GALLERY: {
    images: [],
    columns: 3,
  } satisfies GalleryContent,

  COLUMNS: {
    columns: 2,
    children: [[], []],
  } satisfies ColumnsContent,

  CTA: {
    eyebrow: "",
    title: "Llamada a la acción",
    titleAccent: "",
    body: "Descripción de la acción.",
    buttonText: "Reservar",
    buttonLink: "#reservar",
    bgImage: "",
  } satisfies CtaContent,

  SPACER: {
    height: 120,
    gradient: "none",
  } satisfies SpacerContent,

  AVAILABILITY: {
    title: "Quedan plazas esta semana",
    subtitle: "DISPONIBILIDAD",
  } satisfies AvailabilityContent,
};

// ── Human-readable labels ────────────────────────────────────────────────────

export const BLOCK_LABELS: Record<BlockType, { label: string; icon: string; description: string }> = {
  HERO:         { label: "Contenedor 1 (Principal)", icon: "🏔",  description: "Imagen de fondo con título y botones" },
  TEXT:         { label: "Contenedor 2 (Texto)",     icon: "📝",  description: "Sección de texto con título y cuerpo" },
  IMAGE:       { label: "Contenedor 3 (Imagen)",    icon: "🖼",   description: "Imagen única con pie de foto" },
  GALLERY:     { label: "Contenedor 4 (Galería)",   icon: "🎨",  description: "Grid de imágenes con hover" },
  COLUMNS:     { label: "Contenedor 5 (Columnas)",  icon: "📐",  description: "Layout de columnas con bloques dentro" },
  CTA:         { label: "Contenedor 6 (Acción)",    icon: "📣", description: "Sección CTA con fondo y botón" },
  SPACER:      { label: "Separador",               icon: "➖",   description: "Espacio o gradiente entre secciones" },
  AVAILABILITY:{ label: "Disponibilidad",          icon: "📅",  description: "Calendario de disponibilidad en vivo" },
};
