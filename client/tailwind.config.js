/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1100px" },
      lg: { max: "900px" },
      md: { max: "500px" },
    },
    extend: {
      colors: {
        colorPrimary: "#20212c",
        colorPrimaryLight: "#2b2c37",
        colorPrimaryLight2: "#3e3f4e",
        colorNeutral: "#fff",
        colorNeutral2: "rgba(255, 255, 255, 0.25)",

        colorpurple: "#635fc7",
        colorLightPurple: "#a8a4ff",
        colorRed: " #ea5555",
        colorLightRed: "#ff9898",
        colorMediumGray: "#828fa3",
        colorLightGray: "#f4f7fd",
      },
    },
  },
  plugins: [],
};

// html.dark-theme {
//   --color-main-bg: #20212c;
//   --color-secondary-bg: #2b2c37;
//   --color-headings: #fff;
//   --color-light-lines: #3e3f4e;
//   --color-very-light-purple: #fff;

//   --color-placeholder: rgba(255, 255, 255, 0.25);
// }
