'use client'
import { useEffect, useState } from 'react'

// TODO: #1 Implement search modal and right hidden menu
export default function TopNavigation({
  children,
}: {
  children: React.ReactNode
}) {
  const [onSide, setOnSide] = useState(false)
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
                        `border-b border-[#ddd] bg-[hsla(0,0%,100%,.9)] z-[1001]
                          w-full top-0
                        `
                      }
                      `}
        >
          <div className={`${!isFloat ? 'mt-[30px]' : 'mt-[20px]'} mx-[30px]`}>
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
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
