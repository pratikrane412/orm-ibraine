/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orm: {
          gold: "#fbb03b", // Brand Gold
          "gold-premium": "#d4a017", // Refined Gold for accents
          dark: "#0a0a0a", // Deep background
          surface: "#121212", // Secondary background
          "surface-light": "#1e1e1e", // Elevated surface
          gray: "#262626", // Border color
          "gray-light": "#3f3f46", // Muted text
          yellow: "#ffc107",
        }
      },
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
        lato: ["Lato", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"], // Modern UI font
      },
      spacing: {
        'nav': '80px',
      },
      boxShadow: {
        'orm-premium': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        'orm-gold-glow': '0 0 20px rgba(251, 176, 59, 0.15)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'blur(0px)' },
          '50%': { opacity: '0.6', filter: 'blur(1px)' },
        },
        'pulse-ring': {
          '0%, 100%': { transform: 'translateX(-50%) scaleX(1)', opacity: '0.3' },
          '50%': { transform: 'translateX(-50%) scaleX(1.1)', opacity: '0.5' },
        },
        'pulse-hotspot': {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) scale(2.5)', opacity: '0' },
        },
        'card-slide-in': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(10px) scale(1)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
        'pulse-hotspot': 'pulse-hotspot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'card-slide-in': 'card-slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      }
    },
  },
  plugins: [],
}
