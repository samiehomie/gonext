'use client'
import { useEffect, useState, useCallback, useContext } from 'react'
import SideMenu from '../modals/sideMenu'
import { startModalContext, startStateType } from '../userContext'

// TODO: #1 Implement search modal and right hidden menu

export default function TopNavigation({
  children,
  inBookPage = false,
  breakpoint = 400,
}: {
  children: React.ReactNode
  inBookPage?: boolean
  breakpoint?: number
}) {
  const [onSide, setOnSide] = useState(false)
  const [isFloat, setIsFloat] = useState(false)
  const [_, setOnStart] = useContext(startModalContext) as startStateType
  const handlerDown = useCallback(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll >= breakpoint) {
      setIsFloat(true)
    }
  }, [breakpoint])

  const handlerUp = useCallback(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll < breakpoint) {
      setIsFloat(false)
    }
  }, [breakpoint])

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
  }, [isFloat, handlerDown, handlerUp])

  return (
    <>
      <SideMenu onSide={onSide} setOnStart={setOnStart} setOnSide={setOnSide} />
      <div
        className={`transition duration-300
                  ease-in top-0 w-full z-[100] 
                  ${
                    !isFloat
                      ? 'overflow-hidden absolute h-[80px]'
                      : `fixed border-b border-[#ddd] h-[59px] overflow-visible bg-[hsla(0,0%,100%,.9)] box-border`
                  }`}
      >
        {breakpoint === 400 ? isFloat && children : children}

        <div className={`${!isFloat ? 'mt-[30px]' : 'mt-[20px]'} mx-[30px]`}>
          <div className={`float-left`}>
            <button
              id="side-menu-button"
              onClick={() => setOnSide(true)}
              className={`bg-ico-brunch-sub overflow-hidden 
                        indent-[-999px] leading-none h-[20px] w-[27px] 
                        mr-[14px] float-left ${
                          isFloat || inBookPage
                            ? 'bg-[0px_0px]'
                            : 'bg-[0px_-30px]'
                        }`}
            >
              메뉴
            </button>
            <h1 className={`inline-block float-left`}>
              <a
                href="/"
                className={`block leading-none indent-[-999px] 
                          overflow-hidden w-[120px] h-[22px] mt-[-1px] 
                          bg-ico-brunch-titles ${
                            isFloat || inBookPage
                              ? 'bg-[0px_-80px]'
                              : 'bg-[-120px_-80px]'
                          }`}
              >
                brunch
              </a>
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}
