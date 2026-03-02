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
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
