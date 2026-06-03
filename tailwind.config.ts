import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Anchor brand blue
        brand: {
          DEFAULT: "#1B75BB",
          50: "#EAF3FB",
          100: "#D2E5F5",
          200: "#A6CBEB",
          300: "#79B1E1",
          400: "#4D97D7",
          500: "#1B75BB",
          600: "#155E96",
          700: "#104872",
          800: "#0B324F",
          900: "#071F31",
        },
        // Deep editorial ink
        ink: {
          DEFAULT: "#0B1F33",
          soft: "#1C3148",
          muted: "#56697B",
        },
        // Warm paper backgrounds
        paper: {
          DEFAULT: "#F7F3EC",
          deep: "#EFE9DD",
          card: "#FBF9F4",
        },
        // Warm accent — used sparingly
        amber: {
          DEFAULT: "#C68A3E",
          soft: "#E2B877",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: "0.28em",
      },
      maxWidth: {
        page: "1240px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "draw-line": "draw-line 0.9s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
