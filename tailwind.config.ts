import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "midnight": "#0f172a",
        "charcoal": "#111827",
        "teal-glow": "#2dd4bf",
        "amber-glow": "#fbbf24",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.1), transparent 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;