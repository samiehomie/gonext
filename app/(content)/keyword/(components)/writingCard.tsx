'use client'
import Link from 'next/link'
import type { writings } from '@/types'
import Image from 'next/image'
import useComment from '@/lib/useComment'
import { getEnglishDate, dressUpMarkdown } from '@/lib/utils'

export default function WritingCard({
  writing,
  index
}: {
  writing: writings['data'][number]
  index: number
}) {
  const { comments } = useComment({ writingId: writing.id })
  const createdAt = getEnglishDate(writing.attributes.created)

  if (!comments) return null

  return (
    <li
      className={`${
        index !== 0 && 'mt-[14px]'
      } bg-white border-b border-[#eee] box-border min-h-[180px] p-[30px_20px] text-[#333] 
          relative overflow-hidden w-[700px] m-auto font-noto_sans_light animation-up`}
    >
      <Link
        href={`/writing/${writing.attributes.user?.data.id}/${writing.id}#title`}
      >
        <div className="w-[520px] float-left">
          <strong
            className="font-normal text-[20px] tracking-[-1px] whitespace-nowrap 
                      leading-[28px] overflow-hidden text-ellipsis"
          >
            {writing.attributes.title}
          </strong>
          <div className="line-clamp-2 max-h-[45px] text-ellipsis pt-[6px]">
            <em className="text-[#666] text-[14px] tracking-[-1px] font-normal not-italic pt-[6px]">
              {writing.attributes.subtitle}
            </em>
            <span
              className={`${
                !writing.attributes.subtitle && 'hidden'
              } bg-[#bfbfbf] inline-block h-[11px] w-[1px] m-[4px_8px_0px]`}
            />
            <span className="text-[#666] text-[14px] leading-[21px]">
              {dressUpMarkdown(writing.attributes.content).slice(0, 200)}
            </span>
          </div>
          <span className="text-[#959595] block text-[12px] overflow-hidden pt-[20px]">
            <span className="float-left">댓글</span>
            <span className="float-left">
              {comments.filter((c) => !!c.user).length}
            </span>
            <span className="float-left bg-[#aaa] inline-block h-[2px] m-[8px_6px_0px] align-top w-[2px]" />
            <span className="float-left">{createdAt}</span>
            <span className="float-left bg-[#aaa] inline-block h-[2px] m-[8px_6px_0px] align-top w-[2px]" />
            <span
              className="float-left text-[#bfbfbf] italic font-[Georgia] text-[12px] h-[15px] 
                        w-[15px] mr-[4px] inline-block"
            >
              by
            </span>
            <span className="float-left">
              {writing.attributes.user?.data.attributes.username}
            </span>
          </span>
        </div>
        <div className="float-right overflow-hidden absolute right-[20px] top-[30px] h-[120px] w-[120px]">
          {writing.attributes.cover?.data && (
            <Image
              alt={writing.attributes.title}
              fill={true}
              className="object-cover"
              src={
                writing.attributes.cover?.data.attributes.formats.thumbnail.url!
              }
            />
          )}
        </div>
      </Link>
    </li>
  )
}
