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
  description: 'Next.js + brunch'
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
