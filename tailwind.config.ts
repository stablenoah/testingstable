import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brg': {
          DEFAULT: '#004225', // British Racing Green
          '50': '#f0f7f3',
          '100': '#dcefe2',
          '200': '#bde0c7',
          '300': '#8ec89d',
          '400': '#5aa970',
          '500': '#358b4f',
          '600': '#246f3e',
          '700': '#1d5832',
          '800': '#1a462b',
          '900': '#0f2412',
          '950': '#071209',
        },
        'charcoal': {
          DEFAULT: '#0F0F0F',
          '50': '#f7f7f7',
          '100': '#e3e3e3',
          '200': '#c8c8c8',
          '300': '#a4a4a4',
          '400': '#818181',
          '500': '#666666',
          '600': '#515151',
          '700': '#434343',
          '800': '#383838',
          '850': '#242424',
          '900': '#1f1f1f',
          '950': '#0F0F0F',
        },
        'silver': {
          DEFAULT: '#B5B5B5',
          '50': '#ffffff',
          '100': '#fafafa',
          '200': '#e5e5e5',
          '300': '#d4d4d4',
          '400': '#c4c4c4',
          '500': '#B5B5B5',
          '600': '#999999',
          '700': '#7a7a7a',
          '800': '#666666',
          '900': '#4d4d4d',
        },
        'accent-gold': '#D4AF37',
      },
      fontFamily: {
        'cinzel': ['var(--font-cinzel)', 'serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        breathe: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
            transform: 'scale(1.02)'
          },
        },
        saddleWave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        }
      },
      animation: {
        shimmer: 'shimmer 8s linear infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        saddleWave: 'saddleWave 3s ease-in-out infinite',
        flip: 'flip 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      },
      cursor: {
        'stirrup': 'url("/cursors/stirrup.svg"), pointer',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
};

export default config; 