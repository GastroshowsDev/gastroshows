"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, type Country, getDefaultCountry } from "@/lib/countries";

type Props = {
  selectedCountry: Country;
  onChange: (country: Country) => void;
};

export function CountrySelector({ selectedCountry, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COUNTRIES.filter((c) => {
    const query = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.code.toLowerCase().includes(query) ||
      c.dialCode.includes(query)
    );
  });

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  function handleCountrySelect(country: Country) {
    onChange(country);
    setOpen(false);
    setSearch("");
  }

  return (
    <div style={{ position: "relative", width: "fit-content" }}>
      {/* Country Button: Flag + Dial Code */}
      <button
        onClick={() => setOpen(!open)}
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 0.75rem",
          height: "2.5rem",
          border: "1px solid var(--gs-border)",
          background: "var(--gs-bg2)",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "all 0.2s",
          color: "var(--gs-text)",
          fontSize: "0.95rem",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--gs-gold)";
          e.currentTarget.style.background = "rgba(218,165,32,0.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--gs-border)";
          e.currentTarget.style.background = "var(--gs-bg2)";
        }}
        title={selectedCountry.name}
      >
        <span style={{ fontSize: "1.3rem" }}>{selectedCountry.flag}</span>
        <span>{selectedCountry.dialCode}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "calc(100% + 0.5rem)",
            left: 0,
            zIndex: 1000,
            background: "var(--gs-bg2)",
            border: "1px solid var(--gs-border)",
            borderRadius: "6px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            minWidth: "320px",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
            animation: "slideUp 0.2s ease",
          }}
        >
          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Busca por país, código o +número"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "0.75rem",
              borderBottom: "1px solid var(--gs-border)",
              background: "var(--gs-bg2)",
              border: "none",
              borderRadius: "6px 6px 0 0",
              color: "var(--gs-text)",
              fontSize: "0.9rem",
              outline: "none",
              transition: "all 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "rgba(218,165,32,0.05)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "var(--gs-bg2)";
            }}
          />

          {/* Country List */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.length > 0 ? (
              filtered.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  type="button"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "none",
                    background: "transparent",
                    textAlign: "left",
                    color: "var(--gs-text)",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    borderBottom: "1px solid rgba(200,169,110,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(218,165,32,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "1.4rem", minWidth: "1.8rem" }}>
                    {country.flag}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {country.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--gs-muted)",
                        marginTop: "0.1rem",
                      }}
                    >
                      {country.code} • {country.dialCode}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div
                style={{
                  padding: "1.5rem",
                  textAlign: "center",
                  color: "var(--gs-muted)",
                  fontSize: "0.85rem",
                }}
              >
                No se encontró país con "{search}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
