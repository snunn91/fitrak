/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn .5s ease-in-out",
        fadeOut: "fadeOut .5s ease-in-out",
      },
      backgroundImage: {
        bodybuildingIcon: "url('../src/assets/icons/bodybuilding-icon.png')",
        strengthIcon: "url('../src/assets/icons/strength-icon.png')",
        powerbuildingIcon: "url('../src/assets/icons/powerbuilding-icon.png')",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#881337",
              foreground: "#881337",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
};
