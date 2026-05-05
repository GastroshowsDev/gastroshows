import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div style={{ background: "var(--gs-bg)", color: "var(--gs-text)", minHeight: "100vh" }}>
      {/* Nav */}
      <div style={{ position: "fixed", top: "1.25rem", left: "1.5rem", zIndex: 100 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(200,169,110,0.7)", textDecoration: "none",
          }}
        >
          ← Inicio
        </Link>
      </div>

      {/* Header */}
      <header style={{
        borderBottom: "1px solid var(--gs-border)",
        padding: "5rem 2rem 2.5rem",
        textAlign: "center",
      }}>
        <p style={{
          fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(200,169,110,0.55)", marginBottom: "1rem",
        }}>
          GastroShows · Legal
        </p>
        <h1 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 300,
          color: "var(--gs-text)",
          marginBottom: "0.75rem",
        }}>
          {title}
        </h1>
        <p style={{ fontSize: "0.75rem", color: "var(--gs-muted)" }}>
          Última actualización: {updated}
        </p>
      </header>

      {/* Content */}
      <main style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "3rem 2rem 6rem",
      }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--gs-border)",
        padding: "1.5rem 2rem",
        textAlign: "center",
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        <Link href="/privacidad" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(200,169,110,0.5)", textDecoration: "none" }}>
          Privacidad
        </Link>
        <Link href="/aviso-legal" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(200,169,110,0.5)", textDecoration: "none" }}>
          Aviso legal
        </Link>
      </footer>
    </div>
  );
}

// ── Shared section styles ─────────────────────────────────────────────────────
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "1.4rem", fontWeight: 400,
        color: "var(--gs-text)",
        marginBottom: "1rem",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid var(--gs-border)",
      }}>
        {title}
      </h2>
      <div style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "var(--gs-text-muted)" }}>
        {children}
      </div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ marginBottom: "0.85rem" }}>{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return (
    <ul style={{ paddingLeft: "1.25rem", marginBottom: "0.85rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {children}
    </ul>
  );
}

export function Li({ children }: { children: ReactNode }) {
  return <li style={{ listStyleType: "none", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(200,169,110,0.3)" }}>{children}</li>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong style={{ color: "var(--gs-text)", fontWeight: 600 }}>{children}</strong>;
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span style={{
      background: "rgba(200,169,110,0.15)",
      border: "1px solid rgba(200,169,110,0.4)",
      borderRadius: "3px",
      padding: "0 0.3rem",
      color: "#daa520",
      fontStyle: "italic",
      fontSize: "0.85em",
    }}>
      {children}
    </span>
  );
}

export function Table({ rows }: { rows: [string, string, string][] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "0.85rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
        <thead>
          <tr>
            {["Cookie / Proveedor", "Finalidad", "Duración"].map((h) => (
              <th key={h} style={{
                padding: "0.5rem 0.75rem", textAlign: "left",
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                color: "var(--gs-muted)", borderBottom: "1px solid var(--gs-border)",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c], i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--gs-border)" }}>
              <td style={{ padding: "0.5rem 0.75rem", color: "var(--gs-text)", fontWeight: 500 }}>{a}</td>
              <td style={{ padding: "0.5rem 0.75rem", color: "var(--gs-text-muted)" }}>{b}</td>
              <td style={{ padding: "0.5rem 0.75rem", color: "var(--gs-text-muted)", whiteSpace: "nowrap" }}>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
