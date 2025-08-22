/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            50: '#effaff',
            100: '#dff4ff',
            200: '#b9eaff',
            300: '#7ddcff',
            400: '#3cc9ff',
            500: '#0ea5e9',
            600: '#0487c2',
            700: '#056a97',
            800: '#085879',
            900: '#0b4761'
          }
        },
        boxShadow: {
          soft: '0 10px 30px rgba(15, 23, 42, 0.08)'
        }
      }
    },
    plugins: []
  };