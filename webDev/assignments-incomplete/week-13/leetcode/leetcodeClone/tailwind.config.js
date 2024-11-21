/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leetcode : {
          black : "#1a1a1a",
          darkgrey: "#262626",
          grey: "#333333",
          lightgrey: "#434343",
          white: "#f5f5f5"
        }
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 16',
        'span-14': 'span 14 / span 16',
        'span-15': 'span 15 / span 16',
        'span-16': 'span 16 / span 16',
      }
    },
  },
  plugins: [],
}