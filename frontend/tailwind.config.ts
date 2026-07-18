import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          dark: "#4338CA",
          light: "#EEF2FF",
        },
        secondary: {
          DEFAULT: "#F59E0B",
          dark: "#D97706",
          light: "#FEF3C7",
        },
        background: {
          light: "#FFFFFF",
          dark: "#0F172A",
        },
        surface: {
          light: "#F8FAFC",
          dark: "#111827",
        },
        card: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
        text: {
          light: "#0F172A",
          muted: "#64748B",
          dark: "#F8FAFC",
          darkMuted: "#94A3B8",
        },
        border: {
          light: "#E2E8F0",
          dark: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'Courier New'", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.05)",
        card: "0 1px 3px rgba(0,0,0,0.08)",
        modal: "0 8px 32px rgba(0,0,0,0.18)",
        navbar: "0 1px 2px rgba(0,0,0,0.04)",
      },
      transitionDuration: {
        fast: "100ms",
        normal: "150ms",
        slow: "250ms",
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "slide-down": "slide-down 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "bar-pulse": "bar-pulse 1.1s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-down": {
          "0%": { transform: "translateY(-0.625rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bar-pulse": {
          "0%, 100%": { transform: "scaleY(0.2)" },
          "50%": { transform: "scaleY(1)" },
        },
        blink: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
      },
    },
  },
  plugins: [],
};

export default config;
