/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        green: '#487961',
      },
      screens: {
        '2xl': '1740px', // This sets the max-w-screen-2xl to 1440px
        'custom':'1440px',
        'custom-xl': '2440px',
      },
      maxWidth: {
        'screen-2xl': '1740px', // This sets the max-width to 1440px
      },
      container: {

        center: true,
        padding: '2rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

