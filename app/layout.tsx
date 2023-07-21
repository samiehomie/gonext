import './globals.css'

import {
  nanumMJ,
  sfBold,
  sfLight,
  notoSansDemLight,
  notoSansLight,
  notoSansThin,
} from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { StartModalProvider } from '@/components/userContext'
import IndexStart from '@/components/modals/indexStart'

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
    <html lang="en" className="h-full">
      <body
        className={cn(
          'h-full',
          nanumMJ.variable,
          sfBold.variable,
          notoSansLight.variable,
          sfLight.variable,
          notoSansDemLight.variable,
          notoSansThin.variable,
        )}
      >
        <StartModalProvider>
          <div className={`relative overflow-hidden`}>
            <IndexStart />
            {children}
          </div>
        </StartModalProvider>
      </body>
    </html>
  )
}
