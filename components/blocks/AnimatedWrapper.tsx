"use client";

import { useState, useEffect, useRef } from "react";
import { getAnimationStyles, AnimationType } from "@/lib/blocks/animations";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  animation?: AnimationType | string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  parallaxSpeed?: number;
};

export function AnimatedWrapper({ children, animation, delay = 0, className, style, parallaxSpeed }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Element Parallax Logic (Foreground vs Background depth)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Maps scroll progress [0, 1] to a Y pixel offset.
  // Positive speed makes the element move faster (foreground), negative slower (background).
  const yOffset = useTransform(
    scrollYProgress, 
    [0, 1], 
    [(parallaxSpeed || 0) * 150, -(parallaxSpeed || 0) * 150]
  );

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

  if (parallaxSpeed) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          ...style,
          ...animStyles,
          y: yOffset,
          transitionDelay: `${delay}s`,
        }}
      >
        {children}
      </motion.div>
    );
  }

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
