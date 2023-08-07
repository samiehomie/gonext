'use client'
import useUser from '@/lib/useUser'
import Link from 'next/link'
import Image from 'next/image'
import { dressUpMarkdown, getEnglishDate } from '@/lib/utils'
import authorBanner from '@/public/author-banner.png'
import useSWR from 'swr'
import { queryUnpublished, queryPendingDelete } from '@/lib/queries'
import { user } from '@/types'
import { useState } from 'react'
import TopNavigation from '@/components/navigations/topNavigation'

const initialTabs = {
  saved: true,
  unpublished: false
}

function TopMenu({
  tabs,
  setTabs
}: {
  tabs: typeof initialTabs
  setTabs: (arg: typeof initialTabs) => void
}) {
  return (
    <>
      <TopNavigation isBlack={true} breakpoint={100} showButtons={true}>
        <div
          className="w-[250px] ml-[-125px] text-[#666] absolute text-center h-full table
              text-[17px] left-1/2 tracking-[-1px] mt-[-3px] font-noto_sans_demlight"
        >
          <div className="table-cell align-middle">
            <button
              onClick={() =>
                setTabs({
                  unpublished: false,
                  saved: true
                })
              }
              className={`mr-[18px] whitespace-nowrap outline-none ${
                tabs.saved &&
                'mt-[2px] text-[#00c6be] border-b-[2px] border-[#00c6be]'
              }`}
            >
              저장글
            </button>
            <button
              onClick={() =>
                setTabs({
                  saved: false,
                  unpublished: true
                })
              }
              className={`whitespace-nowrap outline-none ${
                tabs.unpublished &&
                'mt-[2px] text-[#00c6be] border-b-[2px] border-[#00c6be]'
              }`}
            >
              발행취소글
            </button>
          </div>
        </div>
      </TopNavigation>
      <header className="h-[100px] block" />
    </>
  )
}

function Writings({ userId, query }: { userId: number; query: string }) {
  const { data } = useSWR<user>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}${query}`
  )

  if (!data) return null

  const writings = data.writings!

  return (
    <ul className="font-noto_sans_light">
      {writings.map((writing) => (
        <li
          key={writing.id}
          className="min-h-[125px] w-full relative border-b border-[#eee] 
                    p-[25px_0px_30px] animation-up overflow-hidden"
        >
          <Link
            href={`/ready/write/${writing.id}#write-title`}
            className="overflow-hidden clear-both block group"
          >
            <div className="w-[540px] float-left">
              <strong
                className="text-[20px] font-normal tracking-[-1px] whitespace-nowrap text-[#666]
                          leading-[28px] overflow-hidden text-ellipsis group-hover:border-b group-hover:border-[#666]"
              >
                {writing.title}
              </strong>
              <div className="pt-[6px] text-ellipsis line-clamp-2 max-h-[43px]">
                <em className="not-italic font-normal text-[#666] pt-[6px] text-[14px] tracking-[-1px]">
                  {writing.subtitle}
                </em>
                <span
                  className="w-[1px] align-top h-[11px] inline-block bg-[#bfbfbf] 
                            m-[4px_6px_0px_11px]"
                ></span>
                <span className="text-[#666] text-[14px] leading-[21px] max-w-[520px]">
                  {dressUpMarkdown(writing.content).slice(0, 200)}
                </span>
              </div>
              <span className="block pt-[20px] text-[12px] tracking-[-1px] text-[#959595]">
                <span className="float-left">
                  {getEnglishDate(writing.createdAt)}
                </span>
              </span>
            </div>

            <div className="mt-[5px] overflow-hidden absolute right-0 top-[25px] w-[120px] h-[120px]">
              {writing.cover && (
                <Image
                  src={writing.cover.formats.thumbnail.url}
                  alt={writing.title}
                  fill={true}
                  className="object-cover"
                />
              )}
            </div>
            <div className="w-[540px]">
              <div
                className="line-clamp-2 text-[14px] leading-[21px] max-h-[43px] 
                            overflow-hidden pt-[5px] text-ellipsis"
              ></div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Content() {
  const { user } = useUser()
  const [tabs, setTabs] = useState(initialTabs)

  if (!user) return null

  return (
    <>
      <TopMenu tabs={tabs} setTabs={setTabs} />
      <div className="bg-white pt-[10px]">
        <div className="bg-[#f9f9f9] mb-[10px] relative h-[100px] mt-[-30px]">
          <Link
            prefetch={false}
            href={`${process.env.NEXT_PUBLIC_TEMP}`}
            className="block w-[700px] h-[100px] m-auto"
          >
            <Image
              src={authorBanner}
              alt={'브런치 작가가 되어주세요'}
              width={700}
              height={100}
            />
          </Link>
        </div>
        <div
          id="writings"
          className="m-auto overflow-hidden w-[700px] p-[0px_120px_111px]"
        >
          <h3 className="screen-out">저장글 목록</h3>
          <div className="overflow-hidden">
            {tabs.saved && (
              <Writings userId={user.id as number} query={queryUnpublished} />
            )}
            {tabs.unpublished && (
              <Writings userId={user.id as number} query={queryPendingDelete} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
