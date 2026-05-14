export type Palette = {
  id: string;
  name: string;
  description: string;
  colors: {
    bg: string;
    bg2: string;
    text: string;
    accent: string;
    accentHover: string;
    muted: string;
    border: string;
    surface: string;
    heading: string;
  };
};

export const PALETTES: Palette[] = [
  {
    id: "organic-elegance",
    name: "Organic Elegance",
    description: "Tonos verdes oliva y mostaza-dorado. Sofisticado y natural.",
    colors: {
      bg: "#FDFBF7",
      bg2: "#F1F3EF",
      text: "#1C1F1A",
      accent: "#D4A316", // Mostaza elegante
      accentHover: "#B8860B", // Oro envejecido
      muted: "#78866B", // Oliva suave
      border: "rgba(120, 134, 107, 0.2)",
      surface: "#FFFFFF",
      heading: "#3D4836" // Verde bosque profundo
    }
  },
  {
    id: "nocturnal-clandestino",
    name: "Nocturnal Clandestino",
    description: "El alma de Gastroshows. Oscuro, misterioso y dorado.",
    colors: {
      bg: "#0A0A0A",
      bg2: "#111111",
      text: "#F5F0E8",
      accent: "#DAA520",
      accentHover: "#E8D5A8",
      muted: "#A8A49E",
      border: "rgba(200, 169, 110, 0.1)",
      surface: "#1A1A1A",
      heading: "#F5F0E8"
    }
  },
  {
    id: "sunset-gastro",
    name: "Sunset Gastro",
    description: "Calidez de atardecer con tonos terracota y crema.",
    colors: {
      bg: "#FEFAF6",
      bg2: "#F9EFE7",
      text: "#2D241E",
      accent: "#D35400",
      accentHover: "#E67E22",
      muted: "#8E735B",
      border: "rgba(211, 84, 0, 0.15)",
      surface: "#FFFFFF",
      heading: "#4A2311"
    }
  },
  {
    id: "oceanic-mist",
    name: "Oceanic Mist",
    description: "Frescura marina con azules profundos y gris piedra.",
    colors: {
      bg: "#F4F7F9",
      bg2: "#EBF0F3",
      text: "#1B262C",
      accent: "#0F4C75",
      accentHover: "#3282B8",
      muted: "#5A7A8E",
      border: "rgba(15, 76, 117, 0.15)",
      surface: "#FFFFFF",
      heading: "#0A2D42"
    }
  }
];
