import { FichajeClient } from "./FichajeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Control Horario - Gastroshows",
  robots: "noindex, nofollow",
};

export default function FichajePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#F5F0E8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}>
      <FichajeClient />
    </div>
  );
}
