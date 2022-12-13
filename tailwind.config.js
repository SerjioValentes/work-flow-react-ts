/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: '#fff',
      error: '#f58383',
    },
    bg: {
      white: '#fff',
      red: '#f58383',
    },
    screens: {
      xs: '0',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
  },
  plugins: [],
}
