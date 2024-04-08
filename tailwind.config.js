/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        darkBG: {
          css: {
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
          },
        },
      }),
      colors: {
        'weather-primary': '#6d28d9',
        'weather-secondary': '#a78bfa',
        'confirm-btn': '#0369a1',
        'confirm-btn-dark': '#075985',
      },
    },
    container: {
      padding: '2rem',
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
