/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif','Gill Sans MT','Caliberi','Eras Demi ITC' ], // Example of adding a custom font stack
      },
      fontSize: {
        '7xl': '5rem', // Example of adding a custom font size
      },
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