'use client'
import { useEffect, useRef } from 'react'

export default function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100
    if (indicatorRef.current) {
      indicatorRef.current.style.width = scrolled + '%'
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="absolute w-full h-[2px] bottom-[-2px]">
      <div
        ref={indicatorRef}
        className="bg-[#333] h-[2px] transition-all duration-200 ease-out"
      ></div>
    </div>
  )
}
