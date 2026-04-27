/**
 * Advanced Animation System for Atomic Elements
 */

export type AnimationType = 
  | "none"
  | "fade-in"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale-in"
  | "blur-in"
  | "bounce-in"
  | "typewriter"
  | "flip-x"
  | "reveal-up"
  | "float"
  | "pulse"
  | "glitch";

export function getAnimationStyles(type: AnimationType | string | undefined, active: boolean) {
  if (!type || type === "none") return {};

  const base = {
    transitionProperty: "all",
    transitionDuration: "0.8s",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: active ? 1 : 0,
  };

  switch (type) {
    case "fade-in":
      return { ...base };
    
    case "slide-up":
      return { 
        ...base, 
        transform: active ? "translateY(0)" : "translateY(30px)" 
      };
    
    case "slide-down":
      return { 
        ...base, 
        transform: active ? "translateY(0)" : "translateY(-30px)" 
      };

    case "slide-left":
      return { 
        ...base, 
        transform: active ? "translateX(0)" : "translateX(40px)" 
      };

    case "slide-right":
      return { 
        ...base, 
        transform: active ? "translateX(0)" : "translateX(-40px)" 
      };

    case "scale-in":
      return { 
        ...base, 
        transform: active ? "scale(1)" : "scale(0.9)" 
      };

    case "blur-in":
      return { 
        ...base, 
        filter: active ? "blur(0px)" : "blur(10px)",
        transform: active ? "scale(1)" : "scale(1.05)"
      };

    case "bounce-in":
      return { 
        ...base, 
        transitionDuration: "0.6s",
        transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        transform: active ? "scale(1)" : "scale(0.5)" 
      };

    case "flip-x":
      return { 
        ...base, 
        transform: active ? "rotateX(0)" : "rotateX(90deg)",
        perspective: "1000px"
      };

    case "reveal-up":
      return {
        ...base,
        clipPath: active ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
        transform: active ? "translateY(0)" : "translateY(20px)"
      };

    case "float":
      return {
        animation: active ? "gs-float 3s ease-in-out infinite" : "none",
        ...base
      };

    case "pulse":
      return {
        animation: active ? "gs-pulse 2s ease-in-out infinite" : "none",
        ...base
      };

    case "typewriter":
      return {
        ...base,
        borderRight: active ? "2px solid var(--gs-gold)" : "none",
        whiteSpace: "nowrap",
        overflow: "hidden"
      };

    case "glitch":
      return {
        animation: active ? "gs-glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite" : "none",
        ...base
      };

    case "shimmer":
      return {
        background: active ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" : "none",
        backgroundSize: "200% 100%",
        animation: active ? "gs-shimmer 2s infinite" : "none",
        ...base
      };

    default:
      return base;
  }
}

export function getHoverStyles(type: string | undefined, hovered: boolean) {
  if (!type || type === "none") return {};

  switch (type) {
    case "scale":
      return {
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transitionProperty: "transform",
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease"
      };
    case "glow":
      return {
        boxShadow: hovered ? "0 0 15px var(--gs-gold)" : "none",
        transitionProperty: "box-shadow",
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease"
      };
    case "lift":
      return {
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transitionProperty: "transform",
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease"
      };
    default:
      return {};
  }
}

// Global CSS for keyframe animations (should be added to globals.css or a style tag)
export const ANIMATION_KEYFRAMES = `
  @keyframes gs-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes gs-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  @keyframes gs-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes gs-glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
`;
