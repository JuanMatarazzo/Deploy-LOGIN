/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors:{
        'custom-purple': '#6D28D9'
      }, 
      boxShadow: {
        'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 2px 10px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}

