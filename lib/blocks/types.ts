/**
 * Block type definitions for the Next-Gen Page Builder.
 */

// ── Common Styles ────────────────────────────────────────────────────────────

export type CommonStyles = {
  padding?: string; // e.g. "20px 0"
  margin?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain" | "auto";
  borderRadius?: string;
  textAlign?: "left" | "center" | "right";
  color?: string;
  boxShadow?: string;
  animation?: string;
  opacity?: number;
  brightness?: number;
  backgroundPosition?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
};




// ── Atomic Elements ─────────────────────────────────────────────────────────

export type HeadingElement = {
  type: "HEADING";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  accentText?: string;
  styles?: CommonStyles;
};

export type ButtonElement = {
  type: "BUTTON";
  text: string;
  link: string;
  variant: "primary" | "secondary" | "outline";
  size: "sm" | "md" | "lg";
  styles?: CommonStyles;
};

export type TextElement = {
  type: "TEXT";
  body: string; // HTML or Markdown
  styles?: CommonStyles;
};

export type ImageElement = {
  type: "IMAGE";
  src: string;
  alt: string;
  width?: string;
  height?: string;
  styles?: CommonStyles;
};

export type SpacerElement = {
  type: "SPACER";
  height: number;
  styles?: CommonStyles;
};

export type ElementData = 
  | HeadingElement 
  | ButtonElement 
  | TextElement 
  | ImageElement 
  | SpacerElement;

// ── Layout Blocks (Containers) ──────────────────────────────────────────────

export type ColumnData = {
  width: string; // e.g. "50%" or "33.33%"
  elements: ElementData[];
};

export type SectionContent = {
  columns: ColumnData[];
  fullWidth?: boolean;
  styles?: CommonStyles;
};

// ── Legacy / Preset Blocks (Maintained for compatibility) ─────────────────────

export type HeroContent = {
  bgImage: string;
  eyebrow?: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  overlayOpacity: number;
  animation?: string;
  eyebrowAnim?: string;
  titleAnim?: string;
  subtitleAnim?: string;
  ctaPrimaryAnim?: string;
  ctaSecondaryAnim?: string;
  bgPosition?: string;
};


export type TextContent = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  body: string;
  alignment?: "left" | "center" | "right";
  fontSize?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  animation?: string;
  eyebrowAnim?: string;
  titleAnim?: string;
  bodyAnim?: string;
  hoverEffect?: "none" | "grow" | "glow" | "lift";
};

export type StepsContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  accentColor?: string;
  steps: { day: string; eyebrow: string; title: string; body: string }[];
};

export type AvailabilityContent = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonColor?: string;
};

export type CtaContent = {
  bgImage?: string;
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  body?: string;
  buttonText?: string;
  buttonLink?: string;
  eyebrowAnim?: string;
  titleAnim?: string;
  bodyAnim?: string;
  buttonAnim?: string;
  bgPosition?: string;
};


export type ImageContent = {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
};

export type GalleryContent = {
  columns: 2 | 3 | 4;
  images: { src: string; alt: string; label?: string }[];
};

export type SpacerContent = {
  height: number;
  gradient?: "none" | "dark-to-light" | "light-to-dark";
};

// ── Core Block Data ──────────────────────────────────────────────────────────

export type BlockType = 
  | "SECTION"      // The new universal container
  | "HERO"         // Legacy preset
  | "STEPS"        // Legacy preset
  | "AVAILABILITY" // Widget preset
  | "TEXT"         // Legacy
  | "IMAGE"        // Legacy
  | "GALLERY"      // Legacy
  | "CTA"          // Legacy
  | "SPACER";      // Legacy

export type BlockContent =
  | SectionContent
  | HeroContent
  | CtaContent
  | StepsContent
  | AvailabilityContent
  | ImageContent
  | GalleryContent
  | SpacerContent
  | any;

export type BlockData = {
  id: string;
  type: BlockType;
  content: BlockContent;
  order: number;
};

// ── Defaults & Labels ────────────────────────────────────────────────────────

export const BLOCK_DEFAULTS: Record<string, any> = {
  SECTION: {
    columns: [
      { width: "100%", elements: [] }
    ],
    styles: { padding: "4rem 2rem" }
  },
  HEADING: { type: "HEADING", level: 2, text: "Tu Título Aquí", styles: {} },
  BUTTON: { type: "BUTTON", text: "Clic Aquí", link: "#", variant: "primary", size: "md", styles: {} },
  TEXT: { type: "TEXT", body: "Escribe tu contenido aquí.", styles: {} },
  IMAGE: { type: "IMAGE", src: "", alt: "", styles: {} },
};

export const BLOCK_LABELS: Record<string, { label: string; icon: string; description: string }> = {
  SECTION:      { label: "Sección (Layout)",     icon: "⏹",  description: "Contenedor de 1 a 4 columnas" },
  COLUMNS:      { label: "Columnas (Antiguo)",   icon: "⫽",  description: "Bloque de columnas antiguo" },
  HERO:         { label: "Hero (Preset)",        icon: "🏔",  description: "Cabecera clásica" },
  STEPS:        { label: "Ritual (Preset)",      icon: "📧",  description: "Flujo de emails D-4" },
  AVAILABILITY:{ label: "Disponibilidad",       icon: "📅",  description: "Calendario en vivo" },
};

export const ELEMENT_LABELS: Record<string, { label: string; icon: string }> = {
  HEADING: { label: "Título", icon: "H" },
  BUTTON:  { label: "Botón",  icon: "🔘" },
  TEXT:    { label: "Texto",  icon: "T" },
  IMAGE:   { label: "Imagen", icon: "🖼" },
};
