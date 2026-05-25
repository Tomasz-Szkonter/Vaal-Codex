/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0b0e',
        panel: '#15151a',
        'panel-2': '#1c1c22',
        border: '#2a2a32',
        body: '#e8e3d8',
        muted: '#8a8478',
        gold: {
          DEFAULT: '#c9a96e',
          dim: '#8d7748',
          bright: '#e6c98a',
        },
        success: '#7fa86e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        panel: '0 1px 0 rgba(201, 169, 110, 0.08), 0 10px 30px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
