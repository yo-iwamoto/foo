const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{ts,tsx,js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        200: '50rem',
      },
      colors: {
        main: '#cd5954',
        text: '#fef0ea',
        back: '#fef0ea',
        accent: '#ffff89',
      },
      fontFamily: {
        main: ['My Galano Grotesque', 'sans-serif'],
      },
      width: {
        14: '3.5rem',
        '19/20': '95%',
        '1/20': '5%',
        '1/7': '14.2%',
        '6/7': '85.8%',
      },
      height: {
        26: '6.5rem',
      },
      inset: {
        '1/10': '10%',
        '1/6': '16.6%',
      },
      minHeight: {
        '1/2': '50%',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        auto: 'auto',
      },
      minWidth: {
        24: '6rem',
        28: '7rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
