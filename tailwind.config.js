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
        'brutal': ['"Bungee"', 'sans-serif'], // Bold, blocky, brutalist for logos
        'title': ['"Black Ops One"', 'cursive'], // Military brutalist for big titles
        'logo': ['"Bungee"', 'sans-serif'], // Alias for brutal - main button/logo
        'menu': ['"Rajdhani"', 'sans-serif'], // Geometric, bold for menus
        'score': ['"Share Tech Mono"', 'monospace'], // Tech monospace for score/HUD
        'body': ['"JetBrains Mono"', 'monospace'], // Clean monospace for body text
      },
    },
  },
  plugins: [],
}
