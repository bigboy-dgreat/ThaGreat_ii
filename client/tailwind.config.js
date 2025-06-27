// client/tailwind.config.js
export default {
  content: [
    "./index.html",              // ✅ correct relative path
    "./src/**/*.{js,ts,jsx,tsx}" // ✅ this too
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
}


