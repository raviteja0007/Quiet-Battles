/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0B0B0B',
        bgSecondary: '#151515',
        textPrimary: '#F5F2EC',
        textSecondary: '#A5A5A5',
        accent: '#B49A75',
        accentHover: '#c7ad89',
        borderMuted: '#292929',
        cardBg: '#121212',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.25em',
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};
