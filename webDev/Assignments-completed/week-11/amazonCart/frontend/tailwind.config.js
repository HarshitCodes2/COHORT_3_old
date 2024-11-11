/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        blue: {
          100: "#1E7FCB",
          900: "#121826",
        },
        yellow: {
          500: "#f8c50f",
        }
      }
    },
  },
  plugins: [],
}

