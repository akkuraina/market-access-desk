import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          white: "#FFFFFF",
          offwhite: "#FAF7F0",
          card: "#FFFFFF",
          "card-alt": "#F4F2EC",
          orange: "#FF4D1C",
          border: "rgba(10, 10, 10, 0.08)",
          muted: "#52525B",
        },
        "tradepe-orange": "#FF4D1C",
        "mad-green": {
          DEFAULT: "#0A0A0A",
          light: "#27272A",
        },
        "mad-gold": {
          DEFAULT: "#C9A227",
          light: "#E0BE4D",
        },
        "mad-cream": {
          DEFAULT: "#FAF7F0",
          alt: "#F4F2EC",
        },
        "mad-ink": "#0A0A0A",
        "mad-slate": "#52525B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Fraunces", "serif"],
        "italic-accent": ["var(--font-instrument)", "var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "mono-data": ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(10, 10, 10, 0.04), 0 1px 2px -1px rgba(10, 10, 10, 0.04)",
        card: "0 4px 20px -2px rgba(10, 10, 10, 0.06)",
        orange: "0 0 30px -5px rgba(255, 77, 28, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;

