import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        thai: ['Sarabun', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfaf5',
          100: '#faf3e7',
          200: '#f5e6cc',
          300: '#edd5a8',
          400: '#e2c07e',
          500: '#d4a853',
        },
        rose: {
          petal: '#f9c5d1',
          blush: '#f4a0b5',
          deep: '#e8718a',
        },
        sage: {
          light: '#d4e6d8',
          mid: '#a8c9ae',
          dark: '#6a9e74',
        },
        lavender: {
          soft: '#e8e0f5',
          mid: '#c4b0e8',
          deep: '#9b7dd4',
        },
        ink: {
          light: '#6b6570',
          mid: '#3d3545',
          dark: '#1a1520',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'page-turn': 'pageTurn 0.6s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'bloom': 'bloom 0.4s ease-out forwards',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
        'petal-fall': 'petalFall 4s ease-in forwards',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        pageTurn: {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '1' },
          '50%': { transform: 'perspective(1000px) rotateY(-90deg)', opacity: '0.5' },
          '100%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bloom: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'paper': '0 2px 8px rgba(180, 140, 100, 0.15), 0 0 1px rgba(180, 140, 100, 0.2)',
        'card-hover': '0 8px 30px rgba(180, 140, 100, 0.2), 0 2px 8px rgba(180, 140, 100, 0.1)',
        'soft': '0 4px 20px rgba(0,0,0,0.08)',
        'glow-rose': '0 0 20px rgba(244, 160, 181, 0.4)',
        'glow-lavender': '0 0 20px rgba(196, 176, 232, 0.4)',
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
export default config
