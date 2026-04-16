import type { Config } from "vite";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000", // Absolute Black
        surface: "#0A0A0A",    // Deep gray surface
        "text-primary": "#FFFFFF", // Pure White
        "text-secondary": "#A3A3A3", // Muted Gray
        accent: "#FFFFFF",     // Monochrome White accent
        "accent-secondary": "#1A1A1A", // Dark Indigo/Gray
      },
      fontFamily: {
        sans: ["Montserrat", "Inter", "sans-serif"], // Header & Brand
        body: ["Inter", '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"], // Content & Compact text
        display: ["Syne", "sans-serif"], // Experimental Headlines
        mono: ["Space Grotesk", "monospace"], // Technical Details
      },
    },
  },
  plugins: [],
} satisfies Config;
