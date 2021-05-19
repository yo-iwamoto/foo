const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{ts,tsx,js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: '#cd5954',
        text: '#fef0ea',
        back: '#fef0ea',
        accent: '#ffff89'
      },
      fontFamily: {
        'main': ['My Galano Grotesque', 'sans-serif']
      },
      inset: {
        '1/10': '10%',
        '1/6': '16.6%',
      },
      minHeight: {
        '3/5': '60%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}