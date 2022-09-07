/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
        boxShadow: {
            '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            'btn': 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;'
        },
        backgroundColor:{
            'transparent':'rgb(0 0 0 / 59%)'
        }
    },
  },
  plugins: [],
}
