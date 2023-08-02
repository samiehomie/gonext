'use client'

export default function Toast({
  message,
  isShow
}: {
  message: string
  isShow: boolean
}) {
  return (
    <div
      className={`box-border bg-[#00c6be] text-white 
    h-[61px] text-center left-0 fixed w-full z-[10001] 
    transition-transform duration-500 ease-in-out font-noto_sans_demlight ${
      isShow ? 'translate-y-0' : 'translate-y-[-100%]'
    }`}
    >
      <span className="inline-block text-[14px] pt-[21px]">{message}</span>
    </div>
  )
}
