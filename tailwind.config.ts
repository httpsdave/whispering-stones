import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graveyard: {
          dark: '#0f1419',
          night: '#1a1f2e',
          purple: '#2d1b3d',
          pink: '#ff1b8d',
          grass: '#2d5016',
        },
      },
      fontFamily: {
        pixel: ['monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
