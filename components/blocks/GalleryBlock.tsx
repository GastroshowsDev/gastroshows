"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { InlineText } from "@/components/admin/InlineText";
import type { GalleryContent } from "@/lib/blocks/types";

type Props = { 
  content: GalleryContent;
  isEditing?: boolean;
  onUpdate?: (newContent: GalleryContent) => void;
};

export function GalleryBlock({ content, isEditing = false, onUpdate }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const updateLabel = (index: number, label: string) => {
    if (onUpdate) {
      const newImages = [...(content.images || [])];
      newImages[index] = { ...newImages[index], label };
      onUpdate({ ...content, images: newImages });
    }
  };

  const cols = content.columns ?? 3;

  if (!content.images?.length) return null;

  return (
    <section style={{ padding: "4rem 2rem", background: "var(--gs-bg)" }}>
      <div
        ref={ref}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `var(--gs-stack, repeat(${cols}, 1fr))`,
          gap: "var(--gs-gap, 1.25rem)",
        } as React.CSSProperties}
      >
        {content.images.map((img, i) => (
          <GalleryCell
            key={`${img.src}-${i}`}
            src={img.src}
            alt={img.alt}
            label={img.label}
            isEditing={isEditing}
            onUpdateLabel={(val) => updateLabel(i, val)}
            delay={i * 0.08}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
}

function GalleryCell({
  src, alt, label, isEditing, onUpdateLabel, delay, visible,
}: {
  src: string; alt: string; label?: string; isEditing: boolean; onUpdateLabel: (v: string) => void; delay: number; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: "280px",
        overflow: "hidden",
        borderRadius: "2px",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
      }}
    >
      {/* ... image remains same ... */}
      <Image
        src={src}
        alt={alt || label || ""}
        fill
        loading="lazy"
        sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
        style={{
          objectFit: "cover",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.65) 0%, transparent 55%)",
        }}
      />
      {/* Label */}
      <div style={{ position: "absolute", bottom: "1.1rem", left: "1.25rem", right: "1.25rem" }}>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "#F5F0E8",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
            transition: "transform 0.4s",
          }}
        >
          <InlineText
            value={label || ""}
            onChange={onUpdateLabel}
            isEditing={isEditing}
            placeholder="Etiqueta..."
          />
        </p>
      </div>
    </div>
  );
}
