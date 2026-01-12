/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class", // ✅ Enable dark mode via class
  theme: {
    extend: {
      colors: {
        card: {
          30: "rgba(31, 41, 55, 0.3)", // bg-card-30
          50: "rgba(31, 41, 55, 0.5)", // bg-card-50
          60: "rgba(31, 41, 55, 0.6)", // bg-card-60
        },
        border: {
          30: "rgba(107, 114, 128, 0.3)", // border-border-30
          60: "rgba(107, 114, 128, 0.6)", // border-border-60
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // ✅ add dark theme
    darkTheme: "dark",          // 👈 default dark theme class
  },
};
