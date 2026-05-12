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

  const generateCSS = (selector: string, rules: any, important: boolean = false) => {
    if (!rules) return "";
    const mapping: any = {
      fontSize: "font-size",
      fontWeight: "font-weight",
      fontStyle: "font-style",
      color: "color",
      backgroundColor: "background-color",
      borderRadius: "border-radius",
      textAlign: "text-align",
      fontFamily: "font-family",
      letterSpacing: "letter-spacing",
      lineHeight: "line-height",
      textDecoration: "text-decoration"
    };

    const cssRules = Object.entries(rules)
      .map(([key, value]) => {
        if (!value && value !== 0) return "";
        let rule = "";
        if (key === "bold") rule = value ? "font-weight: bold" : "";
        else if (key === "italic") rule = value ? "font-style: italic" : "";
        else if (key === "underline") rule = value ? "text-decoration: underline" : "";
        else if (key === "strikethrough") rule = value ? "text-decoration: line-through" : "";
        else if (mapping[key]) rule = `${mapping[key]}: ${value}`;
        
        if (rule && important) return rule + " !important;";
        if (rule) return rule + ";";
        return "";
      })
      .filter(r => r !== "")
      .join(" ");

    return `${selector} { ${cssRules} }`;
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
    
    /* Global Buttons Classes */
    ${generateCSS(".gs-btn-primary", styles.button, true)}
    ${generateCSS(".gs-btn-secondary", styles.buttonSecondary, true)}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </>
  );
}
