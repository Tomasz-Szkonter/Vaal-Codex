/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090b',          // zinc-950
        panel: '#18181b',       // zinc-900
        'panel-2': '#27272a',   // zinc-800
        border: '#3f3f46',      // zinc-700
        body: '#e4e4e7',        // zinc-200
        muted: '#a1a1aa',       // zinc-400
        // Gold is reserved for tag usage only: BUILD chip, build-scope row
        // stripe, buildNote, and the "+N Skill Points" reward pill. Avoid
        // using gold for structural UI (headings, progress bars, links, etc).
        gold: {
          DEFAULT: '#c9a96e',
          dim: '#8d7748',
          bright: '#e6c98a',
        },
        success: '#7fa86e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        // `font-serif` kept as an alias for Inter so existing `font-serif`
        // heading classes don't need to be touched everywhere. If a real serif
        // is ever wanted again, swap this token without touching components.
        serif: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 1px 0 rgba(201, 169, 110, 0.08), 0 10px 30px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
