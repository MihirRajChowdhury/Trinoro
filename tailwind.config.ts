/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // system-wide dark mode support
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenSoft: '#A3D9A5',
        amethyst: '#B39DDB',
        backgroundLight: '#FFFFFF',
        backgroundDark: '#121212',
        textLight: '#1A1A1A',
        textDark: '#EAEAEA',
      }
    }
  },
  plugins: []
}
