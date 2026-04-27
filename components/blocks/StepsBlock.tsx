"use client";

import { StepsContent } from "@/lib/blocks/types";
import { InlineText } from "@/components/admin/InlineText";

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

  const updateStep = (index: number, field: string, value: string) => {
    if (onUpdate) {
      const newSteps = [...content.steps];
      newSteps[index] = { ...newSteps[index], [field]: value };
      onUpdate({ ...content, steps: newSteps });
    }
  };

  return (
    <section style={{ padding: "5rem 2rem 6rem", background: "var(--gs-bg)", position: "relative" }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div data-field="eyebrow">
          <InlineText
            tagName="p"
            value={content.eyebrow}
            onChange={(v) => updateField("eyebrow", v)}
            isEditing={isEditing}
            dataField="eyebrow"
            style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gs-gold)", marginBottom: "1rem" }}
          />
        </div>
        <h2 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 300,
          color: "var(--gs-text)",
          lineHeight: 1.2,
          maxWidth: "700px",
          margin: "0 auto",
        }}>
          <InlineText
            tagName="span"
            value={content.title}
            onChange={(v) => updateField("title", v)}
            isEditing={isEditing}
            dataField="title"
          />
          <br />
          <InlineText
            tagName="em"
            value={content.titleAccent}
            onChange={(v) => updateField("titleAccent", v)}
            isEditing={isEditing}
            dataField="titleAccent"
            style={{ color: "var(--gs-gold)", fontStyle: "italic" }}
          />
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
        {content.steps.map((step, i) => (
          <div key={i} style={{
            background: "var(--gs-bg2)",
            border: "1px solid var(--gs-border)",
            borderRadius: "2px",
            padding: "2rem 1.75rem 2.25rem",
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
              0{i + 1}
            </div>

            {/* Day badge */}
            <div style={{ marginBottom: "1.25rem" }}>
              <InlineText
                tagName="span"
                value={step.day}
                onChange={(v) => updateStep(i, "day", v)}
                isEditing={isEditing}
                style={{
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
                }}
              />
            </div>

            {/* Eyebrow */}
            <InlineText
              tagName="p"
              value={step.eyebrow}
              onChange={(v) => updateStep(i, "eyebrow", v)}
              isEditing={isEditing}
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gs-muted)",
                marginBottom: "0.6rem",
              }}
            />

            {/* Title */}
            <InlineText
              tagName="h3"
              value={step.title}
              onChange={(v) => updateStep(i, "title", v)}
              isEditing={isEditing}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                fontWeight: 300,
                color: "var(--gs-text)",
                lineHeight: 1.25,
                marginBottom: "1rem",
              }}
            />

            {/* Body */}
            <InlineText
              tagName="p"
              value={step.body}
              onChange={(v) => updateStep(i, "body", v)}
              isEditing={isEditing}
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.75,
                color: "var(--gs-text-sub)",
              }}
            />

            {/* Bottom accent line */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "2px",
              background: "linear-gradient(to right, var(--gs-gold), transparent)",
              opacity: 0.35,
            }} />
          </div>
        ))}
      </div>
    </section>
  );
}
