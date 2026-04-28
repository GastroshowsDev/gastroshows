"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PageTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [meltDuration, setMeltDuration] = useState(1500);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (loading) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setIsFadingOut(false);
      }, 400); // Fade out duration

      if (startRef.current) {
        const duration = Date.now() - startRef.current;
        // Keep a moving average of the last 3 load times for better prediction
        const history = JSON.parse(localStorage.getItem("gs_load_history") || "[]");
        history.push(duration);
        if (history.length > 3) history.shift();
        localStorage.setItem("gs_load_history", JSON.stringify(history));
        
        const avg = history.reduce((a: number, b: number) => a + b, 0) / history.length;
        localStorage.setItem("gs_predicted_load", Math.max(avg, 800).toString());
        
        startRef.current = null;
      }
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Find the anchor tag
      let target = e.target as HTMLElement;
      while (target && target.tagName !== "A") {
        target = target.parentElement as HTMLElement;
      }
      const anchor = target as HTMLAnchorElement;

      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.hash &&
        anchor.target !== "_blank" &&
        !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
      ) {
        // Only show for internal links that aren't the current URL
        const currentUrl = window.location.href.split("#")[0];
        const targetUrl = anchor.href.split("#")[0];
        
        if (currentUrl === targetUrl) return;

        const predicted = localStorage.getItem("gs_predicted_load");
        setMeltDuration(predicted ? parseInt(predicted) : 1200);
        setLoading(true);
        setIsFadingOut(false);
        startRef.current = Date.now();
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, []);

  if (!loading) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 999999,
      background: "rgba(5, 5, 5, 0.9)",
      backdropFilter: "blur(5px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: isFadingOut ? 0 : 1,
      transition: "opacity 0.4s ease",
      pointerEvents: "none"
    }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="candle-loader">
          <div className="flame"></div>
          <div className="candle" style={{ animationDuration: `${meltDuration}ms` }}></div>
          <div className="wax"></div>
        </div>
        <p style={{ 
          marginTop: "2rem", 
          color: "#daa520", 
          fontFamily: "var(--font-cormorant)", 
          fontSize: "1.2rem", 
          fontStyle: "italic",
          letterSpacing: "0.1em"
        }}>
          Preparando tu experiencia...
        </p>
      </div>

      <style jsx>{`
        .candle-loader {
          position: relative;
          width: 40px;
          height: 100px;
        }
        .flame {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          width: 15px;
          height: 30px;
          background: linear-gradient(to bottom, #daa520, #ff4500);
          border-radius: 50% 50% 20% 20%;
          filter: blur(1px);
          animation: flicker 0.1s infinite alternate;
          box-shadow: 0 0 20px rgba(218, 165, 32, 0.6);
        }
        .candle {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 100%;
          background: #f5f0e8;
          border-radius: 4px;
          transform-origin: bottom;
          animation: melt linear forwards;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .wax {
          position: absolute;
          bottom: -5px;
          left: -10px;
          width: 60px;
          height: 10px;
          background: #f5f0e8;
          border-radius: 50%;
          opacity: 0;
          animation: drip linear forwards;
          animation-duration: inherit;
        }

        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); opacity: 0.9; }
          100% { transform: translateX(-52%) scale(1.1); opacity: 1; }
        }

        @keyframes melt {
          0% { height: 100%; }
          95% { height: 10%; }
          100% { height: 10%; }
        }

        @keyframes drip {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.5; }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
