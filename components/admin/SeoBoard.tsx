"use client";

import { useState } from "react";
import type { SeoSettingsData } from "@/lib/seo";

type Props = { initialSettings: SeoSettingsData };

type Section = "meta" | "og" | "verification" | "analytics" | "ads" | "custom" | "schema";

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: "meta",         label: "Metadatos básicos",    icon: "◈" },
  { id: "og",           label: "Open Graph / Social",  icon: "◇" },
  { id: "verification", label: "Verificación",          icon: "◎" },
  { id: "analytics",    label: "Analytics y píxeles",  icon: "◬" },
  { id: "ads",          label: "Google Ads",            icon: "◆" },
  { id: "custom",       label: "Código personalizado",  icon: "◻" },
  { id: "schema",       label: "Datos estructurados",   icon: "◉" },
];

export function SeoBoard({ initialSettings }: Props) {
  const [form, setForm] = useState<SeoSettingsData>(initialSettings);
  const [active, setActive] = useState<Section>("meta");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: keyof SeoSettingsData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json() as { ok?: boolean; error?: string; settings?: SeoSettingsData };
      if (!json.ok) { setError(json.error ?? "Error al guardar"); return; }
      if (json.settings) setForm(json.settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "960px" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--color-admin-text)", marginBottom: "0.25rem" }}>SEO y Marketing</h1>
          <p style={{ fontSize: "0.82rem", color: "var(--color-admin-muted)" }}>
            Configura metadatos, píxeles de seguimiento, Google Ads y código personalizado.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {saved && <span style={{ fontSize: "0.78rem", color: "#4CAF50" }}>✓ Cambios guardados</span>}
          {error && <span style={{ fontSize: "0.78rem", color: "#E53935" }}>{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: "var(--color-admin-accent)",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.5rem",
              borderRadius: "6px",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        {/* Left nav */}
        <nav style={{
          background: "var(--color-admin-surface)",
          border: "1px solid var(--color-admin-border)",
          borderRadius: "8px",
          padding: "0.5rem",
          flexShrink: 0,
          width: "200px",
        }}>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                width: "100%", padding: "0.55rem 0.75rem",
                borderRadius: "6px", border: "none", cursor: "pointer",
                background: active === s.id ? "var(--color-admin-accent-light)" : "transparent",
                color: active === s.id ? "var(--color-admin-accent)" : "var(--color-admin-text)",
                fontSize: "0.8rem", fontWeight: active === s.id ? 600 : 400,
                textAlign: "left", transition: "all 0.12s",
              }}
            >
              <span style={{ opacity: 0.7, fontSize: "0.75rem" }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: "var(--color-admin-surface)", border: "1px solid var(--color-admin-border)", borderRadius: "8px", padding: "1.75rem" }}>
            {active === "meta"         && <SectionMeta         form={form} set={set} />}
            {active === "og"           && <SectionOg           form={form} set={set} />}
            {active === "verification" && <SectionVerification form={form} set={set} />}
            {active === "analytics"    && <SectionAnalytics    form={form} set={set} />}
            {active === "ads"          && <SectionAds          form={form} set={set} />}
            {active === "custom"       && <SectionCustom       form={form} set={set} />}
            {active === "schema"       && <SectionSchema       form={form} set={set} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared helpers ── */

type SetFn = (key: keyof SeoSettingsData, value: string) => void;

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--color-admin-border)" }}>
      <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-admin-text)", marginBottom: "0.2rem" }}>{title}</h2>
      <p style={{ fontSize: "0.78rem", color: "var(--color-admin-muted)" }}>{desc}</p>
    </div>
  );
}

function Field({
  label, hint, children,
}: {
  label: React.ReactNode; hint?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-admin-text)", marginBottom: "0.3rem" }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)", marginTop: "0.3rem" }}>{hint}</p>}
    </div>
  );
}

function Input({ value, onChange, placeholder, mono = false }: { value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean }) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        background: "var(--color-admin-bg)",
        border: "1px solid var(--color-admin-border)",
        borderRadius: "6px",
        padding: "0.55rem 0.75rem",
        fontSize: mono ? "0.78rem" : "0.85rem",
        fontFamily: mono ? "monospace" : "inherit",
        color: "var(--color-admin-text)",
        outline: "none",
        boxSizing: "border-box" as const,
      }}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 4, mono = false }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; mono?: boolean }) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        background: "var(--color-admin-bg)",
        border: "1px solid var(--color-admin-border)",
        borderRadius: "6px",
        padding: "0.55rem 0.75rem",
        fontSize: mono ? "0.78rem" : "0.85rem",
        fontFamily: mono ? "monospace" : "inherit",
        color: "var(--color-admin-text)",
        outline: "none",
        resize: "vertical" as const,
        boxSizing: "border-box" as const,
        minHeight: `${rows * 1.6}rem`,
      }}
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: "var(--color-admin-bg)",
        border: "1px solid var(--color-admin-border)",
        borderRadius: "6px",
        padding: "0.55rem 0.75rem",
        fontSize: "0.85rem",
        color: "var(--color-admin-text)",
        outline: "none",
        cursor: "pointer",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "0.65rem",
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
      background: `${color}18`,
      color,
      marginLeft: "0.5rem",
    }}>{label}</span>
  );
}

function PixelCard({ logo, name, description, children }: { logo: string; name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: "1px solid var(--color-admin-border)",
      borderRadius: "8px",
      padding: "1rem 1.25rem",
      marginBottom: "1rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.1rem" }}>{logo}</span>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-admin-text)" }}>{name}</div>
          <div style={{ fontSize: "0.72rem", color: "var(--color-admin-muted)" }}>{description}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Sections ── */

function SectionMeta({ form, set }: { form: SeoSettingsData; set: SetFn }) {
  const descLen = (form.metaDescription ?? "").length;
  return (
    <>
      <SectionTitle title="Metadatos básicos" desc="Información que ven los motores de búsqueda y aparece en los resultados de Google." />
      <Field label="Título del sitio" hint="Aparece en la pestaña del navegador y en los resultados de búsqueda.">
        <Input value={form.siteTitle} onChange={(v) => set("siteTitle", v)} placeholder="GastroShows · Barcelona" />
      </Field>
      <Field
        label={`Meta descripción ${descLen > 0 ? `(${descLen}/160)` : ""}`}
        hint="Texto que aparece debajo del título en Google. Ideal entre 120–160 caracteres."
      >
        <Textarea
          value={form.metaDescription ?? ""}
          onChange={(v) => set("metaDescription", v)}
          placeholder="Una cena que comienza antes de que llegues. Cuatro emails, cuatro pistas, una ubicación secreta en Barcelona."
          rows={3}
        />
        {descLen > 160 && (
          <p style={{ fontSize: "0.72rem", color: "#E53935", marginTop: "0.25rem" }}>⚠ Demasiado larga ({descLen} / 160). Google la recortará.</p>
        )}
      </Field>
      <Field label="Palabras clave" hint="Separadas por comas. Poco influyentes en Google moderno, pero útiles para otras herramientas.">
        <Input value={form.metaKeywords ?? ""} onChange={(v) => set("metaKeywords", v)} placeholder="gastroshows, cena secreta barcelona, experiencia gastronómica" />
      </Field>
      <Field label="URL canónica" hint="URL preferida de tu sitio (sin / al final). Evita contenido duplicado.">
        <Input value={form.canonicalUrl ?? ""} onChange={(v) => set("canonicalUrl", v)} placeholder="https://gastroshows.com" mono />
      </Field>
      <Field label="Indexación (robots)" hint="Controla cómo los buscadores rastrean tu sitio.">
        <Select
          value={form.robots}
          onChange={(v) => set("robots", v)}
          options={[
            { value: "index, follow",         label: "Indexar y seguir enlaces (recomendado)" },
            { value: "noindex, follow",        label: "No indexar, seguir enlaces" },
            { value: "index, nofollow",        label: "Indexar, no seguir enlaces" },
            { value: "noindex, nofollow",      label: "No indexar ni seguir (privado)" },
          ]}
        />
      </Field>
    </>
  );
}

function SectionOg({ form, set }: { form: SeoSettingsData; set: SetFn }) {
  return (
    <>
      <SectionTitle title="Open Graph y Redes Sociales" desc="Controla cómo se ve tu enlace al compartirlo en Facebook, Instagram, X (Twitter), WhatsApp, etc." />

      <div style={{ background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--color-admin-muted)", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
          Vista previa (Open Graph)
        </div>
        <div style={{ background: "#fff", borderRadius: "6px", overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: "400px" }}>
          {form.ogImage && (
            <div style={{ background: "#f3f4f6", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", color: "#9ca3af" }}>
              Imagen: {form.ogImage}
            </div>
          )}
          <div style={{ padding: "0.6rem 0.75rem" }}>
            <div style={{ fontSize: "0.72rem", color: "#6b7280", marginBottom: "0.2rem" }}>gastroshows.com</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827" }}>{form.ogTitle || form.siteTitle}</div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.15rem" }}>{form.ogDescription || form.metaDescription || "Descripción de tu sitio"}</div>
          </div>
        </div>
      </div>

      <Field label="Título OG" hint="Si lo dejas vacío se usará el título del sitio.">
        <Input value={form.ogTitle ?? ""} onChange={(v) => set("ogTitle", v)} placeholder={form.siteTitle} />
      </Field>
      <Field label="Descripción OG" hint="Si lo dejas vacío se usará la meta descripción.">
        <Textarea value={form.ogDescription ?? ""} onChange={(v) => set("ogDescription", v)} placeholder={form.metaDescription ?? ""} rows={2} />
      </Field>
      <Field label="Imagen OG (URL)" hint="Tamaño recomendado: 1200×630 px. Usa una URL absoluta (https://…).">
        <Input value={form.ogImage ?? ""} onChange={(v) => set("ogImage", v)} placeholder="https://gastroshows.com/og-image.jpg" mono />
      </Field>

      <hr style={{ border: "none", borderTop: "1px solid var(--color-admin-border)", margin: "1.5rem 0" }} />

      <Field label="Twitter / X — tipo de tarjeta">
        <Select
          value={form.twitterCard}
          onChange={(v) => set("twitterCard", v)}
          options={[
            { value: "summary_large_image", label: "summary_large_image (imagen grande — recomendado)" },
            { value: "summary",             label: "summary (miniatura pequeña)" },
          ]}
        />
      </Field>
      <Field label="Usuario de Twitter/X" hint="Con @ incluido. Ej: @gastroshows">
        <Input value={form.twitterHandle ?? ""} onChange={(v) => set("twitterHandle", v)} placeholder="@gastroshows" />
      </Field>
    </>
  );
}

function SectionVerification({ form, set }: { form: SeoSettingsData; set: SetFn }) {
  return (
    <>
      <SectionTitle title="Verificación de propiedad" desc="Código de verificación que acredita que eres el propietario del sitio ante buscadores y herramientas externas." />

      <PixelCard logo="🔍" name="Google Search Console" description="Accede a datos de rendimiento en búsquedas, errores de indexación y más.">
        <Field label="Código de verificación" hint='Copia solo el valor del atributo content. Ej: abc123xyz456. Lo encontrarás en Search Console → Verificación → Etiqueta HTML.'>
          <Input value={form.googleSiteVerification ?? ""} onChange={(v) => set("googleSiteVerification", v)} placeholder="abc123xyz456def789" mono />
        </Field>
      </PixelCard>

      <PixelCard logo="🌐" name="Bing Webmaster Tools" description="Equivalente de Search Console para el buscador de Microsoft.">
        <Field label="Código de verificación" hint='Contenido del meta tag de verificación de Bing.'>
          <Input value={form.bingSiteVerification ?? ""} onChange={(v) => set("bingSiteVerification", v)} placeholder="XXXXXXXXXXXXXXXXX" mono />
        </Field>
      </PixelCard>
    </>
  );
}

function SectionAnalytics({ form, set }: { form: SeoSettingsData; set: SetFn }) {
  return (
    <>
      <SectionTitle title="Analytics y píxeles de seguimiento" desc="Instala las herramientas de medición y remarketing de las plataformas que uses." />

      <PixelCard logo="📊" name="Google Analytics 4" description="Análisis de tráfico, conversiones y comportamiento de usuarios.">
        <Field label="Measurement ID" hint='Formato: G-XXXXXXXXXX. Lo encuentras en GA4 → Admin → Flujos de datos.'>
          <Input value={form.googleAnalyticsId ?? ""} onChange={(v) => set("googleAnalyticsId", v)} placeholder="G-XXXXXXXXXX" mono />
        </Field>
      </PixelCard>

      <PixelCard logo="🏷" name="Google Tag Manager" description="Gestiona todos tus tags desde un único contenedor sin tocar código.">
        <Field label="Container ID" hint='Formato: GTM-XXXXXXX. Lo encuentras en GTM → Admin → Contenedor.'>
          <Input value={form.googleTagManagerId ?? ""} onChange={(v) => set("googleTagManagerId", v)} placeholder="GTM-XXXXXXX" mono />
        </Field>
      </PixelCard>

      <PixelCard logo="🔵" name="Meta Pixel (Facebook / Instagram)" description="Seguimiento de conversiones y remarketing en Facebook e Instagram Ads.">
        <Field label="Pixel ID" hint='ID numérico de 15–16 dígitos. Lo encuentras en Meta Business Suite → Gestor de eventos.'>
          <Input value={form.metaPixelId ?? ""} onChange={(v) => set("metaPixelId", v)} placeholder="123456789012345" mono />
        </Field>
      </PixelCard>

      <PixelCard logo="🎵" name="TikTok Pixel" description="Mide el rendimiento de tus campañas en TikTok Ads.">
        <Field label="Pixel ID" hint='Lo encuentras en TikTok Ads Manager → Activos → Eventos.'>
          <Input value={form.tiktokPixelId ?? ""} onChange={(v) => set("tiktokPixelId", v)} placeholder="CXXXXXXXXXXXXXXXXX" mono />
        </Field>
      </PixelCard>

      <PixelCard logo="🔗" name="LinkedIn Insight Tag" description="Seguimiento y remarketing para campañas de LinkedIn Ads.">
        <Field label="Partner ID" hint='Número de 7 cifras. Lo encuentras en LinkedIn Campaign Manager → Insight Tag.'>
          <Input value={form.linkedinPartnerId ?? ""} onChange={(v) => set("linkedinPartnerId", v)} placeholder="1234567" mono />
        </Field>
      </PixelCard>

      <PixelCard logo="🔥" name="Hotjar" description="Mapas de calor, grabaciones de sesión y encuestas de usuarios.">
        <Field label="Site ID" hint='Número entero. Lo encuentras en Hotjar → Sites → Tracking Code.'>
          <Input value={form.hotjarId ?? ""} onChange={(v) => set("hotjarId", v)} placeholder="1234567" mono />
        </Field>
      </PixelCard>
    </>
  );
}

function SectionAds({ form, set }: { form: SeoSettingsData; set: SetFn }) {
  return (
    <>
      <SectionTitle title="Google Ads" desc="Configura el seguimiento de conversiones para tus campañas de Google Ads." />

      <PixelCard logo="🟢" name="Google Ads — Conversiones" description="Mide reservas y compras atribuidas a tus anuncios de Google.">
        <Field label="Conversion ID" hint='Formato: AW-XXXXXXXXXX. Lo encuentras en Google Ads → Herramientas → Seguimiento de conversiones.'>
          <Input value={form.googleAdsId ?? ""} onChange={(v) => set("googleAdsId", v)} placeholder="AW-XXXXXXXXXX" mono />
        </Field>
        <Field label="Conversion Label" hint='Código alfanumérico que identifica la acción de conversión específica.'>
          <Input value={form.googleAdsLabel ?? ""} onChange={(v) => set("googleAdsLabel", v)} placeholder="abcDEF123456789" mono />
        </Field>
      </PixelCard>

      <div style={{ background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "8px", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)", lineHeight: 1.7 }}>
        <strong style={{ color: "var(--color-admin-text)" }}>Consejo:</strong> Si usas Google Tag Manager, es preferible configurar las conversiones desde GTM en lugar de aquí, para evitar doble disparo.
      </div>
    </>
  );
}

function SectionCustom({ form, set }: { form: SeoSettingsData; set: SetFn }) {
  return (
    <>
      <SectionTitle title="Código personalizado" desc="Añade scripts o etiquetas que no están disponibles como opciones específicas. Solo para usuarios avanzados." />

      <Field
        label={<>Scripts en {"<head>"} <Badge label="Avanzado" color="#875BF7" /></>}
        hint='Se inyecta justo antes de </head>. Úsalo para scripts que requieran carga prioritaria. Incluye las etiquetas <script> completas.'
      >
        <Textarea
          value={form.customHeadScripts ?? ""}
          onChange={(v) => set("customHeadScripts", v)}
          placeholder={'<script>\n  // Tu código aquí\n</script>'}
          rows={8}
          mono
        />
      </Field>

      <Field
        label={<>Scripts en {"<body>"} <Badge label="Avanzado" color="#875BF7" /></>}
        hint='Se inyecta al inicio de <body>. Ideal para scripts de seguimiento que necesitan estar en el body (noscript de GTM, etc.).'
      >
        <Textarea
          value={form.customBodyScripts ?? ""}
          onChange={(v) => set("customBodyScripts", v)}
          placeholder={'<noscript>\n  <!-- Fallback aquí -->\n</noscript>'}
          rows={6}
          mono
        />
      </Field>

      <div style={{ background: "rgba(229,57,53,0.06)", border: "1px solid rgba(229,57,53,0.2)", borderRadius: "8px", padding: "1rem", fontSize: "0.8rem", color: "var(--color-admin-muted)", lineHeight: 1.7 }}>
        ⚠ <strong style={{ color: "var(--color-admin-text)" }}>Advertencia de seguridad:</strong> Solo pega código de fuentes de confianza. El código personalizado se ejecuta directamente en todas las páginas públicas del sitio.
      </div>
    </>
  );
}

function SectionSchema({ form, set }: { form: SeoSettingsData; set: SetFn }) {
  const exampleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "GastroShows",
    "description": "Experiencia gastronómica clandestina en Barcelona.",
    "url": "https://gastroshows.com",
    "servesCuisine": "Moderna",
    "priceRange": "€€€",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barcelona",
      "addressCountry": "ES",
    },
  }, null, 2);

  let jsonError = "";
  if (form.schemaOrg?.trim()) {
    try { JSON.parse(form.schemaOrg); } catch (e) { jsonError = "JSON inválido: " + String(e); }
  }

  return (
    <>
      <SectionTitle title="Datos estructurados (JSON-LD)" desc="Ayuda a Google a entender tu negocio y puede generar rich snippets en los resultados de búsqueda." />

      <Field
        label="JSON-LD (Schema.org)"
        hint='Pega tu marcado de datos estructurados en formato JSON-LD. Se inyectará en un <script type="application/ld+json"> en el <head>.'
      >
        <Textarea
          value={form.schemaOrg ?? ""}
          onChange={(v) => set("schemaOrg", v)}
          placeholder={exampleSchema}
          rows={14}
          mono
        />
        {jsonError && <p style={{ fontSize: "0.72rem", color: "#E53935", marginTop: "0.25rem" }}>⚠ {jsonError}</p>}
      </Field>

      <div style={{ background: "var(--color-admin-bg)", border: "1px solid var(--color-admin-border)", borderRadius: "8px", padding: "1rem", marginTop: "0.5rem" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text)", marginBottom: "0.5rem" }}>Tipos de Schema útiles para restaurantes</div>
        {[
          ["Restaurant", "Información general del negocio"],
          ["FoodEstablishment", "Establece el tipo de establecimiento de comida"],
          ["Event", "Para eventos especiales o cenas temáticas"],
          ["Product", "Para los vales regalo"],
          ["BreadcrumbList", "Para migas de pan en resultados de búsqueda"],
        ].map(([type, desc]) => (
          <div key={type} style={{ display: "flex", gap: "0.5rem", padding: "0.3rem 0", borderBottom: "1px solid var(--color-admin-border)", fontSize: "0.78rem" }}>
            <code style={{ color: "var(--color-admin-accent)", minWidth: "160px" }}>{type}</code>
            <span style={{ color: "var(--color-admin-muted)" }}>{desc}</span>
          </div>
        ))}
      </div>
    </>
  );
}
