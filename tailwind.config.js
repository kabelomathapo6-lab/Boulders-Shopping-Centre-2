/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        porcelain: '#F4EFE6',
        bone: '#E6DDCE',
        ink: '#171611',
        graphite: '#4A453D',
        brass: {
          300: '#DDB66B',
          400: '#C79A48',
          500: '#A9782F',
          600: '#805720'
        },
        night: {
          950: '#090C14',
          900: '#101522',
          800: '#192032'
        }
      },
      fontFamily: {
        display: ['Unbounded', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular']
      },
      boxShadow: {
        soft: '0 24px 70px -34px rgba(23, 22, 17, 0.35)',
        glow: '0 16px 50px -18px rgba(169, 120, 47, 0.55)'
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.08'/%3E%3C/svg%3E\")"
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite'
      }
    }
  },
  plugins: []
}
