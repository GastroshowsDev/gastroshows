"use client";

import { useState, useEffect } from "react";
import { Server, Shield, CheckCircle2, XCircle, Loader2, Send, Eye, EyeOff, AlertTriangle, Info } from "lucide-react";

const FIELDS = [
  {
    key: "smtp_host",
    label: "Servidor SMTP (Host)",
    placeholder: "Ej: smtp.mailrelay.com o tu-cuenta.ipzmarketing.com",
    help: "Lo encontrarás en tu panel de Mailrelay → Ajustes → SMTP.",
    type: "text",
  },
  {
    key: "smtp_port",
    label: "Puerto",
    placeholder: "587",
    help: "587 (recomendado, STARTTLS) · 465 (SSL) · 2525 (alternativo)",
    type: "number",
  },
  {
    key: "smtp_user",
    label: "Usuario SMTP",
    placeholder: "tu-usuario@mailrelay.com",
    help: "Tu usuario de acceso SMTP, normalmente tu email de Mailrelay.",
    type: "text",
  },
  {
    key: "smtp_pass",
    label: "Contraseña SMTP / API Key",
    placeholder: "••••••••",
    help: "La contraseña o API key SMTP que te proporciona Mailrelay.",
    type: "password",
  },
  {
    key: "smtp_from",
    label: "Email del Remitente (From)",
    placeholder: "info@gastroshows.com",
    help: "Debe coincidir con un dominio verificado en tu cuenta de Mailrelay.",
    type: "email",
  },
  {
    key: "smtp_from_name",
    label: "Nombre del Remitente",
    placeholder: "Gastroshows Barcelona",
    help: "El nombre que aparecerá como remitente del email.",
    type: "text",
  },
  {
    key: "smtp_reply_to",
    label: "Dirección de Respuesta (Reply-To)",
    placeholder: "hola@gastroshows.com",
    help: "Opcional. Si el cliente responde al email, llegará a esta dirección.",
    type: "email",
  },
  {
    key: "smtp_secure",
    label: "Conexión Segura (SSL/TLS)",
    placeholder: "",
    help: "Activa SSL si usas el puerto 465. Para el puerto 587, déjalo desactivado (usa STARTTLS automáticamente).",
    type: "toggle",
  },
];

export default function AjustesPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; error?: string } | null>(null);
  const [testEmailResult, setTestEmailResult] = useState<{ ok: boolean; error?: string } | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/smtp-settings");
      const json = await res.json();
      if (json.ok) setSettings(json.data);
    } catch {
      /* no-op */
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/smtp-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", settings }),
      });
      const json = await res.json();
      if (json.ok) alert("Configuración guardada correctamente");
      else alert("Error: " + json.error);
    } catch {
      alert("Error de conexión");
    } finally {
      setSaving(false);
    }
  }

  async function handleTestConnection() {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/smtp-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test" }),
      });
      const json = await res.json();
      setTestResult(json);
    } catch {
      setTestResult({ ok: false, error: "Error de red" });
    } finally {
      setTesting(false);
    }
  }

  async function handleTestSend() {
    if (!testEmail) return;
    setSendingTest(true);
    setTestEmailResult(null);
    try {
      const res = await fetch("/api/admin/smtp-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test_send", testEmail }),
      });
      const json = await res.json();
      setTestEmailResult(json);
    } catch {
      setTestEmailResult({ ok: false, error: "Error de red" });
    } finally {
      setSendingTest(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-6 h-6 text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
          <Server className="w-8 h-8 text-blue-500" /> Ajustes de Email (SMTP)
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Configura Mailrelay como servidor de envío para todas las comunicaciones de Gastroshows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <h2 className="font-bold flex items-center gap-2">
                <Shield className="w-4 h-4 text-zinc-400" /> Credenciales SMTP de Mailrelay
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Encuentra estos datos en tu panel de Mailrelay → Ajustes → SMTP
              </p>
            </div>

            <div className="p-6 space-y-5">
              {FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    {field.label}
                  </label>

                  {field.type === "toggle" ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setSettings({
                            ...settings,
                            [field.key]: settings[field.key] === "true" ? "false" : "true",
                          })
                        }
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          settings[field.key] === "true"
                            ? "bg-green-500"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${
                            settings[field.key] === "true" ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                      <span className="text-sm text-zinc-500">
                        {settings[field.key] === "true" ? "Activo (SSL)" : "Inactivo (STARTTLS)"}
                      </span>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type={field.type === "password" && !showPass ? "password" : "text"}
                        value={settings[field.key] || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, [field.key]: e.target.value })
                        }
                        placeholder={field.placeholder}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                      />
                      {field.type === "password" && (
                        <button
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                        >
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  )}

                  <p className="text-[11px] text-zinc-400 mt-1.5 flex items-start gap-1">
                    <Info className="w-3 h-3 mt-0.5 shrink-0" />
                    {field.help}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Shield className="w-4 h-4" />}
                Guardar Configuración
              </button>

              <button
                onClick={handleTestConnection}
                disabled={testing}
                className="border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-medium px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
              >
                {testing ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Server className="w-4 h-4" />
                )}
                Probar Conexión
              </button>
            </div>

            {testResult && (
              <div
                className={`mx-6 mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  testResult.ok
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/40"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40"
                }`}
              >
                {testResult.ok ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
                <div>
                  <p
                    className={`font-bold text-sm ${
                      testResult.ok
                        ? "text-green-800 dark:text-green-300"
                        : "text-red-800 dark:text-red-300"
                    }`}
                  >
                    {testResult.ok ? "¡Conexión exitosa!" : "Error de conexión"}
                  </p>
                  {testResult.error && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-mono">
                      {testResult.error}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Test Send */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-500" /> Enviar Email de Prueba
            </h3>
            <div className="flex gap-3">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm"
              />
              <button
                onClick={handleTestSend}
                disabled={sendingTest || !testEmail}
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
              >
                {sendingTest ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                Enviar
              </button>
            </div>
            {testEmailResult && (
              <div
                className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
                  testEmailResult.ok
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700"
                    : "bg-red-50 dark:bg-red-900/20 text-red-700"
                }`}
              >
                {testEmailResult.ok ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> ¡Email enviado! Revisa tu bandeja de entrada.
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> Error: {testEmailResult.error}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Help */}
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6 rounded-2xl">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" /> Guía Rápida: Mailrelay
            </h3>
            <ol className="space-y-4 text-sm text-blue-800/80 dark:text-blue-300/70">
              <li className="flex gap-3">
                <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </span>
                <span>
                  Entra en tu panel de{" "}
                  <a
                    href="https://mailrelay.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-semibold"
                  >
                    Mailrelay
                  </a>{" "}
                  y ve a <strong>Ajustes → SMTP</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </span>
                <span>
                  Copia el <strong>Host</strong> (ej:{" "}
                  <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded text-xs">
                    tu-cuenta.ipzmarketing.com
                  </code>
                  ), el <strong>Usuario</strong> y la <strong>Contraseña</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </span>
                <span>
                  Pega los datos aquí y haz clic en <strong>Probar Conexión</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  4
                </span>
                <span>
                  Si ves <strong className="text-green-600">"¡Conexión exitosa!"</strong>, guarda y envía un email de
                  prueba.
                </span>
              </li>
            </ol>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-6 rounded-2xl">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Autenticación de Dominio
            </h3>
            <p className="text-sm text-amber-800/70 dark:text-amber-300/60 leading-relaxed mb-4">
              Para que tus emails no lleguen a SPAM, debes configurar estos registros DNS en tu proveedor de dominios
              (Cloudflare, GoDaddy, etc.):
            </p>
            <div className="space-y-3">
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-amber-200/50 dark:border-amber-900/20">
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">
                  SPF (Registro TXT)
                </div>
                <code className="text-xs text-zinc-700 dark:text-zinc-300 break-all">
                  v=spf1 include:spf.ipzmarketing.com ~all
                </code>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-amber-200/50 dark:border-amber-900/20">
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">
                  DKIM (Registro CNAME)
                </div>
                <p className="text-xs text-zinc-500">
                  Copia los 2 registros CNAME que te da Mailrelay en <strong>Ajustes → Autenticación de Email</strong>.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-amber-200/50 dark:border-amber-900/20">
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">
                  DMARC (Registro TXT)
                </div>
                <code className="text-xs text-zinc-700 dark:text-zinc-300 break-all">
                  v=DMARC1; p=none; rua=mailto:dmarc@gastroshows.com
                </code>
              </div>
            </div>
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-900/50 p-5 rounded-2xl">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
              Plan Gratuito Mailrelay
            </h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>✓ 80.000 emails/mes</li>
              <li>✓ 20.000 contactos</li>
              <li>✓ SMTP relay incluido</li>
              <li>✓ Sin marca de agua</li>
              <li>✓ Soporte en español</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
