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
        "mad-green": {
          DEFAULT: "#0E4D3B",
          light: "#1B6B52",
        },
        "mad-gold": {
          DEFAULT: "#C9A227",
          light: "#E0BE4D",
        },
        "mad-cream": {
          DEFAULT: "#FAF7F0",
          alt: "#F1ECDD",
        },
        "mad-ink": "#0F1512",
        "mad-slate": "#5C6B64",
        "tradepe-orange": "#FF4D1C",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-ibm-plex-sans)", "IBM Plex Sans", "sans-serif"],
        "mono-data": ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(15, 21, 18, 0.05), 0 1px 2px -1px rgba(15, 21, 18, 0.05)",
        card: "0 4px 20px -2px rgba(14, 77, 59, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
