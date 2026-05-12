/**
 * Block type definitions for the Next-Gen Page Builder.
 */

// ── Common Styles ────────────────────────────────────────────────────────────

export type CommonStyles = {
  padding?: string; // e.g. "20px 0"
  margin?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain" | "auto" | "mirror";
  borderRadius?: string;
  textAlign?: "left" | "center" | "right";
  color?: string;
  boxShadow?: string;
  textShadow?: string;
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
  fontSize?: string;
  fontWeight?: string | number;
  fontStyle?: "normal" | "italic";
  fontFamily?: string;
  textDecoration?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  letterSpacing?: string;
  lineHeight?: string;
  minHeight?: string;
};




// ── Atomic Elements ─────────────────────────────────────────────────────────

export type HeadingElement = {
  id: string;
  type: "HEADING";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  accentText?: string;
  styles?: CommonStyles;
};

export type ButtonElement = {
  id: string;
  type: "BUTTON";
  text: string;
  link: string;
  variant: "primary" | "secondary" | "outline";
  size: "sm" | "md" | "lg";
  styles?: CommonStyles;
};

export type TextElement = {
  id: string;
  type: "TEXT";
  body: string; // HTML or Markdown
  tagName?: "p" | "div" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  styles?: CommonStyles;
};

export type ImageElement = {
  id: string;
  type: "IMAGE";
  src: string;
  alt: string;
  width?: string;
  height?: string;
  styles?: CommonStyles;
};

export type SpacerElement = {
  id: string;
  type: "SPACER";
  height: number;
  styles?: CommonStyles;
};

export type ReviewsElement = {
  id: string;
  type: "REVIEWS";
  layout?: "grid" | "carousel" | "list";
  reviews: {
    name: string;
    text: string;
    rating: number;
    date?: string;
    avatar?: string;
  }[];
  showStars?: boolean;
  showDates?: boolean;
  useGoogleReviews?: boolean;
  googlePlaceId?: string;
  minRating?: number;
  sortBy?: "latest" | "random";
  styles?: CommonStyles;
};

export type FormField = {
  id: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select
  width?: "full" | "half";
};

export type FormElement = {
  id: string;
  type: "FORM";
  fields: FormField[];
  submitText: string;
  successMessage: string;
  actionType: "EMAIL" | "WEBHOOK" | "REDIRECT";
  actionValue: string;
  styles?: CommonStyles;
};

export type CalendarElement = {
  id: string;
  type: "CALENDAR";
  color?: string;
  styles?: CommonStyles;
};

export type AvailabilityElement = {
  id: string;
  type: "AVAILABILITY";
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonColor?: string;
  styles?: CommonStyles;
};

export type ContainerElement = {
  id: string;
  type: "CONTAINER";
  content: SectionContent;
  styles?: CommonStyles;
};

export type IframeElement = {
  id: string;
  type: "IFRAME";
  src: string;
  width?: string;
  height?: string;
  styles?: CommonStyles;
};

export type ElementData = 
  | HeadingElement 
  | ButtonElement 
  | TextElement 
  | ImageElement 
  | SpacerElement
  | CalendarElement
  | AvailabilityElement
  | ContainerElement
  | ReviewsElement
  | FormElement
  | IframeElement;


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
  eyebrowStyles?: CommonStyles;
  title: string;
  titleStyles?: CommonStyles;
  titleAccent: string;
  titleAccentStyles?: CommonStyles;
  subtitle: string;
  subtitleStyles?: CommonStyles;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaPrimaryStyles?: CommonStyles;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  ctaSecondaryStyles?: CommonStyles;
  overlayOpacity: number;
  animation?: string;
  eyebrowAnim?: string;
  titleAnim?: string;
  subtitleAnim?: string;
  ctaPrimaryAnim?: string;
  ctaSecondaryAnim?: string;
  bgPosition?: string;
  titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  columns?: ColumnData[]; // To allow adding elements
  styles?: CommonStyles;
};


export type TextContent = {
  eyebrow?: string;
  eyebrowStyles?: CommonStyles;
  title?: string;
  titleStyles?: CommonStyles;
  titleAccent?: string;
  titleAccentStyles?: CommonStyles;
  body: string;
  bodyStyles?: CommonStyles;
  alignment?: "left" | "center" | "right";
  animation?: string;
  eyebrowAnim?: string;
  titleAnim?: string;
  bodyAnim?: string;
  hoverEffect?: "none" | "grow" | "glow" | "lift";
  fontSize?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  columns?: ColumnData[]; // To allow adding elements
  styles?: CommonStyles;
};

export type StepsContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  accentColor?: string;
  steps: { day: string; eyebrow: string; title: string; body: string }[];
  titleTag?: "h1" | "h2" | "h3" | "h4";
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
  eyebrowStyles?: CommonStyles;
  title: string;
  titleStyles?: CommonStyles;
  titleAccent?: string;
  titleAccentStyles?: CommonStyles;
  body?: string;
  bodyStyles?: CommonStyles;
  buttonText?: string;
  buttonLink?: string;
  buttonStyles?: CommonStyles;
  eyebrowAnim?: string;
  titleAnim?: string;
  bodyAnim?: string;
  buttonAnim?: string;
  bgPosition?: string;
  titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  columns?: ColumnData[]; // To allow adding elements
  styles?: CommonStyles;
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

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
  isCTA?: boolean;
};

export type HeaderContent = {
  logo?: string;
  logoHeight?: string;
  logoLink?: string;
  links: NavLink[];
  isSticky?: boolean;
  isTransparent?: boolean;
  ctaText?: string;
  ctaLink?: string;
  layout?: "default" | "split" | "hamburger" | "centered";
  showSocials?: boolean;
  socials?: { platform: string; url: string }[];
  styles?: CommonStyles;
};

export type FooterContent = {
  logo?: string;
  copyright: string;
  columns: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  socialLinks?: { platform: string; url: string }[];
  styles?: CommonStyles;
};

export type SpacerContent = {
  height: number;
  gradient?: "none" | "dark-to-light" | "light-to-dark";
};

// ── Core Block Data ──────────────────────────────────────────────────────────

export type BlockType = 
  | "HEADER"
  | "FOOTER"
  | "SECTION"
  | "HERO"
  | "STEPS"
  | "AVAILABILITY"
  | "TEXT"
  | "IMAGE"
  | "GALLERY"
  | "CTA"
  | "SPACER"
  | "REVIEWS"
  | "FORM";

export type BlockContent =
  | SectionContent
  | HeroContent
  | CtaContent
  | StepsContent
  | AvailabilityContent
  | ImageContent
  | GalleryContent
  | SpacerContent
  | ReviewsElement
  | FormElement
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
    styles: { padding: "4rem 2rem" }
  },
  HEADER: {
    logo: "",
    logoHeight: "40px",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Servicios", href: "/servicios", children: [] },
      { label: "Contacto", href: "/contacto" }
    ],
    isSticky: true,
    isTransparent: false,
    styles: {}
  },
  FOOTER: {
    logo: "",
    copyright: "© 2024 Gastroshows. Todos los derechos reservados.",
    columns: [
      { title: "Empresa", links: [{ label: "Nosotros", href: "/nosotros" }] },
      { title: "Legal", links: [{ label: "Privacidad", href: "/privacidad" }] }
    ],
    styles: { padding: "4rem 2rem" }
  },
  HEADING: { type: "HEADING", level: 2, text: "Tu Título Aquí", styles: {} },
  BUTTON: { type: "BUTTON", text: "Clic Aquí", link: "#", variant: "primary", size: "md", styles: {} },
  TEXT: { type: "TEXT", body: "Escribe tu contenido aquí.", styles: {} },
  IMAGE: { type: "IMAGE", src: "", alt: "", styles: {} },
  CALENDAR: { type: "CALENDAR", color: "#daa520", styles: {} },
  AVAILABILITY: { 
    type: "AVAILABILITY", 
    title: "Hay {total} plazas libres esta semana", 
    subtitle: "DISPONIBILIDAD", 
    buttonText: "Reservar ahora", 
    styles: {} 
  },
  CONTAINER: { 
    type: "CONTAINER", 
    content: { 
      columns: [{ width: "100%", elements: [] }],
      styles: { padding: "2rem" }
    },
    styles: {} 
  },
  REVIEWS: { 
    type: "REVIEWS", 
    layout: "grid", 
    reviews: [
      { name: "Juan Pérez", text: "Excelente comida y ambiente. El servicio fue impecable.", rating: 5, date: "Hace 2 semanas" },
      { name: "María García", text: "Una experiencia gastronómica única. Muy recomendado.", rating: 5, date: "Hace 1 mes" },
      { name: "Carlos Ruiz", text: "Todo perfecto, volveremos sin duda.", rating: 4, date: "Hace 3 días" }
    ],
    showStars: true,
    showDates: true,
    styles: {} 
  },
  FORM: {
    type: "FORM",
    submitText: "Enviar mensaje",
    successMessage: "¡Gracias! Hemos recibido tu mensaje correctamente.",
    fields: [
      { id: "f1", type: "text", label: "Nombre", placeholder: "Tu nombre...", required: true, width: "half" },
      { id: "f2", type: "email", label: "Email", placeholder: "tu@email.com", required: true, width: "half" },
      { id: "f3", type: "tel", label: "Teléfono", placeholder: "600 000 000", required: false, width: "full" },
      { id: "f4", type: "textarea", label: "Mensaje", placeholder: "¿En qué podemos ayudarte?", required: true, width: "full" }
    ],
    styles: {}
  },
  IFRAME: {
    type: "IFRAME",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    width: "100%",
    height: "400px",
    styles: {}
  }
};


export const BLOCK_LABELS: Record<string, { label: string; icon: string; description: string }> = {
  HEADER:       { label: "Menú",            icon: "☰",  description: "Cabecera con navegación y logo" },
  FOOTER:       { label: "Footer",          icon: "🏁",  description: "Pie de página con enlaces y copyright" },
  SECTION:      { label: "Sección",         icon: "🔳",  description: "Contenedor universal de columnas" },
  HERO:         { label: "Hero (Preset)",   icon: "🏔",  description: "Cabecera de alto impacto" },
  STEPS:        { label: "Ritual (Preset)", icon: "📧",  description: "Secuencia de pasos o emails" },
  AVAILABILITY: { label: "Disponibilidad",  icon: "📅",  description: "Panel de disponibilidad en vivo" },
  REVIEWS:      { label: "Google Reviews",  icon: "⭐",  description: "Muestra las reseñas de Google" },
  FORM:         { label: "Formulario",      icon: "📋",  description: "Captura de leads y contacto" },
};

export const ELEMENT_LABELS: Record<string, { label: string; icon: string }> = {
  HEADING: { label: "Título", icon: "H" },
  BUTTON:  { label: "Botón",  icon: "🔘" },
  TEXT:    { label: "Texto",  icon: "T" },
  IMAGE:   { label: "Imagen", icon: "🖼" },
  CALENDAR: { label: "Calendario", icon: "📆" },
  AVAILABILITY: { label: "Disponibilidad", icon: "📅" },
  REVIEWS: { label: "Google Reviews", icon: "⭐" },
  FORM: { label: "Formulario", icon: "📋" },
  CONTAINER: { label: "Contenedor", icon: "📦" },
  IFRAME: { label: "Iframe", icon: "🖼️" },
};
