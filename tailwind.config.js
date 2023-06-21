/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'ico-brunch-main': "url('../public/ico-brunch-main.png')",
        'ico-brunch-sub': "url('../public/ico-brunch-sub.png')",
      },
    },
  },
  plugins: [],
}
