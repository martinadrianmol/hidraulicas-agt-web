/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
        extend: {
          colors: {
            brand: { 50:'#eef5ff', 100:'#d9e8ff', 200:'#b5d2ff', 400:'#4f8ff0', 500:'#1f6fe0', 600:'#1557c0', 700:'#12459a', 800:'#0f3a7d' },
            ink: { 900:'#0b1f3a', 800:'#12294a', 700:'#1f3657', 500:'#4b5d78', 300:'#9aa8bd' },
            accent: { 400:'#ffad42', 500:'#f7931e', 600:'#de7b06' }
          },
          fontFamily: {
            display: ['Manrope', 'system-ui', 'sans-serif'],
            sans: ['Inter', 'system-ui', 'sans-serif']
          },
          boxShadow: { soft: '0 1px 2px rgba(11,31,58,.06), 0 8px 24px -8px rgba(11,31,58,.12)' }
        }
      }
};
