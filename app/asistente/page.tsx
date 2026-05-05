import { AiAssistantChat } from "@/components/AiAssistantChat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asistente IA - GastroShows",
  robots: "noindex",
};

export default function AsistentePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--gs-bg)",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px", height: "600px" }}>
        <AiAssistantChat />
      </div>
    </div>
  );
}
