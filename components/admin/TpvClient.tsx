"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Tipos ──────────────────────────────────────────────────────────
type Venue = { id: string; name: string; capacity: number };
type Operator = { id: string; name: string; token: string };
type Product = { id: string; name: string; price: number; imageUrl?: string | null; active: boolean };
type Category = { id: string; name: string; products: Product[] };
type Diner = {
  reservationId: string; name: string; guests: number; status: string;
  visitTime: string | null; openOrders: number; total: number;
  reservationTotal: number; reservationPaid: number;
};
type OrderLine = { id: string; productName: string; unitPrice: number; qty: number };
type Order = {
  id: string; status: string; reservationId: string | null;
  lines: OrderLine[]; openedBy: { name: string } | null;
};

// ─── Helpers ────────────────────────────────────────────────────────
const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const money = (n: number) => eur.format(n);
const toNum = (v: unknown) => (typeof v === "number" ? v : Number(v) || 0);

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {};
  const operatorRaw = sessionStorage.getItem(OP_KEY);
  if (operatorRaw) {
    try {
      const op = JSON.parse(operatorRaw);
      if (op.token) headers["Authorization"] = "Bearer " + op.token;
    } catch { /* sin token */ }
  }
  const mergedInit: RequestInit = {
    ...init,
    headers: { ...(init?.headers || {}), ...headers },
  };
  const res = await fetch(url, mergedInit);
  const json = (await res.json()) as { ok: boolean; data?: T; error?: string };
  if (!json.ok) throw new Error(json.error ?? "Error de red");
  return json.data as T;
}

const OP_KEY = "tpv-operator";

// ─── Estilos táctiles ───────────────────────────────────────────────
const T = {
  page: { maxWidth: 720, margin: "0 auto", minHeight: "100%", background: "var(--color-admin-bg)", paddingBottom: 30 } as const,
  pad: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 } as const,
  padBtn: {
    minHeight: 68, fontSize: "1.6rem", fontWeight: 700, borderRadius: 14,
    border: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)",
    color: "var(--color-admin-text)", cursor: "pointer",
  } as const,
  tab: (active: boolean) => ({
    flex: 1, minHeight: 52, borderRadius: 12, fontSize: "0.95rem", fontWeight: 700,
    border: active ? "none" : "1px solid var(--color-admin-border)",
    background: active ? "var(--color-admin-accent)" : "var(--color-admin-surface)",
    color: active ? "#fff" : "var(--color-admin-text)", cursor: "pointer",
  }) as const,
  diner: (active: boolean) => ({
    width: "100%", textAlign: "left" as const, padding: "0.8rem 1rem", borderRadius: 12,
    border: active ? "2px solid var(--color-admin-accent)" : "1px solid var(--color-admin-border)",
    background: active ? "var(--color-admin-accent-light)" : "var(--color-admin-surface)",
    cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem", minHeight: 64,
  }) as const,
  prod: {
    minHeight: 76, borderRadius: 12, border: "1px solid var(--color-admin-border)",
    background: "var(--color-admin-surface)", cursor: "pointer", padding: 0,
    display: "flex", flexDirection: "row" as const, alignItems: "center", gap: 0,
  } as const,
  catPill: (active: boolean) => ({
    flexShrink: 0, minHeight: 44, padding: "0 1rem", borderRadius: 999,
    border: active ? "none" : "1px solid var(--color-admin-border)",
    background: active ? "var(--color-admin-text)" : "var(--color-admin-surface)",
    color: active ? "var(--color-admin-bg)" : "var(--color-admin-text)",
    fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
  }) as const,
  input: {
    width: "100%", minHeight: 52, padding: "0.6rem 1rem", borderRadius: 12,
    border: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)",
    color: "var(--color-admin-text)", fontSize: "1rem", outline: "none", boxSizing: "border-box" as const,
  } as const,
  primary: {
    width: "100%", minHeight: 56, borderRadius: 12, border: "none",
    background: "var(--color-admin-accent)", color: "#fff",
    fontSize: "1rem", fontWeight: 700, cursor: "pointer",
  } as const,
  overlay: {
    position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
    display: "flex", alignItems: "flex-end", justifyContent: "center",
  } as const,
  sheet: {
    background: "var(--color-admin-surface)", borderRadius: "20px 20px 0 0",
    padding: "1.25rem 1.25rem calc(1.25rem + env(safe-area-inset-bottom))",
    width: "100%", maxWidth: 720, maxHeight: "85vh", overflowY: "auto" as const,
  } as const,
  stepBtn: {
    width: 52, height: 52, borderRadius: 12, border: "1px solid var(--color-admin-border)",
    background: "var(--color-admin-bg)", color: "var(--color-admin-text)",
    fontSize: "1.4rem", fontWeight: 700, cursor: "pointer",
  } as const,
};

// ─── Pantalla PIN ───────────────────────────────────────────────────
function PinScreen({ onOk }: { onOk: (op: Operator) => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(code: string) {
    if (code.length !== 4 || busy) return;
    setBusy(true); setError("");
    try {
      const emp = await api<{ id: string; name: string; token: string }>("/api/admin/pos/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: code }),
      });
      if (!emp) throw new Error("PIN no válido");
      onOk({ id: emp.id, name: emp.name, token: emp.token });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setPin("");
    } finally {
      setBusy(false);
    }
  }

  function press(d: string) {
    if (busy || pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) void submit(next);
  }

  return (
    <div style={{ maxWidth: 380, margin: "0 auto", padding: "3rem 1.25rem 2rem", textAlign: "center" }}>
      <div style={{ fontSize: "2.4rem", marginBottom: "0.25rem" }}>🧾</div>
      <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--color-admin-text)" }}>TPV GastroShows</h1>
      <p style={{ color: "var(--color-admin-muted)", fontSize: "0.85rem", margin: "0.25rem 0 1.5rem" }}>
        Introduce tu código de sesión
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: "1.5rem" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            width: 22, height: 22, borderRadius: "50%",
            background: pin.length > i ? "var(--color-admin-accent)" : "var(--color-admin-border)",
          }} />
        ))}
      </div>
      <div style={T.pad}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button key={d} style={T.padBtn} onClick={() => press(d)}>{d}</button>
        ))}
        <button style={T.padBtn} onClick={() => setPin("")}>⌫</button>
        <button style={T.padBtn} onClick={() => press("0")}>0</button>
        <button style={{ ...T.padBtn, fontSize: "1rem" }} onClick={() => setPin("")}>C</button>
      </div>
      {error && <p style={{ color: "#DC2626", fontWeight: 600, marginTop: "1rem" }}>{error}</p>}
      {busy && <p style={{ color: "var(--color-admin-muted)", marginTop: "1rem" }}>Verificando…</p>}
    </div>
  );
}

// ─── Componente principal ───────────────────────────────────────────
export function TpvClient({ venues }: { venues: Venue[] }) {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [venueId, setVenueId] = useState<string>(venues[0]?.id ?? "");
  const [catalog, setCatalog] = useState<Category[]>([]);
  const [diners, setDiners] = useState<Diner[]>([]);
  const [roomTotal, setRoomTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [catId, setCatId] = useState<string | null>(null);
  const [quickOpen, setQuickOpen] = useState(false);
  const [qName, setQName] = useState("");
  const [qGuests, setQGuests] = useState(2);
  const [qShift, setQShift] = useState<"NIGHT" | "NOON">("NIGHT");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [cobrarId, setCobrarId] = useState<string | null>(null);
  const [payTab, setPayTab] = useState<"CASH" | "CARD">("CARD");
  const [cashInput, setCashInput] = useState("");
  const [payError, setPayError] = useState("");
  const refreshTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(OP_KEY);
      if (raw) setOperator(JSON.parse(raw) as Operator);
    } catch { /* sin operario */ }
  }, []);

  function login(op: Operator) {
    sessionStorage.setItem(OP_KEY, JSON.stringify(op));
    setOperator(op);
  }
  function logout() {
    sessionStorage.removeItem(OP_KEY);
    setOperator(null); setSelectedId(null); setOrders([]);
  }

  const loadCatalog = useCallback(async () => {
    const cats = await api<Category[]>("/api/admin/pos/catalog?activeOnly=1");
    setCatalog(cats.map((c) => ({
      ...c,
      products: c.products.map((p) => ({ ...p, price: toNum(p.price) })),
    })));
  }, []);

  const loadDiners = useCallback(async (vId: string) => {
    const res = await api<{ diners: Diner[]; roomTotal: number }>(
      `/api/admin/pos/diners?venueId=${encodeURIComponent(vId)}`,
    );
    setDiners(res.diners);
    setRoomTotal(res.roomTotal);
  }, []);

  const refresh = useCallback(async (vId: string) => {
    setError("");
    try {
      await Promise.all([loadCatalog(), loadDiners(vId)]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar");
    }
  }, [loadCatalog, loadDiners]);

  useEffect(() => {
    if (!operator || !venueId) return;
    void refresh(venueId);
    if (refreshTimer.current) clearInterval(refreshTimer.current);
    refreshTimer.current = setInterval(() => { void loadDiners(venueId); }, 30000);
    return () => { if (refreshTimer.current) clearInterval(refreshTimer.current); };
  }, [operator, venueId, refresh, loadDiners]);

  useEffect(() => {
    setSelectedId(null); setOrders([]); setQuery("");
  }, [venueId]);

  async function selectDiner(reservationId: string) {
    setSelectedId(reservationId);
    try {
      const list = await api<Order[]>(
        `/api/admin/pos/orders?venueId=${encodeURIComponent(venueId)}&reservationId=${encodeURIComponent(reservationId)}`,
      );
      setOrders(list.map((o) => ({
        ...o,
        lines: o.lines.map((l) => ({ ...l, unitPrice: toNum(l.unitPrice) })),
      })));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar comandas");
    }
  }

  function addToCart(p: Product) {
    if (busy || !selected || !operator) return;
    setBusy(true);
    const payload = [{ productId: p.id, qty: 1 }];
    const orderPromise = openOrder
      ? api("/api/admin/pos/orders", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: openOrder.id, addLines: payload }),
        })
      : api("/api/admin/pos/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            venueId, reservationId: selected.reservationId, dinerName: selected.name,
            eventId: null, openedById: operator.id, lines: payload,
          }),
        });
    orderPromise
      .then(async () => {
        await loadDiners(venueId);
        await selectDiner(selected.reservationId);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Error al guardar");
      })
      .finally(() => {
        setBusy(false);
      });
  }
  const selected = useMemo(() => diners.find((d) => d.reservationId === selectedId) ?? null, [diners, selectedId]);
  const openOrder = useMemo(() => orders.find((o) => o.status === "OPEN") ?? null, [orders]);
  const existingTotal = useMemo(
    () => orders.reduce((s, o) => s + o.lines.reduce((x, l) => x + l.unitPrice * l.qty, 0), 0),
    [orders],
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return diners;
    return diners.filter((d) => d.name.toLowerCase().includes(q));
  }, [diners, query]);
  const activeCat = useMemo(
    () => catalog.find((c) => c.id === catId) ?? catalog[0] ?? null,
    [catalog, catId],
  );

  const reservationPending = useMemo(() => {
    if (!selected) return 0;
    return Math.max(0, selected.reservationTotal - selected.reservationPaid);
  }, [selected]);

  const tpvOrdersTotal = useMemo(() => {
    if (!selected) return 0;
    return selected.total;
  }, [selected]);

  const combinedPending = reservationPending + tpvOrdersTotal;

  function handleCashKey(val: string) {
    setCashInput((prev) => {
      if (val === "." && prev.includes(".")) return prev;
      if (val === "." && prev === "") return "0.";
      return prev + val;
    });
  }

  const cashValid = payTab === "CASH" && cashInput && parseFloat(cashInput) >= combinedPending - 0.01;
  const change = payTab === "CASH" ? (cashInput ? parseFloat(cashInput) : 0) - combinedPending : 0;

  async function handlePay() {
    if (!selected || busy || !operator) return;
    setBusy(true); setPayError("");
    const amount = combinedPending;
    try {
      const res = await fetch(`/api/admin/reservations/${selected.reservationId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + operator.token },
        body: JSON.stringify({ method: payTab, amount }),
      });
      const json = await res.json() as { ok?: boolean; error?: string };
      if (!json.ok) { setPayError(json.error ?? "Error"); return; }
      // Close all open TPV orders for this reservation
      for (const order of orders) {
        if (order.status === "OPEN") {
          try {
            await fetch("/api/admin/pos/orders", {
              method: "PATCH",
              headers: { "Content-Type": "application/json", Authorization: "Bearer " + operator.token },
              body: JSON.stringify({ orderId: order.id, status: "CLOSED" }),
            });
          } catch { /* ignore */ }
        }
      }
      setCobrarId(null); setCashInput("");
      await loadDiners(venueId);
      await selectDiner(selected.reservationId);
    } catch {
      setPayError("Error de red");
    } finally {
      setBusy(false);
    }
  }

  async function quickAdd() {
    if (!qName.trim() || busy) return;
    setBusy(true); setError("");
    try {
      const res = await api<{ id: string }>("/api/admin/pos/quick-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: qName.trim(), guests: qGuests, venueId, shift: qShift }),
      });
      setQuickOpen(false); setQName(""); setQGuests(2);
      await loadDiners(venueId);
      await selectDiner(res.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al crear");
    } finally {
      setBusy(false);
    }
  }

  if (!operator) return <div style={T.page}><PinScreen onOk={login} /></div>;

  const venue = venues.find((v) => v.id === venueId);

  return (
    <div style={T.page}>
      {/* Header sticky */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100, background: "var(--color-admin-bg)",
        padding: "0.6rem 0.8rem", borderBottom: "1px solid var(--color-admin-border)",
      }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {venues.map((v) => (
            <button key={v.id} style={T.tab(v.id === venueId)} onClick={() => setVenueId(v.id)}>
              {v.name}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            flex: 1, fontSize: "0.8rem", color: "var(--color-admin-muted)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            👨‍🍳 {operator.name}
          </span>
          <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-admin-text)" }}>
            Sala: {money(roomTotal)}
          </span>
          <button
            onClick={() => void refresh(venueId)}
            style={{ minWidth: 44, minHeight: 44, borderRadius: 10, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", fontSize: "1.1rem", cursor: "pointer" }}
            aria-label="Recargar"
          >↻</button>
          <button
            onClick={logout}
            style={{ minHeight: 44, padding: "0 0.8rem", borderRadius: 10, border: "1px solid var(--color-admin-border)", background: "var(--color-admin-surface)", color: "var(--color-admin-muted)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}
          >Salir</button>
        </div>
      </div>

      {error && (
        <div style={{ margin: "0.6rem 0.8rem 0", padding: "0.7rem 1rem", borderRadius: 10, background: "#FEE2E2", color: "#DC2626", fontSize: "0.85rem", fontWeight: 600 }}>
          {error}
        </div>
      )}

      {/* Buscador + nuevo comensal */}
      <div style={{ padding: "0.6rem 0.8rem", display: "flex", gap: 8 }}>
        <input
          style={T.input} placeholder="🔍 Buscar comensal…" value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => setQuickOpen(true)}
          style={{ minWidth: 56, minHeight: 52, borderRadius: 12, border: "none", background: "var(--color-admin-accent)", color: "#fff", fontSize: "1.5rem", fontWeight: 700, cursor: "pointer" }}
          aria-label="Nuevo comensal"
        >+</button>
      </div>

      {/* Comensales */}
      <div style={{ padding: "0 0.8rem", display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 && (
          <p style={{ color: "var(--color-admin-muted)", fontSize: "0.85rem", textAlign: "center", padding: "1.5rem 0" }}>
            Sin comensales en {venue?.name ?? "esta sala"} hoy. Usa + para añadir uno sin reserva.
          </p>
        )}
        {filtered.map((d) => (
          <button key={d.reservationId} style={T.diner(d.reservationId === selectedId)} onClick={() => void selectDiner(d.reservationId)}>
            <span style={{
              width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
              background: "var(--color-admin-accent-light)", color: "var(--color-admin-accent)",
              fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
            }}>
              {d.name.charAt(0).toUpperCase()}
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontWeight: 700, color: "var(--color-admin-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {d.name}
              </span>
              <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-admin-muted)" }}>
                {d.guests} pax{d.visitTime ? ` · ${d.visitTime}` : ""}{d.openOrders > 0 ? ` · ${d.openOrders} abierta(s)` : ""}
              </span>
            </span>
            <span style={{ fontWeight: 800, color: "var(--color-admin-text)" }}>{money(d.reservationTotal + d.total)}</span>
            {d.reservationTotal + d.total > d.reservationPaid && (
              <span style={{ fontSize: "0.7rem", color: "#F59E0B", fontWeight: 600 }}>
                Pend: {money(d.reservationTotal + d.total - d.reservationPaid)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Carta del comensal seleccionado */}
      {selected && (
        <div style={{ padding: "0.8rem 0.8rem 0" }}>
          <div style={{
            padding: "0.7rem 1rem", borderRadius: 12, background: "var(--color-admin-surface)",
            border: "1px solid var(--color-admin-border)", marginBottom: "0.6rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <div style={{ fontWeight: 800, color: "var(--color-admin-text)" }}>{selected.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>
                  Reserva: <strong style={{ color: "var(--color-admin-text)" }}>{money(selected.reservationTotal)}</strong>
                  {selected.reservationTotal > selected.reservationPaid && (
                    <span style={{ color: "#F59E0B" }}> (pend: {money(selected.reservationTotal - selected.reservationPaid)})</span>
                  )}
                </div>
              </div>
              {combinedPending > 0 && (
                <button
                  onClick={() => { setCobrarId(selected.reservationId); setPayError(""); setCashInput(""); setPayTab("CARD"); }}
                  style={{
                    padding: "0.4rem 0.8rem", borderRadius: 8, border: "none",
                    background: "#16A34A", color: "#fff",
                    fontSize: "0.8rem", fontWeight: 700, cursor: "pointer",
                  }}
                >
                  Cobrar {money(combinedPending)}
                </button>
              )}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-admin-muted)" }}>
              TPV hoy: <strong style={{ color: "var(--color-admin-text)" }}>{money(tpvOrdersTotal)}</strong>
              {openOrder ? " · comanda abierta" : tpvOrdersTotal > 0 ? " · sin comanda abierta" : " · sin consumaciones TPV"}
            </div>
            {orders.length > 0 && (
              <div style={{ marginTop: "0.4rem", fontSize: "0.78rem", color: "var(--color-admin-muted)" }}>
                {orders.map((o) => (
                  <div key={o.id} style={{ padding: "0.15rem 0" }}>
                    {o.status === "OPEN" ? "🟢" : "✅"} {o.lines.map((l) => `${l.qty}× ${l.productName}`).join(", ") || "—"}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: "0.5rem", marginBottom: "0.25rem" }}>
            {catalog.map((c) => (
              <button key={c.id} style={T.catPill((activeCat?.id ?? "") === c.id)} onClick={() => setCatId(c.id)}>
                {c.name}
              </button>
            ))}
          </div>

          {catalog.length === 0 && (
            <p style={{ color: "var(--color-admin-muted)", fontSize: "0.85rem", textAlign: "center", padding: "1rem 0" }}>
              Carta vacía. Cárgala en Configuración → Carta.
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {(activeCat?.products ?? []).map((p) => (
              <button key={p.id} style={T.prod} onClick={() => addToCart(p)}>
                <div style={{ flex: 1, padding: "0.6rem 0.75rem", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--color-admin-text)", lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                  <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--color-admin-accent)", marginTop: 2 }}>{money(p.price)}</span>
                </div>
                {p.imageUrl ? (
                  <div style={{ width: 64, height: 64, flexShrink: 0, overflow: "hidden", borderLeft: "1px solid var(--color-admin-border)" }}>
                    <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{ width: 64, height: 64, flexShrink: 0, borderLeft: "1px solid var(--color-admin-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", background: "var(--color-admin-bg)" }}>
                    🍽️
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal cobro */}
      {cobrarId && (() => {
        const res = diners.find((r) => r.reservationId === cobrarId);
        if (!res) return null;
        const tabBtn = (active: boolean): React.CSSProperties => ({
          flex: 1, padding: "0.6rem",
          background: active ? "var(--color-admin-accent)" : "transparent",
          color: active ? "#fff" : "var(--color-admin-muted)",
          border: "none", cursor: "pointer",
          fontSize: "0.82rem", fontWeight: 600,
          borderRadius: 6, transition: "all 0.15s",
        });
        return (
          <div style={T.overlay} onClick={() => setCobrarId(null)}>
            <div style={T.sheet} onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid var(--color-admin-border)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-admin-text)" }}>
                  Cobrar — {res.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)", marginTop: 2 }}>
                  Pendiente: <strong style={{ color: "var(--color-admin-accent)" }}>{combinedPending.toFixed(2)}€</strong>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)", marginTop: 2 }}>
                  Reserva: {money(res.reservationTotal)} · TPV: {money(res.total)}
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, padding: "0.75rem 1.25rem 0" }}>
                <button style={tabBtn(payTab === "CASH")} onClick={() => setPayTab("CASH")}>Efectivo</button>
                <button style={tabBtn(payTab === "CARD")} onClick={() => setPayTab("CARD")}>Tarjeta</button>
              </div>
              <div style={{ padding: "0.75rem 1.25rem 1.25rem" }}>
                {payTab === "CASH" ? (
                  <>
                    <div style={{
                      background: "var(--color-admin-bg)", borderRadius: 8,
                      padding: "0.6rem 0.75rem", marginBottom: "0.75rem",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)" }}>Recibido</span>
                      <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
                        {cashInput || "0"}€
                      </span>
                    </div>
                    {cashInput && (
                      <div style={{
                        textAlign: "right", fontSize: "0.8rem", marginBottom: "0.5rem",
                        color: change >= 0 ? "#16A34A" : "#EF4444", fontWeight: 600,
                      }}>
                        {change >= 0 ? `Cambio: ${change.toFixed(2)}€` : `Faltan: ${Math.abs(change).toFixed(2)}€`}
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                      {["7","8","9","4","5","6","1","2","3",".",  "0","⌫"].map((k) => (
                        <button
                          key={k}
                          onClick={() => handleCashKey(k)}
                          style={{
                            padding: "0.65rem", borderRadius: 8,
                            border: "1px solid var(--color-admin-border)",
                            background: k === "⌫" ? "var(--color-admin-bg)" : "var(--color-admin-surface)",
                            color: "var(--color-admin-text)",
                            fontSize: k === "⌫" ? "1rem" : "0.9rem", fontWeight: 600, cursor: "pointer",
                          }}
                        >{k}</button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{
                    background: "var(--color-admin-bg)", borderRadius: 8,
                    padding: "1rem", textAlign: "center", marginBottom: "0.75rem",
                  }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)", marginBottom: 4 }}>
                      Importe a cobrar
                    </div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
                      {combinedPending.toFixed(2)}€
                    </div>
                  </div>
                )}
                {payError && <p style={{ fontSize: "0.75rem", color: "#EF4444", marginBottom: "0.5rem" }}>{payError}</p>}
                <div style={{ display: "flex", gap: 8, marginTop: "0.75rem" }}>
                  <button
                    onClick={() => setCobrarId(null)}
                    style={{
                      flex: 1, padding: "0.6rem",
                      border: "1px solid var(--color-admin-border)", borderRadius: 8, background: "transparent",
                      color: "var(--color-admin-muted)", fontSize: "0.82rem", cursor: "pointer",
                    }}
                  >Cancelar</button>
                  <button
                    onClick={() => void handlePay()}
                    disabled={busy || (payTab === "CASH" && !cashValid)}
                    style={{
                      flex: 2, padding: "0.6rem", borderRadius: 8, border: "none",
                      background: busy || (payTab === "CASH" && !cashValid) ? "var(--color-admin-border)" : "#16A34A",
                      color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    {busy ? "Procesando…" : "Aceptar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Modal reserva rápida */}
      {quickOpen && (
        <div style={T.overlay} onClick={() => setQuickOpen(false)}>
          <div style={T.sheet} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-admin-text)" }}>
                Nuevo comensal · {venue?.name}
              </h2>
              <button onClick={() => setQuickOpen(false)} style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--color-admin-muted)", minWidth: 44, minHeight: 44 }}>✕</button>
            </div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-admin-muted)", marginBottom: "0.3rem" }}>NOMBRE *</label>
            <input style={{ ...T.input, marginBottom: "0.75rem" }} placeholder="Nombre del comensal" value={qName} onChange={(e) => setQName(e.target.value)} />
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-admin-muted)", marginBottom: "0.3rem" }}>COMENSALES</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
              <button style={T.stepBtn} onClick={() => setQGuests((g) => Math.max(1, g - 1))}>−</button>
              <span style={{ fontSize: "1.4rem", fontWeight: 800, minWidth: 40, textAlign: "center" }}>{qGuests}</span>
              <button style={T.stepBtn} onClick={() => setQGuests((g) => Math.min(60, g + 1))}>+</button>
            </div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-admin-muted)", marginBottom: "0.3rem" }}>TURNO</label>
            <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
              {(["NIGHT", "NOON"] as const).map((s) => (
                <button key={s} style={T.tab(qShift === s)} onClick={() => setQShift(s)}>
                  {s === "NIGHT" ? "🌙 Noche" : "☀️ Mediodía"}
                </button>
              ))}
            </div>
            <button style={T.primary} disabled={busy || !qName.trim()} onClick={() => void quickAdd()}>
              {busy ? "Creando…" : "Crear y tomar comanda"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
