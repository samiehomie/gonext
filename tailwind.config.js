/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'ico-bg-underbar': "url('../public/bg-underbar.gif')",
        'ico-btn-cover': "url('../public/ico-btn-cover.png')",
        'ico-btn-cover2': "url('../public/ico-btn-cover2.png')",
        'wrap-overview-bg': 'linear-gradient(#f8f8f8,#fff)',
        'book-slide-cover': 'url("../public/bg-book.png")',
        'ico-brunch-titles': "url('../public/ico-brunch-titles.png')",
        'ico-brunch-main': "url('../public/ico-brunch-main.png')",
        'ico-brunch-sub': "url('../public/ico-brunch-sub.png')",
        'ico-brunch-sub2': "url('../public/ico-brunch-sub2.png')",
        'ico-brunch-sub3': "url('../public/ico-brunch-sub3.png')",
        'ico-brunch-common': "url('../public/ico-comm.png')",
        'ico-weekly': "url('../public/ico-weekly.png')",
        'ico-brunch-discover': "url('../public/ico-brunch-discover.png')",
        'ico-article-buttons': "url('../public/ico-article-btn.png')",
        'ico-ico-sidebar': "url('../public/ico-sidebar.png')",
        'line-type-03': "url('../public/line-type-03.png')",
        'book-blur': "url('../public/bg-bookblur.png')",
        'book-cover': 'linear-gradient(-180deg, #f4f4f4, #dedede 82%)',
        'book-shadow': "url('../public/bg-brunchhome.png')",
        'img-paging': "url('../public/img-paging.png')",
        'brunch-text': "url('../public/brunch-text.png')",
        'book-shadow': "url('../public/book-shadow.png')"
      },
      fontFamily: {
        serif_mj: ['var(--font-nanum-mj)'],
        sf_bold: ['var(--font-sf-bold)'],
        sf_light: ['var(--font-sf-light)'],
        noto_sans_demlight: ['var(--font-noto-sans-demlight)'],
        noto_sans_light: ['var(--font-noto-sans-light)'],
        noto_sans_thin: ['var(--font-noto-sans-thin)']
      }
    }
  }
}
