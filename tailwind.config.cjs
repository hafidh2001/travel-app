/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      fontFamily: {
        Inter: ["Inter-Regular", "sans-serif"],
        Montserrat: ["Montserrat-Regular", "sans-serif"],
      },
      colors: {
        "blue-primary": "#2f80ed",
      },
    },
  },
  plugins: [],
};
