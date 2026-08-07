/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        card: '#18181B',
        'card-border': '#27272A',
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          subtle: 'rgba(37, 99, 235, 0.15)',
        },
        accent: {
          DEFAULT: '#7C3AED',
          subtle: 'rgba(124, 58, 237, 0.15)',
        },
        success: {
          DEFAULT: '#22C55E',
          subtle: 'rgba(34, 197, 94, 0.15)',
        },
        warning: {
          DEFAULT: '#F97316',
          subtle: 'rgba(249, 115, 22, 0.15)',
        },
        text: '#FAFAFA',
        muted: '#A1A1AA',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-primary': '0 0 20px rgba(37, 99, 235, 0.25)',
        'glow-accent': '0 0 20px rgba(124, 58, 237, 0.25)',
      },
    },
  },
  plugins: [],
}
