/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xl: "1440px",
      lg: "1160px",
      md: "769px",
      sm: "500px",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
