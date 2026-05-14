"use client";

import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  hoverStyle?: (element: HTMLElement) => void;
  unhoverStyle?: (element: HTMLElement) => void;
};

export function InteractiveLink({
  href,
  children,
  style = {},
  hoverStyle,
  unhoverStyle,
}: Props) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={href}
      style={style}
      onMouseEnter={() => {
        if (ref.current && hoverStyle) hoverStyle(ref.current);
      }}
      onMouseLeave={() => {
        if (ref.current && unhoverStyle) unhoverStyle(ref.current);
      }}
    >
      {children}
    </Link>
  );
}
