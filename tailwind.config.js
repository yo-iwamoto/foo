const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{ts,tsx,js,jsx}'],
  darkMode: false,
  variants: {
    extend: {
      translate: ['active'],
    },
  },
  theme: {
    extend: {
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
        '19/20': '95%',
        '1/20': '5%',
        '1/7': '14.2%',
        '6/7': '85.8%',
      },
      inset: {
        '1/10': '10%',
        '1/6': '16.6%',
      },
      minHeight: {
        '1/2': '50%',
        32: '8rem',
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
