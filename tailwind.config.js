const colors = require('tailwindcss/colors');

/**
 * @see https://tailwindcss.com/docs/customizing-colors
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      gray: '#dedfe2',
    },
  },
};
