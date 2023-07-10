import TopNavigation from '@/components/navigations/topNavigation'
import ScrollIndicator from '@/components/navigations/scrollIndicator'
export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopNavigation>
        <ScrollIndicator />
      </TopNavigation>
      {children}
    </div>
  )
}
