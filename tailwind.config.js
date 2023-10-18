/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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

    extend: {},
    plugins: [],
  }

}