import './globals.css'

import {
  nanumMJ,
  sfBold,
  sfLight,
  notoSansDemLight,
  notoSansLight,
  notoSansThin
} from '@/lib/fonts'
import { StartModalProvider } from '@/components/userContext'
import IndexStart from '@/components/modals/indexStart'

export const metadata = {
  title: 'Next brunch',
  description: 'Next.js + brunch',
  generator: 'Next.js',
  applicationName: 'Next brunch',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'sam', url: process.env.NEXT_PUBLIC_TEMP }],
  colorScheme: 'white',
  creator: 'Sam Jeong',
  publisher: 'Sam Jeong',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  icons: {
    icon: '/bc-favicon.ico',
    shortcut: '/bc-sc-favicon.ico',
    apple: '/bc-favicon.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/ico-bc-apple.png'
    }
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`h-full ${nanumMJ.variable} ${sfBold.variable} ${notoSansLight.variable} ${sfLight.variable} ${notoSansDemLight.variable} ${notoSansThin.variable}`}
      >
        <StartModalProvider>
          <IndexStart />
          {children}
        </StartModalProvider>
      </body>
    </html>
  )
}
