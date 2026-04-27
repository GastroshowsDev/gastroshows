"use client";

import { useState, useEffect, useRef } from "react";
import { getAnimationStyles, AnimationType } from "@/lib/blocks/animations";

type Props = {
  children: React.ReactNode;
  animation?: AnimationType | string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function AnimatedWrapper({ children, animation, delay = 0, className, style }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animStyles = getAnimationStyles(animation, isVisible);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...animStyles,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
