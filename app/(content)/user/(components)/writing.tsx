'use client'
import { dressUpMarkdown } from '@/lib/utils'
import useComment from '@/lib/useComment'
import Image from 'next/image'
import type { writingInUser } from '@/types'
import Link from 'next/link'
import { getEnglishDate } from '@/lib/utils'
import defaultCover from '@/public/default-cover.png'

export default function Writing({
  writing,
  userId
}: {
  writing: writingInUser
  userId: number
}) {
  const { comments } = useComment({ writingId: `${writing.id}` })

  if (!comments) return null

  return (
    <li
      key={writing.id}
      className="relative border-b border-[#eee] p-[24px_0px_27px] animation-up"
    >
      {writing.book !== null && (
        <Link
          href={`/book/${writing.book?.id}`}
          className=" inline-block text-[13px] m-[3px_0px_11px] align-top text-[#00c6be]"
        >
          <em
            className="not-italic font-normal border-b border-[#00c6be] 
                    inline-block leading-[14px] min-w-[20px]"
          >
            {writing.book?.title}
          </em>
        </Link>
      )}
      <Link
        href={`/writing/${userId}/${writing.id}#title`}
        className="min-h-[112px] overflow-visible clear-both block 
                after:block after:clear-both after:content-['']"
      >
        <strong className="text-[20px] font-normal tracking-[-1px] whitespace-nowrap">
          {writing.title}
        </strong>
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
          >
            {writing.subtitle && (
              <>
                <em className="not-italic font-normal text-[#666] pt-[6px]">
                  {writing.subtitle}
                </em>
                <span className="w-[1px] align-top h-[12px] inline-block bg-[#eee] m-[4px_3px_0px]"></span>
              </>
            )}

            <span className="word-wrap-break break-words text-[#959595]">
              {dressUpMarkdown(writing.content).slice(0, 200)}
            </span>
          </div>
        </div>
        <span className=" whitespace-nowrap text-[#959595] block text-[12px] overflow-hidden pt-[21px]">
          <span className="float-left">댓글</span>
          <span className="float-left">
            {comments.filter((c) => !!c.user).length}
          </span>
          <span className="float-left bg-[#ddd] inline-block h-[2px] w-[2px] align-top m-[9px_5px_0px_6px]"></span>
          <span className="float-left text-[#959595]">
            {writing.publishedAt && getEnglishDate(writing.publishedAt)}
          </span>
        </span>
      </Link>
    </li>
  )
}
