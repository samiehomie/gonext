'use client'
import { useState, useEffect, ReactElement, useContext } from 'react'
import TopBanner from '../banners/topBanner'
import IndexTopNavigation from '../navigations/indexTopNavigation'
import SlidesShow from '../slides/slidesShow'
import WritersWeekly from './writersWeekly'
import Keywords from './keywords'
import RecommendArticle from './recommendArticle'


function MainContent({ children }: { children: ReactElement }) {
  return (
    <article className="text-[12px]">
      <div className="w-[960px] m-auto font-serif_mj">
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
        <ul className="h-[18px] overflow-hidden relative font-noto_sans_demlight">
          <li className="h-full">
            <a href="#">
              <span className="float-right pl-[7px] text-[#959595] text-[11.5px]">
                작가별 알림 기능 신설 및 매거진 개편
              </span>
            </a>
            <span
              className="text-[#00c6be] font-[Georgia] text-[10.5px]
                    italic float-right pt-[2px] font-semibold tracking-tighter"
            >
              Notice
            </span>
          </li>
        </ul>
      </div>
      {children}
    </article>
  )
}

export default function IndexContainer() {
  const [onSearch, setOnSearch] = useState(false)
  const [onTop, setOnTop] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [page, setPage] = useState(0)


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

      {!onSearch && <TopBanner />}
      <IndexTopNavigation onSearch={onSearch} setOnSearch={setOnSearch} />
      {!onSearch && (
        <MainContent>
          <SlidesShow page={page} setPage={setPage} />
        </MainContent>
      )}
      {!onSearch && <Keywords />}
      {!onSearch && <WritersWeekly />}
      {!onSearch && <RecommendArticle cursor={cursor} setCursor={setCursor} />}
    </div>
  )
}
