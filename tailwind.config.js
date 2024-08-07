/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      scale: {
        '200':'2'
      },
      width: {
        '66': '16.5rem', // 16.5rem equals 264px
        '30': '7.5rem',
        '53': '13.25rem',
      },
      margin: {
        '-15': '-3.75rem', // 3.75rem equals 60px
      },
    },
  },
  variants: {
    extend: {
      display: ['print'],
      visibility: ['print'],
      backgroundColor: ['print'],
      textColor: ['print'],
      borderColor: ['print'],
    },
  },
  plugins: [],
}