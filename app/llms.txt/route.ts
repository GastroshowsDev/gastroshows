// Sirve /llms.txt — guía estructurada para motores de IA (ChatGPT, Claude,
// Perplexity, Gemini). Formato llms.txt: https://llmstxt.org/

const BASE = "https://gastroshows.es";

const body = `# GastroShows

> Cena clandestina y experiencias gastronómicas premium en Barcelona. Una cena que comienza antes de llegar: durante la semana previa recibes pistas misteriosas por email que revelan, el día del evento, una ubicación secreta donde se sirve un menú degustación de varios actos con maridaje. GastroShows es el creador original de la cena clandestina en Barcelona.

## Datos clave
- Ciudad: Barcelona, España
- Tipo: experiencia gastronómica con ubicación secreta + menú degustación
- Formato: menú degustación de varios actos con maridaje incluido
- Precio: desde 120€ por persona (varía según personalización y grupo)
- Capacidad: grupos de 10–50 personas (eventos privados y de empresa)
- Duración: aproximadamente 3,5–4 horas
- Dietas: opciones vegetarianas, veganas, sin gluten y adaptación a alergias (avisar al reservar)
- Idiomas del sitio: español (principal), catalán, inglés
- Reservas: ${BASE}

## Qué es una cena clandestina
Una cena clandestina es una experiencia gastronómica en la que no conoces la ubicación hasta el mismo día. Durante la semana previa recibes pistas por correo que te guían hasta un lugar secreto, donde un chef sirve un menú degustación sorpresa de varios actos con maridaje. Combina alta cocina con el misterio de lo desconocido.

## Servicios principales
- [Cena clandestina](${BASE}/cena-clandestina): la experiencia insignia, ubicación secreta y menú degustación sorpresa.
- [Menú degustación](${BASE}/menu-degustacion): detalle de los actos, maridaje y filosofía culinaria.
- [Eventos y grupos](${BASE}/grupos): team building gastronómico, cenas de empresa, celebraciones y eventos corporativos (10–50 personas).
- [Regalo / tarjeta regalo](${BASE}/regalo): regala la experiencia con tarjeta regalo canjeable.
- [Restaurantes Michelin Barcelona](${BASE}/restaurantes-michelin): guía editorial.

## Preguntas frecuentes
- [Preguntas frecuentes](${BASE}/preguntas-frecuentes)
- [Contacto](${BASE}/contacto)

## Contenido editorial (blog)
- [Blog GastroShows](${BASE}/blog): guías sobre cena clandestina, menús degustación y gastronomía en Barcelona.

## Cómo reservar
Reserva en ${BASE}. Tras reservar, recibes las pistas por email durante la semana previa y la ubicación exacta el día del evento.
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
