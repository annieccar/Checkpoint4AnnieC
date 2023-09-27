/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#3C1518",
      red: "#69140E",
      green: "#BCBD8B",
      gray: "#808080",
    },
    extend: {
      fontFamily: {
        primary: "arvo",
        script: "carattere",
      },
    },
  },
  plugins: [],
};
