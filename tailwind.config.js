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
        'book-blur': "url('../public/bg_bookblur.png')",
        'book-cover': 'linear-gradient(-180deg, #f4f4f4, #dedede 82%)',
        'book-shadow': "url('../public/bg_brunchhome.png')",
      },
      fontFamily: {
        serif_mj: ['var(--font-nanum-mj)'],
        sf_bold: ['var(--font-sf-bold)'],
        noto_sans_light: ['var(--font-noto-sans-light)'],
      },
    },
  },
  plugins: [],
}
