import { CommonStyles } from "@/lib/blocks/types";
import React from "react";

/**
 * Generates common CSS styles for any block.
 * Handles backgrounds, paddings, margins, and animations.
 */
export function getBlockBaseStyles(styles: CommonStyles = {}): React.CSSProperties {
  return {
    position: "relative",
    paddingTop: styles.paddingTop || "0",
    paddingBottom: styles.paddingBottom || "0",
    paddingLeft: styles.paddingLeft || "0",
    paddingRight: styles.paddingRight || "0",
    marginTop: styles.marginTop || "0",
    marginBottom: styles.marginBottom || "0",
    backgroundColor: styles.backgroundColor || "transparent",
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    minHeight: styles.minHeight || "auto",
    textAlign: styles.textAlign as any,
  };
}

/**
 * Generates the style object for a background image layer.
 */
export function getBackgroundImageStyles(imageUrl: string, styles: CommonStyles = {}): React.CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: styles.backgroundSize === "mirror" ? "contain" : (styles.backgroundSize || "cover"),
    backgroundPosition: styles.backgroundPosition || "center center",
    backgroundRepeat: "no-repeat",
    opacity: styles.opacity ?? 1,
    filter: styles.brightness ? `brightness(${styles.brightness})` : "none",
    zIndex: 0,
  };
}
