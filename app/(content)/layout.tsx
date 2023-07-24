import SwrProvider from '@/components/swrProvider'
export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SwrProvider>{children}</SwrProvider>
}
