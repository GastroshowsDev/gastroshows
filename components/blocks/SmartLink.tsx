"use client";

import { usePageActions } from "@/context/PageActionsContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isEditing?: boolean;
};

export function SmartLink({ href, children, className, style, onMouseEnter, onMouseLeave, isEditing }: Props) {
  const { openReservation, openGift, openVisit, isActionValid } = usePageActions();
  const [showWarning, setShowWarning] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    const normalizedHref = href?.toLowerCase().trim().replace("#", "");
    console.log("[SmartLink] Clicked:", { href, normalizedHref, isEditing });

    if (normalizedHref === "reservar" || normalizedHref === "reserbar") {
      e.preventDefault();
      openReservation();
      return;
    }
    if (normalizedHref === "regalar") {
      e.preventDefault();
      openGift();
      return;
    }
    if (normalizedHref === "visita") {
      e.preventDefault();
      openVisit();
      return;
    }
    if (normalizedHref === "eventos") {
      e.preventDefault();
      router.push("/eventos");
      return;
    }



    if (isEditing) {
      e.preventDefault();
      return;
    }
  };

  // Integrity Check: Show a visual warning in editing mode if the link is suspicious
  const normalizedAction = href?.toLowerCase().trim().replace("#", "");
  const isActionKeyword = ["reservar", "reserbar", "regalar", "visita"].includes(normalizedAction || "");
  const isValid = !href || isActionKeyword || isActionValid(href);

  return (
    <a
      href={isEditing ? undefined : (normalizedAction === "eventos" ? "/eventos" : (href || "#"))}

      onClick={handleClick}
      onMouseEnter={() => {
        onMouseEnter?.();
        if (isEditing && !isValid) setShowWarning(true);
      }}
      onMouseLeave={() => {
        onMouseLeave?.();
        setShowWarning(false);
      }}
      className={className}
      style={{
        ...style,
        position: "relative",
        outline: (isEditing && !isValid) ? "2px dashed #EF4444" : undefined,
      }}
    >
      {children}
      {isEditing && showWarning && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#EF4444",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "10px",
          whiteSpace: "nowrap",
          zIndex: 100,
          marginTop: "8px",
          pointerEvents: "none",
        }}>
          ⚠️ Enlace no configurado o inválido
        </div>
      )}
    </a>
  );
}
