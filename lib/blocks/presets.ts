import { BlockData, BLOCK_DEFAULTS } from "./types";

export type SectionPreset = {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  blocks: any[]; // Array of block configurations (usually just one SECTION block with elements)
};

export const SECTION_PRESETS: SectionPreset[] = [
  // ── Banner Principal (Hero) ────────────────────────────────────────────────
  {
    id: "hero-modern",
    name: "Hero Elegante",
    category: "Banner Principal",
    icon: "🏔",
    description: "Título grande con fondo de imagen y botón.",
    blocks: [
      {
        type: "HERO",
        content: {
          ...BLOCK_DEFAULTS.HERO,
          title: "Experiencia Gastronómica",
          titleAccent: "Inolvidable",
          subtitle: "Descubre el arte de la cocina en un entorno único.",
          bgImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
        }
      }
    ]
  },
  {
    id: "hero-split",
    name: "Hero Dividido",
    category: "Banner Principal",
    icon: "🌓",
    description: "Contenido a un lado e imagen al otro.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "50%",
              elements: [
                { type: "HEADING", level: 1, text: "Sabores Auténticos", styles: { fontSize: "4rem", marginBottom: "1rem" } },
                { type: "TEXT", body: "Nuestra cocina combina tradición y vanguardia para crear platos que cuentan una historia.", styles: { fontSize: "1.2rem", color: "rgba(0,0,0,0.7)" } },
                { type: "BUTTON", text: "Reservar Mesa", link: "/reservar", variant: "primary", styles: { marginTop: "2rem" } }
              ]
            },
            {
              width: "50%",
              elements: [
                { type: "IMAGE", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop", alt: "Plato gourmet" }
              ]
            }
          ],
          styles: { padding: "6rem 2rem", backgroundColor: "#FFFFFF" }
        }
      }
    ]
  },
  {
    id: "hero-minimal",
    name: "Hero Minimal",
    category: "Banner Principal",
    icon: "⚪",
    description: "Diseño limpio y centrado con mucho aire.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            {
              width: "100%",
              elements: [
                { type: "HEADING", level: 1, text: "Gastroshows", styles: { textAlign: "center", fontSize: "5rem", letterSpacing: "0.1em" } },
                { type: "TEXT", body: "LA EXCELENCIA EN CADA BOCADO", styles: { textAlign: "center", textTransform: "uppercase", letterSpacing: "0.4em", color: "var(--gs-gold)" } },
                { type: "SPACER", height: 40 },
                { type: "BUTTON", text: "Explorar Menú", link: "/menu", variant: "outline", styles: { margin: "0 auto", display: "block" } }
              ]
            }
          ],
          styles: { padding: "10rem 2rem" }
        }
      }
    ]
  },
  {
    id: "hero-video",
    name: "Hero con Video",
    category: "Banner Principal",
    icon: "🎥",
    description: "Fondo de video para máximo impacto visual.",
    blocks: [
      {
        type: "HERO",
        content: {
          ...BLOCK_DEFAULTS.HERO,
          title: "Siente el Fuego",
          titleAccent: "en Vivo",
          subtitle: "Cocina abierta y espectáculos gastronómicos cada noche.",
          bgImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
        }
      }
    ]
  },
  {
    id: "hero-dark",
    name: "Hero Nocturno",
    category: "Banner Principal",
    icon: "🌙",
    description: "Colores oscuros y dorados para un ambiente premium.",
    blocks: [
      {
        type: "HERO",
        content: {
          ...BLOCK_DEFAULTS.HERO,
          styles: { backgroundColor: "#0A0A0A" },
          title: "Clandestino",
          titleAccent: "Cocktail Bar",
          subtitle: "La noche de Barcelona empieza aquí.",
          bgImage: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop",
        }
      }
    ]
  },

  // ── Presentación Producto ──────────────────────────────────────────────────
  {
    id: "product-grid",
    name: "Cuadrícula de Platos",
    category: "Presentación Producto",
    icon: "🍱",
    description: "Muestra tus mejores platos en una cuadrícula limpia.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "33.33%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop", alt: "Ensalada" }, { type: "HEADING", level: 3, text: "Ensalada Zen", styles: { marginTop: "1rem" } } ] },
            { width: "33.33%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=2080&auto=format&fit=crop", alt: "Pancakes" }, { type: "HEADING", level: 3, text: "Dulce Amanecer", styles: { marginTop: "1rem" } } ] },
            { width: "33.33%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop", alt: "Carne" }, { type: "HEADING", level: 3, text: "Fuego Lento", styles: { marginTop: "1rem" } } ] }
          ],
          styles: { padding: "4rem 2rem" }
        }
      }
    ]
  },
  {
    id: "product-highlight",
    name: "Producto Destacado",
    category: "Presentación Producto",
    icon: "🌟",
    description: "Gran imagen central con descripción detallada.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "IMAGE", src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop", alt: "Chuletón", styles: { height: "400px", borderRadius: "20px" } },
              { type: "SPACER", height: 30 },
              { type: "HEADING", level: 2, text: "Nuestra Joya: Chuletón de Buey", styles: { textAlign: "center" } },
              { type: "TEXT", body: "Madurado durante 45 días en cámara propia para un sabor y textura inigualables.", styles: { textAlign: "center", maxWidth: "800px", margin: "0 auto" } }
            ]}
          ],
          styles: { padding: "6rem 2rem" }
        }
      }
    ]
  },
  {
    id: "product-zigzag",
    name: "Zig-Zag de Menú",
    category: "Presentación Producto",
    icon: "🔃",
    description: "Alterna imagen y texto para un scroll dinámico.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "50%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop", alt: "Entrantes" } ] },
            { width: "50%", elements: [ { type: "HEADING", level: 3, text: "01. Entrantes del Huerto" }, { type: "TEXT", body: "Ingredientes recolectados al alba para garantizar el máximo frescor en tu mesa." } ] }
          ],
          styles: { padding: "4rem 2rem" }
        }
      },
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "50%", elements: [ { type: "HEADING", level: 3, text: "02. Pesca del Día" }, { type: "TEXT", body: "Directamente desde la lonja a nuestra cocina, respetando los tiempos del mar." } ] },
            { width: "50%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop", alt: "Pescado" } ] }
          ],
          styles: { padding: "4rem 2rem", backgroundColor: "#F9FAFB" }
        }
      }
    ]
  },
  {
    id: "product-list",
    name: "Lista de Precios",
    category: "Presentación Producto",
    icon: "📜",
    description: "Estilo carta clásica con precios a la derecha.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "100%", elements: [
              { type: "HEADING", level: 2, text: "Nuestra Selección", styles: { textAlign: "center", marginBottom: "3rem" } },
              { type: "TEXT", body: "<div style='display:flex; justify-content:space-between; border-bottom:1px dashed #ccc; padding:10px 0'><span>Burrata de Puglia</span> <span>18€</span></div>" },
              { type: "TEXT", body: "<div style='display:flex; justify-content:space-between; border-bottom:1px dashed #ccc; padding:10px 0'><span>Carpaccio de Gamba Roja</span> <span>24€</span></div>" },
              { type: "TEXT", body: "<div style='display:flex; justify-content:space-between; border-bottom:1px dashed #ccc; padding:10px 0'><span>Arroz de Montaña</span> <span>22€</span></div>" }
            ]}
          ],
          styles: { padding: "5rem 2rem" }
        }
      }
    ]
  },
  {
    id: "product-cards",
    name: "Tarjetas de Menú",
    category: "Presentación Producto",
    icon: "🃏",
    description: "Bloques con sombra y fondo blanco para destacar platos.",
    blocks: [
      {
        type: "SECTION",
        content: {
          columns: [
            { width: "50%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop", alt: "Pizza", styles: { borderRadius: "15px" } }, { type: "HEADING", level: 3, text: "Pizzas de Autor" } ] },
            { width: "50%", elements: [ { type: "IMAGE", src: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=2020&auto=format&fit=crop", alt: "Pasta", styles: { borderRadius: "15px" } }, { type: "HEADING", level: 3, text: "Pastas Caseras" } ] }
          ],
          styles: { padding: "4rem 2rem" }
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
  }
];
