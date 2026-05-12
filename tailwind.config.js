import type { Config } from "vite";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-primary': 'var(--border-primary)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
