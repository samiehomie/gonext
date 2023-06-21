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
        'ico-brunch-titles': "url('../public/ico-brunch-titles.png')",
        'ico-brunch-main': "url('../public/ico-brunch-main.png')",
        'ico-brunch-sub': "url('../public/ico-brunch-sub.png')",
      },
      fontFamily: {
        serif_mj: ['var(--font-nanum-mj)'],
      },
    },
  },
  plugins: [],
}
