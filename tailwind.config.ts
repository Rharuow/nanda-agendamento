import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fontSizeDown: {
          "0%": { fontSize: "16px" },
          "100%": { fontSize: "11px" },
        },
        fontSizeUp: {
          "0%": { fontSize: "11px" },
          "100%": { fontSize: "16px" },
        },
        fontWeightDown: {
          "0%": { fontWeight: "bold" },
          "100%": { fontWeight: "normal" },
        },
        fontWeightUp: {
          "0%": { fontWeight: "normal" },
          "100%": { fontWeight: "bold" },
        },
        paddingTopUp: {
          "0%": { paddingTop: "0px" },
          "100%": { paddingTop: "12px" },
        },
        paddingTopDown: {
          "0%": { paddingTop: "12px" },
          "100%": { paddingTop: "0px" },
        },
        borderRadiusBottomUp: {
          "0%": {
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          },
          "100%": {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          },
        },
        borderRadiusBottomDown: {
          "0%": {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          },
          "100%": {
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          },
        },
      },
      animation: {
        fontSizeDown: "fontSizeDown 0.5s ease-out forwards",
        fontSizeUp: "fontSizeUp 0.5s ease-out forwards",
        fontWeightDown: "fontWeightDown 0.5s ease-out forwards",
        fontWeightUp: "fontWeightUp 0.5s ease-out forwards",
        paddingTopDown: "paddingTopDown 0.5s ease-out forwards",
        paddingTopUp: "paddingTopUp 0.5s ease-out forwards",

        // multiple animation
        labelFocus:
          "fontWeightDown 0.5s ease-out forwards, fontSizeDown 0.5s ease-out forwards",
        labelBlur:
          "fontWeightUp 0.5s ease-out forwards, fontSizeUp 0.5s ease-out forwards",

        inputFocus: "paddingTopUp 0.5s ease-out forwards",
        inputBlur: "paddingTopDown 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
