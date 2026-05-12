import { createContext, useContext, useEffect, useState } from "react";

const MasterStylesContext = createContext<any>(null);

export function useMasterStyles() {
  return useContext(MasterStylesContext);
}

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
      } else {
        // Defaults if none found
        setStyles({
          h1: { fontSize: "3.5rem", fontWeight: 700, color: "#111827" },
          h2: { fontSize: "2.5rem", fontWeight: 700, color: "#111827" },
          h3: { fontSize: "1.75rem", fontWeight: 600, color: "#111827" },
          p: { fontSize: "1rem", color: "#4B5563" },
          button: { backgroundColor: "#875BF7", color: "#FFFFFF", borderRadius: "8px" },
          a: { color: "#875BF7" }
        });
      }
    }
    load();

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
    
    ${generateCSS(".gs-btn-primary", styles.button, true)}
    ${generateCSS(".gs-btn-secondary", styles.buttonSecondary, true)}
  `;

  return (
    <MasterStylesContext.Provider value={styles}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </MasterStylesContext.Provider>
  );
}
