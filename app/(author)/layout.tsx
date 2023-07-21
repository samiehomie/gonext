import SwrProvider from '@/components/swrProvider'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SwrProvider>
      <div>{children}</div>
    </SwrProvider>
  )
}
