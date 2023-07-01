'use client'
import { useEffect, useState } from 'react'
import SuggestBox from '../modals/suggestBox'

// TODO: #1 Implement search modal and right hidden menu
export default function TopNavigation({
  onSearch,
  setOnSearch,
}: {
  onSearch: boolean
  setOnSearch: (onSearch: boolean) => void
}) {
  const [isFloat, setIsFloat] = useState(false)

  function handlerDown() {
    if (window.scrollY >= 400) {
      setIsFloat(true)
    }
  }

  function handlerUp() {
    if (window.scrollY < 400) {
      setIsFloat(false)
    }
  }

  useEffect(() => {
    if (!isFloat) {
      window.addEventListener('scroll', handlerDown)
    } else {
      window.addEventListener('scroll', handlerUp)
    }
    return () => {
      window.removeEventListener('scroll', handlerDown)
      window.removeEventListener('scroll', handlerUp)
    }
  }, [isFloat])

  return (
    <div>
      <div className={`h-[60px]`}>
        <div
          className={`float-left transition duration-300 ease-in-out
                      ${
                        !isFloat
                          ? 'h-[40px] w-full static'
                          : 'h-[60px] fixed box-border'
                      }
                      ${
                        isFloat &&
                        `border-b border-[#ddd] bg-[hsla(0,0%,100%,.9)] z-[1000]
                          w-full top-0
                        `
                      }
                      `}
        >
          <div
            className={`${!isFloat ? 'mt-[30px]' : 'mt-[20px]'} mx-[30px] ${
              onSearch && 'relative z-[10]'
            }`}
          >
            <div className={`float-left`}>
              <button
                className={`bg-ico-brunch-sub overflow-hidden 
                        indent-[-999px] leading-none h-[20px] w-[27px] 
                        mr-[14px] bg-[0px_0px] float-left`}
              >
                메뉴
              </button>
              <h1 className={`inline-block float-left`}>
                <a
                  href="/"
                  className={`block leading-none indent-[-999px] 
                          overflow-hidden w-[120px] h-[22px] mt-[-1px] 
                          bg-ico-brunch-titles bg-[0px_-80px]`}
                >
                  brunch
                </a>
              </h1>
            </div>
            <div
              className={`float-right ${onSearch && 'hidden'}`}
              onClick={() => {
                setOnSearch(true)
                document.body.style.overflowY = 'scroll'
              }}
            >
              <div>
                <button
                  className={`leading-none overflow-hidden 
                          indent-[-999px] inline-block h-[22px] w-[22px] 
                          bg-[-30px_0px] bg-ico-brunch-sub float-right 
                          align-middle ml-[16px]`}
                >
                  검색
                </button>
              </div>
            </div>
            <div className={`float-right ${onSearch && 'hidden'}`}>
              <a
                href="#"
                className={`text-[#666] leading-[28px] w-[64px] h-[28px]
                          border boder-solid border-[#959595] text-center 
                          font-sans float-right mt-[-5px]
                          rounded-[16px] text-[12px] opacity-90`}
              >
                시작하기
              </a>
            </div>
          </div>
          {onSearch && <SuggestBox setOnSearch={setOnSearch} />}
        </div>
      </div>
    </div>
  )
}
