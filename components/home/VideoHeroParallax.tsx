"use client";

import { useEffect, useRef, useState } from "react";

interface VideoHeroParallaxProps {
  videoSrc: string;
  children: React.ReactNode;
}

export function VideoHeroParallax({ videoSrc, children }: VideoHeroParallaxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // El vídeo está codificado con un keyframe por fotograma (-g 1),
    // así que el seek es suave. Para una fluidez total desacoplamos el
    // tiempo del vídeo del scroll: el scroll fija un objetivo y un loop
    // continuo interpola (lerp) el tiempo actual hacia ese objetivo.
    let targetTime = 0;
    let currentTime = 0;
    let rafId: number | null = null;

    const computeTarget = () => {
      const containerHeight = container.clientHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / containerHeight));

      if (video.duration > 0) {
        targetTime = progress * video.duration;
      }

      // El contenido se desvanece en la segunda mitad del scroll
      const opacity = progress > 0.4 ? 1 - (progress - 0.4) / 0.6 : 1;
      setContentOpacity(Math.max(0, opacity));
    };

    const loop = () => {
      // Interpolación suave hacia el objetivo (~0.06 por frame, más flotante)
      currentTime += (targetTime - currentTime) * 0.06;

      // Solo actualizar el vídeo si el cambio es perceptible
      if (Math.abs(currentTime - video.currentTime) > 0.005) {
        video.currentTime = currentTime;
      }

      // Detener el loop cuando ya estamos prácticamente en el objetivo
      if (Math.abs(targetTime - currentTime) > 0.002) {
        rafId = requestAnimationFrame(loop);
      } else {
        currentTime = targetTime;
        rafId = null;
      }
    };

    const startLoop = () => {
      if (rafId === null) rafId = requestAnimationFrame(loop);
    };

    const scrollHandler = () => {
      computeTarget();
      startLoop();
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    // Posicionar el frame inicial cuando el vídeo tenga metadatos
    video.addEventListener("loadedmetadata", scrollHandler);
    computeTarget();
    currentTime = targetTime;
    if (video.duration > 0) video.currentTime = currentTime;

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      video.removeEventListener("loadedmetadata", scrollHandler);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [videoSrc]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#050505",
      }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          zIndex: 1,
        }}
      />

      {/* Overlay Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.7) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content with Fade-out Effect */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: "900px",
          padding: "0 2rem",
          opacity: contentOpacity,
          transition: "opacity 0.15s ease-out",
          pointerEvents: "auto",
          zIndex: 10,
        }}
      >
        {children}
      </div>

      {/* Scroll Indicator */}
      {contentOpacity > 0.3 && (
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            opacity: Math.max(0, contentOpacity - 0.3),
            transition: "opacity 0.1s ease-out",
            animation: "bounce 2s infinite",
            zIndex: 20,
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "0.5rem",
              fontWeight: 700,
            }}
          >
            Desliza para explorar
          </p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gs-gold)"
            strokeWidth="2"
            style={{ margin: "0 auto", display: "block" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(8px);
          }
        }
      `}</style>
    </section>
  );
}
