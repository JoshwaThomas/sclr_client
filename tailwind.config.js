/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      scale: {
        '200':'2'
      }
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