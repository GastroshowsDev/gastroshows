/**
 * AeoAnswer — bloque de "respuesta directa" optimizado para Answer Engines
 * (ChatGPT, Claude, Perplexity, Gemini) y featured snippets de Google.
 *
 * Patrón AEO: una pregunta clara como encabezado + respuesta concisa de 40-80
 * palabras + tabla de datos verificables (precio, duración, capacidad…). El
 * texto es contenido HTML real (server-rendered) y por tanto extractable.
 *
 * Server component (sin interactividad).
 */

export type AeoRow = { label: string; value: string };

export function AeoAnswer({
  eyebrow = "En breve",
  question,
  answer,
  rows,
}: {
  eyebrow?: string;
  question: string;
  answer: string;
  rows?: AeoRow[];
}) {
  return (
    <section
      aria-label={question}
      style={{
        background: "#050505",
        padding: "clamp(2.5rem, 4vw, 4rem) 2rem",
        borderTop: "1px solid rgba(218,165,32,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          border: "1px solid rgba(218,165,32,0.18)",
          background: "rgba(218,165,32,0.02)",
          padding: "clamp(1.75rem, 3vw, 2.5rem)",
        }}
      >
        <p
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--gs-gold)",
            marginBottom: "1rem",
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            lineHeight: 1.25,
            marginBottom: "1.25rem",
          }}
        >
          {question}
        </h2>
        <p
          style={{
            color: "rgba(245,240,232,0.75)",
            fontSize: "1rem",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {answer}
        </p>

        {rows && rows.length > 0 && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "2rem",
            }}
          >
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    borderTop: i === 0 ? "1px solid rgba(218,165,32,0.15)" : "none",
                    borderBottom: "1px solid rgba(218,165,32,0.08)",
                  }}
                >
                  <th
                    scope="row"
                    style={{
                      textAlign: "left",
                      padding: "0.7rem 1rem 0.7rem 0",
                      color: "var(--gs-gold)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                    }}
                  >
                    {row.label}
                  </th>
                  <td
                    style={{
                      padding: "0.7rem 0",
                      color: "rgba(245,240,232,0.7)",
                      fontSize: "0.92rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
