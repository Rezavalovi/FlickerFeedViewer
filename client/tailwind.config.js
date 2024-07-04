/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'marble-texture': "url('https://img.freepik.com/premium-vector/vector-marble-texture_505557-21157.jpg?size=626&ext=jpg&ga=GA1.1.1096289348.1704623930&semt=sph')",
      },
    },
  },
  plugins: [],
}
