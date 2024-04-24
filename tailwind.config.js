/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        Vazirmatn: "Vazirmatn",
      },
      container: {
        center: true,
      },
      colors: {
        "bg-dark": "#18212f",
      },
    },
  },
  plugins: [],
};
