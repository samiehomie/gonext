'use client'
import { useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { writing, writings } from '../../types'
import { removeMarkdownImages, getWritingsQuery } from '../../lib/utils'
import Image from 'next/image'

// TODO: #4 Broken layout as its width returns to initial size on remount

function calcHeight(data: writing, height: number) {
  return (
    data.attributes.Cover.data.attributes.formats.small.height *
    (height / data.attributes.Cover.data.attributes.formats.small.width)
  )
}

const getKey = (pageIndex: number, previousPageData: writings) => {
  if (previousPageData && !previousPageData.data.length) return null
  return `writings?${getWritingsQuery(30, pageIndex + 1)}`
}

const slideGroupActions = 7
let previousSection = 1

export default function RecommendArticle() {
  const slidesRef = useRef<HTMLUListElement>(null)
  const [cursor, setCursor] = useState(0)

  const {
    data: writings,
    size,
    setSize,
  }: {
    data: writings[] | undefined
    size: number
    setSize: (arg: number) => any
  } = useSWRInfinite(getKey, { initialSize: 1 })

  const onNext = () => {
    const nextPage = cursor + 1
    const section = Math.floor(nextPage / slideGroupActions) + 1

    if (previousSection < section) {
      previousSection = section
      setSize(size + 1)
    }
    setCursor(nextPage)

    slidesRef.current!.style.transform = `translateX(-${nextPage * 960}px)`
    slidesRef.current!.style.width = `${
      7800 * Math.max(section, previousSection)
    }px`
  }

  const onPrev = () => {
    const nextPage = cursor - 1
    if (nextPage < 0) return
    setCursor(nextPage)

    slidesRef.current!.style.transform = `translateX(-${nextPage * 960}px)`
  }

  if (!writings) return null
  const { pageCount } = writings[0].meta.pagination

  return (
    <div className="relative">
      <h3
        className="bg-brunch-text bg-[0px_-225px] h-[13px] w-[380px] 
                  mt-[150px] mx-auto overflow-hidden indent-[-9999px]"
      >
        RECOMMENDED ARTICLES
      </h3>
      <p className="w-[960px] m-auto">
        <span
          className="block overflow-hidden indent-[-9999px] w-[162px]
                    bg-brunch-text bg-[0px_-75px] h-[11px] mb-[47px] mt-[17px] 
                    mx-auto"
        >
          갓 구워낸 따끈따끈한 추천글을 만나보세요
        </span>
      </p>
      {/* recommend slide */}
      <div className="relative w-[960px] m-auto overflow-visible">
        <ul
          ref={slidesRef}
          className="w-[7800px] overflow-hidden relative pb-[180px] text-[12px] 
                    font-noto_sans_light translate-x-0 
                    transition-transform duration-300 ease-in-out"
        >
          {writings.map((writingGroup) => {
            return writingGroup.data.map((writing) => (
              <li
                key={writing.id}
                className="inline-block overflow-hidden px-[10px] w-[240px] 
                        align-top float-left"
              >
                <a href="#" className="block">
                  <div className="mb-[22px] max-h-[320px] overflow-hidden">
                    <Image
                      src={
                        writing.attributes.Cover.data.attributes.formats.small
                          .url
                      }
                      alt={writing.attributes.Title}
                      width={240}
                      height={calcHeight(writing, 240)}
                    />
                  </div>
                  <strong className="tit_subject">
                    {writing.attributes.Title}
                  </strong>
                  <p
                    className="text-[#959595] text-[12px] tracking-[-.025em] 
                            leading-[20px] pt-[10px] text-justify break-all"
                  >
                    {removeMarkdownImages(writing.attributes.Content)
                      .slice(0, 200)
                      .replace(/\S+$/, '')}
                  </p>
                  <span
                    className="block pt-[22px] text-[#959595] 
                            m-auto overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <span className="mt-[3px] text-[#bfbfbf] italic font-[Georgia]">
                      by
                    </span>
                    {` ${writing.attributes.author.data.attributes.Name}`}
                  </span>
                </a>
              </li>
            ))
          })}
        </ul>
      </div>
      {/* wrap_button */}
      <div>
        <button
          className={`mt-[-77px] h-[100px] absolute 
          top-[50%] w-[100px] z-[10] left-[30px] ${cursor <= 0 && 'hidden'}`}
          onClick={onPrev}
        >
          <span
            className="h-[101px] w-[100px] bg-ico-brunch-main
            float-left bg-[-167px_-175px] ico-brunch
          "
          >
            이전 추천 보기
          </span>
        </button>
        <button
          className={`mt-[-77px] h-[100px] absolute 
          top-[50%] w-[100px] z-[10] right-[30px] ${
            pageCount <= Math.floor(cursor / slideGroupActions) + 1 && 'hidden'
          }`}
          onClick={onNext}
        >
          <span
            className="h-[101px] w-[100px] bg-ico-brunch-main
            float-left bg-[-269px_-175px] ico-brunch
          "
          >
            다음 추천 보기
          </span>
        </button>
      </div>
    </div>
  )
}
