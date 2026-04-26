"use client";

import type { LandingContentMap } from "@/lib/landing-client";
import { c } from "@/lib/landing-client";

type Props = { content: LandingContentMap };

export function RitualSection({ content }: Props) {
  const steps = [1, 2, 3, 4].map((n) => ({
    day:     c(content, `ritual.step${n}.day`),
    eyebrow: c(content, `ritual.step${n}.eyebrow`),
    title:   c(content, `ritual.step${n}.title`),
    body:    c(content, `ritual.step${n}.body`),
  }));

  return (
    <section style={{ padding: "5rem 2rem 6rem", background: "var(--gs-bg)", position: "relative" }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1rem" }}>
          {c(content, "ritual.eyebrow")}
        </p>
        <h2 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 300,
          color: "var(--gs-text)",
          lineHeight: 1.2,
          maxWidth: "560px",
          margin: "0 auto",
          transition: "color 0.3s",
        }}>
          {c(content, "ritual.title_line1")}<br />
          <em style={{ color: "var(--gs-gold)" }}>{c(content, "ritual.title_em")}</em>
        </h2>
      </div>

      {/* 4-card grid */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
      }}>
        {steps.map((step, i) => (
          <StepCard key={i} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: { day: string; eyebrow: string; title: string; body: string };
  index: number;
}) {
  return (
    <div style={{
      background: "var(--gs-bg2)",
      border: "1px solid var(--gs-border)",
      borderRadius: "2px",
      padding: "2rem 1.75rem 2.25rem",
      transition: "border-color 0.3s, background 0.3s",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Step number */}
      <div style={{
        fontSize: "0.55rem",
        fontWeight: 700,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(200,169,110,0.35)",
        marginBottom: "0.75rem",
      }}>
        0{index + 1}
      </div>

      {/* Day badge */}
      <div style={{
        display: "inline-block",
        background: "rgba(200,169,110,0.08)",
        border: "1px solid rgba(200,169,110,0.2)",
        borderRadius: "2px",
        padding: "0.28rem 0.65rem",
        fontSize: "0.6rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--gs-gold)",
        marginBottom: "1.25rem",
      }}>
        {step.day}
      </div>

      {/* Eyebrow */}
      <p style={{
        fontSize: "0.62rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--gs-muted)",
        marginBottom: "0.6rem",
        transition: "color 0.3s",
      }}>
        {step.eyebrow}
      </p>

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
        fontWeight: 300,
        color: "var(--gs-text)",
        lineHeight: 1.25,
        marginBottom: "1rem",
        transition: "color 0.3s",
      }}>
        {step.title}
      </h3>

      {/* Body */}
      <p style={{
        fontSize: "0.875rem",
        lineHeight: 1.75,
        color: "var(--gs-text-sub)",
        transition: "color 0.3s",
      }}>
        {step.body}
      </p>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(to right, var(--gs-gold), transparent)",
        opacity: 0.35,
      }} />
    </div>
  );
}
