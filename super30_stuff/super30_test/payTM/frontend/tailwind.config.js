/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        grey:{
          200: "#ececec", // borders
          800: "#6e707b", // grey text
          900: "#7f7f7f"  // bg
        },
        black:{
          100: "#000000", // heading
          500: "#212121",
          600: "#2a2a21",
          800: "#18181a", // button
          900: "#171717"  // label
        },
        green:{
          500: "#23c45e",
        },
      }
    },
  },
  plugins: [],
}

