/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'border': 'border,border-radius,box-shadow,background-color',
      },
      boxShadow: {
        'stat': '0 0 30px -15px rgba(0, 0, 0, 0.5)',
      },
      fontSize: {
        'slidetitle': ['3.6rem', {
          lineHeight: '4rem',
          letterSpacing: '-0.01em',
          fontWeight: '600',
  
  
        }],
        'slideparagraph': ['1.3rem', {
          lineHeight: '2.25rem',
          letterSpacing: '-0.02em',
          fontWeight: '400',
        }],
  
      },
    },
    plugins: [],
  }

})