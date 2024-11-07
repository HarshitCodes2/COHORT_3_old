/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          800: "#002a5a",
          300: "#173f6a",
          200: "#395a80",
          100: "#7f95ac",
        },
        teal: "#3cd8ca",
      }
    },
  },
  plugins: [],
}

