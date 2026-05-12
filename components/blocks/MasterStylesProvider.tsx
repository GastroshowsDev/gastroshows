"use client";

import { useEffect, useState } from "react";

export function MasterStylesProvider({ children }: { children: React.ReactNode }) {
  const [styles, setStyles] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (json.master_styles) {
        try {
          setStyles(JSON.parse(json.master_styles));
        } catch (e) {
          console.error("Failed to parse master styles", e);
        }
      }
    }
    load();

    // Listen for updates from the builder
    const handleUpdate = () => load();
    window.addEventListener("master-styles-updated", handleUpdate);
    return () => window.removeEventListener("master-styles-updated", handleUpdate);
  }, []);

  if (!styles) return <>{children}</>;

  const generateCSS = (tag: string, rules: any) => {
    if (!rules) return "";
    const mapping: any = {
      fontSize: "font-size",
      fontWeight: "font-weight",
      color: "color",
      backgroundColor: "background-color",
      borderRadius: "border-radius",
      textAlign: "text-align",
      fontFamily: "font-family",
      letterSpacing: "letter-spacing",
      lineHeight: "line-height"
    };

    const cssRules = Object.entries(rules)
      .map(([key, value]) => mapping[key] ? `${mapping[key]}: ${value};` : "")
      .filter(r => r !== "")
      .join(" ");

    return `${tag} { ${cssRules} }`;
  };

  const css = `
    ${generateCSS("h1", styles.h1)}
    ${generateCSS("h2", styles.h2)}
    ${generateCSS("h3", styles.h3)}
    ${generateCSS("h4", styles.h4)}
    ${generateCSS("h5", styles.h5)}
    ${generateCSS("h6", styles.h6)}
    ${generateCSS("p", styles.p)}
    ${generateCSS("a", styles.a)}
    ${generateCSS("button", styles.button)}
    
    /* Specific overrides for builder buttons if needed */
    .gs-master-btn { 
      ${Object.entries(styles.button || {})
        .map(([key, value]) => {
          const mapping: any = { backgroundColor: "background-color", color: "color", borderRadius: "border-radius" };
          return mapping[key] ? `${mapping[key]}: ${value} !important;` : "";
        }).join(" ")}
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </>
  );
}
