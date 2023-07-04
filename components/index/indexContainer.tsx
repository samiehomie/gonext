'use client'
import { useState, useEffect } from 'react'
import TopBanner from '../banners/topBanner'
import TopNavigation from '../navigations/topNavigation'
import SlidesShow from '../slides/slidesShow'
import WritersWeekly from './writersWeekly'
import Keywords from './keywords'
import RecommendArticle from './recommendArticle'
import { SWRConfig } from 'swr'
import IndexStart from '../modals/indexStart'
import SideMenu from '../modals/sideMenu'

function MainContent() {
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
        <ul className="h-[18px] overflow-hidden relative font-noto_sans_light">
          <li className="h-full">
            <a href="#">
              <span className="float-right pl-[7px] text-[#959595]">
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
      <SlidesShow />
    </article>
  )
}

export default function IndexContainer() {
  const [onSearch, setOnSearch] = useState(false)
  const [onStart, setOnStart] = useState(false)
  const [onSide, setOnSide] = useState(false)
  const [onTop, setOnTop] = useState(false)

  useEffect(() => {
    document.addEventListener('click', function handler(e) {
      if (
        e.target instanceof HTMLElement &&
        !e.target.matches('#side-menu *') &&
        onSide
      ) {
        setOnSide(false)
        document.removeEventListener('click', handler)
      }
    })
  }, [onSide])

  useEffect(() => {
    if (window.scrollY >= 1700) {
      setOnTop(true)
    }
    document.addEventListener('scroll', function handler() {
      if (!onTop && window.scrollY >= 1700) {
        setOnTop(true)
        document.removeEventListener('scroll', handler)
      }
    })
  }, [onTop])

  return (
    <SWRConfig
      value={{
        fetcher: (query: string) =>
          fetch(`${process.env.NEXT_PUBLIC_DB_URL}/api/${query}`).then((res) =>
            res.json(),
          ),
      }}
    >
      <div className={`relative overflow-hidden`}>
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
        <SideMenu onSide={onSide} setOnStart={setOnStart} />
        {onStart && <IndexStart setOnStart={setOnStart} />}
        {!onSearch && <TopBanner />}
        <TopNavigation
          onSearch={onSearch}
          setOnSearch={setOnSearch}
          setOnStart={setOnStart}
          setOnSide={setOnSide}
        />
        {!onSearch && <MainContent />}
        {!onSearch && <Keywords />}
        {!onSearch && <WritersWeekly />}
        {!onSearch && <RecommendArticle />}
      </div>
    </SWRConfig>
  )
}
