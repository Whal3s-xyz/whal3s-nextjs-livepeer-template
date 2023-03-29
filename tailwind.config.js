/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          950: '#0b0b0b'
        },
        'whal3s': {
          '50': '#edf0ff',
          '100': '#dee5ff',
          '200': '#c4cdff',
          '300': '#a0acff',
          '400': '#7a80ff',
          '500': '#5d5afa',
          '600': '#503eef',
          '700': '#422fd3',
          '800': '#3729aa',
          '900': '#302986',
        },
        'purple': {
          '50': '#faf6fe',
          '100': '#f3ebfc',
          '200': '#e9dbf9',
          '300': '#d9bef4',
          '400': '#c194ec',
          '500': '#9e58dd',
          '600': '#944cd1',
          '700': '#7e39b7',
          '800': '#6a3396',
          '900': '#572b78',
        },


      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}

