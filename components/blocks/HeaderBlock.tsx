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

import { useMasterStyles } from "./MasterStylesProvider";

export function HeaderBlock({ id, content, isEditing = false, onUpdate, onSelectElement, selectedElementPath }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const masterStyles = useMasterStyles();

  const { 
    links = [], 
    isSticky, 
    isTransparent, 
    logoLink,
    layout = "default",
    styles: customStyles = {}
  } = content;

  const logo = content.logo || masterStyles?.logoUrl;
  const logoHeight = content.logoHeight || masterStyles?.logoHeight || "40px";

  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollPos = e.target.scrollTop || window.scrollY;
      setIsScrolled(scrollPos > 20);
    };

    if (isEditing) {
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
    padding: isScrolled ? "0.8rem 2rem" : (customStyles.padding || "1.2rem 2rem"),
    backgroundColor: isTransparent && !isScrolled && !isMenuOpen ? "transparent" : (isScrolled || isMenuOpen ? "rgba(255, 255, 255, 0.95)" : (customStyles.backgroundColor || "white")),
    backdropFilter: (isScrolled || !isTransparent || isMenuOpen) ? (customStyles.backdropFilter || "blur(10px)") : "none",
    borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.05)" : (customStyles.borderBottom || "none"),
    color: isTransparent && !isScrolled && !isMenuOpen ? (isEditing ? "#111827" : (customStyles.color || "white")) : (customStyles.color || "#111827"),
    display: "flex",
    flexDirection: layout === "centered" ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: layout === "centered" ? "1rem" : "0",
    boxSizing: "border-box",
    marginBottom: isTransparent && isEditing && !isScrolled ? "-80px" : "0",
    overflow: isMenuOpen ? "visible" : "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    ...customStyles
  };

  const itemStyle = (path: string): React.CSSProperties => ({
    cursor: isEditing ? "pointer" : "default",
    outline: isEditing && selectedElementPath === path ? "2px solid #875BF7" : "none",
    outlineOffset: "4px",
    borderRadius: "4px",
    transition: "all 0.2s"
  });

  const renderLogo = () => (
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
  );

  const leftLinks = layout === "split" ? links.slice(0, Math.ceil(links.length / 2)) : [];
  const rightLinks = layout === "split" ? links.slice(Math.ceil(links.length / 2)) : links;

  const renderLinks = (items: NavLink[], offset = 0, isMobile = false) => (
    <nav style={{ 
      display: isMobile ? "flex" : "none", 
      gap: isMobile ? "1.5rem" : "2rem", 
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      width: isMobile ? "100%" : "auto"
    }} className={isMobile ? "gs-nav-mobile" : "gs-nav-desktop"}>
      {items.map((link, idx) => {
        const i = idx + offset;
        const path = `${id}-link-${i}`;
        return (
          <div key={i} style={{ position: "relative", width: isMobile ? "100%" : "auto" }} className="gs-nav-item">
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
                  style={{ fontSize: isMobile ? "1.1rem" : "0.85rem", fontWeight: 600, color: "inherit" }}
                />
              ) : (
                <Link 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontSize: isMobile ? "1.1rem" : "0.85rem", fontWeight: 600, textDecoration: "none", color: "inherit", opacity: 0.8, transition: "opacity 0.2s" }}
                >
                  {link.label}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );

  return (
    <header style={headerStyle}>
      {layout === "split" ? (
        <>
          <div className="gs-nav-desktop">{renderLinks(leftLinks)}</div>
          {renderLogo()}
          <div className="gs-nav-desktop">{renderLinks(rightLinks, leftLinks.length)}</div>
        </>
      ) : (
        <>
          {renderLogo()}
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="gs-nav-desktop">
            {renderLinks(rightLinks)}
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
                  <Link href={content.ctaLink || "#"} style={{ padding: "0.6rem 1.2rem", background: "#875BF7", color: "white", borderRadius: "30px", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 12px rgba(135,91,247,0.3)" }}>
                    {content.ctaText}
                  </Link>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Hamburger Icon */}
      <button 
        className="gs-mobile-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ 
          display: "none", 
          background: "none", 
          border: "none", 
          cursor: "pointer", 
          padding: "0.5rem",
          color: "inherit",
          zIndex: 1200
        }}
      >
        <div style={{ 
          width: "24px", 
          height: "2px", 
          background: "currentColor", 
          marginBottom: isMenuOpen ? "0" : "6px",
          transform: isMenuOpen ? "rotate(45deg) translate(1px, 1px)" : "none",
          transition: "all 0.3s ease"
        }}></div>
        {!isMenuOpen && <div style={{ width: "24px", height: "2px", background: "currentColor", marginBottom: "6px", transition: "all 0.3s ease" }}></div>}
        <div style={{ 
          width: "24px", 
          height: "2px", 
          background: "currentColor",
          transform: isMenuOpen ? "rotate(-45deg) translate(0px, 0px)" : "none",
          transition: "all 0.3s ease"
        }}></div>
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        style={{
          position: "fixed",
          top: "80px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "white",
          zIndex: 1000,
          padding: "2rem",
          display: isMenuOpen ? "flex" : "none",
          flexDirection: "column",
          gap: "2rem",
          overflowY: "auto",
          color: "#111827",
          animation: "gs-slide-down 0.3s ease-out"
        }}
      >
        {renderLinks(links, 0, true)}
        {content.ctaText && (
           <Link 
            href={content.ctaLink || "#"} 
            onClick={() => setIsMenuOpen(false)}
            style={{ 
              padding: "1rem", 
              background: "#875BF7", 
              color: "white", 
              borderRadius: "12px", 
              textAlign: "center", 
              fontWeight: 700, 
              textDecoration: "none" 
            }}
          >
            {content.ctaText}
          </Link>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gs-nav-desktop { display: none !important; }
          .gs-mobile-toggle { display: block !important; }
        }
        @keyframes gs-slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gs-nav-item:hover .gs-submenu { opacity: 1 !important; visibility: visible !important; transform: translateX(-50%) translateY(0) !important; }
        .gs-submenu { transform: translateX(-50%) translateY(10px) !important; }
      `}</style>
    </header>
  );
}
