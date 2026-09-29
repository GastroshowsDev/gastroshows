"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string; categoryId: string; name: string; description: string | null;
  price: number; active: boolean; order: number;
};
type Category = { id: string; name: string; active: boolean; order: number; products: Product[] };

const BASE_CATEGORIES = ["Bebidas", "Vinos", "Platos", "Postres", "Café e infusiones"];

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json = (await res.json()) as { ok: boolean; data?: T; error?: string };
  if (!json.ok) throw new Error(json.error ?? "Error de red");
  return json.data as T;
}

const S = {
  input: { padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-bg)", color: "var(--color-admin-text)", fontSize: "0.85rem", outline: "none" },
  btn: { padding: "0.45rem 1rem", borderRadius: 6, border: "1px solid var(--color-admin-border)", background: "transparent", color: "var(--color-admin-text)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" },
  btnPrimary: { padding: "0.45rem 1rem", borderRadius: 6, border: "none", background: "var(--color-admin-accent)", color: "#fff", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" },
  card: { background: "var(--color-admin-surface)", border: "1px solid var(--color-admin-border)", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1rem" },
};

export function CartaManager() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCat, setNewCat] = useState("");
  const [newProd, setNewProd] = useState<Record<string, { name: string; price: string }>>({});
  const [editing, setEditing] = useState<Record<string, { name: string; price: string }>>({});

  async function load() {
    try {
      const data = await api<Category[]>("/api/admin/pos/catalog");
      setCats(data.map((c) => ({
        ...c,
        products: c.products.map((p) => ({ ...p, price: Number(p.price) || 0 })),
      })));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function createCat(name: string) {
    if (!name.trim()) return;
    await api("/api/admin/pos/catalog", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });
    await load();
  }

  async function seedBase() {
    for (const name of BASE_CATEGORIES) {
      if (cats.some((c) => c.name.toLowerCase() === name.toLowerCase())) continue;
      await createCat(name);
    }
  }

  async function createProduct(catId: string) {
    const f = newProd[catId];
    const price = Number(f?.price);
    if (!f?.name.trim() || !Number.isFinite(price) || price <= 0) {
      setError("Nombre y precio válido requeridos");
      return;
    }
    await api("/api/admin/pos/products", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId: catId, name: f.name.trim(), price }),
    });
    setNewProd((s) => ({ ...s, [catId]: { name: "", price: "" } }));
    await load();
  }

  async function saveProduct(p: Product) {
    const f = editing[p.id];
    if (!f) return;
    const price = Number(f.price);
    await api("/api/admin/pos/products", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: p.id,
        ...(f.name.trim() ? { name: f.name.trim() } : {}),
        ...(Number.isFinite(price) && price > 0 ? { price } : {}),
      }),
    });
    setEditing((s) => {
      const n = { ...s };
      delete n[p.id];
      return n;
    });
    await load();
  }

  async function toggleProduct(p: Product) {
    await api("/api/admin/pos/products", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, active: !p.active }),
    });
    await load();
  }

  async function deleteProduct(p: Product) {
    if (!confirm(`¿Eliminar "${p.name}"? El historial de comandas conserva nombre y precio.`)) return;
    await api(`/api/admin/pos/products?id=${encodeURIComponent(p.id)}`, { method: "DELETE" });
    await load();
  }

  async function toggleCat(c: Category) {
    await api("/api/admin/pos/catalog", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, active: !c.active }),
    });
    await load();
  }

  async function deleteCat(c: Category) {
    if (!confirm(`¿Eliminar la categoría "${c.name}"? Solo es posible si no tiene productos.`)) return;
    try {
      await api(`/api/admin/pos/catalog?id=${encodeURIComponent(c.id)}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo eliminar");
    }
  }

  if (loading) return <p style={{ color: "var(--color-admin-muted)" }}>Cargando carta…</p>;

  return (
    <div>
      {error && (
        <div style={{ marginBottom: "1rem", padding: "0.6rem 1rem", borderRadius: 8, background: "#FEE2E2", color: "#DC2626", fontSize: "0.82rem", fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div style={{ ...S.card, display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
        <input
          style={{ ...S.input, flex: 1, minWidth: 200 }} placeholder="Nueva categoría (ej. Bebidas)"
          value={newCat} onChange={(e) => setNewCat(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") void createCat(newCat).then(() => setNewCat("")); }}
        />
        <button style={S.btnPrimary} onClick={() => void createCat(newCat).then(() => setNewCat(""))}>
          + Categoría
        </button>
        {cats.length === 0 && (
          <button style={S.btn} onClick={() => void seedBase()}>Crear base (Bebidas, Vinos, Platos…)</button>
        )}
      </div>

      {cats.length === 0 && (
        <p style={{ color: "var(--color-admin-muted)", fontSize: "0.85rem" }}>
          Carta vacía. Crea categorías o usa el botón de base para empezar.
        </p>
      )}

      {cats.map((c) => (
        <div key={c.id} style={{ ...S.card, opacity: c.active ? 1 : 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-admin-text)", margin: 0 }}>{c.name}</h2>
            <span style={{ fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>
              {c.products.length} producto(s)
            </span>
            <span style={{ flex: 1 }} />
            <button style={S.btn} onClick={() => void toggleCat(c)}>{c.active ? "Desactivar" : "Activar"}</button>
            <button style={{ ...S.btn, color: "#DC2626" }} onClick={() => void deleteCat(c)}>Eliminar</button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
            <tbody>
              {c.products.map((p) => {
                const ed = editing[p.id];
                return (
                  <tr key={p.id} style={{ borderTop: "1px solid var(--color-admin-border)", opacity: p.active ? 1 : 0.55 }}>
                    <td style={{ padding: "0.5rem 0.25rem" }}>
                      {ed ? (
                        <input style={{ ...S.input, width: "100%" }} value={ed.name}
                          onChange={(e) => setEditing((s) => ({ ...s, [p.id]: { ...ed, name: e.target.value } }))} />
                      ) : (
                        <span style={{ fontWeight: 600, color: "var(--color-admin-text)" }}>{p.name}</span>
                      )}
                    </td>
                    <td style={{ padding: "0.5rem 0.25rem", width: 110 }}>
                      {ed ? (
                        <input style={{ ...S.input, width: "100%" }} type="number" min="0" step="0.5" value={ed.price}
                          onChange={(e) => setEditing((s) => ({ ...s, [p.id]: { ...ed, price: e.target.value } }))} />
                      ) : (
                        <span style={{ fontWeight: 700 }}>{Number(p.price).toFixed(2)} €</span>
                      )}
                    </td>
                    <td style={{ padding: "0.5rem 0.25rem", textAlign: "right", whiteSpace: "nowrap" }}>
                      {ed ? (
                        <>
                          <button style={S.btnPrimary} onClick={() => void saveProduct(p)}>Guardar</button>{" "}
                          <button style={S.btn} onClick={() => setEditing((s) => {
                            const n = { ...s }; delete n[p.id]; return n;
                          })}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button style={S.btn} onClick={() => setEditing((s) => ({
                            ...s, [p.id]: { name: p.name, price: String(p.price) },
                          }))}>Editar</button>{" "}
                          <button style={S.btn} onClick={() => void toggleProduct(p)}>
                            {p.active ? "Ocultar" : "Mostrar"}
                          </button>{" "}
                          <button style={{ ...S.btn, color: "#DC2626" }} onClick={() => void deleteProduct(p)}>✕</button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <input
              style={{ ...S.input, flex: 2, minWidth: 140 }} placeholder="Nuevo producto"
              value={newProd[c.id]?.name ?? ""}
              onChange={(e) => setNewProd((s) => ({ ...s, [c.id]: { name: e.target.value, price: s[c.id]?.price ?? "" } }))}
            />
            <input
              style={{ ...S.input, flex: 1, minWidth: 90 }} placeholder="Precio €" type="number" min="0" step="0.5"
              value={newProd[c.id]?.price ?? ""}
              onChange={(e) => setNewProd((s) => ({ ...s, [c.id]: { name: s[c.id]?.name ?? "", price: e.target.value } }))}
              onKeyDown={(e) => { if (e.key === "Enter") void createProduct(c.id); }}
            />
            <button style={S.btnPrimary} onClick={() => void createProduct(c.id)}>+ Añadir</button>
          </div>
        </div>
      ))}
    </div>
  );
}
