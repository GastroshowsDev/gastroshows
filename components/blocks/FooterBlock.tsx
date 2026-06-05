"use client";

import React from "react";
import { FooterContent } from "@/lib/blocks/types";
import Link from "next/link";

type Props = {
  id: string;
  content: FooterContent;
  isEditing?: boolean;
  onUpdate?: (newContent: FooterContent) => void;
  onSelectElement?: (path: string) => void;
  selectedElementPath?: string | null;
};

import { InlineText } from "@/components/admin/InlineText";

import { useMasterStyles } from "./MasterStylesProvider";

export function FooterBlock({ id, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const masterStyles = useMasterStyles();
  const { 
    columns = [], 
    copyright, 
    socialLinks = [], 
    styles = {} 
  } = content;
  
  const logo = content.logo || masterStyles?.logoUrl;
  const logoHeight = content.logoHeight || masterStyles?.logoHeight || "40px";

  const updateField = (field: keyof FooterContent, value: any) => {
    onUpdate?.({ ...content, [field]: value });
  };

  const itemStyle = (path: string): React.CSSProperties => ({
    cursor: isEditing ? "pointer" : "default",
    outline: isEditing && selectedElementPath === path ? "2px solid #875BF7" : "none",
    outlineOffset: "4px",
    borderRadius: "4px",
    transition: "all 0.2s"
  });

  return (
    <footer style={{
      background: "var(--gs-bg2)",
      color: "var(--gs-text)",
      padding: styles.padding || "5rem 2rem 3rem 2rem",
      borderTop: "1px solid var(--gs-border)"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr repeat(auto-fit, minmax(150px, 1fr))", gap: "5rem" }}>
        {/* Brand Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div 
            style={itemStyle(`${id}-logo`)}
            onClick={(e) => { if(isEditing) { e.stopPropagation(); onSelectElement?.(`${id}-logo`); } }}
          >
            {logo ? (
              <img src={logo} alt="Logo" style={{ height: logoHeight, width: "auto" }} />
            ) : (
              <div style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>GASTROSHOWS</div>
            )}
          </div>
          
          <p style={{ fontSize: "0.85rem", color: "#9CA3AF", lineHeight: "1.6", maxWidth: "240px" }}>
            Experiencias gastronómicas clandestinas y eventos exclusivos. Un viaje para los sentidos.
          </p>
          
          {/* Social Links */}
          <div style={{ display: "flex", gap: "1rem" }}>
            {socialLinks.map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.6, transition: "opacity 0.2s" }}>
                {social.platform === "instagram" && "📸"}
                {social.platform === "facebook" && "📘"}
                {social.platform === "twitter" && "🐦"}
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {columns.map((col, i) => (
          <div key={i}>
            <div
              style={itemStyle(`${id}-coltitle-${i}`)}
              onClick={(e) => { if(isEditing) { e.stopPropagation(); onSelectElement?.(`${id}-coltitle-${i}`); } }}
            >
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, color: "white", textTransform: "uppercase", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
                {isEditing ? (
                  <InlineText 
                    value={col.title}
                    onChange={(v) => {
                      const newCols = [...columns];
                      newCols[i] = { ...newCols[i], title: v };
                      updateField("columns", newCols);
                    }}
                    isEditing={true}
                  />
                ) : col.title}
              </h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {col.links.map((link, j) => {
                const path = `${id}-link-${i}-${j}`;
                return (
                  <div
                    key={j}
                    style={itemStyle(path)}
                    onClick={(e) => { if(isEditing) { e.stopPropagation(); onSelectElement?.(path); } }}
                  >
                    {isEditing ? (
                      <InlineText 
                        value={link.label}
                        onChange={(v) => {
                          const newCols = [...columns];
                          const newLinks = [...newCols[i].links];
                          newLinks[j] = { ...newLinks[j], label: v };
                          newCols[i] = { ...newCols[i], links: newLinks };
                          updateField("columns", newCols);
                        }}
                        isEditing={true}
                        style={{ fontSize: "0.85rem", color: "#9CA3AF" }}
                      />
                    ) : (
                      <Link 
                        href={link.href} 
                        style={{ fontSize: "0.85rem", color: "#9CA3AF", textDecoration: "none" }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Copyright Bar */}
      <div 
        style={{ 
          maxWidth: "1200px", 
          margin: "4rem auto 0", 
          paddingTop: "2rem", 
          borderTop: "1px solid rgba(255,255,255,0.05)",
          textAlign: "center",
          ...itemStyle(`${id}-copyright`)
        }}
        onClick={(e) => { if(isEditing) { e.stopPropagation(); onSelectElement?.(`${id}-copyright`); } }}
      >
        <div style={{ fontSize: "0.75rem", color: "#4B5563" }}>
          {isEditing ? (
            <InlineText 
              value={copyright || `© ${new Date().getFullYear()} Gastroshows. Todos los derechos reservados.`}
              onChange={(v) => updateField("copyright", v)}
              isEditing={true}
            />
          ) : (
            copyright || `© ${new Date().getFullYear()} Gastroshows. Todos los derechos reservados.`
          )}
        </div>
      </div>
    </footer>
  );
}
