'use client'
import { useState, useEffect, ReactElement, useContext } from 'react'
import { startModalContext, stateType } from '@/components/userContext'

export default function IndexContainer({
  children
}: {
  children: ReactElement
}) {
  const [onTop, setOnTop] = useState(false)

  const {
    search: [onSearch, _]
  } = useContext(startModalContext) as stateType

  useEffect(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll >= 1700) {
      setOnTop(true)
    } else {
      setOnTop(false)
    }
    document.addEventListener('scroll', function handler() {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop

      if (winScroll < 1700) setOnTop(false)

      if (!onTop && winScroll >= 1700) {
        setOnTop(true)
        document.removeEventListener('scroll', handler)
      }
    })
  }, [onTop])

  return (
    <div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo(0, 0)
          setOnTop(false)
        }}
        className={`block bg-ico-brunch-discover bg-[0px_-90px] 
                    fixed h-[31px] w-[60px] z-[15] right-[40px] transition-[bottom] duration-500 ease-linear 
                    ${onTop ? 'bottom-[40px]' : 'bottom-[-80px]'}`}
      ></a>
      {!onSearch && children}
    </div>
  )
}
