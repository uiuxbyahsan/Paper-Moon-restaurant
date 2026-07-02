import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0B0B0B",
        cream: "#F3EFE6",
        "cream-dim": "#E7E1D2",
        charcoal: "#1A1A1A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      letterSpacing: {
        eyebrow: "0.35em",
        wide2: "0.18em",
      },
      maxWidth: {
        shell: "82rem",
      },
      keyframes: {
        "scroll-draw": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "40%": { transform: "scaleY(1)", transformOrigin: "top" },
          "60%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.12) translate3d(-1.5%,-1.5%,0)" },
        },
      },
      animation: {
        "scroll-draw": "scroll-draw 2.4s ease-in-out infinite",
        "ken-burns": "ken-burns 18s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
