import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
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
          "0%": { fontSize: "13px" },
          "100%": { fontSize: "11px" },
        },
        fontSizeUp: {
          "0%": { fontSize: "11px" },
          "100%": { fontSize: "13px" },
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
        expanded: {
          "0%": {
            maxHeigth: "0",
          },
          "100%": {
            maxHeigth: "100vh",
          },
        },
        translateToRight: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        translateToLeft: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        growToLeft: {
          "0%": {
            width: "100%",
          },
          "100%": {
            width: "0",
          },
        },
        growToRigth: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "100%",
          },
        },
        easeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        easeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        paddingOff: {
          "0": {
            padding: "24px",
          },
          "100%": {
            padding: "0",
          },
        },
        paddingOn: {
          "0": {
            padding: "0",
          },
          "100%": {
            padding: "24px",
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
        expanded: "expanded 2.5s ease-out forwards",
        translateToRight: "translateToRight 500ms ease-out forwards",
        translateToLeft: "translateToLeft 500ms ease-out forwards",
        growToRigth: "growToRigth 500ms ease-out forwards",
        growToLeft: "growToLeft 500ms ease-in forwards",
        easeOut: "easeOut 500ms ease-out forwards",
        easeIn: "easeIn 500ms ease-out forwards",
        paddingOn: "paddingOn 500ms ease-in forwards",
        paddingOff: "paddingOff 500ms ease-in forwards",
        // multiple animation
        menuOpen:
          "growToRigth 500ms ease-out forwards, paddingOn 500ms ease-in forwards",
        menuClose:
          "growToLeft 500ms ease-out forwards, paddingOff 500ms ease-out forwards",
        labelFocus:
          "fontWeightDown 0.5s ease-out forwards, fontSizeDown 0.5s ease-out forwards",
        labelBlur:
          "fontWeightUp 0.5s ease-out forwards, fontSizeUp 0.5s ease-out forwards",

        inputFocus: "paddingTopUp 0.5s ease-out forwards",
        inputBlur: "paddingTopDown 0.5s ease-out forwards",
      },
      screens: {
        print: { raw: "print" },
        // => @media  print { ... }
      },
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
export default config;
