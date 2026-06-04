"use client";

import { usePathname, useRouter } from "next/navigation";

const langs = [
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
  { code: "en", label: "EN" },
];

const pageMap: Record<string, Record<string, string>> = {
  es: {
    "/":                     "/",
    "/menu-degustacion":     "/menu-degustacion",
    "/cena-clandestina":     "/cena-clandestina",
    "/regalo":               "/regalo",
    "/grupos":               "/grupos",
    "/contacto":             "/contacto",
    "/preguntas-frecuentes": "/preguntas-frecuentes",
    "/blog":                 "/blog",
    "/privacidad":           "/privacidad",
    "/aviso-legal":          "/aviso-legal",
    "/cookies":              "/cookies",
  },
  ca: {
    "/":                     "/ca",
    "/menu-degustacion":     "/ca/menu-degustacion",
    "/cena-clandestina":     "/ca/cena-clandestina",
    "/regalo":               "/ca/regalo",
    "/grupos":               "/ca/grupos",
    "/contacto":             "/ca/contacto",
    "/preguntas-frecuentes": "/ca/preguntas-frequents",
    "/blog":                 "/ca/blog",
    "/privacidad":           "/privacidad",
    "/aviso-legal":          "/aviso-legal",
    "/cookies":              "/cookies",
  },
  en: {
    "/":                     "/en",
    "/menu-degustacion":     "/en/tasting-menu",
    "/cena-clandestina":     "/en/secret-dinner",
    "/regalo":               "/en/gift",
    "/grupos":               "/en/groups",
    "/contacto":             "/en/contact",
    "/preguntas-frecuentes": "/en/faq",
    "/blog":                 "/en/blog",
    "/privacidad":           "/privacidad",
    "/aviso-legal":          "/aviso-legal",
    "/cookies":              "/cookies",
  },
};

function detectLocale(pathname: string): "es" | "ca" | "en" {
  if (pathname.startsWith("/ca")) return "ca";
  if (pathname.startsWith("/en")) return "en";
  return "es";
}

function getBasePath(pathname: string): string {
  if (pathname.startsWith("/ca/")) return pathname.replace("/ca", "");
  if (pathname.startsWith("/en/")) return pathname.replace("/en", "");
  if (pathname === "/ca" || pathname === "/en") return "/";
  if (pathname.startsWith("/ca/menu-degustacion") || pathname.startsWith("/en/tasting-menu")) return "/menu-degustacion";
  if (pathname.startsWith("/ca/cena-clandestina") || pathname.startsWith("/en/secret-dinner")) return "/cena-clandestina";
  if (pathname.startsWith("/ca/regalo") || pathname.startsWith("/en/gift")) return "/regalo";
  if (pathname.startsWith("/ca/grupos") || pathname.startsWith("/en/groups")) return "/grupos";
  if (pathname.startsWith("/ca/contacto") || pathname.startsWith("/en/contact")) return "/contacto";
  if (pathname.startsWith("/ca/preguntas-frequents") || pathname.startsWith("/en/faq")) return "/preguntas-frecuentes";
  if (pathname.startsWith("/ca/blog") || pathname.startsWith("/en/blog")) return "/blog";
  return pathname;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = detectLocale(pathname);
  const basePath = getBasePath(pathname);

  const switchTo = (newLocale: string) => {
    const targetPath = pageMap[newLocale]?.[basePath] ?? (newLocale === "es" ? "/" : `/${newLocale}`);
    router.push(targetPath);
  };

  return (
    <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
      {langs.map(({ code, label }, i) => (
        <span key={code} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <button
            onClick={() => code !== currentLocale && switchTo(code)}
            style={{
              background: "transparent",
              border: "none",
              cursor: code === currentLocale ? "default" : "pointer",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: code === currentLocale ? "var(--gs-gold)" : "var(--gs-muted)",
              fontWeight: code === currentLocale ? 700 : 400,
              padding: "0.2rem 0.3rem",
              fontFamily: "var(--font-montserrat)",
              textTransform: "uppercase",
              opacity: 1,
            }}
          >
            {label}
          </button>
          {i < langs.length - 1 && (
            <span style={{ color: "var(--gs-border)", fontSize: "0.55rem" }}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}
