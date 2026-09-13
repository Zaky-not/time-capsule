/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080706',
        'bg-soft': '#100e0c',
        surface: '#18140f',
        paper: '#efe7d8',
        text: '#f1ece1',
        muted: '#948d80',
        'muted-dim': '#5f594e',
        accent: '#c9a45c',
        rust: '#9c5a3c',
        line: 'rgba(241,236,225,0.12)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
};
