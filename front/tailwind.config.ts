import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#c485ee",
      secondary: "#f4aeb2",
      accent: "#f7bafc",
      text: "#06010E",
      background: "#F2F2F2",
      darkNavy: "#444E89",
      vividPurple: "#A56DF2",
      blueishPurple: "#ADB1F1",
      lightPurple: "#E1D5F2",
      vividPink: "#FADCFF",
      goldenPurple: "#F9F0FF",
      navy: "#8D91B9",
      darkPurple: "#B352B9",
      dimmedPurple: "#ECEBFF",
      lighterPurple: "#EEDAFF",
      lightPink: "#F7E7E8"
    }
  },
  plugins: [],
};
export default config;
