/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
        boxShadow: {
            'btn':'0px 1px 2px rgba(153, 153, 153, 0.15), 0px 1px 3px 1px rgba(0, 0, 0, 0.3) !important',
            '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        },
        backgroundColor:{
            'transparent':'rgb(0 0 0 / 59%)'
        },
        width:{
            '25p':'25%',
            '24p':'24%',
            '23p':'23%',
            '22p':'22%'
        }
    },
  },
  plugins: [],
}
