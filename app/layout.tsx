import './globals.css'
import localFont from 'next/font/local'

const nanumMJ = localFont({
  src: '../public/fonts/NanumMyeongjo.otf',
  display: 'swap',
  variable: '--font-nanum-mj',
})

const sfBold = localFont({
  src: '../public/fonts/SF-Pro-Display-Bold.otf',
  display: 'swap',
  variable: '--font-sf-bold',
})

const sfLight = localFont({
  src: '../public/fonts/SF-Pro-Display-Light.ttf',
  display: 'swap',
  variable: '--font-sf-light',
})

const notoSansLight = localFont({
  src: '../public/fonts/NotoSansCJKkr-DemiLight.otf',
  display: 'swap',
  variable: '--font-noto-sans-light',
})

export const metadata = {
  title: 'Next brunch',
  description: 'Next.js + brunch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${nanumMJ.variable} ${sfBold.variable} ${sfLight.variable} ${notoSansLight.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
