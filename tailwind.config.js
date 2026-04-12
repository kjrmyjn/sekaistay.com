/** @type {import('tailwindcss').Config} */
// SEKAI STAY デザインシステム（DESIGN.md 準拠）
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
        // ── Primary (DESIGN.md §2) ────────────
        'sekai-black':  '#000000',
        'deep-teal':    '#167B81',
        'sekai-teal':   '#259DA3',
        'bright-teal':  '#54BEC3',
        'teal-tint':    '#E5F4F5',
        // ── Semantic ──────────────────────────
        'danger':       '#B91C1C',
        'danger-bg':    '#FEF2F2',
        'danger-border':'#FECACA',
        'warning':      '#F59E0B',
        'success':      '#259DA3',
        'success-bg':   '#E5F4F5',
        'success-border':'#C5E8E9',
        // ── Neutral ──────────────────────────
        'charcoal':     '#2D2D2D',
        'dark-gray':    '#5F6368',
        'mid-gray':     '#9AA0A6',
        'light-gray':   '#DADCE0',
        'pale-gray':    '#F1F3F4',
        'cloud-white':  '#F7F8FA',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SFMono-Regular', 'Consolas', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'btn':  '8px',
      },
      maxWidth: {
        'container': '960px',
      },
    },
  },
  plugins: [],
}
