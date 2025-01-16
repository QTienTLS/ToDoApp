/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'box1': 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        'box2': 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        'box3': 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
        'box4': 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}