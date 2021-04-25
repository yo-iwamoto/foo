const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['/src/**/*.{ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: '#ff652f',
        text: '#fef0ea',
        back: '#fef0ea',
        accent: '#2ff065',
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