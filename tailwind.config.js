/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'flicker': 'flicker 1.5s infinite',
        'slide-x': 'slide-x 2s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'slide-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(500%)' },
        },
      },
    },
  },
  plugins: [],
}

