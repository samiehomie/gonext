import TopNavigation from '@/components/navigations/topNavigation'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopNavigation>
        <div></div>
      </TopNavigation>
      {children}
    </div>
  )
}
