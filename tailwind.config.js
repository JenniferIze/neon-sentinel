/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff00',
        'neon-green-dark': '#00cc00',
        'neon-green-light': '#33ff33',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
      },
    },
  },
  plugins: [],
}

