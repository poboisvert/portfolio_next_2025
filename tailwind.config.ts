import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  mode: "jit",
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "dark",
    "light",
    "text-js",
    "text-green",
    "text-neon-blue",
    "border-green",
    "border-neon-blue",
    "border-greenLighter",
    "text-tsc",
    "text-react",
    "text-next",
    "text-node",
    "text-css",
    "text-sass",
    "text-tailwind",
    "text-python",
    "text-golang",
    { pattern: /bg-./ },
    { pattern: /text-./ },
    { pattern: /border-./ },
  ],
  darkMode: "class",
  theme: {
    colors: {
      white: colors.white,
      gray: colors.slate,
      yellow: colors.amber,
      midnight: "#070919",
      green: "#00cc99",
      greenLighter: "#00e6b8",
      js: "#f2Dd4f",
      tsc: "#007acc",
      react: "#61DBFB",
      next: "#a8b9c0",
      node: "#3C873A",
      css: "#2965F1",
      sass: "#CC6699",
      tailwind: "#06B6D4",
      python: "#F7DC6F",
      golang: "#00ADD8",
      redis: "#b31523",
      "neon-blue": "#87A7FF",
    },
    fontFamily: {
      sans: ["Lato", ...defaultTheme.fontFamily.sans],
    },
    screens: {
      xsm: "460px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
export default config;
