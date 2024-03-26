/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{svelte,js,html}'],
  theme: {
    extend: {
      colors: {
        background: '#243119',
        text: '#c9f2c7',
        primary: '#999999',
        secondary: '#1f1f1f',
        accent: '#858585'
      },
      brightness: {
        25: '.25'
      },
      fontFamily: {
        mono: 'CourierPrime, courier'
      }
    }
  },
  plugins: []
};

/*
 * c9f2c7 Tea green
 * aceca1 Light green
 * 96be8c Olivine
 * 629460 Asparagus
 * 243119 Dark green
 * */
