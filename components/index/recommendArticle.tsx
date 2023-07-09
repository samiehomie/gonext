'use client'
import { useRef, useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import { writing, writings } from '../../types'
import { removeMarkdownImages, getWritingsQuery } from '../../lib/utils'
import Image from 'next/image'
import Link from 'next/link'

// TODO: #6 Layout is cut off when the screen is resized

function calcHeight(data: writing['data'], height: number) {
  return (
    (data.attributes.Cover?.data.attributes.formats.small?.height as number) *
    (height /
      (data.attributes.Cover?.data.attributes.formats.small?.width as number))
  )
}

const getKey = (pageIndex: number, previousPageData: writings) => {
  if (previousPageData && !previousPageData.data.length) return null
  return `writings?${getWritingsQuery(30, pageIndex + 1)}`
}

const slideGroupActions = 7
let previousSection = 1
let section = 1

export default function RecommendArticle({
  cursor,
  setCursor,
}: {
  cursor: number
  setCursor: (arg: number) => void
}) {
  const slidesRef = useRef<HTMLUListElement>(null)
  const lastCursor = useRef(cursor)
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
    const nextCursor = cursor + 1
    section = Math.floor(nextCursor / slideGroupActions) + 1

    if (previousSection < section) {
      previousSection = section
      setSize(size + 1)
    }

    setCursor(nextCursor)

    slidesRef.current!.style.transform = `translateX(-${nextCursor * 960}px)`
    slidesRef.current!.style.width = `${
      7800 * Math.max(section, previousSection)
    }px`
  }

  const onPrev = () => {
    const nextCursor = cursor - 1
    if (nextCursor < 0) return

    setCursor(nextCursor)

    slidesRef.current!.style.transform = `translateX(-${nextCursor * 960}px)`
  }

  useEffect(() => {
    if (slidesRef.current !== null) {
      slidesRef.current.style.width = `${
        7800 * Math.max(section, previousSection)
      }px`
      slidesRef.current.style.transform = `translateX(-${
        lastCursor.current * 960
      }px)`
    }
  }, [])

  if (!writings) return null
  const pageCount = writings[0].meta.pagination?.pageCount as number

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
                <Link
                  href={`/${writing.attributes.author?.data.id}/${writing.id}`}
                  className="block"
                >
                  <div className="mb-[22px] max-h-[320px] overflow-hidden">
                    <Image
                      src={
                        writing.attributes.Cover?.data.attributes.formats.small
                          ?.url as string
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
                    {` ${writing.attributes.author?.data.attributes.Name}`}
                  </span>
                </Link>
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
