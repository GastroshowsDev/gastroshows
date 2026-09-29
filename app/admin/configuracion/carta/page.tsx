import { CartaManager } from "@/components/admin/CartaManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Carta TPV | GastroShows",
};

export default function CartaPage() {
  return (
    <div style={{ padding: "1.25rem 1.5rem", maxWidth: 900 }}>
      <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>Carta del TPV</h1>
      <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", margin: "0.15rem 0 1.25rem" }}>
        Categorías y productos comunes a las dos salas. Lo desactivado no aparece en el TPV.
      </p>
      <CartaManager />
    </div>
  );
}
