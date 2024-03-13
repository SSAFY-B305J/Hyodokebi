/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7B52",
        secondary: "#FFAB87",
        silver: "#C0C0C0",
        lightsilver: "#D9D9D9"
      },
      height: {
        "1/10": "10%"

      }
    },
  },
  plugins: [],
};
