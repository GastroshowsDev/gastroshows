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
  | "glitch"
  | "vortex"
  | "celestial"
  | "swing"
  | "jello"
  | "unfold"
  | "zoom-spin"
  | "skew-reveal"
  | "letter-spacing"
  | "tilt-3d"
  | "focus-in";


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

    case "vortex":
      return {
        ...base,
        transform: active ? "scale(1) rotate(0)" : "scale(0) rotate(720deg)",
        filter: active ? "blur(0)" : "blur(20px)",
        transitionDuration: "1.2s"
      };

    case "celestial":
      return {
        ...base,
        animation: active ? "gs-celestial 4s linear infinite" : "none",
        textShadow: active ? "0 0 20px rgba(200,169,110,0.4)" : "none"
      };

    case "swing":
      return {
        ...base,
        transformOrigin: "top center",
        transform: active ? "rotate(0)" : "rotate(-90deg)",
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      };

    case "jello":
      return {
        ...base,
        animation: active ? "gs-jello 0.9s both" : "none"
      };

    case "unfold":
      return {
        ...base,
        transformOrigin: "top",
        transform: active ? "rotateX(0)" : "rotateX(-90deg)",
        perspective: "1000px"
      };

    case "zoom-spin":
      return {
        ...base,
        transform: active ? "scale(1) rotate(0)" : "scale(3) rotate(-180deg)",
        filter: active ? "opacity(1)" : "opacity(0)",
        transitionDuration: "1s"
      };

    case "skew-reveal":
      return {
        ...base,
        transform: active ? "skew(0) translateX(0)" : "skew(-20deg) translateX(-50px)",
        clipPath: active ? "inset(0 0 0 0)" : "inset(0 0 0 100%)"
      };

    case "letter-spacing":
      return {
        ...base,
        letterSpacing: active ? "normal" : "1em",
        filter: active ? "blur(0)" : "blur(5px)"
      };

    case "tilt-3d":
      return {
        ...base,
        transform: active ? "perspective(1000px) rotateX(0) rotateY(0)" : "perspective(1000px) rotateX(45deg) rotateY(-45deg)",
      };

    case "focus-in":
      return {
        ...base,
        filter: active ? "blur(0) brightness(1)" : "blur(20px) brightness(2)",
        letterSpacing: active ? "0px" : "-10px",
        transform: active ? "scale(1)" : "scale(1.2)"
      };


    case "shimmer":
      return {
        backgroundImage: active ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" : "none",
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
  @keyframes gs-celestial {
    0% { filter: hue-rotate(0deg) brightness(1); }
    50% { filter: hue-rotate(15deg) brightness(1.2); }
    100% { filter: hue-rotate(0deg) brightness(1); }
  }
  @keyframes gs-jello {
    11.1% { transform: none; }
    22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }
    33.3% { transform: skewX(6.25deg) skewY(6.25deg); }
    44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }
    55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }
    66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }
    77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); }
    88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }
    100% { transform: none; }
  }
`;

