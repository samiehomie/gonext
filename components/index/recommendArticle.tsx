'use client'
import { useRef } from 'react'
import { queryWritings, urlWritings } from '@/lib/queries'
import useSWR from 'swr'
import type { writings, writing } from '../../types'
import { fetcher } from '../../lib/fetchData'
import { removeMarkdownImages } from '../../lib/utils'
import Image from 'next/image'

function calcHeight(data: writing, height: number) {
  return (
    data.attributes.Cover.data.attributes.formats.small.height *
    (height / data.attributes.Cover.data.attributes.formats.small.width)
  )
}

export default function RecommendArticle() {
  const slidesRef = useRef<HTMLUListElement>(null)
  const {
    data: writings,
  }: {
    data: writings
  } = useSWR(urlWritings + queryWritings, fetcher, {
    revalidateOnMount: true,
  })

  if (!writings) return null

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
                    font-noto_sans_light"
        >
          {writings.data.map((writing) => (
            <li
              key={writing.id}
              className="inline-block overflow-hidden px-[10px] w-[240px] 
                        align-top float-left"
            >
              <a href="#" className="block">
                <div className="mb-[22px] max-h-[320px] overflow-hidden">
                  <Image
                    src={
                      writing.attributes.Cover.data.attributes.formats.small.url
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
          ))}
        </ul>
      </div>
    </div>
  )
}
