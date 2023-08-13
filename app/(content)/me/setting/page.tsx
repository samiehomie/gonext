import TopNavigation from '@/components/navigations/topNavigation'
import SettingForm from '../(components)/form'

export default function SettingPage() {
  return (
    <>
      <TopNavigation isBlack={true} showBrunch={true} showButtons={true}>
        <div
          className="font-noto_sans_demlight text-[17px] tracking-[-1px] 
                  text-[#666] text-center z-[-1] w-full absolute h-full table"
        >
          <span className="table-cell align-middle">프로필 설정</span>
        </div>
      </TopNavigation>
      <SettingForm />
    </>
  )
}
