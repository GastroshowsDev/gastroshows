import { CSSProperties } from "react";

export type AnimationType = "none" | "typewriter" | "fade" | "slide" | "zoom" | "bounce";
export type HoverType = "none" | "grow" | "glow" | "lift";

export function getAnimationStyles(type: AnimationType | undefined, ready: boolean): CSSProperties {
  if (!type || type === "none") return {};

  const base: CSSProperties = {
    opacity: ready ? 1 : 0,
    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  switch (type) {
    case "fade":
      return base;
    case "slide":
      return {
        ...base,
        transform: ready ? "translateY(0)" : "translateY(30px)",
      };
    case "zoom":
      return {
        ...base,
        transform: ready ? "scale(1)" : "scale(0.95)",
      };
    case "bounce":
      return {
        ...base,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: ready ? "translateY(0)" : "translateY(40px)",
      };
    case "typewriter":
      // Typewriter is handled via a special component or custom logic in the block
      return base;
    default:
      return base;
  }
}

export function getHoverStyles(type: HoverType | undefined, isHovered: boolean): CSSProperties {
  if (!type || type === "none") return { transition: "all 0.3s ease" };

  const base: CSSProperties = { transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" };

  switch (type) {
    case "grow":
      return { ...base, transform: isHovered ? "scale(1.05)" : "scale(1)" };
    case "lift":
      return { ...base, transform: isHovered ? "translateY(-8px)" : "translateY(0)" };
    case "glow":
      return { ...base, textShadow: isHovered ? "0 0 15px rgba(200,169,110,0.6)" : "none" };
    default:
      return base;
  }
}
