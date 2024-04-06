/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{svelte,js,html}'],
  theme: {
    extend: {
      colors: {
        background: '#191a1c',
        text: '#abb2bf',
        'hover-text': '#cccccc',
        red: '#e06c75',
        green: '#98c379',
        yellow: '#e5c07b',
        blue: '#61afef',
        pink: '#c678dd',
        turquois: '#56b6c2',
        customGray: '#282c34'
      },
      fontFamily: {
        mono: ['CourierPrime, courier'],
        display: 'Trocchi'
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
 *
 * One Dark
 * black     #191a1c
 * dark gray #282c34
 * red       #e06c75
 * green     #98c379
 * yellow    #e5c07b
 * blue      #61afef
 * pink      #c678dd
 * turquois  #56b6c2
 * gray      #abb2bf
 * */
