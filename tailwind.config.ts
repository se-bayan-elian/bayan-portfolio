import type { Config } from "tailwindcss";

const config: Config = {
  // `dark:` follows the selected site theme (not the OS), for every dark-family theme.
  darkMode: [
    "variant",
    '&:is([data-theme="dark"] *, [data-theme="dracula"] *, [data-theme="nord"] *, [data-theme="payload"] *)',
  ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        arabic: [
          "var(--font-tajawal)",
          "var(--font-geist-sans)",
          "sans-serif",
        ],
        logo: [
          "var(--font-outfit)",
          "var(--font-geist-sans)",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
      },
      backgroundImage: {
        "gradient-cta": "var(--gradient-cta)",
      },
    },
  },
  plugins: [],
};

export default config;
