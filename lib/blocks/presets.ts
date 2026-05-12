import { BlockData, BLOCK_DEFAULTS } from "./types";

export const HEADER_PRESETS: SectionPreset[] = [
  {
    id: "header-minimal",
    name: "Minimalista Glass",
    category: "Menú",
    icon: "🕊️",
    description: "Limpio, con efecto cristal y logo centrado.",
    blocks: [
      {
        type: "HEADER",
        content: {
          logo: "/images/logo-dark.png",
          logoHeight: "40px",
          links: [
            { label: "Inicio", href: "/" },
            { label: "Menú", href: "/menu" },
            { label: "Reserva", href: "/reservar" }
          ],
          styles: { 
            backgroundColor: "rgba(255,255,255,0.8)", 
            backdropFilter: "blur(10px)",
            position: "sticky",
            top: 0
          }
        }
      }
    ]
  },
  {
    id: "header-classic",
    name: "Clásico Premium",
    category: "Menú",
    icon: "🏛️",
    description: "Logo a la izquierda, menú a la derecha.",
    blocks: [
      {
        type: "HEADER",
        content: {
          logo: "/images/logo-dark.png",
          links: [
            { label: "Experiencias", href: "/experiencias" },
            { label: "Galería", href: "/galeria" },
            { label: "Contacto", href: "/contacto" }
          ],
          ctaText: "RESERVAR",
          ctaLink: "/reservar",
          styles: { padding: "1.5rem 4rem" }
        }
      }
    ]
  },
  {
    id: "header-dark-gold",
    name: "Oscuro y Dorado",
    category: "Menú",
    icon: "🌙",
    description: "Fondo negro con detalles en oro, ideal para Clandestino.",
    blocks: [
      {
        type: "HEADER",
        content: {
          logo: "/images/logo-gold.png",
          links: [
            { label: "Vinos", href: "/vinos" },
            { label: "Cócteles", href: "/cocteles" },
            { label: "Eventos", href: "/eventos" }
          ],
          styles: { 
            backgroundColor: "#0A0A0A", 
            color: "#daa520",
            borderBottom: "1px solid rgba(218,165,32,0.2)"
          }
        }
      }
    ]
  },
  {
    id: "header-split-logo",
    name: "Logo Dividido",
    category: "Menú",
    icon: "✂️",
    description: "Logo en el centro con enlaces a ambos lados.",
    blocks: [
      {
        type: "HEADER",
        content: {
          logo: "/images/logo-dark.png",
          layout: "split",
          links: [
            { label: "Nosotros", href: "/nosotros" },
            { label: "Ubicación", href: "/donde-estamos" },
            { label: "Carta", href: "/la-carta" },
            { label: "Blog", href: "/noticias" }
          ],
          styles: { padding: "1rem 2rem" }
        }
      }
    ]
  },
  {
    id: "header-bold-cta",
    name: "Enfoque Conversión",
    category: "Menú",
    icon: "🚀",
    description: "Botón de reserva destacado y enlaces minimalistas.",
    blocks: [
      {
        type: "HEADER",
        content: {
          logo: "/images/logo-dark.png",
          links: [
            { label: "Qué hacemos", href: "/servicios" },
            { label: "Opiniones", href: "/reviews" }
          ],
          ctaText: "RESERVA TU MESA",
          ctaLink: "/reservar",
          styles: { 
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
          }
        }
      }
    ]
  },
  {
    id: "header-social",
    name: "Con Redes Sociales",
    category: "Menú",
    icon: "📱",
    description: "Incluye iconos sociales en la barra superior.",
    blocks: [
      {
        type: "HEADER",
        content: {
          logo: "/images/logo-dark.png",
          showSocials: true,
          socials: [
            { platform: "instagram", url: "#" },
            { platform: "facebook", url: "#" }
          ],
          links: [
            { label: "Carta", href: "/la-carta" },
            { label: "Reserva", href: "/reservar" }
          ]
        }
      }
    ]
  },
  {
    id: "header-fullscreen-trigger",
    name: "Menú Hamburguesa Pro",
    category: "Menú",
    icon: "🍔",
    description: "Solo logo y un botón de menú que despliega a pantalla completa.",
    blocks: [
      {
        type: "HEADER",
        content: {
          logo: "/images/logo-dark.png",
          layout: "hamburger",
          links: [
            { label: "Inicio", href: "/" },
            { label: "Sobre Nosotros", href: "/nosotros" },
            { label: "Nuestra Cocina", href: "/cocina" },
            { label: "Contacto", href: "/contacto" }
          ],
          styles: { padding: "1.5rem" }
        }
      }
    ]
  },
  {
    id: "header-transparent-fixed",
    name: "Transparente sobre Imagen",
    category: "Menú",
    icon: "👻",
    description: "Sin fondo, ideal para colocar sobre un Hero.",
    blocks: [
      {
        type: "HEADER",
        content: {
          logo: "/images/logo-light.png",
          links: [
            { label: "El Espacio", href: "/espacio" },
            { label: "Menús", href: "/menus" },
            { label: "Gift Cards", href: "/regalos" }
          ],
          styles: { 
            backgroundColor: "transparent", 
            color: "white",
            position: "absolute",
            width: "100%",
            zIndex: 1000
          }
        }
      }
    ]
  }
];

export type SectionPreset = {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  blocks: any[]; // Array of block configurations (usually just one SECTION block with elements)
};

export const SECTION_PRESETS: SectionPreset[] = [
  {
    id: "hero-apple-cinematic",
    name: "Cinemático Pro",
    category: "Banner Principal",
    icon: "🎬",
    description: "Diseño estilo Apple con tipografía gigante y fondo inmersivo.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "100%",
              elements: [
                { type: "HEADING", level: 1, text: "Gastroshows.", styles: { fontSize: "6rem", fontWeight: 900, textAlign: "center", letterSpacing: "-0.04em", marginBottom: "0.5rem", color: "white" } },
                { type: "HEADING", level: 2, text: "La revolución del sabor.", styles: { fontSize: "2.5rem", fontWeight: 400, textAlign: "center", color: "rgba(255,255,255,0.7)", marginBottom: "3rem" } },
                { type: "BUTTON", text: "Comenzar Experiencia", variant: "primary", styles: { margin: "0 auto", padding: "1.2rem 3rem", borderRadius: "40px", fontSize: "1.1rem" } }
              ]
            }
          ],
          styles: { 
            padding: "12rem 2rem", 
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center"
          }
        }
      }
    ]
  },
  {
    id: "hero-apple-split",
    name: "Minimal Split",
    category: "Banner Principal",
    icon: "🌓",
    description: "Contenido a la izquierda, imagen flotante a la derecha.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "50%",
              elements: [
                { type: "TEXT", body: "NUEVA TEMPORADA", styles: { fontWeight: 700, color: "#875BF7", letterSpacing: "0.2em", fontSize: "0.8rem", marginBottom: "1rem" } },
                { type: "HEADING", level: 1, text: "Un viaje sensorial.", styles: { fontSize: "4.5rem", fontWeight: 800, lineHeight: 1, marginBottom: "2rem" } },
                { type: "TEXT", body: "Explora texturas y aromas que desafían lo convencional. Una curaduría de platos diseñada para los paladares más exigentes.", styles: { fontSize: "1.25rem", lineHeight: 1.6, color: "#4B5563", marginBottom: "3rem" } },
                { type: "BUTTON", text: "Ver el Menú", variant: "primary", styles: { padding: "1rem 2.5rem", borderRadius: "30px" } }
              ]
            },
            {
              width: "50%",
              elements: [
                { type: "IMAGE", src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop", styles: { borderRadius: "30px", boxShadow: "0 30px 60px rgba(0,0,0,0.15)", transform: "rotate(2deg)" } }
              ]
            }
          ],
          styles: { padding: "8rem 4rem", backgroundColor: "#F9FAFB" }
        }
      }
    ]
  },
  {
    id: "hero-apple-glass",
    name: "Glassmorphism Dark",
    category: "Banner Principal",
    icon: "💎",
    description: "Efecto de cristal sobre fondo oscuro y desenfocado.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "100%",
              elements: [
                { 
                  type: "HEADING", 
                  level: 1, 
                  text: "Clandestino.", 
                  styles: { 
                    textAlign: "center", 
                    fontSize: "4rem", 
                    color: "white",
                    padding: "4rem",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "40px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    maxWidth: "800px",
                    margin: "0 auto"
                  } 
                }
              ]
            }
          ],
          styles: { 
            padding: "10rem 2rem", 
            backgroundImage: "url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop)",
            backgroundSize: "cover"
          }
        }
      }
    ]
  },

  // ── Presentación Producto ──────────────────────────────────────────────────
  {
    id: "product-apple-grid",
    name: "Mosaico Editorial",
    category: "Presentación Producto",
    icon: "🎞️",
    description: "Diseño asimétrico sofisticado para platos estrella.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "60%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop", styles: { borderRadius: "40px", height: "600px" } } ] },
            { 
              width: "40%", 
              elements: [ 
                { type: "SPACER", height: 100 },
                { type: "HEADING", level: 3, text: "La frescura en su estado más puro.", styles: { fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" } },
                { type: "TEXT", body: "Nuestras ensaladas zen no son solo comida, son una meditación sobre el producto local.", styles: { fontSize: "1.1rem", lineHeight: 1.6, color: "#6B7280" } },
                { type: "BUTTON", text: "Explorar ingredientes", variant: "outline", styles: { marginTop: "2rem", borderRadius: "20px" } }
              ] 
            }
          ],
          styles: { padding: "6rem 2rem" }
        }
      }
    ]
  },
  {
    id: "product-apple-cards",
    name: "Tarjetas Flotantes Pro",
    category: "Presentación Producto",
    icon: "🗂️",
    description: "Tarjetas con sombras suaves y bordes redondeados Apple.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { 
              width: "33.33%", 
              elements: [ 
                { 
                  type: "IMAGE", 
                  src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop", 
                  styles: { borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" } 
                },
                { type: "HEADING", level: 4, text: "Pizzas de Autor", styles: { textAlign: "center", marginTop: "1.5rem", fontSize: "1.2rem" } }
              ] 
            },
            { 
              width: "33.33%", 
              elements: [ 
                { 
                  type: "IMAGE", 
                  src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop", 
                  styles: { borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" } 
                },
                { type: "HEADING", level: 4, text: "Cortes Selectos", styles: { textAlign: "center", marginTop: "1.5rem", fontSize: "1.2rem" } }
              ] 
            },
            { 
              width: "33.33%", 
              elements: [ 
                { 
                  type: "IMAGE", 
                  src: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=800&auto=format&fit=crop", 
                  styles: { borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" } 
                },
                { type: "HEADING", level: 4, text: "Pasta Tradicional", styles: { textAlign: "center", marginTop: "1.5rem", fontSize: "1.2rem" } }
              ] 
            }
          ],
          styles: { padding: "6rem 4rem" }
        }
      }
    ]
  },

  // ── Presentación Equipo ────────────────────────────────────────────────────
  {
    id: "team-grid",
    name: "Nuestros Chefs",
    category: "Presentación Equipo",
    icon: "👨‍🍳",
    description: "Retratos circulares con nombre y cargo.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1583394838336-acd977730f8a?q=80&w=1968&auto=format&fit=crop", alt: "Chef 1", styles: { borderRadius: "50%", width: "150px", height: "150px", margin: "0 auto" } }, { type: "HEADING", level: 4, text: "Marc Sala", styles: { textAlign: "center", marginTop: "1rem" } }, { type: "TEXT", body: "Executive Chef", styles: { textAlign: "center", fontSize: "0.8rem", color: "#6B7280" } } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1577214459173-bb31bd086663?q=80&w=1974&auto=format&fit=crop", alt: "Chef 2", styles: { borderRadius: "50%", width: "150px", height: "150px", margin: "0 auto" } }, { type: "HEADING", level: 4, text: "Elena Bosch", styles: { textAlign: "center", marginTop: "1rem" } }, { type: "TEXT", body: "Sous Chef", styles: { textAlign: "center", fontSize: "0.8rem", color: "#6B7280" } } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1595273670150-db0c3c39241f?q=80&w=1974&auto=format&fit=crop", alt: "Sommelier", styles: { borderRadius: "50%", width: "150px", height: "150px", margin: "0 auto" } }, { type: "HEADING", level: 4, text: "Pol Tur", styles: { textAlign: "center", marginTop: "1rem" } }, { type: "TEXT", body: "Sommelier", styles: { textAlign: "center", fontSize: "0.8rem", color: "#6B7280" } } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop", alt: "Manager", styles: { borderRadius: "50%", width: "150px", height: "150px", margin: "0 auto" } }, { type: "HEADING", level: 4, text: "Anna Roca", styles: { textAlign: "center", marginTop: "1rem" } }, { type: "TEXT", body: "Maître", styles: { textAlign: "center", fontSize: "0.8rem", color: "#6B7280" } } ] }
          ],
          styles: { padding: "5rem 2rem" }
        }
      }
    ]
  },
  {
    id: "team-focus",
    name: "Biografía Chef",
    category: "Presentación Equipo",
    icon: "👤",
    description: "Imagen grande del chef principal con su trayectoria.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "40%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1974&auto=format&fit=crop", alt: "Chef" } ] },
            { width: "60%", elements: [ { type: "HEADING", level: 2, text: "Marc Sala: Alma del Proyecto" }, { type: "TEXT", body: "Con más de 20 años de experiencia en cocinas con estrella Michelin, Marc decidió fundar Gastroshows para llevar la alta cocina a un formato más cercano y divertido." }, { type: "BUTTON", text: "Ver su Instagram", link: "#", variant: "outline" } ] }
          ],
          styles: { padding: "6rem 2rem", backgroundColor: "white" }
        }
      }
    ]
  },
  {
    id: "team-action",
    name: "Equipo en Acción",
    category: "Presentación Equipo",
    icon: "🔥",
    description: "Fotos espontáneas de la cocina y el servicio.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "50%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop", alt: "Cocinando" } ] },
            { width: "50%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1590577976322-3d2d6e2130ee?q=80&w=2070&auto=format&fit=crop", alt: "Servicio" } ] }
          ],
          styles: { padding: "2rem" }
        }
      }
    ]
  },
  {
    id: "team-text",
    name: "Nuestra Filosofía",
    category: "Presentación Equipo",
    icon: "📜",
    description: "Solo texto con los valores del equipo.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "HEADING", level: 2, text: "Más que un equipo, una familia", styles: { textAlign: "center" } },
              { type: "TEXT", body: "Creemos en el respeto, la formación continua y la pasión por el detalle. Cada miembro de Gastroshows es una pieza clave en tu experiencia.", styles: { textAlign: "center", maxWidth: "700px", margin: "2rem auto" } }
            ]}
          ],
          styles: { padding: "5rem 2rem" }
        }
      }
    ]
  },
  {
    id: "team-mosaic",
    name: "Mosaico Humano",
    category: "Presentación Equipo",
    icon: "🧩",
    description: "Varias fotos pequeñas de todo el personal.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "20%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1583394838336-acd977730f8a?q=80&w=150&auto=format&fit=crop" } ] },
            { width: "20%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1577214459173-bb31bd086663?q=80&w=150&auto=format&fit=crop" } ] },
            { width: "20%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1595273670150-db0c3c39241f?q=80&w=150&auto=format&fit=crop" } ] },
            { width: "20%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=150&auto=format&fit=crop" } ] },
            { width: "20%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=150&auto=format&fit=crop" } ] }
          ],
          styles: { padding: "2rem" }
        }
      }
    ]
  },

  // ── Sección de Formulario ──────────────────────────────────────────────────
  {
    id: "form-standard",
    name: "Contacto Básico",
    category: "Formulario de Contacto",
    icon: "✉️",
    description: "Nombre, email y mensaje.",
    blocks: [
      {
        type: "FORM",
        content: {
          ...BLOCK_DEFAULTS.FORM,
          fields: [
            { id: "n1", type: "text", label: "Nombre", placeholder: "Tu nombre...", required: true, width: "full" },
            { id: "e1", type: "email", label: "Email", placeholder: "tu@email.com", required: true, width: "full" },
            { id: "m1", type: "textarea", label: "Mensaje", placeholder: "¿En qué podemos ayudarte?", required: true, width: "full" }
          ]
        }
      }
    ]
  },
  {
    id: "form-reservation",
    name: "Solicitud de Evento",
    category: "Formulario de Contacto",
    icon: "📅",
    description: "Formulario extendido para eventos privados.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [ { type: "HEADING", level: 2, text: "Organiza tu Evento Privado", styles: { textAlign: "center", marginBottom: "2rem" } } ] }
          ],
          styles: { padding: "4rem 2rem 0" }
        }
      },
      {
        type: "FORM",
        content: {
          fields: [
            { id: "n1", type: "text", label: "Nombre", placeholder: "Nombre...", required: true, width: "half" },
            { id: "t1", type: "tel", label: "Teléfono", placeholder: "600...", required: true, width: "half" },
            { id: "d1", type: "text", label: "Fecha Sugerida", placeholder: "DD/MM/AAAA", required: true, width: "half" },
            { id: "p1", type: "text", label: "Nº de Personas", placeholder: "Ej: 25", required: true, width: "half" },
            { id: "m1", type: "textarea", label: "Comentarios Adicionales", placeholder: "Detalles del evento...", required: false, width: "full" }
          ],
          submitText: "Enviar Solicitud"
        }
      }
    ]
  },
  {
    id: "form-split",
    name: "Contacto con Mapa/Info",
    category: "Formulario de Contacto",
    icon: "🗺️",
    description: "Información a la izquierda y formulario a la derecha.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "40%", elements: [
              { type: "HEADING", level: 3, text: "Visítanos" },
              { type: "TEXT", body: "Calle Marina, 123<br>08005 Barcelona<br><br>+34 931 234 567<br>hola@gastroshows.com" },
              { type: "SPACER", height: 20 }
            ] },
            { width: "60%", elements: [
              { type: "FORM", content: { fields: [ { id: "n1", type: "text", label: "Nombre" }, { id: "m1", type: "textarea", label: "Mensaje" } ] } }
            ] }
          ],
          styles: { padding: "6rem 2rem" }
        }
      }
    ]
  },
  {
    id: "form-minimal",
    name: "Newsletter",
    category: "Formulario de Contacto",
    icon: "📰",
    description: "Solo campo de email para suscripciones.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "HEADING", level: 3, text: "Suscríbete a nuestra agenda", styles: { textAlign: "center" } },
              { type: "FORM", content: { fields: [ { id: "e1", type: "email", label: "Email", placeholder: "tu@email.com", width: "full" } ], submitText: "Unirse" } }
            ]}
          ],
          styles: { padding: "4rem 2rem", backgroundColor: "#F0EBFE" }
        }
      }
    ]
  },
  {
    id: "form-dark",
    name: "Contacto Dark",
    category: "Formulario de Contacto",
    icon: "🌑",
    description: "Estilo nocturno elegante.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "HEADING", level: 2, text: "Escríbenos", styles: { color: "white", textAlign: "center" } },
              { type: "FORM", content: { styles: { backgroundColor: "transparent" } } }
            ]}
          ],
          styles: { padding: "6rem 2rem", backgroundColor: "#111827" }
        }
      }
    ]
  },

  // ── Texto e Imagen ─────────────────────────────────────────────────────────
  {
    id: "text-img-left",
    name: "Imagen Izquierda",
    category: "Texto e Imagen",
    icon: "🖼️",
    description: "Imagen a la izquierda y texto a la derecha.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "50%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1550966842-2849a2830a28?q=80&w=2071&auto=format&fit=crop" } ] },
            { width: "50%", elements: [ { type: "HEADING", level: 2, text: "Cocina de Proximidad" }, { type: "TEXT", body: "Trabajamos directamente con agricultores y pescadores locales para ofrecerte lo mejor de cada temporada." } ] }
          ],
          styles: { padding: "5rem 2rem" }
        }
      }
    ]
  },
  {
    id: "text-img-right",
    name: "Imagen Derecha",
    category: "Texto e Imagen",
    icon: "🖼️",
    description: "Texto a la izquierda e imagen a la derecha.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "50%", elements: [ { type: "HEADING", level: 2, text: "Vinos Seleccionados" }, { type: "TEXT", body: "Nuestra cava cuenta con más de 100 referencias de bodegas independientes y producciones limitadas." } ] },
            { width: "50%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop" } ] }
          ],
          styles: { padding: "5rem 2rem" }
        }
      }
    ]
  },
  {
    id: "text-img-card",
    name: "Tarjeta con Imagen",
    category: "Texto e Imagen",
    icon: "📇",
    description: "Imagen sobre fondo de color con texto superpuesto o al lado.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "IMAGE", src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1935&auto=format&fit=crop", styles: { height: "500px", objectPosition: "center 40%" } }
            ]}
          ],
          styles: { padding: "0" }
        }
      },
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [ { type: "HEADING", level: 3, text: "Un espacio diseñado para los sentidos" }, { type: "TEXT", body: "Música, iluminación y aroma se unen para crear una atmósfera envolvente." } ] }
          ],
          styles: { padding: "4rem 2rem", marginTop: "-6rem", backgroundColor: "white", maxWidth: "800px", margin: "0 auto", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", position: "relative", zIndex: 10 }
        }
      }
    ]
  },
  {
    id: "text-img-overlap",
    name: "Imagen con Solapamiento",
    category: "Texto e Imagen",
    icon: "🔳",
    description: "Estilo editorial con imagen solapada por el texto.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "60%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" } ] },
            { width: "40%", elements: [ { type: "HEADING", level: 2, text: "Tradición" }, { type: "TEXT", body: "Recetas heredadas que mantienen vivo el espíritu de nuestra tierra." } ] }
          ],
          styles: { padding: "6rem 2rem" }
        }
      }
    ]
  },
  {
    id: "text-img-gallery",
    name: "Texto + Mini Galería",
    category: "Texto e Imagen",
    icon: "🎞️",
    description: "Texto a un lado y varias imágenes pequeñas al otro.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "50%", elements: [ { type: "HEADING", level: 2, text: "Detalles que enamoran" }, { type: "TEXT", body: "Cuidamos cada rincón para que tu estancia sea mágica." } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=200&auto=format&fit=crop" }, { type: "SPACER", height: 10 }, { type: "IMAGE", src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=200&auto=format&fit=crop" } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1550966842-2849a2830a28?q=80&w=200&auto=format&fit=crop" }, { type: "SPACER", height: 10 }, { type: "IMAGE", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=200&auto=format&fit=crop" } ] }
          ],
          styles: { padding: "5rem 2rem" }
        }
      }
    ]
  },

  // ── Testimonios Pro ────────────────────────────────────────────────────────
  {
    id: "testimonial-apple-minimal",
    name: "Cita Editorial",
    category: "Testimonios",
    icon: "🖋️",
    description: "Cita grande con tipografía elegante y autor minimalista.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "100%",
              elements: [
                { type: "TEXT", body: "“", styles: { fontSize: "8rem", color: "#875BF7", lineHeight: 0, textAlign: "center", height: "4rem", display: "block" } },
                { type: "HEADING", level: 2, text: "La mejor cena clandestina que he vivido jamás. El misterio y el sabor se funden en uno.", styles: { fontSize: "2.5rem", fontWeight: 300, fontStyle: "italic", textAlign: "center", maxWidth: "800px", margin: "0 auto 2rem" } },
                { type: "TEXT", body: "— CARLOS RODRÍGUEZ, CRÍTICO GASTRONÓMICO", styles: { textAlign: "center", fontWeight: 700, letterSpacing: "0.2em", fontSize: "0.8rem", color: "#6B7280" } }
              ]
            }
          ],
          styles: { padding: "8rem 2rem", backgroundColor: "white" }
        }
      }
    ]
  },
  {
    id: "stats-apple-bold",
    name: "Cifras de Impacto",
    category: "Otros",
    icon: "📊",
    description: "Grandes números para mostrar el éxito de tu restaurante.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "33.33%", elements: [ { type: "HEADING", level: 2, text: "15k", styles: { fontSize: "5rem", fontWeight: 900, textAlign: "center" } }, { type: "TEXT", body: "Visitantes satisfechos", styles: { textAlign: "center", color: "#6B7280" } } ] },
            { width: "33.33%", elements: [ { type: "HEADING", level: 2, text: "45", styles: { fontSize: "5rem", fontWeight: 900, textAlign: "center", color: "#875BF7" } }, { type: "TEXT", body: "Eventos exclusivos", styles: { textAlign: "center", color: "#6B7280" } } ] },
            { width: "33.33%", elements: [ { type: "HEADING", level: 2, text: "3", styles: { fontSize: "5rem", fontWeight: 900, textAlign: "center" } }, { type: "TEXT", body: "Soles Repsol", styles: { textAlign: "center", color: "#6B7280" } } ] }
          ],
          styles: { padding: "8rem 2rem", backgroundColor: "#F9FAFB" }
        }
      }
    ]
  },
  {
    id: "gallery-apple-mosaic",
    name: "Mosaico Apple Gallery",
    category: "Otros",
    icon: "🖼️",
    description: "Galería asimétrica inspirada en la App Store.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "66.66%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop", styles: { borderRadius: "24px", height: "500px" } } ] },
            { 
              width: "33.33%", 
              elements: [ 
                { type: "IMAGE", src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop", styles: { borderRadius: "24px", height: "240px", marginBottom: "20px" } },
                { type: "IMAGE", src: "https://images.unsplash.com/photo-1550966842-2849a2830a28?q=80&w=600&auto=format&fit=crop", styles: { borderRadius: "24px", height: "240px" } }
              ] 
            }
          ],
          styles: { padding: "4rem 2rem" }
        }
      }
    ]
  },

  // ── 10 Tipos Adicionales ───────────────────────────────────────────────────
  {
    id: "extra-features",
    name: "Cuadrícula de Servicios",
    category: "Otros",
    icon: "🛠️",
    description: "Iconos o imágenes con descripciones cortas.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "33.33%", elements: [ { type: "HEADING", level: 4, text: "Cenas Privadas" }, { type: "TEXT", body: "Espacios exclusivos para tus reuniones íntimas." } ] },
            { width: "33.33%", elements: [ { type: "HEADING", level: 4, text: "Catas de Vino" }, { type: "TEXT", body: "Aprende con nuestro sommelier experto." } ] },
            { width: "33.33%", elements: [ { type: "HEADING", level: 4, text: "Eventos VIP" }, { type: "TEXT", body: "Organizamos tu fiesta a medida." } ] }
          ],
          styles: { padding: "5rem 2rem", textAlign: "center" }
        }
      }
    ]
  },
  {
    id: "extra-testimonials",
    name: "Testimonios Destacados",
    category: "Otros",
    icon: "💬",
    description: "Opiniones de clientes con estrellas.",
    blocks: [
      {
        type: "REVIEWS",
        layout: "carousel",
        showStars: true,
        styles: { padding: "6rem 2rem", backgroundColor: "#F9FAFB" }
      }
    ]
  },
  {
    id: "extra-logos",
    name: "Muro de Logotipos",
    category: "Otros",
    icon: "🤝",
    description: "Para mostrar marcas colaboradoras o prensa.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "25%", elements: [ { type: "IMAGE", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", styles: { opacity: 0.5, filter: "grayscale(1)" } } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", styles: { opacity: 0.5, filter: "grayscale(1)" } } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", styles: { opacity: 0.5, filter: "grayscale(1)" } } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", styles: { opacity: 0.5, filter: "grayscale(1)" } } ] }
          ],
          styles: { padding: "4rem 2rem" }
        }
      }
    ]
  },
  {
    id: "extra-faq",
    name: "Preguntas Frecuentes",
    category: "Otros",
    icon: "❓",
    description: "Sección de dudas comunes.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "HEADING", level: 2, text: "Preguntas Frecuentes", styles: { textAlign: "center", marginBottom: "3rem" } },
              { type: "HEADING", level: 4, text: "¿Tenéis opciones veganas?" },
              { type: "TEXT", body: "Sí, disponemos de un menú completo adaptado a dietas plant-based." },
              { type: "SPACER", height: 20 },
              { type: "HEADING", level: 4, text: "¿Cómo reservar para grupos?" },
              { type: "TEXT", body: "Para más de 10 personas, por favor utiliza nuestro formulario de eventos." }
            ]}
          ],
          styles: { padding: "5rem 2rem", maxWidth: "800px", margin: "0 auto" }
        }
      }
    ]
  },
  {
    id: "extra-cta-full",
    name: "CTA de Ancho Completo",
    category: "Otros",
    icon: "📢",
    description: "Bloque de acción muy llamativo.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "HEADING", level: 2, text: "¿Listo para una noche inolvidable?", styles: { color: "white" } },
              { type: "BUTTON", text: "Reservar Ahora", link: "/reserva", variant: "primary", styles: { padding: "1.2rem 3rem" } }
            ]}
          ],
          styles: { padding: "8rem 2rem", backgroundColor: "var(--gs-gold)", textAlign: "center" }
        }
      }
    ]
  },
  {
    id: "extra-stats",
    name: "Contadores / Estadísticas",
    category: "Otros",
    icon: "📊",
    description: "Números que hablan por sí solos.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "25%", elements: [ { type: "HEADING", level: 2, text: "15k" }, { type: "TEXT", body: "Clientes Felices" } ] },
            { width: "25%", elements: [ { type: "HEADING", level: 2, text: "45" }, { type: "TEXT", body: "Platos Únicos" } ] },
            { width: "25%", elements: [ { type: "HEADING", level: 2, text: "12" }, { type: "TEXT", body: "Años de Pasión" } ] },
            { width: "25%", elements: [ { type: "HEADING", level: 2, text: "3" }, { type: "TEXT", body: "Estrellas" } ] }
          ],
          styles: { padding: "5rem 2rem", textAlign: "center" }
        }
      }
    ]
  },
  {
    id: "extra-steps",
    name: "Pasos / El Ritual",
    category: "Otros",
    icon: "🛤️",
    description: "Guía al usuario por un proceso.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [ { type: "HEADING", level: 2, text: "Tu Experiencia Paso a Paso", styles: { textAlign: "center", marginBottom: "4rem" } } ] }
          ],
          styles: { padding: "4rem 2rem 0" }
        }
      },
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "33%", elements: [ { type: "HEADING", level: 3, text: "1. Reserva" }, { type: "TEXT", body: "Elige tu fecha y turno favorito." } ] },
            { width: "33%", elements: [ { type: "HEADING", level: 3, text: "2. Llega" }, { type: "TEXT", body: "Te recibimos con un cocktail de bienvenida." } ] },
            { width: "33%", elements: [ { type: "HEADING", level: 3, text: "3. Disfruta" }, { type: "TEXT", body: "Déjate llevar por el espectáculo." } ] }
          ],
          styles: { padding: "0 2rem 6rem", textAlign: "center" }
        }
      }
    ]
  },
  {
    id: "extra-gallery",
    name: "Galería de Estilo de Vida",
    category: "Otros",
    icon: "📸",
    description: "Cuadrícula de fotos sin bordes.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1550966842-2849a2830a28?q=80&w=400&auto=format&fit=crop" } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400&auto=format&fit=crop" } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop" } ] },
            { width: "25%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop" } ] }
          ],
          styles: { padding: "0" }
        }
      }
    ]
  },
  {
    id: "extra-newsletter-full",
    name: "Newsletter Elegante",
    category: "Otros",
    icon: "📧",
    description: "Captura de leads con fondo de imagen suave.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "HEADING", level: 2, text: "Únete a nuestra lista VIP", styles: { textAlign: "center" } },
              { type: "TEXT", body: "Recibe invitaciones exclusivas y noticias antes que nadie.", styles: { textAlign: "center" } },
              { type: "FORM", content: { fields: [ { id: "e1", type: "email", label: "Email" } ], submitText: "Suscribirse" } }
            ]}
          ],
          styles: { padding: "8rem 2rem", backgroundColor: "#F9FAFB", borderRadius: "30px", margin: "2rem" }
        }
      }
    ]
  },
  {
    id: "extra-pricing-menu",
    name: "Menú Degustación",
    category: "Otros",
    icon: "💰",
    description: "Tarjetas con precio y lo que incluye.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "50%", elements: [
              { type: "HEADING", level: 3, text: "Menú Esencia" },
              { type: "HEADING", level: 2, text: "45€" },
              { type: "TEXT", body: "• 5 pases<br>• Maridaje opcional<br>• Café incluido" },
              { type: "BUTTON", text: "Elegir", link: "#", variant: "primary" }
            ], styles: { padding: "3rem", border: "1px solid #eee", borderRadius: "20px" } },
            { width: "50%", elements: [
              { type: "HEADING", level: 3, text: "Menú Espectáculo" },
              { type: "HEADING", level: 2, text: "85€" },
              { type: "TEXT", body: "• 12 pases<br>• Maridaje premium<br>• Cocktail de bienvenida" },
              { type: "BUTTON", text: "Elegir", link: "#", variant: "primary" }
            ], styles: { padding: "3rem", background: "white", border: "2px solid var(--gs-gold)", borderRadius: "20px" } }
          ],
          styles: { padding: "6rem 2rem", gap: "2rem" }
        }
      }
    ]
  },
  {
    id: "innovative-glass",
    name: "Glassmorphism Moderno",
    category: "Otros",
    icon: "💎",
    description: "Diseño con efecto cristal sobre fondo degradado.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "100%",
              elements: [
                { type: "HEADING", level: 2, text: "Innovación en cada detalle", styles: { textAlign: "center", color: "white" } },
                { type: "CONTAINER", content: {
                  columns: [{ width: "100%", elements: [
                    { type: "TEXT", body: "Nuestra tecnología nos permite crear experiencias únicas que desafían los límites de lo convencional.", styles: { textAlign: "center", fontSize: "1.1rem" } },
                    { type: "BUTTON", text: "Saber más", link: "#", variant: "outline", styles: { margin: "1.5rem auto", display: "block" } }
                  ]}],
                  styles: { 
                    backgroundColor: "rgba(255, 255, 255, 0.15)", 
                    backdropFilter: "blur(20px)", 
                    borderRadius: "24px", 
                    padding: "3rem", 
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
                  }
                }}
              ]
            }
          ],
          styles: { 
            padding: "8rem 2rem", 
            backgroundImage: "linear-gradient(135deg, #875BF7 0%, #daa520 100%)",
            backgroundSize: "cover"
          }
        }
      }
    ]
  },
  {
    id: "innovative-mosaic",
    name: "Mosaico Dark Luxury",
    category: "Otros",
    icon: "🧱",
    description: "Cuadrícula asimétrica para una presentación de lujo.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "60%",
              elements: [
                { type: "IMAGE", src: "https://images.unsplash.com/photo-1550966842-2849a2830a28?q=80&w=1000&auto=format&fit=crop", styles: { height: "500px", borderRadius: "12px" } }
              ]
            },
            {
              width: "40%",
              elements: [
                { type: "IMAGE", src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop", styles: { height: "240px", borderRadius: "12px", marginBottom: "20px" } },
                { type: "IMAGE", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", styles: { height: "240px", borderRadius: "12px" } }
              ]
            }
          ],
          styles: { padding: "6rem 2rem", backgroundColor: "#0A0A0A", gap: "20px" }
        }
      }
    ]
  },
  {
    id: "innovative-floating",
    name: "Editorial Flotante",
    category: "Otros",
    icon: "🗞️",
    description: "Elementos que se solapan con sombras profundas.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "50%",
              elements: [
                { type: "IMAGE", src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=800&auto=format&fit=crop", styles: { borderRadius: "4px", boxShadow: "0 50px 100px -20px rgba(0,0,0,0.25)" } }
              ]
            },
            {
              width: "50%",
              elements: [
                { type: "CONTAINER", content: {
                  columns: [{ width: "100%", elements: [
                    { type: "HEADING", level: 2, text: "La Belleza en la Simplicidad", styles: { marginBottom: "1.5rem", fontSize: "2.5rem" } },
                    { type: "TEXT", body: "Creemos que lo esencial no necesita adornos. Cada ingrediente, cada color y cada textura tiene su propio lenguaje." }
                  ]}],
                  styles: {
                    padding: "4rem",
                    backgroundColor: "white",
                    marginTop: "4rem",
                    marginLeft: "-4rem",
                    boxShadow: "0 30px 60px -12px rgba(0,0,0,0.15)",
                    borderRadius: "8px",
                    position: "relative",
                    zIndex: 2
                  }
                }}
              ]
            }
          ],
          styles: { padding: "8rem 2rem" }
        }
      }
    ]
  },
  {
    id: "innovative-cinema",
    name: "Cinemático Full-Width",
    category: "Otros",
    icon: "🎞️",
    description: "Imagen a pantalla completa con texto minimalista.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "100%",
              elements: [
                { type: "SPACER", height: 300 },
                { type: "HEADING", level: 1, text: "Pasión por lo que hacemos", styles: { color: "white", textAlign: "center", fontSize: "4rem", fontWeight: 900, textTransform: "uppercase" } },
                { type: "SPACER", height: 300 }
              ]
            }
          ],
          styles: { 
            padding: "0",
            backgroundImage: "url(https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }
        }
      }
    ]
  }
];
