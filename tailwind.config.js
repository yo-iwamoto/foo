const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{ts,tsx,js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: '#ff652f',
        text: '#fef0ea',
        back: '#fef0ea',
        accent: '#ff2f30',
      },
      fontFamily: {
        'main': ['My Galano Grotesque', 'sans-serif']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}