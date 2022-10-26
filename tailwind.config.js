/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/hn-shorts/src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      // // Light Palette: https://coolors.co/palette/dad7cd-a3b18a-588157-3a5a40-344e41
      // 'timberwolf': 'hsl(46, 15%, 83%)',
      // 'laurelgreen': 'hsl(82, 20%, 62%)',
      // 'ferngreen': 'hsl(119, 19%, 42%)',
      // 'huntergreen': 'hsl(131, 22%, 29%)',
      // 'brunswickgreen': 'hsl(150, 20%, 25%)',
      // // Dark Palette: https://coolors.co/palette/003049-d62828-f77f00-fcbf49-eae2b7
      // 'prussianblue': 'hsl(201, 100%, 14%)',
      // 'maximumred': 'hsl(0, 69%, 50%)',
      // 'orange': 'hsl(31, 100%, 48%)',
      // 'maximumyellowred': 'hsl(40, 97%, 64%)',
      // 'lemonmeringue': 'hsl(51, 55%, 82%)',
    },
    extend: {
      
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],        
      },
    },
  },
  plugins: [],
}
