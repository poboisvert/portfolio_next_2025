import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
    {
      pattern: /bg-(red|green|blue|purple)-(100|200|300|500|700|800)/,
      variants: ["lg", "hover", "focus", "lg:hover"],
    },
  ],
  darkMode: "class",
  theme: {
    colors: {
      white: colors.white,
      gray: colors.slate,
      lightgray: "#f8f8f8",
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
    transitionDuration: {
      "2000": "2000ms",
      "200": "200ms",
    },
    variants: {
      opacity: ["responsive", "hover", "focus", "disabled"],
      backgroundColor: ["responsive", "hover", "focus", "disabled"],
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
