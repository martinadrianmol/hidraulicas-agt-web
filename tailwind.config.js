/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Azul marino corporativo (tomado del logo: #15213F)
        navy: {
          950: '#0b1329',
          900: '#15213f',
          800: '#1d2c52',
          700: '#2a3c66',
          500: '#56658a',
          300: '#a3adc4',
          100: '#e6e9f1',
          50: '#f4f6fa',
        },
        // Azul agua (acento)
        aqua: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#b6d8ff',
          300: '#84bdff',
          400: '#4f9cf7',
          500: '#2b7de9',
          600: '#1d63cc',
          700: '#1a4fa3',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(21,33,63,.06), 0 8px 24px -8px rgba(21,33,63,.14)',
        lift: '0 2px 4px rgba(21,33,63,.06), 0 24px 48px -18px rgba(21,33,63,.30)',
      },
    },
  },
};
