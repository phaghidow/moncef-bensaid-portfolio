import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS v2.0 — Portfolio Moncef Bensaid
 * Concept : "Precision Engineer" — minimalisme RICHE (ref. Apple/Vercel)
 * 1 accent teal · gris chauds · glow radial discret · double hairline.
 * Couleurs via variables CSS (globals.css) → next-themes class strategy.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "code-bg": "var(--code-bg)",
      },

      fontFamily: {
        sans: ["var(--font-newsreader)", "Georgia", "serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },

      letterSpacing: {
        label: "0.15em", // labels mono uppercase
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.333" }],
        sm: ["0.875rem", { lineHeight: "1.429" }],
        base: ["1rem", { lineHeight: "1.5" }],
        lg: ["1.125rem", { lineHeight: "1.556" }],
        "2xl": ["1.5rem", { lineHeight: "1.333" }],
        "4xl": ["2.25rem", { lineHeight: "1.111" }],
        "6xl": ["3.75rem", { lineHeight: "1.067" }],   // H1 hero desktop
        "7xl": ["4.5rem", { lineHeight: "1.05" }],     // titres case study
        // Numéros géants gérés par l'utilitaire .index-number (clamp)
      },

      maxWidth: {
        container: "71.25rem", // 1140px
        prose: "65ch",
      },

      borderColor: { DEFAULT: "var(--border)" },

      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
        // La profondeur vient de la double hairline (.surface), pas des ombres
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        theme: "200ms",
        fast: "150ms",
      },

      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
