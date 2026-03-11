import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1e293b",
        "navy-dark": "#0f172a",
        sand: "#faf8f5",
        "sand-warm": "#f5f2ed",
        charcoal: "#374151",
        "charcoal-light": "#6b7280",
        "border-light": "#e5e7eb",
        success: "#22c55e",
        "teal-accent": "#5b9b8f",
        "success-muted": "#15803d",
        "warning-muted": "#b45309",
        "error-muted": "#b91c1c",
        champagne: "#f4efe8",
        "gold-accent": "#C8A96A",
      },
      fontFamily: {
        "serif-display": ["var(--font-eb-garamond)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(30, 41, 59, 0.06)",
        "soft-lg": "0 4px 20px rgba(30, 41, 59, 0.08)",
        "soft-xl": "0 8px 32px rgba(30, 41, 59, 0.1)",
      },
      borderRadius: {
        card: "12px",
        button: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
