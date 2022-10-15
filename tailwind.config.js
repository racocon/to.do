/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#1C1E21",

      primary: "#005FCC",
      secondary: "#99C8FF",

      "light-gray": "#ECECEC",

      mute: "#7DD4fC",

      success: "#86B300",
      alert: "#FFAA33",
      warning: "#B75301",
      accent: "#A37ACC",

      "success-dark": "#8DC891",
      "alert-dark": "#FAC863",
      "warning-dark": "#FC929E",
      "accent-dark": "#C5A5C5",
    },
    extend: {},
  },
  plugins: [],
};
