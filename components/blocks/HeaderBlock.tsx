"use client";

import React, { useState, useEffect } from "react";
import { HeaderContent, NavLink } from "@/lib/blocks/types";
import Link from "next/link";

type Props = {
  id: string;
  content: HeaderContent;
  isEditing?: boolean;
  onUpdate?: (newContent: HeaderContent) => void;
  onSelectElement?: (path: string) => void;
  selectedElementPath?: string | null;
};

import { InlineText } from "@/components/admin/InlineText";

export function HeaderBlock({ id, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { links = [], logo, logoHeight = "40px", isSticky, isTransparent, logoLink } = content;

  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollPos = e.target.scrollTop || window.scrollY;
      setIsScrolled(scrollPos > 20);
    };

    if (isEditing) {
      // In editor, the scroll is on the parent container
      const container = document.getElementById("gs-editor-canvas-container");
      if (container) {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    } else {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isEditing]);

  const updateField = (field: keyof HeaderContent, value: any) => {
    onUpdate?.({ ...content, [field]: value });
  };

  const headerStyle: React.CSSProperties = {
    position: isSticky ? (isEditing ? "sticky" : "fixed") : "relative",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1100,
    transition: "all 0.3s ease",
    padding: isScrolled ? "0.8rem 2rem" : "1.2rem 2rem",
    background: isTransparent && !isScrolled ? "transparent" : (isTransparent ? "rgba(255, 255, 255, 0.95)" : "white"),
    backdropFilter: isScrolled || !isTransparent ? "blur(10px)" : "none",
    borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.05)" : "none",
    color: isTransparent && !isScrolled ? (isEditing ? "#111827" : "white") : "#111827",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    marginBottom: isTransparent && isEditing && !isScrolled ? "-80px" : "0", // Pull content up in editor if transparent
  };

  const itemStyle = (path: string): React.CSSProperties => ({
    cursor: isEditing ? "pointer" : "default",
    outline: isEditing && selectedElementPath === path ? "2px solid #875BF7" : "none",
    outlineOffset: "4px",
    borderRadius: "4px",
    transition: "all 0.2s"
  });

  return (
    <header style={headerStyle}>
      {/* Logo */}
      <div 
        style={itemStyle(`${id}-logo`)}
        onClick={(e) => { if(isEditing) { e.stopPropagation(); onSelectElement?.(`${id}-logo`); } }}
      >
        <Link 
          href={isEditing ? "#" : (content.logoLink || "/")}
          onClick={(e) => { if(isEditing) e.preventDefault(); }}
          style={{ display: "block", textDecoration: "none", color: "inherit" }}
        >
          {logo ? (
            <img src={logo} alt="Logo" style={{ height: logoHeight, width: "auto", display: "block" }} />
          ) : (
            <div style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>GASTROSHOWS</div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map((link, i) => {
          const path = `${id}-link-${i}`;
          return (
            <div key={i} style={{ position: "relative" }} className="gs-nav-item">
              <div
                style={itemStyle(path)}
                onClick={(e) => { if(isEditing) { e.stopPropagation(); onSelectElement?.(path); } }}
              >
                {isEditing ? (
                  <InlineText 
                    value={link.label}
                    onChange={(v) => {
                      const newLinks = [...links];
                      newLinks[i] = { ...newLinks[i], label: v };
                      updateField("links", newLinks);
                    }}
                    isEditing={true}
                    style={{ 
                      fontSize: "0.85rem", 
                      fontWeight: 600, 
                      color: "inherit",
                    }}
                  />
                ) : (
                  <Link 
                    href={link.href} 
                    style={{ 
                      fontSize: "0.85rem", 
                      fontWeight: 600, 
                      textDecoration: "none", 
                      color: "inherit",
                      opacity: 0.8,
                      transition: "opacity 0.2s"
                    }}
                  >
                    {link.label}
                  </Link>
                )}
                {link.children && link.children.length > 0 && <span style={{ marginLeft: "4px", fontSize: "0.6rem" }}>▼</span>}
              </div>

              {/* Submenu */}
              {!isEditing && link.children && link.children.length > 0 && (
                <div 
                  className="gs-submenu"
                  style={{
                    position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                    background: "white", padding: "1rem", borderRadius: "8px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)", minWidth: "180px",
                    marginTop: "10px", opacity: 0, visibility: "hidden", transition: "all 0.2s",
                    border: "1px solid #F3F4F6"
                  }}
                >
                  {link.children.map((sub, j) => (
                    <Link 
                      key={j} 
                      href={sub.href}
                      style={{ 
                        display: "block", padding: "0.5rem", fontSize: "0.8rem", color: "#4B5563",
                        textDecoration: "none", borderRadius: "4px", transition: "background 0.2s"
                      }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* CTA Button */}
        {content.ctaText && (
          <div
            style={itemStyle(`${id}-cta`)}
            onClick={(e) => { if(isEditing) { e.stopPropagation(); onSelectElement?.(`${id}-cta`); } }}
          >
            {isEditing ? (
               <InlineText 
                value={content.ctaText}
                onChange={(v) => updateField("ctaText", v)}
                isEditing={true}
                style={{
                  padding: "0.6rem 1.2rem", background: "#875BF7", color: "white",
                  borderRadius: "30px", fontSize: "0.8rem", fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(135,91,247,0.3)"
                }}
              />
            ) : (
              <Link 
                href={content.ctaLink || "#"}
                style={{
                  padding: "0.6rem 1.2rem", background: "#875BF7", color: "white",
                  borderRadius: "30px", fontSize: "0.8rem", fontWeight: 700,
                  textDecoration: "none", boxShadow: "0 4px 12px rgba(135,91,247,0.3)"
                }}
              >
                {content.ctaText}
              </Link>
            )}
          </div>
        )}
      </nav>

      <style>{`
        .gs-nav-item:hover .gs-submenu {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateX(-50%) translateY(0) !important;
        }
        .gs-submenu {
          transform: translateX(-50%) translateY(10px) !important;
        }
      `}</style>
    </header>
  );
}
