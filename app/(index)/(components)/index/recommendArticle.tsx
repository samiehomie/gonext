'use client'
import { useRef, useEffect, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { writing, writings } from '../../../../types'
import { dressUpMarkdown, getWritingsQuery } from '../../../../lib/utils'
import Image from 'next/image'
import Link from 'next/link'

// TODO: #6 Layout is cut off when the screen is resized

function calcHeight(data: writing['data'], height: number) {
  return (
    (data.attributes.cover?.data.attributes.formats.small?.height as number) *
    (height /
      (data.attributes.cover?.data.attributes.formats.small?.width as number))
  )
}

const getKey = (pageIndex: number, previousPageData: writings) => {
  if (previousPageData && !previousPageData.data.length) return null
  return `${process.env.NEXT_PUBLIC_DB_URL}/api/writings?${getWritingsQuery(
    30,
    pageIndex + 1
  )}`
}

const slideGroupActions = 7
let previousSection = 1
let section = 1

export default function RecommendArticle() {
  const [cursor, setCursor] = useState(0)
  const slidesRef = useRef<HTMLUListElement>(null)
  const lastCursor = useRef(cursor)
  const {
    data: writings,
    size,
    setSize
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
    <>
      {/* recommend slide */}

      <div className="relative w-[960px] m-auto overflow-visible">
        <ul
          ref={slidesRef}
          className="w-[7800px] overflow-hidden relative pb-[180px] text-[12px] 
                    font-noto_sans_demlight translate-x-0 
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
                  href={`/writing/${writing.attributes.user?.data.id}/${writing.id}#title`}
                  className="block"
                >
                  <div className="mb-[22px] max-h-[320px] overflow-hidden">
                    {writing.attributes.cover?.data && (
                      <Image
                        src={
                          writing.attributes.cover?.data.attributes.formats
                            .small?.url as string
                        }
                        alt={writing.attributes.title}
                        width={240}
                        height={calcHeight(writing, 240)}
                      />
                    )}
                  </div>
                  <strong className="tit_subject">
                    {writing.attributes.title}
                  </strong>
                  <p
                    className="text-[#959595] text-[12px] tracking-[-.025em] 
                            leading-[20px] pt-[10px] text-justify break-all"
                  >
                    {dressUpMarkdown(writing.attributes.content)
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
                    {` ${writing.attributes.user?.data.attributes.username}`}
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
    </>
  )
}
