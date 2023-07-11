import TopNavigation from '@/components/navigations/topNavigation'
export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopNavigation inBookPage={true} breakpoint={5}>
        <div className="absolute text-center left-[250px] right-[250px] h-full">
          <div className="table h-full mx-auto">
            <h2
              className="text-[#666] font-noto_sans_light text-[16.5px] leading-none
                      font-normal whitespace-nowrap align-middle table-cell tracking-tight"
            >
              브런치북
            </h2>
          </div>
        </div>
      </TopNavigation>
      {children}
    </div>
  )
}
