/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        oliva: {
          DEFAULT: '#6b705c',
          dark: '#585d4d',
          light: '#8a8f7a',
        },
        grupo: {
          manana: '#22c55e',
          tarde: '#3b82f6',
          mujeres: '#d946ef',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
    },
  },
  plugins: [],
};
