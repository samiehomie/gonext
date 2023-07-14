import localFont from 'next/font/local'

export const nanumMJ = localFont({
  src: '../public/fonts/NanumMyeongjo.otf',
  display: 'swap',
  variable: '--font-nanum-mj',
})

export const sfBold = localFont({
  src: '../public/fonts/SF-Pro-Display-Bold.otf',
  display: 'swap',
  variable: '--font-sf-bold',
})

export const sfLight = localFont({
  src: '../public/fonts/SF-Pro-Display-Light.ttf',
  display: 'swap',
  variable: '--font-sf-light',
})

export const notoSansDemLight = localFont({
  src: '../public/fonts/NotoSansCJKkr-DemiLight.otf',
  display: 'swap',
  variable: '--font-noto-sans-demlight',
})

export const notoSansLight = localFont({
  src: '../public/fonts/NotoSans-Light.ttf',
  display: 'swap',
  variable: '--font-noto-sans-light',
})

export const notoSansThin = localFont({
  src: '../public/fonts/NotoSansCJKkr-Thin.otf',
  display: 'swap',
  variable: '--font-noto-sans-thin',
})