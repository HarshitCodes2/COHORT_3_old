/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        friskay: {
          bgc: "#FFFBF3",
          pc: "#FFA800",
          sc: "#E89058",
        },
      },
      font: {
        inter: ["Inter var"],
      },
      margin: {
        page_x: "120px",
        page_y: "75px"
      },
      height: {
        split: "30px",
        logo: "43px",
      },
    },
  },
  plugins: [],
};
