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
        headingColor: '#302C2C',
        subHeadingColor: 'rgba(48, 44, 44, 0.65)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1': ['72px', { lineHeight: '118%', letterSpacing: '-2.16px' }],
        'h2': ['40px', { lineHeight: '118%', letterSpacing: '-1.2px' }],
        'h3': ['20px', { lineHeight: '30px', letterSpacing: '-0.2px' }],
        'p': ['20px', { lineHeight: '30px', letterSpacing: '-0.2px' }],
      },
      screens: {
        '2xl': '1740px', // This sets the max-w-screen-2xl to 1740px
        'custom':'1440px',
        'custom-xl': '2440px',
      },
      maxWidth: {
        'screen-2xl': '1740px', // This sets the max-width to 1740px
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
