"use client";

import { StepsContent } from "@/lib/blocks/types";
import { InlineText } from "@/components/admin/InlineText";
import { useState, useEffect, useRef } from "react";

type Props = {
  content: StepsContent;
  isEditing?: boolean;
  onUpdate?: (newContent: StepsContent) => void;
};

export function StepsBlock({ content, isEditing = false, onUpdate }: Props) {
  const updateField = (field: keyof StepsContent, value: any) => {
    if (onUpdate) {
      onUpdate({ ...content, [field]: value });
    }
  };

  const primaryColor = content.accentColor || "var(--gs-gold)";

  return (
    <section style={{ padding: "6rem 2rem 8rem", background: "var(--gs-bg)", position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: "5rem" }}>
        <InlineText
          tagName="p"
          value={content.eyebrow}
          onChange={(v) => updateField("eyebrow", v)}
          isEditing={isEditing}
          style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: primaryColor, marginBottom: "1.2rem" }}
        />
        <h2 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
          fontWeight: 300,
          color: "var(--gs-text)",
          lineHeight: 1.1,
          maxWidth: "1000px",
          margin: "0 auto",
        }}>
          <InlineText
            tagName="span"
            value={content.title}
            onChange={(v) => updateField("title", v)}
            isEditing={isEditing}
          />
          <br />
          <InlineText
            tagName="em"
            value={content.titleAccent}
            onChange={(v) => updateField("titleAccent", v)}
            isEditing={isEditing}
            style={{ color: primaryColor, fontStyle: "italic" }}
          />
        </h2>
      </div>

      <div 
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "var(--gs-stack, repeat(auto-fit, minmax(260px, 1fr)))",
          gap: "3rem",
        } as React.CSSProperties}
      >
        {content.steps.map((step, i) => (
          <StepCard 
            key={i} 
            index={i} 
            step={step} 
            isEditing={isEditing} 
            primaryColor={primaryColor}
            onUpdate={(field: string, val: string) => {
              const newSteps = [...content.steps];
              newSteps[i] = { ...newSteps[i], [field]: val };
              onUpdate?.({ ...content, steps: newSteps });
            }}
          />
        ))}
      </div>
    </section>
  );
}

function StepCard({ index, step, isEditing, primaryColor, onUpdate }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isEditing) setIsOpen(true);
    else setIsOpen(false);
  }, [isEditing]);

  const handleInteraction = () => {
    if (isEditing) return;
    if (isOpen) return; // Don't restart if already open (or toggle? User said stay 7s)
    
    setIsOpen(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 7000);
  };

  const paperBase = "#d8d3c5"; 
  const paperLighter = "#efede4";
  const paperDarker = "#c6c1b3";
  const color35 = `color-mix(in srgb, ${primaryColor} 35%, transparent)`;

  // Dynamic transition durations
  const openDuration = "0.8s";
  const closeDuration = "1.5s";
  const currentDuration = isOpen ? openDuration : closeDuration;

  return (
    <div 
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
      style={{
        position: "relative",
        height: "420px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: `all ${currentDuration} cubic-bezier(0.16, 1, 0.3, 1)`,
        boxShadow: isOpen ? "0 25px 60px rgba(0,0,0,0.25)" : "0 10px 20px rgba(0,0,0,0.15)",
        overflow: "hidden"
      }}
    >
      {/* ── THE LETTER (CONTENT) ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "#FFFBF2",
        padding: "3rem 2.2rem",
        zIndex: isOpen ? 10 : 1,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "scale(1)" : "scale(0.98)",
        transition: `all ${currentDuration} cubic-bezier(0.16, 1, 0.3, 1)`,
        pointerEvents: isOpen ? "auto" : "none",
        boxShadow: "inset 0 0 50px rgba(200,169,110,0.08)",
        border: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: color35, marginBottom: "1rem" }}>0{index + 1}</div>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{
             display: "inline-block", background: "rgba(200,169,110,0.1)", border: `1px solid rgba(200,169,110,0.2)`, borderRadius: "2px",
             padding: "0.4rem 1rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: primaryColor,
          }}>{step.day}</span>
        </div>

        <p style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "0.6rem" }}>{step.eyebrow}</p>

        <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.9rem", fontWeight: 400, color: "#111", lineHeight: 1.2, marginBottom: "1.5rem" }}>
          {step.title}
        </h3>

        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#444", fontFamily: "var(--font-montserrat), sans-serif" }}>
          {step.body}
        </p>

        {/* Decorative elements */}
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "60px", height: "60px", background: "linear-gradient(135deg, transparent 60%, rgba(200,169,110,0.08) 60%)" }} />
      </div>

      {/* ── ENVELOPE DESIGN (FADES OUT) ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: isOpen ? 1 : 10,
        opacity: isOpen ? 0 : 1,
        transition: `opacity ${currentDuration} cubic-bezier(0.16, 1, 0.3, 1)`,
        pointerEvents: isOpen ? "none" : "auto",
      }}>
        {/* Large Number */}
        <div style={{
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "13rem",
          color: primaryColor,
          opacity: 0.15,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0
        }}>
          {index + 1}
        </div>

        <div style={{ position: "absolute", inset: 0, background: paperDarker }} />

        {/* Bottom Flap */}
        <div style={{
          position: "absolute", inset: 0,
          background: paperBase,
          clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
          zIndex: 4,
          boxShadow: "inset 0 -15px 40px rgba(0,0,0,0.08)"
        }} />

        {/* Side Flaps */}
        <div style={{
          position: "absolute", inset: 0,
          background: paperLighter,
          clipPath: "polygon(0 0, 50% 50%, 0 100%)",
          zIndex: 3,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: paperLighter,
          clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
          zIndex: 3,
        }} />

        {/* Top Flap */}
        <div style={{
          position: "absolute", inset: 0,
          background: paperLighter,
          clipPath: "polygon(0 0, 100% 0, 50% 50%)",
          zIndex: 5,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.08)"
        }} />

        {/* Label */}
        <div style={{
          position: "absolute", 
          top: "12%", 
          left: "50%", 
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 6
        }}>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: primaryColor, letterSpacing: "0.6em", marginBottom: "0.5rem" }}>0{index + 1}</div>
          <div style={{ width: "40px", height: "1.5px", background: primaryColor, margin: "0 auto", opacity: 0.4 }} />
        </div>
      </div>
    </div>
  );
}
