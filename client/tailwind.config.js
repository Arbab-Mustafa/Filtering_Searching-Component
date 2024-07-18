/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "steel-blue": "#408dbc",
        gold: "#cfc200",
        "slate-grey": "#667085",
        "dark-slate-grey-2": "#414141",
        black: "#101828",
        white: "#ffffff",
        "dark-slate-grey": "rgba(64, 70, 83, .8)",
        "brand-blue": "#408dbc",
        "brand-yellow": "#e5e194",
        "brand-black": "#131f2f",
        "brand-turquoise": "#23a9fc",
        "brand-light-grey": "#cdcccc",
        customBlue: "rgb(64, 141, 188)",
      },
      maxWidth: {
        "1320px": "1320px",
      },
      height: {
        "413.59px": "413.59px",
      },
    },
  },
  plugins: [],
};
