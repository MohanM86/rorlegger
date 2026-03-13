import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)",     "system-ui", "sans-serif"],
        sans:    ["var(--font-dm-sans)",  "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)","ui-monospace", "monospace"],
      },
      colors: {
        // Primary: Deep Teal-Navy  (rørlegger: vann, profesjonalitet)
        primary: {
          50:  "#eff9ff",
          100: "#d8f1ff",
          200: "#b9e8ff",
          300: "#87d9ff",
          400: "#4dc0fc",
          500: "#20a3f5",  // Kjerneblå – teal-rettet
          600: "#0b84dc",
          700: "#0a6ab8",
          800: "#0e5896",
          900: "#124a7c",
          950: "#0c2f52",
        },
        // Secondary: Deep Navy (tekst, headings)
        secondary: {
          50:  "#f4f6fb",
          100: "#e8ecf5",
          200: "#ccd6ea",
          300: "#a2b4d6",
          400: "#718dbc",
          500: "#4e6ea3",
          600: "#3c5588",
          700: "#31456f",
          800: "#2b3b5e",
          900: "#28344f",
          950: "#1a2235",
        },
        // Accent: Clean Cyan-teal (vann, action)
        accent: {
          50:  "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",  // Cyan
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        success: { 50: "#f0fdf4", 500: "#22c55e", 600: "#16a34a", 700: "#15803d" },
        warning: { 50: "#fffbeb", 500: "#f59e0b", 600: "#d97706" },
        error:   { 50: "#fef2f2", 100: "#fee2e2", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c" },
        neutral: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b" },
      },
      fontSize: {
        "caption":     ["0.75rem",  { lineHeight: "1rem",    letterSpacing: "0.01em" }],
        "label":       ["0.8125rem",{ lineHeight: "1.25rem", letterSpacing: "0.005em" }],
        "body-sm":     ["0.875rem", { lineHeight: "1.375rem" }],
        "body-md":     ["1rem",     { lineHeight: "1.625rem" }],
        "body-lg":     ["1.125rem", { lineHeight: "1.75rem" }],
        "heading-sm":  ["1.125rem", { lineHeight: "1.5rem",   letterSpacing: "-0.01em",  fontWeight: "600" }],
        "heading-md":  ["1.25rem",  { lineHeight: "1.625rem", letterSpacing: "-0.015em", fontWeight: "700" }],
        "heading-lg":  ["1.5rem",   { lineHeight: "1.875rem", letterSpacing: "-0.02em",  fontWeight: "700" }],
        "heading-xl":  ["1.875rem", { lineHeight: "2.25rem",  letterSpacing: "-0.025em", fontWeight: "800" }],
        "display-lg":  ["2.25rem",  { lineHeight: "2.625rem", letterSpacing: "-0.03em",  fontWeight: "800" }],
        "display-xl":  ["2.75rem",  { lineHeight: "3.125rem", letterSpacing: "-0.035em", fontWeight: "900" }],
        "price-lg":    ["1.5rem",   { lineHeight: "2rem",     letterSpacing: "-0.02em",  fontWeight: "700" }],
        "price-xl":    ["2rem",     { lineHeight: "2.5rem",   letterSpacing: "-0.03em",  fontWeight: "800" }],
        "cta-lg":      ["1.0625rem",{ lineHeight: "1.5rem",   letterSpacing: "-0.005em", fontWeight: "600" }],
      },
      borderRadius: {
        "6": "0.375rem", "8": "0.5rem", "10": "0.625rem",
        "12": "0.75rem", "16": "1rem",  "20": "1.25rem", "24": "1.5rem",
      },
      boxShadow: {
        "card-sm":  "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card":     "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        "card-lg":  "0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)",
        "card-xl":  "0 16px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
        "primary":  "0 4px 14px rgba(32,163,245,0.30)",
        "primary-lg":"0 8px 24px rgba(32,163,245,0.35)",
      },
      keyframes: {
        "fade-in":  { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "slide-up": { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "fade-in":  "fade-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
