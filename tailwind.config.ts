import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecf3f5',
          100: '#d9e7eb',
          200: '#a7c6d1',
          300: '#72A3B3', /* Ocean Blue base */
          400: '#5c8b9a',
          500: '#467381',
          600: '#325b68',
          700: '#1e434f',
          800: '#0a2b36',
          900: '#051921',
          950: '#020d11',
        },
        accent: {
          50: '#e5f6fc',
          100: '#cfe9f6',
          200: '#a1cceb',
          300: '#B8D6E4', /* Soft Blue background/blocks */
          400: '#94b8c9',
          500: '#7399ab',
          600: '#547b8d',
          700: '#385c6f',
          800: '#1d3f51',
          900: '#052133',
          950: '#00141f',
        },
        neutral: {
          50: '#F9F9F9',
          100: '#EFEFEF', /* Soft Sand Gray */
          200: '#d9d9d9',
          300: '#bfbfbf',
          400: '#a6a6a6',
          500: '#8c8c8c',
          600: '#737373',
          700: '#595959',
          800: '#404040',
          900: '#171717', /* Primary Text */
          950: '#000000',
        },
        deep: {
          50: '#eefcfc',
          100: '#d5f5f6',
          200: '#a5e7ec',
          300: '#71d4e0',
          400: '#48bad0',
          500: '#2d9db9',
          600: '#217d9b',
          700: '#1c647f',
          800: '#195368',
          900: '#004D66', /* Deep Blue Background Sections */
          950: '#0c3546',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'texture-warm': "url('/images/texture-warm.svg')",
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
}

export default config
