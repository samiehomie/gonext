'use client'
import { useState, useRef } from 'react'

export default async function SlidesContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const [page, setPage] = useState(0)
  const slidesRef = useRef<HTMLUListElement>(null)

  const onNext = () => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = 'translateX(-960px)'
    }
  }

  return (
    <div className="relative mt-[22px]">
      <h3 className="screen-out">EDITOR PIC</h3>
      <div className="h-[520px] overflow-visible w-[960px] m-auto relative">
        <ul
          ref={slidesRef}
          className="absolute top-0 w-[900%] translate-x-0 
        transition-transform duration-300 ease-in-out"
        >
          {children}
        </ul>
      </div>
      {/* wrap_button */}
      <div>
        <a
          href="#"
          className="mt-[-77px] h-[100px] absolute 
          top-[50%] w-[100px] z-[10] left-[30px] hidden"
        >
          <span
            className="h-[101px] w-[100px] bg-ico-brunch-main
            float-left bg-[-167px_-175px] ico-brunch
          "
          >
            이전 에디터픽 보기
          </span>
        </a>
        <button
          className="mt-[-77px] h-[100px] absolute 
          top-[50%] w-[100px] z-[10] right-[30px]"
          onClick={onNext}
        >
          <span
            className="h-[101px] w-[100px] bg-ico-brunch-main
            float-left bg-[-269px_-175px] ico-brunch
          "
          >
            다음 에디터픽 보기
          </span>
        </button>
      </div>
      {/* wrap_paging */}
      <div className="w-[960px] text-center m-[22px_auto_0px_auto]">
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span className="screen-out">현재페이지</span>
          <span
            className="block bg-img-paging bg-[0px_-10px] 
          h-[12px] mt-[8px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            01
          </span>
        </span>
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span
            className="block bg-img-paging bg-[-20px_0px] 
          h-[9px] mt-[10px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            02
          </span>
        </span>
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span
            className="block bg-img-paging bg-[-40px_0px] 
          h-[9px] mt-[10px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            03
          </span>
        </span>
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span
            className="block bg-img-paging bg-[-60px_0px] 
          h-[9px] mt-[10px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            04
          </span>
        </span>
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span
            className="block bg-img-paging bg-[-80px_0px] 
          h-[9px] mt-[10px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            05
          </span>
        </span>
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span
            className="block bg-img-paging bg-[-100px_0px] 
          h-[9px] mt-[10px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            06
          </span>
        </span>
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span
            className="block bg-img-paging bg-[-120px_0px] 
          h-[9px] mt-[10px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            07
          </span>
        </span>
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span
            className="block bg-img-paging bg-[-140px_0px] 
          h-[9px] mt-[10px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            08
          </span>
        </span>
        <span className="inline-block h-[31px] align-top px-[11px]">
          <span
            className="block bg-img-paging bg-[-160px_0px] 
          h-[9px] mt-[10px] w-[13px] indent-[-9999px] overflow-hidden"
          >
            09
          </span>
        </span>
      </div>
    </div>
  )
}
