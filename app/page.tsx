import TopBanner from '@/components/banners/topBanner'
import TopNavigation from '@/components/topNavigation'
import BookSlide from '@/components/bookSlide'

export default function Page() {
  return (
    <div className={`relative`}>
      <TopBanner />
      <TopNavigation />
      <div className="w-[960px] m-auto text-[12px]">
        <div className="font-serif_mj">
          <h3
            className={`text-[40px] font-normal mt-[0px] text-left 
        text-[#1a1a1a] tracking-[-.05em]`}
          >
            작품이 되는 이야기, 브런치스토리
            <span
              className="inline-block h-[40px] w-[40px] mt-[1px] mr-[6px] ml-[5px]
            bg-ico-brunch-main bg-[-80px_-230px] align-top overflow-hidden"
            ></span>
          </h3>
          <p className="leading-[46px] mt-[-3px] pb-[16px] text-[32px] text-[#cacaca]">
            <span>
              브런치스토리에 담긴 아름다운 작품을 감상해보세요. <br />
            </span>
            <span>
              그리고 다시 꺼내 보세요. <br />
            </span>
            <span className="text-[#dedede]">
              서랍 속 간직하고 있는 글과 감성을.
            </span>
          </p>
        </div>
        <BookSlide />
      </div>
    </div>
  )
}
