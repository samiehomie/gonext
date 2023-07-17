'use client'
import Image from 'next/image'
import { useEffect, useContext } from 'react'
export default function SideMenu({
  onSide,
  setOnStart,
  setOnSide,
}: {
  onSide: boolean
  setOnStart: (arg: boolean) => void
  setOnSide: (arg: boolean) => void
}) {
  useEffect(() => {
    document.addEventListener('click', function handler(e) {
      if (
        e.target instanceof HTMLElement &&
        !e.target.matches('#side-menu, #side-menu *') &&
        onSide
      ) {
        setOnSide(false)
        document.removeEventListener('click', handler)
      }
    })
  }, [onSide, setOnSide])

  return (
    <div
      id="side-menu"
      className={`bg-white border-r border-[#ddd] h-full w-[260px] 
                  fixed text-center top-0 z-[1000] transition-all 
                  duration-300 ease-in ${onSide ? 'ml-o' : 'ml-[-261px]'}`}
    >
      <main>
        <div
          className="bg-[#f8f8f8] h-[239px] overflow-hidden 
                      relative text-center font-noto_sans_demlight"
        >
          <div
            className="bg-ico-brunch-titles bg-[-1px_-106px] h-[48px] w-[48px] 
                      mx-auto mt-[40px] mb-[12px]"
          ></div>
          <p
            className="text-[#666] text-[13px] italic leading-[16px] 
                        text-center font-[Georgia]"
          >
            The Story of <br /> Future Writers
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setOnStart(true)
            }}
          >
            <button
              className="mt-[22px] w-[151px] align-baseline bg-white border 
                      border-[#00c6be] rounded-[16px] text-[#00c6be] text-[13px] h-[32px]"
            >
              브런치스토리 시작하기
            </button>
          </a>
        </div>
        <div className="border-t border-[#ddd] overflow-y-auto pt-[28px] h-[427px]">
          <ul>
            <li className="h-[13px] leading-[13px] py-[12.5px] m-auto w-[240px]">
              <a
                href="/"
                className="text-[#00c6be] block h-[13px] leading-[14px] text-[14px] relative"
              >
                <span
                  className="absolute top-[6px] block border-b 
                          border-[#00c6be] w-[8px] left-[50px]"
                ></span>
                브런치스토리 홈
                <span
                  className="absolute top-[6px] block border-b 
                          border-[#00c6be] w-[8px] right-[50px]"
                ></span>
              </a>
            </li>
            <li className="h-[13px] leading-[13px] py-[12.5px] m-auto w-[240px] ">
              <a
                href="#"
                className="hover:text-[#00c6be] block h-[13px] leading-[14px] 
                          text-[14px] group relative"
              >
                <span
                  className="absolute top-[6px] block border-b opacity-0
                          border-[#00c6be] w-[8px] left-[50px] group-hover:opacity-100"
                ></span>
                브런치스토리 나우
                <span
                  className="absolute top-[6px] block border-b opacity-0
                          border-[#00c6be] w-[8px] right-[50px] group-hover:opacity-100"
                ></span>
              </a>
            </li>
            <li className="h-[13px] leading-[13px] py-[12.5px] m-auto w-[240px]">
              <a
                href="#"
                className="hover:text-[#00c6be] block h-[13px] leading-[14px] text-[14px] 
                            group relative"
              >
                <span
                  className="absolute top-[6px] block border-b opacity-0
                          border-[#00c6be] w-[8px] left-[50px] group-hover:opacity-100"
                ></span>
                브런치스토리 책방
                <span
                  className="absolute top-[6px] block border-b opacity-0
                          border-[#00c6be] w-[8px] right-[50px] group-hover:opacity-100"
                ></span>
              </a>
            </li>
          </ul>
          <div className="absolute mb-[37px] mt-[40px] bottom-0 w-full text-center">
            <div className="pb-[40px]">
              <a href="#" className="block">
                <Image
                  src={'https://i.ibb.co/sg0m59P/image.png'}
                  alt="프로젝트 리스트 바로가기"
                  width={168}
                  height={72}
                  className="m-auto"
                />
              </a>
            </div>
            <a
              href="#"
              className="text-[13px] text-[#959595] border-b border-[#bbb]"
            >
              계정을 잊어버리셨나요?
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
