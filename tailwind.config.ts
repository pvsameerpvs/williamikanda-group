import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#09A0C7",
          50: "#E6F7FC",
          100: "#C0ECF7",
          200: "#9BE1F2",
          300: "#75D6ED",
          400: "#4FCBE8",
          500: "#29C0E3",
          600: "#09A0C7",
          700: "#077BA0",
          800: "#055778",
          900: "#033451"
        },
        gold: {
          DEFAULT: "#D4AF37"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)"
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    },
  },
  plugins: [],
};
export default config;