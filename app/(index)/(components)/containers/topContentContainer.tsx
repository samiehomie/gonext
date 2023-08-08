import { queryTopNotice, queryWritings, queryBook } from '@/lib/queries'
import Link from 'next/link'
import fetchJson from '@/lib/fetchJson'
import SlidesShow from '../slides/slidesShow'
import type { users, writings, book } from '@/types'
import { Suspense } from 'react'

export default async function TopContentContainer() {
  const noticeRes = fetchJson<users>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users?` + queryTopNotice
  )
  const writingsREs = fetchJson<writings>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/writings?` + queryWritings
  )
  const bookREs = fetchJson<book>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/books/${1}?` + queryBook
  )
  const [notice, writings, book] = await Promise.all([
    noticeRes,
    writingsREs,
    bookREs
  ])

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
            <Link
              href={`/writing/${notice[0].id}/${notice[0].writings![0].id}`}
            >
              <span className="float-right pl-[7px] text-[#959595] text-[11.5px]">
                작가별 알림 기능 신설 및 매거진 개편
              </span>
            </Link>
            <span
              className="text-[#00c6be] font-[Georgia] text-[10.5px]
                    italic float-right pt-[2px] font-semibold tracking-tighter"
            >
              Notice
            </span>
          </li>
        </ul>
      </div>
      <Suspense
        fallback={
          <div className="relative mt-[22px] h-[520px] overflow-visible w-[960px] mx-auto" />
        }
      >
        <SlidesShow writings={writings} book={book} />
      </Suspense>
    </article>
  )
}
