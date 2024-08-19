/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    screens: {
      '3xl': '1920px',
    },
    extend: {
      colors: {
        gray: {
          200: '#E0E0E0',
          500: '#828282',
          900: '#4F4F4F',
        },
        primary: '#2F80ED',
        yellow: '#F2C94C',
        red: '#EB5757',
        orange: {
          dark: '#F8B76B',
          light: '#FCEED3'
        },
        purple: {
          dark: '#9B51E0',
          light: '#EEDCFF'
        },
        green: {
          dark: '#43B78D',
          light: '#D2F2EA'
        },
        sticker: {
          light: '#E9F3FF',
          orange: '#FDCFA4',
          yellow: '#F9E9C3',
          teal: '#AFEBDB',
          emerald: '#CBF1C2',
          purple: '#CFCEF9',
          pink: '#F9E0FD'
        },
        light: '#FFFFFF'
      },
      fontFamily: {
        bold: 'Lato Bold',
        regular: 'Lato Regular'
      }
    },
  },
  plugins: [],
}

