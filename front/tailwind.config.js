/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF7B52",
          hover: "#FF541F",
        },
        secondary: "#FFAB87",
        silver: "#C0C0C0",
        lightsilver: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
