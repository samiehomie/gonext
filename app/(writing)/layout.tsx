import TopNavigation from '@/components/navigations/topNavigation'
import ScrollIndicator from '@/components/navigations/scrollIndicator'
import SwrProvider from '@/components/swrProvider'
export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SwrProvider>
      <div>
        <TopNavigation>
          <ScrollIndicator />
        </TopNavigation>
        {children}
      </div>
    </SwrProvider>
  )
}
