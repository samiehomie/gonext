'use client'
import { useEffect, useState, useContext } from 'react'
import SuggestBox from '../modals/suggestBox'
import SideMenu from '../modals/sideMenu'
import Link from 'next/link'
import { startModalContext, startStateType } from '../userContext'

// TODO: #1 Implement search modal and right hidden menu

export default function IndexTopNavigation({
  onSearch,
  setOnSearch,
}: {
  onSearch: boolean
  setOnSearch: (onSearch: boolean) => void
}) {
  const [isFloat, setIsFloat] = useState(false)
  const [onSide, setOnSide] = useState(false)
  const {
    start: [_, setOnStart],
  } = useContext(startModalContext) as startStateType
  function handlerDown() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll >= 400) {
      setIsFloat(true)
    }
  }

  function handlerUp() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll < 400) {
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
    <>
      <SideMenu onSide={onSide} setOnStart={setOnStart} setOnSide={setOnSide} />
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
                        `border-b border-[#ddd] bg-[hsla(0,0%,100%,.9)] z-[1001]
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
                  id="side-menu-button"
                  onClick={() => setOnSide(true)}
                  className={`bg-ico-brunch-sub overflow-hidden 
                        indent-[-999px] leading-none h-[20px] w-[27px] 
                        mr-[14px] bg-[0px_0px] float-left`}
                >
                  메뉴
                </button>
                <h1 className={`inline-block float-left`}>
                  <Link
                    href="/"
                    className={`block leading-none indent-[-999px] 
                          overflow-hidden w-[120px] h-[22px] mt-[-1px] 
                          bg-ico-brunch-titles bg-[0px_-80px]`}
                  >
                    brunch
                  </Link>
                </h1>
              </div>
              <div className={`float-right ${onSearch && 'hidden'}`}>
                <div>
                  <button
                    onClick={() => {
                      setOnSearch(true)
                      document.body.style.overflowY = 'scroll'
                      document.body.classList.add('brunch-suggest')
                    }}
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
                  onClick={(e) => {
                    e.preventDefault()
                    setOnStart(true)
                  }}
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
    </>
  )
}
