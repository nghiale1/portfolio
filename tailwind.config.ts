import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        ink2: "#101012",
        paper: "#f2efe6",
        muted: "#9b9b93",
        faint: "#6a6a64",
        lime: "#c6f24e",
        food: "#f0b066",
        fashion: "#e878aa",
        home: "#6ed6c4",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
    },
  },
  plugins: [],
};

export default config;
