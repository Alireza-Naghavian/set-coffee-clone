import type { Config } from "tailwindcss";
type AddVariant = {
  addVariant: any;
};
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: `640px`,
      md: `768px`,
      lg: `1024px`,
      xl: `1280px`,
      "2xl": `1366px`,
    },
    extend: {
      colors: {
        main: "#34180E",
        main_brown: "#711D1C",
        main_green: "#008979",
        main_green_dark: "#114639",
        dark_shade: "#242424",
        mute: "#777777",
        goldColor:"#FFCE00"
      },
      fontFamily: {
        Dana: "Dana Bold",
        Shabnam: "Shabnam",
        Shabnam_M: "Shabnam Medium",
        Shabnam_B: "Shabnam Bold",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      container: {
        center: true,
        padding: {
          default: "120px",
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }: AddVariant) {
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
    },
  ],
};
export default config;
