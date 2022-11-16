/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/hn-shorts/src/**/*.{html,ts}",
  ],
  theme: {    
    extend: {      
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],        
      },
      backdropBlur: {
        xs: '1px',
      }
    },
  },
  plugins: [],
}
