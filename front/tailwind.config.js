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
        disabled: "#B9B9B9",
      },
      weight: {
        "1/10": "10%",
        "1/20": "5%",
        "1/15": "6.6%",
        "3/10": "30%",
      },
      height: {
        "1/10": "10%",
        "1/20": "5%",
        "1/15": "6.6%",
        "3/10": "30%",
      },
    },
  },
  plugins: [],
};
