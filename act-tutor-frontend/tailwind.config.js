/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',
        secondary: '#4285f4',
        accent: '#fbbc05',
      },
    },
  },
  plugins: [],
} 