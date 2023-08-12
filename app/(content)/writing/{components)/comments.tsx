'use client'
import Link from 'next/link'
import Image from 'next/image'
import { getEnglishDate } from '@/lib/utils'
import CommentButton from './commentButton'
import useComment from '@/lib/useComment'
import { useState } from 'react'
import CommentForm from './commentForm'
import { commentWithUser } from '@/types'

function Comment({
  comment,
  writingId
}: {
  comment: commentWithUser
  writingId: string
}) {
  const [isForm, setIsForm] = useState(false)
  if (!comment.user) return null
  return (
    <div>
      {isForm ? (
        <CommentForm
          writingId={writingId}
          setIsForm={setIsForm}
          commentId={comment.id}
          commentContent={comment.content}
        />
      ) : (
        <li
          className="w-full p-[30px_0px_25px] float-left border-b 
              border-[#eee] animation-up hover:bg-[#f8f8f8] group"
        >
          <div>
            <Link
              href={`/user/${comment.user.id}`}
              className="ml-[18px] float-left h-[42px] overflow-visible 
                    relative w-[42px]"
            >
              <Image
                src={comment.user.profile?.formats.thumbnail.url!}
                width={42}
                height={42}
                alt={comment.user.username}
                className="rounded-[42px] bg-white block"
              />
            </Link>
            <div className="pl-[16px] w-[618px] float-left relative">
              <div className="text-[12px] leading-[14px] w-full">
                <strong className="float-left text-[12px] leading-[14px]">
                  <Link
                    href={`/user/${comment.user.id}`}
                    className="font-normal font-noto_sans_light"
                  >
                    {comment.user.username}
                  </Link>
                </strong>
                <span
                  className="text-[#ddd] bg-[#e4e4e4] float-left h-[2px] 
                        m-[6px_4px_0px] w-[2px] align-top"
                ></span>
                <span className="font-noto_sans_light text-[#959595] float-left">
                  {getEnglishDate(comment.createdAt)}
                </span>
              </div>
              <p
                className="leading-[22px] p-[9px_20px_0px_0px] font-noto_sans_light 
                      word-wrap-break text-[14px] clear-left"
              >
                {comment.content}
              </p>
              <CommentButton
                writingId={writingId}
                commentId={comment.id}
                commentOwner={comment.user.id}
                setIsForm={setIsForm}
              />
            </div>
          </div>
        </li>
      )}
    </div>
  )
}

export default function Comments({ writingId }: { writingId: string }) {
  const { comments } = useComment({ writingId })

  if (!comments || comments.length === 0) return null
  return (
    <>
      <div className="m-auto w-[700px]">
        <ul className="block w-full border-t border-[#eee]">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} writingId={writingId} />
          ))}
        </ul>
      </div>
    </>
  )
}
