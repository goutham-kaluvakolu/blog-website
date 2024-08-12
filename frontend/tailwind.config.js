/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif']
      }
    },
    colors: {
      // Configure your color palette here
      'orange': '#FF9966',
      "loginbutoncolor":'#FEF1E5',
      'avator':"gray",
      'white':"#FFFFFF"
    }
  },
  plugins: [],
}