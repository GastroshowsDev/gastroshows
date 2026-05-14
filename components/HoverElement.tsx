"use client";

import React from "react";

type Props = {
  as?: "div" | "button" | "a";
  children: React.ReactNode;
  style?: React.CSSProperties;
  hoverStyle?: (element: HTMLElement) => void;
  unhoverStyle?: (element: HTMLElement) => void;
  onClick?: () => void;
  [key: string]: any;
};

export function HoverElement({
  as: Component = "div",
  children,
  style = {},
  hoverStyle,
  unhoverStyle,
  onClick,
  ...props
}: Props) {
  const ref = React.useRef<HTMLElement>(null);

  return React.createElement(Component, {
    ref,
    style,
    onClick,
    onMouseEnter: () => {
      if (ref.current && hoverStyle) hoverStyle(ref.current);
    },
    onMouseLeave: () => {
      if (ref.current && unhoverStyle) unhoverStyle(ref.current);
    },
    ...props,
    children,
  } as any);
}
