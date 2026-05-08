import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        arab: ['Noto Kufi Arabic', 'sans-serif'],
        zh: ['Noto Sans SC', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f4f7fa',
          100: '#e8eef5',
          200: '#d1dce8',
          300: '#a8bdd4',
          400: '#6b93b5',
          500: '#4a6a8a',
          600: '#264a6e',
          700: '#1a3a5c',
          800: '#0f2847',
          900: '#0a1628',
        },
        gold: {
          300: '#e0c654',
          400: '#d4b43a',
          500: '#c9a227',
          600: '#a8841e',
        },
      },
    },
  },
  plugins: [],
}

export default config
