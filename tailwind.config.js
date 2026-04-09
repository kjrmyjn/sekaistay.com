/** @type {import('tailwindcss').Config} */
// SEKAI STAY ブランドカラーに準拠（SEKAI_STAY_Creative_Guide.md 参照）
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{mdx,md}',
    './data/**/*.{js,ts}',
    './lib/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Base ─────────────────────────────────
        'cloud-white':  '#F7F8FA',
        'charcoal':     '#2D2D2D',
        // ── Accent: Blue-Teal ─────────────────────
        'deep-teal':    '#167B81',
        'sekai-teal':   '#259DA3',
        'bright-teal':  '#54BEC3',
        'teal-tint':    '#E5F4F5',
        // ── Neutrals ─────────────────────────────
        'dark-gray':    '#5F6368',
        'mid-gray':     '#9AA0A6',
        'light-gray':   '#DADCE0',
        'pale-gray':    '#F1F3F4',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
